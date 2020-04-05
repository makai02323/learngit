<template>
<div class="page_box">
    <div class="gold_title">
        <h1>{{$t('home_menu6_1')}}</h1>
    </div>
    <div class="gold_con">
        <div class="gold_top">
            <h2>{{$t('page_cp')}}</h2>
            <h1>${{money}}</h1>
        </div>
        <div class="gold_middle">
            <div class="from_group">
                <label for="">{{$t('gold_money')}}(USD)</label>
                <el-input
                    @blur="jc"
                    :placeholder="$t('please_gold_money')"
                    v-model="input"
                    clearable>
                </el-input>
            </div>
            <div class="from_group">
                <label for="">{{$t('money_type')}}</label>
                <el-select v-model="money1" @change="changed">
                    <el-option
                        v-for="item in list"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="from_group">
                <label for="">{{$t('give_money')}}</label>
                <span>
                    <el-input
                        v-model="input1"
                        :disabled="true">
                    </el-input>
                    <i>{{money_type}}</i>
                </span>
            </div>
            <div class="from_group">
                <label for="">{{$t('code_type')}}</label>
                <el-radio v-model="radio" label="1">{{$t('phone_note')}}</el-radio>
                <el-radio v-model="radio" label="2">{{$t('user_email')}}</el-radio>
            </div>
            <div class="from_group">
                <label v-if="radio==1" for="#">{{$t('curr_phone')}}</label>
                <label v-if="radio==2" for="#">{{$t('curr_email')}}</label>
                <el-input
                    v-model="input3"
                    :disabled="true">
                </el-input>
            </div>
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
            <div class="from_group from_group1">
                <label for=""></label>
                <p @click="sub()">{{$t('bank_sure')}}</p>
            </div>
        </div>
        <div class="explain">
            <h1>
                <b></b>
                <span>{{$t('gold_succ')}}</span>
            </h1>
            <p>{{$t('gold_succ1')}} <br>{{$t('gold_succ2')}}</p>
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
        name: "gold",
        data(){
            return {
                money:'',
                input:'',
                isShow:false,
                msg:'',
                money1:'BTC',
                list:[
                    {
                        label:'BTC',
                        value:'BTC'
                    },{
                        label:'ETH',
                        value:'ETH'
                    },{
                        label:'USDT',
                        value:'USDT'
                    }
                ],
                input1:0,
                money_type:'BTC',
                input3:'',
                input4:'',
                code:1,
                num1:60,
                list1:{},
                rate:'',
                list2:[],
                radio:'1',
                list3:{},
            }
        },
        mounted(){
            //获取现金钱包金额
            this.getM();

            //获取个人信息
            this.ajaxC('/user/getUserInfo',{},'get',this.infor);

            //获取汇率
            this.ajaxC('/system/exchangeRate',{},'get',this.getR)
        },
        methods:{
            //个人信息
            infor(res){
                if(res.data.code==0){
                    this.list3=res.data.data.user;
                    this.input3=this.list3.mobile;
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            getR(res){
                if(res.data.code==0){
                    this.list2=JSON.parse(res.data.data);
                    this.rate=1/this.list2[0].price;
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            getM(){
                this.ajaxC('/assets/getUserAssets',{},'get',this.getCash);
            },
            getCash(res){
                if(res.data.code==0){
                    this.money=this.moneyToFloat(res.data.data.cp);
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            //选择不同的币种
            changed(){
                this.money_type=this.money1
            },

            //获取验证码
            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{contactNumber:this.input3,type:this.radio},'get',this.getP2)
            },
            getP2(res){
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
                    this.isShow=true;
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            },

            //监测输入的金额是否大于0
            jc(){
              if(this.input<100){
                  this.isShow=true;
                  this.case(this.$t('bank_min1'));
              }
            },

            //提交审核
            sub(){
                if(this.input<100){
                    this.isShow=true;
                    this.case(this.$t('low_money'));
                }else if(this.input4==''){
                    this.isShow=true;
                    this.case(this.$t('get_code2'));
                }else{
                    let a;
                    if(this.money1=='BTC'){
                        a=1
                    }else if(this.money1=='ETH'){
                        a=2
                    }else{
                        a=3
                    }
                    let data={
                        amount:this.input,
                        type:2,
                        receiptType:a,
                        code:this.input4,
                        codeType:this.radio
                    }
                    this.ajaxE('/assets/withdraw',data,'post',this.result)
                }
            },
            result(res){
                if(res.data.code==0){
                    this.isShow=true;
                    this.case(this.$t('Gold_sure'));
                    this.input='';
                    this.input4='';
                    this.input1=0;
                    this.getM();
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            }

        },
        watch:{
            money1(val,old){
                if(val=='BTC'){
                    this.rate=1/this.list2[0].price
                    this.input1=parseFloat(this.input*this.rate).toFixed(4)
                }else if(val=='ETH'){
                    this.rate=1/this.list2[1].price
                    this.input1=parseFloat(this.input*this.rate).toFixed(4)
                }else{
                    this.rate=1;
                    this.input1=this.input*this.rate;
                }
            },
            input(val,old){
                if(val==''){
                    this.input1=0
                }else{
                    if(this.rate==1){
                        this.input1=val*this.rate
                    }else{
                        this.input1=parseFloat(val*this.rate).toFixed(4);
                    }
                }
            },
            radio(val,old){
                if(this.radio=='1'){
                    this.input3=this.list3.mobile
                }else{
                    this.input3=this.list3.email
                }
            }
        }
    }
</script>

<style scoped>
@import "../../assets/css/gold.css";
.from_group label+label{
    width: 60px;
}
.from_group label+label+label{
    width: 100px;
}
</style>
