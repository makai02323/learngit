<template>
    <div class="page_box">
        <div class="cash_title">
            <h1>MT4出金列表</h1>
        </div>
        <div class="cash_top">
            <el-date-picker
                v-model="value1"
                @change="change"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始日期">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
                v-model="value2"
                type="date"
                @change="change1"
                value-format="yyyy-MM-dd"
                :disabled="sel"
                placeholder="结束日期">
            </el-date-picker>
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
                        label="申请时间">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="购买时间">
                    </el-table-column>
                    <el-table-column
                        prop="ID"
                        label="用户id">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="配套名">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="配套金额">
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="MT4账户">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="MT4密码">
                    </el-table-column>
                    <el-table-column
                        v-if="value3==3"
                        prop="sea"
                        label="原因">
                    </el-table-column>
                    <el-table-column
                        prop="adress"
                        label="状态">
                    </el-table-column>
                    <el-table-column v-if="type1==1" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.row)">通过</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">驳回</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="type1==2" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="warning"
                                @click="handleEdit1(scope.row)">恢复</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="type1==3" label="操作" width="200">
                        <span>--</span>
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
        <div v-show="type==3" class="fen">
            <el-pagination
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="currentCount2"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total2">
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
                        label:'出金申请',
                        value:1
                    },
                    {
                        label:'出金驳回',
                        value:3
                    },
                    {
                        label:'出金成功',
                        value:6
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
                staus:['','出金申请','','出金驳回','','','出金成功'],
                type1:1,
                val:'',
            }
        },
        mounted(){
            this.getM();
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //通过
            handleEdit(a){
                this.$confirm('确定要通过？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajaxE('/assets/withdrawReviewMt4',{withdrawId:a.id,withdrawStatus:6},'post',this.sure)
                });
            },
            sure(res){
                if(res.data.code==0){
                    this.case('出金成功');
                    this.getM();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            //驳回
            handleDelete(a){
                this.$prompt('驳回原因', '提示', {
                    confirmButtonText: '确定',
                    inputValidator:val=>{
                        this.val=val;
                    },
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.ajaxE('/assets/withdrawReviewMt4',{withdrawId:a.id,withdrawStatus:3,examineReason:this.val},'post',this.sure1)
                })
            },
            sure1(res){
                if(res.data.code==0){
                    this.case('驳回成功');
                    this.getM();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //出金驳回时的恢复
            handleEdit1(a){
                console.log(a);
                this.$confirm('确定要恢复？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ajaxE('/system/auditMt4Recovery',{id:a.id},'post',this.mt4Return)
                });
            },
            mt4Return(res){
                if(res.data.code==0){
                    this.case('恢复成功');
                    this.value3=3;
                    this.change2();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            change(){
                if(this.value1==null){
                    this.sel=true;
                    this.value2=null;
                }else{
                    this.sel=false;
                }
            },

            getM(){
                this.type=1;
                this.ajaxC('/assets/getWithdrawalApplysMt4',{type:1,startTime:'',endTime:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.ca_time,time:f.create_time,ID:f.user_id,name:f.mat_name,phone:f.money,bankName
                                :f.mt4_user,money:f.password,sea:f.reason,adress:this.staus[1],id:f.mt4Balanceid})
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

            change1(){
                this.type=2;
                this.ajaxC('/assets/getWithdrawalApplysMt4',{type:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                if(this.value3==1){
                    this.type1=1;
                }else if(this.value3==3){
                    this.type1=2;
                }else{
                    this.type1=3;
                }
                this.tableData=[];
                if(res.data.code==0){
                    if(this.value3==3){
                        res.data.data.list.forEach((f)=>{
                            this.tableData.push({date:f.ca_time,time:f.create_time,ID:f.user_id,name:f.mat_name,phone:f.money,bankName
                                    :f.mt4_user,money:f.password,sea:f.reason==null?'--':f.reason,adress:this.staus[f.bstatus],id:f.mt4Balanceid})
                        });
                    }else{
                        res.data.data.list.forEach((f)=>{
                            this.tableData.push({date:f.ca_time,time:f.create_time,ID:f.user_id,name:f.mat_name,phone:f.money,bankName
                                    :f.mt4_user,money:f.password,adress:this.staus[f.bstatus],id:f.mt4Balanceid})
                        });
                    }
                    this.total1=res.data.data.total;
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
                }
            },
            handleSizeChange1(val) {
                this.currentCount1=val;
                this.change1();
            },
            handleCurrentChange1(val) {
                this.currentPage1=val;
                this.change1();
            },

            change2(){
                this.type=3;
                this.ajaxC('/assets/getWithdrawalApplysMt4',{type:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage2,pageSize:this.currentCount2},'get',this.ok2)
            },
            ok2(res){
                if(this.value3==1){
                    this.type1=1;
                }else if(this.value3==3){
                    this.type1=2;
                }else{
                    this.type1=3;
                }
                this.tableData=[];
                if(res.data.code==0){
                    if(this.value3==3){
                        res.data.data.list.forEach((f)=>{
                            this.tableData.push({date:f.ca_time,time:f.create_time,ID:f.user_id,name:f.mat_name,phone:f.money,bankName
                                    :f.mt4_user,money:f.password,sea:f.reason==null?'--':f.reason,adress:this.staus[f.bstatus],id:f.mt4Balanceid})
                        });
                    }else{
                        res.data.data.list.forEach((f)=>{
                            this.tableData.push({date:f.ca_time,time:f.create_time,ID:f.user_id,name:f.mat_name,phone:f.money,bankName
                                    :f.mt4_user,money:f.password,adress:this.staus[f.bstatus],id:f.mt4Balanceid})
                        });
                    }
                    this.total2=res.data.data.total;
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
                }
            },
            handleSizeChange2(val) {
                this.currentCount2=val;
                this.change2();
            },
            handleCurrentChange2(val) {
                this.currentPage2=val;
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
