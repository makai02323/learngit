<template>
    <div class="page_box">
        <div class="cash_title">
            <h1>配套购买记录</h1>
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
                <el-input
                    placeholder="用户名或ID"
                    v-model="value3"
                    clearable>
                </el-input>
                <b @click="sou()">搜索</b>
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
                        label="用户名">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="用户id">
                    </el-table-column>
                    <el-table-column
                        prop="ID"
                        label="配套名称">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="本次花费金额">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        label="购买后持有配套金额">
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        label="购买时间">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="类型">
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
                value3:'',
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
                staus:['出金申请','','出金驳回','','','出金成功'],
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
                this.ajaxC('/matching/getBuyMatchingInfo',{userId:'',startTime:'',endTime:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.username,time:f.user_id,ID:f.mat4Name,name:f.money,phone:f.matMoney,bankName
                                :f.time,money:f.translate})
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
                this.ajaxC('/matching/getBuyMatchingInfo',{userId:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.username,time:f.user_id,ID:f.mat4Name,name:f.money,phone:f.matMoney,bankName
                                :f.time,money:f.translate})
                    });
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

            sou(){
                this.type=3;
                this.ajaxC('/matching/getBuyMatchingInfo',{userId:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage2,pageSize:this.currentCount2},'get',this.ok2)
            },
            ok2(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.username,time:f.user_id,ID:f.mat4Name,name:f.money,phone:f.matMoney,bankName
                                :f.time,money:f.translate})
                    });
                    this.total2=res.data.data.total;
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
                }
            },
            handleSizeChange2(val) {
                this.currentCount2=val;
                this.sou();
            },
            handleCurrentChange2(val) {
                this.currentPage2=val;
                this.sou();
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/css/cash.css";
    @media (max-width: 1650px) {
        .cash_con{
            overflow-x: visible;
        }
        table{
            width: 100%;
        }
    }
    @media (max-width: 1240px) {
        .cash_con{
            overflow-x: scroll;
        }
        table{
            width: 1000px;
        }
    }
</style>
