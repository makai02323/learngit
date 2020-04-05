<template>
    <div class="page_box">
        <div class="cash_title">
            <h1>{{$t('admin_2')}}</h1>
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
                <el-select v-model="value3">
                    <el-option
                        v-for="item in list2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
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
                    :label="$t('apply_time')">
                </el-table-column>
                <el-table-column
                    prop="ID"
                    label="ID">
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="$t('true_name')">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    :label="$t('phone1')">
                </el-table-column>
                <el-table-column
                    prop="bankName"
                    :label="$t('bank_name')">
                </el-table-column>
                <el-table-column
                    prop="money"
                    :label="$t('gold_money')">
                </el-table-column>
                <el-table-column
                    prop="adress"
                    :label="$t('customInfo_adress')">
                </el-table-column>
                <el-table-column
                    prop="scrible"
                    :label="$t('describe')">
                </el-table-column>
                <el-table-column
                    prop="reason"
                    :label="$t('reason')">
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
                value3:3,
                input:'',
                list:[],
                list1:[],
                list2:[
                    {
                        label:this.$t('gold_return'),
                        value:3
                    },
                    {
                        label:this.$t('Gold_success'),
                        value:6
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
                staus:[this.$t('Gold_please'),'',this.$t('gold_return'),'','',this.$t('Gold_success')],
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
                this.ajaxC('/assets/getWithdrawalApplys',{withdrawStatus:3,startTime:'',endTime:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.orderNo,time:f.creatTime,ID:f.userId,name:f.realName==''?'--':f.realName,phone:f.realBankPhone==null || f.realBankPhone=='' ?'--':f.realBankPhone,bankName
                                :f.bankName,money:this.moneyToFloat(parseFloat(f.withdrawMoney).toFixed(2)),adress:f.bankNumber == '' || f.bankNumber == null || f.bankNumber=='null'?'--':f.bankNumber,scrible:f.reason==''?'--':f.reason,reason:f.examineReason==null?'--':f.examineReason,staus:this.staus[f.withdrawStatus-1],id:f.id})
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
                this.ajaxC('/assets/getWithdrawalApplys',{withdrawStatus:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.orderNo,time:f.creatTime,ID:f.userId,name:f.realName==''?'--':f.realName,phone:f.realBankPhone==null || f.realBankPhone=='' ?'--':f.realBankPhone,bankName
                                :f.bankName,money:this.moneyToFloat(parseFloat(f.withdrawMoney).toFixed(2)),adress:f.bankNumber == '' || f.bankNumber == null || f.bankNumber=='null'?'--':f.bankNumber,scrible:f.reason==''?'--':f.reason,reason:f.examineReason==null?'--':f.examineReason,staus:this.staus[f.withdrawStatus-1],id:f.id})
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
    /*.cash_input1{*/
    /*margin-top: 20px;*/
    /*}*/
</style>
