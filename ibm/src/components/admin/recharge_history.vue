<template>
    <div class="page_box">
        <div class="cash_title">
            <h1>{{$t('admin_3')}}</h1>
        </div>
        <div class="cash_top">
            <el-date-picker
                v-model="value1"
                @change="change"
                type="date"
                value-format="yyyy-MM-dd"
                :placeholder="$t('start_time')">
            </el-date-picker>
            <span>{{$t('to')}}</span>
            <el-date-picker
                v-model="value2"
                type="date"
                value-format="yyyy-MM-dd"
                :disabled="sel"
                :placeholder="$t('end_time')">
            </el-date-picker>
            <div class="cash_input">
                <el-select v-model="value3">
                    <el-option
                        v-for="item in list2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <br>
                <br>
                <el-input
                    :placeholder="$t('third_order')"
                    v-model="value4"
                    clearable>
                </el-input>
                <b @click="sou()">{{$t('search')}}</b>
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
                    :label="$t('Order_No')">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column
                    prop="time"
                    :label="$t('third_order')">
                </el-table-column>
                <el-table-column
                    prop="ID"
                    :label="$t('user_name')">
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="$t('deposite_time')">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="ID">
                </el-table-column>
                <el-table-column
                    prop="bankName"
                    :label="$t('Order_money')">
                </el-table-column>
                <el-table-column
                    prop="money"
                    :label="$t('MT4_status')">
                </el-table-column>
                <el-table-column :label="$t('need_do')" width="100">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="open(scope.row)">{{$t('return_pre')}}</el-button>
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


        <div class="feed_history">
            <el-dialog
                :title="$t('prompt')"
                :visible.sync="centerDialogVisible"
                width="320px"
                center>
                <el-scrollbar style="height:100%">
                    <div class="history">
                        <h1>{{$t('code_type')}}</h1>
                        <el-radio v-model="radio" label="1">{{$t('phone_note')}}</el-radio>
                        <el-radio v-model="radio" label="2">{{$t('user_email')}}</el-radio>
                        <div class="from_group">
                            <label for="#">{{$t('pass_code')}}</label>
                            <span>
                                <el-input
                                    :placeholder="$t('verification_code')"
                                    v-model="input4"
                                >
                                </el-input>
                                <b v-show="code==1" @click="getCode()">{{$t('get_code')}}</b>
                                <b v-show="code==2">{{num1}}S</b>
                            </span>
                        </div>
                    </div>
                </el-scrollbar>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="centerDialogVisible = false,goH()">{{$t('page_sure')}}</el-button>
                </span>
            </el-dialog>
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
                value3:0,
                value4:'',
                input:'',
                input4:'',
                list:[],
                list1:[],
                list2:[
                    {
                        label:this.$t('noPay'),
                        value:0
                    },
                    {
                        label:this.$t('okPay'),
                        value:1
                    },
                ],
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
                centerDialogVisible:false,
                radio:'1',
                code:1,
                num1:60,
                id:'',
            }
        },
        mounted(){
            this.getM();
        },
        methods:{

            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio},'get',this.getP)
            },
            getP(res){
                if(res.data.code==0){
                    this.isShow=true;
                    this.case(this.$t('get_code1'));
                    this.code=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num1--;
                        if(the.num1<=0){
                            the.num1=60;
                            the.code=1;
                            clearInterval(timer);
                        }
                    },1000)
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'));
                }else{
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            },

            //打开回调
            open(a){
              this.id=a.id;
              this.centerDialogVisible=true;
            },
            goH(){
                this.ajaxE('/tra/callbackAdmin',{orderId:this.id,code:this.input4,type:this.radio},'post',this.s);
            },
            s(res){
                if(res.data.code==0){
                    this.case(this.$t('return_success'));
                    this.getM();
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
                this.ajaxC('/assets/getUserRechargesAll',{order:'',state:0,startTime:'',endTime:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.order_no,time:f.dealer_order_no,ID:f.username,name:f.creat_time,phone:f.user_id,bankName
                                :this.moneyToFloat(parseFloat(f.usd).toFixed(2)),money:f.state=='0'?this.$t('noPay'):this.$t('okPay'),adress:f.bankNumber == '' || f.bankNumber == null || f.bankNumber=='null'?'--':f.bankNumber,scrible:f.reason==''?'--':f.reason,reason:f.examineReason==null?'--':f.examineReason,id:f.id})
                    });
                    this.total=res.data.data.total;
                }else if(res.data.code==4){
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

            sou(){
                this.type=2;
                this.ajaxC('/assets/getUserRechargesAll',{order:this.value4,state:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.order_no,time:f.dealer_order_no,ID:f.username,name:f.creat_time,phone:f.user_id,bankName
                                :this.moneyToFloat(parseFloat(f.usd).toFixed(2)),money:f.state=='0'?this.$t('noPay'):this.$t('okPay'),adress:f.bankNumber == '' || f.bankNumber == null || f.bankNumber=='null'?'--':f.bankNumber,scrible:f.reason==''?'--':f.reason,reason:f.examineReason==null?'--':f.examineReason,id:f.id})
                    });
                    this.total1=res.data.data.total;
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
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
    @import "../../assets/css/wallet.css";
    .cash_con td{
        height: 60px;
    }
    .history label{
        text-align: left;
    }
    .history h1+label{
        width: 100px;
    }
    .history h1{
        margin-bottom: 20px;
        font-family:Source Han Sans CN;
    }
    .history label+label{
        width: 100px;
        margin-left: 30px;
    }
    .history .from_group{
        margin-top: 20px;
    }
</style>
