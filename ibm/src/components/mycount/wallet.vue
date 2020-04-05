<template>
    <div class="page_box">
        <div class="wallet_title">
            <h1>{{$t('home_menu2_2')}}</h1>
        </div>
        <div class="wallet_con">
            <div class="from_group">
                <label for="#">{{$t('btc_adress')}}</label>
                <el-input v-if="status==1"
                    :placeholder="$t('please_btc')"
                    v-model="input"
                    clearable>
                </el-input>
                <span v-if="status==2">{{input}}</span>
            </div>
            <div class="from_group">
                <label for="#">{{$t('eth_adress')}}</label>
                <el-input
                    v-if="status==1"
                    :placeholder="$t('please_eth')"
                    v-model="input1"
                    clearable>
                </el-input>
                <span v-if="status==2">{{input1}}</span>
            </div>
            <div class="from_group">
                <label for="#">{{$t('ustd_adress')}}</label>
                <el-input
                    v-if="status==1"
                    :placeholder="$t('please_usdt')"
                    v-model="input2"
                    clearable>
                </el-input>
                <span v-if="status==2">{{input2}}</span>
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
                    v-if="status==1"
                    :placeholder="$t('phone1')"
                    v-model="input3"
                    :disabled="true">
                </el-input>
                <span v-if="status==2">{{input3}}</span>
            </div>
            <div class="from_group" v-if="status==1">
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
            <div class="from_group from_group1" v-if="status==1">
                <label for="#"></label>
                <strong @click="sub()">{{$t('bank_sure')}}</strong>
            </div>
            <div>
                <h1>{{$t('note')}}：</h1>
                <p>{{$t('note_1')}}</p>
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
                code:1,
                num1:60,
                isShow:false,
                msg:'',
                radio:'1',
                status:1,
                val:'',
            }
        },
        mounted(){

            //获取用户信息
            this.ajaxC('/user/getUserInfo',{},'get',this.ok)

        },
        methods:{
            //获取用户信息
            ok(res){
                if(res.data.code==0){
                    this.list=res.data.data.user;
                    this.input=res.data.data.card.btc;
                    this.input1=res.data.data.card.eth;
                    this.input2=res.data.data.card.usdt;
                    this.input3=res.data.data.user.mobile;
                    if(res.data.data.card.btc === undefined || res.data.data.card.btc==='' || res.data.data.card.btc==null || res.data.data.card.eth === undefined || res.data.data.card.eth==='' || res.data.data.card.eth==null || res.data.data.card.usdt === undefined || res.data.data.card.usdt===''|| res.data.data.card.usdt==null){
                        this.status=1
                    }else{
                        this.status=2
                    }
                }else if(res.data.code==4){
                    this.isShow=true;
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
                }else{
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            },

            sub(){
                if(this.input4==''){
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
                            btc:this.input,
                            eth:this.input1,
                            usdt:this.input2,
                            code:this.input4,
                            type:this.radio,
                            securityPassword:this.val,
                        }
                        this.ajaxE('/user/updateUserInfos',data,'post',this.sup)
                    })
                }
            },
            sup(res){
                if(res.data.code==0){
                    this.isShow=true;
                    this.case(this.$t('Gold_sure'));
                    this.ajaxC('/user/getUserInfo',{},'get',this.ok)
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases(this.$t('login_wrong'));
                }else if(res.data.code==26){
                    this.case(this.$t(res.data.code));
                }else{
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            },
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
.from_group label{
    width: 100px;
}
.from_group label+label{
    width: 60px;
}
.from_group label+label+label{
    width: 100px;
}
.wallet_con h1{
    font-size: 14px;
    font-family:Source Han Sans CN;
}
.wallet_con p{
    font-size: 12px;
    margin-top: 6px;
}
</style>
