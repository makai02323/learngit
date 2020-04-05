<template>
    <div class="page_box">
        <div class="wallet_title">
            <h1>{{$t('home_menu2_5')}}</h1>
        </div>
        <div class="wallet_con phone_con">
            <div class="from_group">
                <label for="#">{{$t('curr_phone')}}</label>
                <el-input
                    :placeholder="$t('forget_phone')"
                    v-model="input3"
                    :disabled="true">
                </el-input>
            </div>
            <!--<div class="from_group">-->
                <!--<label for="#">账号密码</label>-->
                <!--<el-input-->
                    <!--placeholder="请输入新密码"-->
                    <!--v-model="input2"-->
                    <!--show-password-->
                    <!--clearable>-->
                <!--</el-input>-->
            <!--</div>-->
            <!--<div class="from_group">-->
                <!--<label for="">获取验证码方式</label> <br>-->
                <!--<el-radio v-model="radio" label="1">手机短信</el-radio>-->
                <!--<el-radio v-model="radio" label="2">邮箱</el-radio>-->
            <!--</div>-->
            <!--<div class="from_group" v-if="radio==2">-->
                <!--<label v-if="radio==1" for="#">当前手机号</label>-->
                <!--<label v-if="radio==2" for="#">当前邮箱</label>-->
                <!--<el-input-->
                    <!--placeholder="手机号"-->
                    <!--v-model="input6"-->
                    <!--:disabled="true">-->
                <!--</el-input>-->
            <!--</div>-->
            <div class="from_group">
                <!--<label v-if="radio==1" for="#">当前手机号验证码</label>-->
                <!--<label v-if="radio==2" for="#">当前邮箱验证码</label>-->
                <label for="#">{{$t('curr_phone_code')}}</label>
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
            <div class="from_group">
                <label for="#">{{$t('new_phone')}}</label>
                <div class="q_s">
                    <el-select v-model="forget_sel">
                        <el-option
                            v-for="item in list1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input
                        :placeholder="$t('please_new_phone')"
                        v-model="input1"
                        clearable>
                    </el-input>
                </div>
            </div>
            <div class="from_group">
                <label for="#">{{$t('new_code')}}</label>
                <span>
                    <el-input
                        :placeholder="$t('verification_code')"
                        v-model="input5"
                    >
                    </el-input>
                    <b v-show="code1==1" @click="getCode1()">{{$t('get_code')}}</b>
                    <b v-show="code1==2">{{num}}S</b>
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
                input5:'',
                input6:'',
                isShow:false,
                msg:'',
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
                num1:60,
                code1:1,
                num:60,
                radio:"1",
                val:'',
            }
        },
        mounted(){
            this.getM();

        },
        methods:{
            getM(){
                //获取个人信息
                this.ajaxC('/user/getUserInfo',{},'get',this.infor);
            },
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
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:1},'get',this.getP2)
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


            getCode1(){
                if(this.input1==''){
                    this.isShow=true;
                    this.case(this.$t('new_phone1'))
                }else{
                    this.ajaxE('/verification/sendCode',{key:this.forget_sel+this.input1,type:1},'get',this.getP1)
                }
            },
            getP1(res){
                if(res.data.code==0){
                    this.isShow=true;
                    this.case(this.$t('get_code1'));
                    this.code1=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num--;
                        if(the.num<=0){
                            the.num=60;
                            the.code1=1;
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

            sub(){
                if(this.input4==''){
                    this.isShow=true;
                    this.case(this.$t('currt_phone_code'))
                }else if(this.input1==''){
                    this.isShow=true;
                    this.case(this.$t('new_phone1'))
                }else if(this.input5==''){
                    this.isShow=true;
                    this.case(this.$t('new_code_zero'))
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
                            newMobile:this.forget_sel+this.input1,
                            code:this.input4,
                            newCode:this.input5,
                            type:this.radio,
                            securityPassword:this.val,
                        }
                        this.ajaxE('/user/updateMobile',data,'post',this.sup)
                    })
                }
            },
            sup(res){
                if(res.data.code==0){
                    this.input1='';
                    this.input5='';
                    this.input4='';
                    this.case(this.$t('Gold_sure1'));
                    this.getM();
                }else if(res.data.code==26){
                    this.case(this.$t(res.data.code));
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            },
        },
        watch:{
            radio(val,old){
                if(this.radio=='1'){

                }else{
                    this.input6=this.list.email
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/wallet.css";
    .from_group label{
        width: 120px;
    }
    .from_group br{
        display: none;
    }
    .from_group label+br+label{
        width: 60px;
    }
    .from_group label+br+label+label{
        width: 100px;
    }
    .q_s{
        display: inline-block;
    }
    @media (max-width:480px) {
        .wallet_con .from_group:nth-child(2) .el-input{
            width: 150px;
        }
        .from_group br{
            display: block;
        }
        .q_s{
            display: flex;
            width: 80%;
        }
    }
</style>

