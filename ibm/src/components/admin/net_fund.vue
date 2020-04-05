<template>
    <div class="page_box">
        <div class="wallet_title">
            <h1>{{$t('admin_4')}}</h1>
        </div>
        <div class="cash_con wallet_con_date">
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
                    @change="change1"
                    value-format="yyyy-MM-dd"
                    :disabled="sel"
                    :placeholder="$t('end_time')">
                </el-date-picker>
                <div class="cash_input">
                    <el-input
                        :placeholder="$t('users_ID')"
                        v-model="value3"
                        disabled="true">
                    </el-input>
                    <b @click="sou()">{{$t('search')}}</b>
                </div>
            </div>
            <div class="page_con_top">
                <div>
                    <h1>{{$t('own_money')}}</h1>
                    <p>{{customize_invest}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "net_fund",
        data(){
          return {
              customize_invest:0,
              value1:'',
              value2:'',
              value3:'',
              sel:true,
          }
        },
        mounted(){
            //主页搜索数据
            this.ajaxC('/system/rechargeCustom',{startTime:'',endTime:''},'get',this.date1);
        },
        methods:{
            change(){
                if(this.value1==null){
                    this.sel=true;
                    this.value2=null;
                    this.ajaxC('/system/rechargeCustom',{startTime:'',endTime:''},'get',this.date1);
                }else{
                    this.sel=false;
                }
            },
            date1(res){
                if(res.data.code==0){
                    this.customize_invest=res.data.data.recharge==0?'0':this.moneyToFloat(parseFloat(res.data.data.recharge).toFixed(2));
                }else{
                    return;
                }
            },
            change1(){
                this.ajaxC('/system/rechargeCustom',{startTime:this.value1,endTime:this.value2},'get',this.date1);
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/cash.css";
    @import "../../assets/css/wallet.css";
    @import "../../assets/css/admin_page.css";
    .cash_con{
        padding: 30px;
    }
    .cash_top{
        margin-top: 0;
    }
    .page_con_top{
        margin-top: 30px;
    }
</style>
