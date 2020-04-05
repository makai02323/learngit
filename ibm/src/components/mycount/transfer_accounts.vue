<template>
    <div class="page_box">
        <div class="wallet_title">
            <h1>{{$t('home_menu2_6')}}</h1>
        </div>
        <div class="wallet_con">
            <div class="tran_top">
                <div @click="type=3">
                    <div class="tran_con">
                        <h1>{{$t('home_menu3_2')}}</h1>
                        <h2><span v-if="rp==1">$</span>{{register_wallet}}</h2>
                    </div>
                    <b v-if="type==3"></b>
                </div>
                <div @click="type=1">
                    <div class="tran_con">
                        <h1>{{$t('page_cp')}}</h1>
                        <h2><span v-if="cp==1">$</span>{{register_cash}}</h2>
                    </div>
                    <b v-if="type==1"></b>
                </div>
            </div>
            <div class="from_group">
                <label for="#">{{$t('transfer_account')}}</label>
                <el-input
                    :placeholder="$t('please_account')"
                    v-model="input"
                    @blur="onInputBlur"
                    clearable>
                </el-input>
            </div>
            <div class="from_group">
                <label for="#">{{$t('tramsfer_user')}}</label>
                <p v-if="type1==1" @click="polling()">{{$t('user_search')}}</p>
                <div v-if="type1==2">{{user_name}}</div>
            </div>
            <div class="from_group">
                <label for="#">{{$t('transfer_money')}}</label>
                <el-input
                    :placeholder="$t('please_trans_money')"
                    v-model="input2"
                    clearable>
                </el-input>
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
                    :placeholder="$t('forget_phone')"
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
                <label for="#"></label>
                <strong @click="sub()">{{$t('bank_sure')}}</strong>
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
        name: "wallet",
        data(){
            return {
                input:'',
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                list:{},
                forget_sel:'+86',
                list1:[
                    {
                        value: '+86',
                        label: '+86'
                    },{
                        value: '+60',
                        label: '+60'
                    },{
                        value: '+63',
                        label: '+63'
                    },
                    {
                        value: '+001',
                        label: '+001'
                    },{
                        value: '+886',
                        label: '+886'
                    },
                    {
                        value: '+852',
                        label: '+852'
                    },{
                        value: '+33',
                        label: '+33'
                    },{
                        value: '+44',
                        label: '+44'
                    },{
                        value: '+31',
                        label: '+31'
                    },
                    {
                        value: '+46',
                        label: '+46'
                    },{
                        value: '+48',
                        label: '+48'
                    },{
                        value: '+7',
                        label: '+7'
                    },{
                        value: '+41',
                        label: '+41'
                    },
                    {
                        value: '+349',
                        label: '+349'
                    },{
                        value: '+39',
                        label: '+39'
                    },{
                        value: '+45',
                        label: '+45'
                    },{
                        value: '+81',
                        label: '+81'
                    },{
                        value: '+82',
                        label: '+82'
                    },{
                        value: '+62',
                        label: '+62'
                    },{
                        value: '+34',
                        label: '+34'
                    }
                ],
                code:1,
                register_wallet:0,
                type:3,
                type1:1,
                register_cash:0,
                user_name:'',
                num1:60,
                isShow:false,
                msg:'',
                cunchu:'',
                radio:'1',
                val:'',
                rp:2,
                cp:2,
            }
        },
        mounted(){
            //获取个人信息
            this.ajaxC('/user/getUserInfo',{},'get',this.infor);

            this.getM();
        },
        methods:{
            //个人信息
            infor(res){
                if(res.data.code==0){
                    this.list=res.data.data.user;
                    this.input3=this.list.mobile
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            getM(){
                this.ajaxC('/assets/getUserAssets',{},'get',this.getCash);
            },
            getCash(res){
                if(res.data.code==0){
                    if(res.data.data.rp==0){
                        this.rp=2
                    }else{
                        this.rp=1
                        this.register_wallet=this.moneyToFloat(res.data.data.rp);
                    }
                    if(res.data.data.cp==0){
                        this.cp=2
                    }else{
                        this.cp=1
                        this.register_cash=this.moneyToFloat(res.data.data.cp);
                    }
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },
            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{contactNumber:this.input3,type:this.radio},'get',this.getP)
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
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            onInputBlur(){
                if(this.input != this.cunchu){
                    this.type1=1;
                }
            },

            polling(){
                this.cunchu=this.input;
                this.ajaxC('/user/selectUserId',{userId:this.input},'get',this.getID)
            },
            getID(res){
                    this.user_name=res.data.data.username;
                    this.type1=2;
            },

            sub(){
                if(this.type1==1){
                    this.isShow=true;
                    this.case(this.$t('please_ID_user'));
                }else if(this.input2<0 || this.input2==''){
                    this.isShow=true;
                    this.case(this.$t('transfer_moneycount'));
                }else if(this.input4==''){
                    this.isShow=true;
                    this.case(this.$t('get_code2'));
                }else{
                    this.$prompt(this.$t('two_password'),this.$t('prompt'), {
                        confirmButtonText: this.$t('go_sure'),
                        inputValidator:val=>{
                            this.val=val;
                        },
                        cancelButtonText: this.$t('cancel'),
                        inputType:'password'
                    }).then(({ value }) => {
                        let data={
                            walletType:this.type,
                            transferMoney:this.input2,
                            toUserId:this.input,
                            code:this.input4,
                            type:this.radio,
                            securityPassword:this.val,
                        }
                        this.ajaxE('/assets/transferAccounts',data,'post',this.ok)
                    })
                 }
            },
            ok(res){
                if(res.data.code==0){
                    this.isShow=true;
                    this.case(this.$t('success_transfer'));
                    this.getM();
                    this.input='';
                    this.type1=1;
                    this.input2='';
                    this.input4='';
                }else if(res.data.code==26){
                    this.case(this.$t(res.data.code));
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.case(this.$t(res.data.code));
                }
            }
        },
        watch:{
            radio(val,old){
                if(this.radio=='1'){
                    this.input3=this.list.mobile
                }else{
                    this.input3=this.list.email
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/wallet.css";
    @import "../../assets/css/transfer_accounts.css";
    .from_group label{
        width: 100px;
    }
    .from_group label+label{
        width: 60px;
    }
    .from_group label+label+label{
        width: 100px;
    }
    .from_group p{
        margin-top: 0;
    }
</style>

