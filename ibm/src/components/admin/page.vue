<template>
    <div class="page_box">
        <div class="wallet_title">
            <h1>{{$t('admin_1')}}</h1>
        </div>
        <div class="wallet_con">
            <div class="page_con_top">
                <div>
                    <h1>{{$t('histroy_invest')}}</h1>
                    <p>{{histroy_invest}}</p>
                </div>
                <div>
                    <h1>{{$t('preMonth_invest')}}</h1>
                    <p>{{preMonth_invest}}</p>
                </div>
                <div>
                    <h1>{{$t('month_invest')}}</h1>
                    <p>{{month_invest}}</p>
                </div>
                <div>
                    <h1>{{$t('histroy_totaiMoney')}}</h1>
                    <p>{{histroy_totaiMoney}}</p>
                </div>
                <div>
                    <h1>{{$t('preMonth_totalMoney')}}</h1>
                    <p>{{preMonth_totalMoney}}</p>
                </div>
                <div>
                    <h1>{{$t('month_totalMoney')}}</h1>
                    <p>{{month_totalMoney}}</p>
                </div>
                <div>
                    <h1>{{$t('histroy_RePerson')}}</h1>
                    <p>{{histroy_RePerson}}</p>
                </div>
                <div>
                    <h1>{{$t('preMonth_RePerson')}}</h1>
                    <p>{{preMonth_RePerson}}</p>
                </div>
                <div>
                    <h1>{{$t('month_RePerson')}}</h1>
                    <p>{{month_RePerson}}</p>
                </div>
            </div>
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
                @change="change1"
                value-format="yyyy-MM-dd"
                :disabled="sel"
                :placeholder="$t('end_time')">
            </el-date-picker>
            <div class="cash_input">
                <el-input
                    placeholder="用户名或ID"
                    v-model="value3"
                    disabled="true">
                </el-input>
                <b @click="sou()">{{$t('search')}}</b>
            </div>
        </div>
        <div class="wallet_con wallet_con_date">
            <div class="page_con_top">
                <div>
                    <h1>{{$t('own_money')}}</h1>
                    <p>{{customize_invest}}</p>
                </div>
                <div>
                    <h1>{{$t('own_de_money')}}</h1>
                    <p>{{customize_total}}</p>
                </div>
                <div>
                    <h1>{{$t('own_re_peson')}}</h1>
                    <p>{{customize_preson}}</p>
                </div>
            </div>
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
        name: "page",
        data(){
          return {
              histroy_invest:0,
              preMonth_invest:0,
              month_invest:0,
              histroy_totaiMoney:0,
              preMonth_totalMoney:0,
              month_totalMoney:0,
              histroy_RePerson:0,
              preMonth_RePerson:0,
              month_RePerson:0,
              customize_invest:0,
              customize_total:0,
              customize_preson:0,
              value1:'',
              value2:'',
              value3:'',
              sel:true,
              isShow:false,
              msg:'',
          }
        },
        mounted(){
            //主页数据
            this.ajaxC('/system/queryRecharge',{},'get',this.date);

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

          date(res){
              if(res.data.code==0){
                  this.histroy_invest=res.data.data.all.recharge==0?'0':this.moneyToFloat(parseFloat(res.data.data.all.recharge).toFixed(2));
                  this.histroy_totaiMoney=res.data.data.all.withdraw==0?'0':this.moneyToFloat(parseFloat(res.data.data.all.withdraw).toFixed(2));
                  this.histroy_RePerson=res.data.data.all.user;

                  this.preMonth_invest=res.data.data.thiss.recharge==0?'0':this.moneyToFloat(parseFloat(res.data.data.thiss.recharge).toFixed(2));
                  this.preMonth_totalMoney=res.data.data.thiss.withdraw==0?'0':this.moneyToFloat(parseFloat(res.data.data.thiss.withdraw).toFixed(2));
                  this.preMonth_RePerson=res.data.data.thiss.user;

                  this.month_invest=res.data.data.front.recharge==0?'0':this.moneyToFloat(parseFloat(res.data.data.front.recharge).toFixed(2));
                  this.month_totalMoney=res.data.data.front.withdraw==0?'0':this.moneyToFloat(parseFloat(res.data.data.front.withdraw).toFixed(2));
                  this.month_RePerson=res.data.data.front.user;
              }else if(res.data.code==4){
                  this.cases1(this.$t('login_wrong'));
              }
          },
          date1(res){
              if(res.data.code==0){
                  this.customize_invest=res.data.data.recharge==0?'0':this.moneyToFloat(parseFloat(res.data.data.recharge).toFixed(2));
                  this.customize_total=res.data.data.withdraw==0?'0':this.moneyToFloat(parseFloat(res.data.data.withdraw).toFixed(2));
                  this.customize_preson=res.data.data.us;
              }else if(res.data.code==4){
                  this.cases1(this.$t('login_wrong'));
              }
          },
          change1(){
              this.ajaxC('/system/rechargeCustom',{startTime:this.value1,endTime:this.value2},'get',this.date1);
          },
        },
    }
</script>

<style scoped>
    @import "../../assets/css/cash.css";
    @import "../../assets/css/wallet.css";
    @import "../../assets/css/admin_page.css";
</style>

















