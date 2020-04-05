<template>
    <div class="page_box">
        <div class="cash_title">
            <h1>{{$t('home_menu3_3')}}</h1>
        </div>
        <div class="cash_top">
            <el-date-picker
                v-model="value1"
                @change="change"
                type="date"
                value-format="yyyy-MM-dd"
                :placeholder="$t('start_time')">
            </el-date-picker>
            <span>至</span>
            <el-date-picker
                v-model="value2"
                type="date"
                value-format="yyyy-MM-dd"
                :disabled="sel"
                :placeholder="$t('end_time')">
            </el-date-picker>
            <div class="cash_input">
                <el-input
                    :placeholder="$t('users_ID')"
                    v-model="input"
                    clearable>
                </el-input>
                <b @click="sou()">{{$t('search')}}</b>
            </div>
        </div>
        <div class="cash_con">
            <table width="100%">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                        :label="$t('Order_No')">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        :label="$t('time_date')">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="ID"-->
                    <!--label="收入">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                    <!--prop="name"-->
                    <!--label="支出">-->
                    <!--</el-table-column>-->
                    <el-table-column
                        prop="money_current"
                        :label="$t('Order_money')">
                    </el-table-column>
                    <el-table-column
                        prop="phone"
                        :label="$t('surplus')">
                    </el-table-column>
                    <el-table-column
                        prop="bankName"
                        :label="$t('user_id')">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        :label="$t('user_name')">
                    </el-table-column>
                    <el-table-column
                        prop="sea"
                        :label="$t('remarks')">
                    </el-table-column>
                </el-table>
            </table>
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
                input:'',
                list:[],
                list1:[],
                type:1,
                currentPage:1,
                currentCount:10,
                currentPage1:1,
                currentCount1:10,
                total:0,
                total1:0,
                isShow:false,
                msg:'',
                multipleSelection: [],
                tableData:[],
            }
        },
        mounted(){
            this.getM();
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

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
                this.ajaxC('/assets/selectAssetsLogType',{walletType:4,startTime:'',endTime:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.forEach((f)=>{
                        this.tableData.push({date:f.order_no,time:f.create_time,money_current:f.money,phone:f.money_new,bankName
                                :f.provide_user_id==undefined?'--':f.provide_user_id,money:f.provideUserName==undefined?'--':f.provideUserName,sea:f.translate})
                    });
                    this.total=parseInt(res.data.datas);
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases(this.$t('login_wrong'))
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

            sou(){
                this.type=2;
                this.ajaxC('/assets/selectAssetsLogType',{walletType:4,startTime:this.value1,endTime:this.value2,id:this.input,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.forEach((f)=>{
                        this.tableData.push({date:f.order_no,time:f.create_time,money_current:f.money,phone:f.money_new,bankName
                                :f.provide_user_id==undefined?'--':f.provide_user_id,money:f.provideUserName==undefined?'--':f.provideUserName,sea:f.translate})
                    });
                    this.total1=parseInt(res.data.datas);
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases(this.$t('login_wrong'))
                }
            },
            handleSizeChange1(val) {
                this.currentCount1=val;
                this.sou();
            },
            handleCurrentChange1(val) {
                this.currentPage1=val;
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
    @media (max-width: 1000px) {
        .cash_con{
            overflow-x: scroll;
        }
        table{
            width: 700px;
        }
        ::-webkit-scrollbar {
            width: 100%;
            height: 6px;
        }
    }
</style>
