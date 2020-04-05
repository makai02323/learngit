<template>
    <div class="page_box">
        <div class="wallet_title">
            <h1>{{$t('admin_7')}}</h1>
        </div>
        <div class="wallet_con">
            <div class="tran_top">
                <div @click="type=3">
                    <div class="tran_con">
                        <h1>注册钱包</h1>
                        <h2>${{register_wallet}}</h2>
                    </div>
                    <b v-if="type==3"></b>
                </div>
                <div @click="type=1">
                    <div class="tran_con">
                        <h1>现金钱包</h1>
                        <h2>${{register_cash}}</h2>
                    </div>
                    <b v-if="type==1"></b>
                </div>
                <div @click="type=2">
                    <div class="tran_con">
                        <h1>电子钱包</h1>
                        <h2>${{el_cash}}</h2>
                    </div>
                    <b v-if="type==2"></b>
                </div>
            </div>
            <div class="from_group">
                <label for="#">转入账号ID</label>
                <el-input
                    placeholder="请输入转入账号ID"
                    v-model="input"
                    @blur="onInputBlur"
                    clearable>
                </el-input>
            </div>
            <div class="from_group">
                <label for="#">转入用户名</label>
                <p v-if="type1==1" @click="polling()">查询</p>
                <div v-if="type1==2">{{user_name}}</div>
            </div>
            <div class="from_group">
                <label for="#">转账金额</label>
                <el-input
                    placeholder="请输入转账金额"
                    v-model="input2"
                    clearable>
                </el-input>
            </div>
            <div class="from_group">
                <label for="#">中文备注</label>
                <el-input
                    placeholder="中文备注"
                    v-model="input3"
                    clearable>
                </el-input>
            </div>
            <div class="from_group">
                <label for="#">英文备注</label>
                <el-input
                    placeholder="英文备注"
                    v-model="input4"
                    clearable>
                </el-input>
            </div>
            <div class="from_group from_group1">
                <label for="#"></label>
                <strong @click="sub()">提交</strong>
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
                register_wallet:'',
                type:3,
                type1:1,
                register_cash:'',
                user_name:'',
                num1:60,
                isShow:false,
                msg:'',
                cunchu:''
            }
        },
        mounted(){

            this.getM();
        },
        methods:{
            getM(){
                this.ajaxC('/assets/getUserAssets',{},'get',this.getCash);
            },
            getCash(res){
                if(res.data.code==0){
                    this.register_wallet=this.moneyToFloat(res.data.data.rp);
                    this.register_cash=this.moneyToFloat(res.data.data.cp);
                    this.el_cash=this.moneyToFloat(res.data.data.ap);
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'));
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
                if(res.data.code==0 && res.data.data !== undefined){
                    this.user_name=res.data.data.username;
                    this.type1=2;
                }else if(res.data.data === undefined){
                    this.case(this.$t('nouse_id'));
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'));
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            sub(){
                if(this.type1==1){
                    this.isShow=true;
                    this.case(this.$t('please_ID_user'));
                }else{
                    let data={
                        walletType:this.type,
                        transferMoney:this.input2,
                        toUserId:this.input,
                        Details:this.input3,
                        detailsEnglish:this.input4,
                    }
                    this.ajaxE('/assets/supertransferAccounts',data,'post',this.ok)
                }
            },
            ok(res){
                if(res.data.code==0){
                    this.case(this.$t('success_transfer'));
                    this.input='';
                    this.type1=1;
                    this.input3='';
                    this.input2='';
                    this.input4='';
                    this.getM();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'));
                }else{
                    this.case(this.$t(res.data.code));
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/wallet.css";
    @import "../../assets/css/transfer_accounts.css";
    .from_group label{
        width: 78px;
    }
    .tran_top>div:last-child {
        margin-left: 0;
    }
    .tran_top>div:nth-child(2) {
        margin: 0 20px;
    }
    @media (max-width: 480px) {
        .tran_top>div:nth-child(2) {
            margin: 30px 0 0;
        }
        .tran_top b{
            right: 10px;
        }
        .wallet_con p{
            margin-top: 0;
        }
        .from_group1{
            margin-top: 30px;
        }
    }
</style>

