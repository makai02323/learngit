<template>
    <div class="page_box">
        <div class="wallet_title">
            <h1>{{$t('two_pass')}}</h1>
        </div>
        <div class="wallet_con">
            <div class="from_group">
                <label for="#">{{$t('two_new_pass')}}</label>
                <el-input
                    :placeholder="$t('register_pass1')"
                    v-model="input1"
                    show-password
                    clearable>
                </el-input>
            </div>
            <div class="from_group">
                <label for="#">{{$t('sure_two_pass')}}</label>
                <el-input
                    :placeholder="$t('register_pass1')"
                    v-model="input2"
                    show-password
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
                code:1,
                num1:60,
                isShow:false,
                msg:'',
                radio:'1',
            }
        },
        mounted(){
            //获取个人信息
            this.ajaxC('/user/getUserInfo',{},'get',this.infor);
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

            sub(){
                if(this.input1==''){
                    this.isShow=true;
                    this.case(this.$t('new_zero'));
                }else if(this.input2==''){
                    this.isShow=true;
                    this.case(this.$t('sure_zero_p'));
                }else if(this.input4==''){
                    this.isShow=true;
                    this.case(this.$t('get_code2'));
                }else if(this.input1 !== this.input2){
                    this.isShow=true;
                    this.case(this.$t('pass_same'));
                }else{
                    let data={
                        newPassword:this.input1,
                        type:3,
                        code:this.input4,
                        codeType:this.radio
                    }
                    this.ajaxE('/user/updatePassword',data,'post',this.ok1)
                }
            },
            ok1(res){
                if(res.data.code==0){
                    this.input1='';
                    this.input='';
                    this.input2='';
                    this.input4='';
                    this.case(this.$t('Gold_sure1'));
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
</style>

