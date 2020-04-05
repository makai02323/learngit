<template>
    <div class="page_box">
        <div class="cash_title">
            <h1>MT4异常列表</h1>
        </div>
        <div class="cash_top">
            <div class="cash_input">
                <el-select v-model="value3" @change="change2">
                    <el-option
                        v-for="item in list2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="cash_con">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        label="用户ID">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="时间">
                    </el-table-column>
                    <el-table-column
                        prop="ID"
                        label="MT4账户">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="MT4ID">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="金额">
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="类型">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="状态">
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.row)">不处理</el-button>
                            <el-button
                                size="mini"
                                type="success"
                                @click="handleEdit1(scope.row)">已处理</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </div>
        <div v-show="type==1" class="fen">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="currentCount"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>

        <div v-show="type==2" class="fen">
            <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="currentPage1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="currentCount1"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total1">
            </el-pagination>
        </div>

        <div class="msgzz" v-show="isShow">
            <div class="msgBox">
                <div class="title1">{{$t('prompt')}}</div>
                <div class="msg">{{msg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "cash",
        data(){
            return {
                sel:true,
                value1:'',
                value2:'',
                value3:1,
                input:'',
                list:[],
                list1:[],
                list2:[
                    {
                        label:'全部',
                        value:''
                    },
                    {
                        label:'未处理',
                        value:1
                    },
                    {
                        label:'已处理',
                        value:2
                    },
                    {
                        label:'不处理',
                        value:3
                    },
                ],
                type:1,
                currentPage:1,
                currentCount:10,
                currentPage1:1,
                currentCount1:10,
                currentPage2:1,
                currentCount2:10,
                total:0,
                total1:0,
                total2:0,
                isShow:false,
                msg:'',
                multipleSelection: [],
                tableData:[],
                staus:['出金申请','','出金驳回','','','出金成功'],
                type1:1,
                val:'',
                status_err:[ '','注册', '注册入金', '升级配套' ,'MT4提现' ,' MT4解约'],
                type_err:[ '','未处理', '已处理', '不处理']
            }
        },
        mounted(){
            this.getM();
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //不处理
            handleEdit(a){
                this.$confirm('确定不处理？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajaxE('/system/mt4ErrorUpdateState',{id:a.id,state:3},'post',this.sure)
                });
            },
            sure(res){
                if(res.data.code==0){
                    this.case('不处理成功');
                    this.change2();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            //已处理
            handleEdit1(a){
                this.$confirm('确定已处理？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajaxE('/system/mt4ErrorUpdateState',{id:a.id,state:2},'post',this.sure1)
                });
            },
            sure1(res){
                if(res.data.code==0){
                    this.case('已处理成功');
                    this.change2();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            //删除
            handleDelete(a){
                this.$confirm('确定已处理？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajaxE('/system/mt4ErrorDelete',{id:a.id},'post',this.sure2)
                });
            },
            sure2(res){
                if(res.data.code==0){
                    this.case('删除成功');
                    this.change2();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },


            getM(){
                this.type=1;
                this.ajaxC('/system/mt4ErrorInfo',{status:this.value3,pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.user_id,time:f.time,ID:f.userId,name:f.mt4_id,phone:f.money,bankName
                                :this.status_err[f.type],money:this.type_err[f.status],id:f.id})
                    });
                    this.total=res.data.data.total
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
                }
            },

            handleSizeChange(val) {
                this.currentCount=val;
                this.getM();
            },
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getM();
            },


            change2(){
                this.type=2;
                this.ajaxC('/system/mt4ErrorInfo',{status:this.value3,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok2)
            },
            ok2(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.user_id,time:f.time,ID:f.userId,name:f.mt4_id,phone:f.money,bankName
                                :this.status_err[f.type],money:this.type_err[f.status],id:f.id})
                    });
                    this.total1=res.data.data.total
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
                }
            },
            handleSizeChange1(val) {
                this.currentCount1=val;
                this.change2();
            },
            handleCurrentChange1(val) {
                this.currentPage1=val;
                this.change2();
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/css/cash.css";
    /*.cash_input1{*/
    /*margin-top: 20px;*/
    /*}*/
</style>
