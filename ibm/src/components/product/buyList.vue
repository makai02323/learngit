<template>
    <div class="page_box" @click="hide($event)">
        <div class="cash_title">
            <h1 v-if="o==1">{{$t('home_menu7_2')}}</h1>
            <h1 v-if="o==2">{{$t('mt4_open')}}</h1>
            <h1 v-if="o==3">{{$t('mt4_money')}}</h1>
        </div>
        <div v-if="o==1">
            <div class="cash_con">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            :label="$t('buy_time')">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            :label="$t('Matching_name')">
                        </el-table-column>
                        <el-table-column
                            prop="ID"
                            :label="$t('Matching_money')">
                        </el-table-column>
                        <el-table-column
                            prop="yl"
                            :label="$t('Expected_monthly')">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            :label="$t('MT4_acount')">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            :label="$t('MT4_password')">
                        </el-table-column>
                        <el-table-column
                            prop="bankName"
                            :label="$t('Mt4_money')">
                        </el-table-column>
                        <el-table-column
                            prop="money"
                            :label="$t('MT4_ownMoney')">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            :label="$t('MT4_oldMoney')">
                        </el-table-column>
                        <el-table-column
                            prop="sea"
                            :label="$t('MT4_status')">
                        </el-table-column>
                        <el-table-column :label="$t('need_do')" width="400">
                            <template slot-scope="scope" v-if="scope.row.suo==1">
                                <!--<div class="caozuo" v-if="scope.row.suo==1" @click="type1=scope.$index,ha($event)">-->
                                    <!--更多<b></b>-->
                                    <!--<ul id="paanel" v-if="type1==scope.$index">-->
                                        <!--<li @click="ht(item.id)">合同</li>-->
                                        <!--<li @click="reRade()">刷新</li>-->
                                        <!--<li @click="goCash1()">提现</li>-->
                                        <!--<li @click="upgrade(scope.row)">升级</li>-->
                                        <!--<li @click="goJy(scope.row)">解约</li>-->
                                    <!--</ul>-->
                                <!--</div>-->
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="ht(scope.row)">{{$t('contract')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="success"
                                    @click="reRade()">{{$t('new_do')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="goCash1(scope.row)">{{$t('reflect')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="warning"
                                    @click="upgrade(scope.row)">{{$t('next')}}</el-button>
                                <el-button
                                    size="mini"
                                    @click="goJy(scope.row)">{{$t('open')}}</el-button>
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
        </div>
        <div v-if="o==2">
            <div class="wallet_con">
                <div class="from_group">
                    <label for="">{{$t('Matching_name')}}</label>
                    <span>{{input}}</span>
                </div>
                <div class="from_group">
                    <label for="">{{$t('Matching_money')}}</label>
                    <span>{{input1}}</span>
                </div>
                <div class="from_group">
                    <label for="">{{$t('MT4_acount')}}</label>
                    <span>{{input2}}</span>
                </div>
                <div class="from_group">
                    <label for="">{{$t('MT4_password')}}</label>
                    <span>{{input3}}</span>
                </div>
                <div class="from_group">
                    <label for="">{{$t('code_type')}}</label>
                    <el-radio v-model="radio" label="1">{{$t('phone_note')}}</el-radio>
                    <el-radio v-model="radio" label="2">{{$t('user_email')}}</el-radio>
                </div>
                <div class="from_group">
                    <label v-if="radio==1" for="#">{{$t('curr_phone')}}</label>
                    <label v-if="radio==2" for="#">{{$t('curr_email')}}</label>
                    <span>{{input4}}</span>
                </div>
                <div class="from_group">
                    <label for="#">{{$t('pass_code')}}</label>
                    <span>
                        <el-input
                            :placeholder="$t('verification_code')"
                            v-model="input5"
                        >
                        </el-input>
                        <b v-show="code==1" @click="getCode()">{{$t('get_code')}}</b>
                        <b v-show="code==2">{{num1}}S</b>
                    </span>
                </div>
                <div class="from_group from_group1">
                    <label for="#"></label>
                    <strong @click="sub()">{{$t('bank_sure')}}</strong>
                    <strong class="strong_1" @click="goBack()">{{$t('home_back')}}</strong>
                </div>
                <div>
                    <h5>{{$t('note')}}：</h5>
                    <p>{{$t('note_2')}}</p>
                </div>
            </div>
        </div>
        <div v-if="o==3">
            <div class="wallet_con">
                <div class="from_group">
                    <label for="">{{$t('moneys')}}</label>
                    <span>{{input6}}</span>
                </div>
                <div class="from_group">
                    <label for="">{{$t('moneys1')}}</label>
                    <el-input
                        :placeholder="$t('moneys1')"
                        v-model="input7"
                        clearable>
                    </el-input>
                </div>
                <div class="from_group">
                    <label for=""></label>
                    <el-button type="primary" @click="cash_sub()">{{$t('bank_sure')}}</el-button>
                    <el-button @click="goBack()">{{$t('home_back')}}</el-button>
                </div>
                <h1>{{$t('note')}}：</h1>
                <p>{{$t('note_3')}}</p>
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
        name: "cash",
        inject: ['reload'],//点击跳转的时候刷新
        data(){
            return {
                sel:true,
                value1:'',
                value2:'',
                input:'',
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:'',
                input7:'',
                list:[],
                list1:[],
                type:1,
                type1:-1,
                currentPage:1,
                currentCount:10,
                currentPage1:1,
                currentCount1:10,
                total:0,
                total1:0,
                isShow:false,
                msg:'',
                a:'',
                page:1,
                o:1,
                code:1,
                num1:60,
                id:'',
                multipleSelection: [],
                tableData:[],
                money:'',
                b:'',
                mat_type:1,
                val:'',
                radio:'1',
                list2:{},
            }
        },
        mounted(){
            this.getM();

            //获取个人信息
            this.ajaxC('/user/getUserInfo',{},'get',this.infor);

        },
        methods:{

            //个人信息
            infor(res){
                if(res.data.code==0){
                    this.list2=res.data.data.user;
                    this.input4=this.list2.mobile
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            //返回
            goBack(){
                this.o=1;
                this.input6='';
                this.getM();
            },



            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //解约
            goJy(a){
                this.o=2;
                this.id=a.id;
                this.input=a.time;
                this.input1=this.moneyToFloat(a.ID);
                this.input2=a.name;
                this.input3=a.phone;
            },

            //确认解约
            sub(){
               if(this.input5==''){
                   this.case(this.$t('get_code2'))
               } else{
                   this.$prompt(this.$t('two_password'),this.$t('prompt'), {
                       confirmButtonText: this.$t('go_sure'),
                       inputValidator:val=>{
                           this.val=val;
                       },
                       cancelButtonText: this.$t('cancel'),
                       inputType:'password'
                   }).then(({ value }) => {
                       let data={
                           mt4Id:this.id,
                           code:this.input5,
                           securityPassword:this.val,
                           type:this.radio
                       }
                       this.ajaxE('/assets/withdrawMt4',data,'post',this.ok_2)
                   })
               }
            },
            ok_2(res){
                if(res.data.code==0){
                    this.case(this.$t('open_success'));
                    let the=this;
                    setTimeout(function () {
                        the.reload();
                    },1400)
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }else if(res.data.code==24){
                    this.$confirm(this.$t(24), this.$t('prompt'), {
                        confirmButtonText: this.$t('go_sure'),
                        type: 'warning',
                        center: true
                    }).then(() => {
                        sessionStorage.setItem('type',2);
                        sessionStorage.setItem('type1',1);
                        sessionStorage.setItem('style',2);
                        sessionStorage.setItem('up',2);
                        this.reload();
                        this.$router.push('/mycount/infor');
                    })
                }else if(res.data.code==26){
                    this.$confirm(this.$t('two_password'), this.$t('prompt'), {
                        confirmButtonText: this.$t('go_sure'),
                        type: 'warning',
                        center: true
                    }).then(() => {
                        sessionStorage.setItem('type',2);
                        sessionStorage.setItem('type1',4);
                        sessionStorage.setItem('style',2);
                        sessionStorage.setItem('up',2);
                        this.reload();
                        this.$router.push('/mycount/2_password');
                    })
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //解约获取验证码
            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{contactNumber:this.input4,type:1},'get',this.getP)
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
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            },

            //点击任意地方'更多'没有
            hide(event){
                var ud=document.getElementById('paanel');
                if(ud){
                    if(!ud.contains(event.target)){
                        this.type1=-1;
                    }
                }
            },
            ha(event){
                event.stopPropagation();
            },

            //刷新
            reRade(){
                this.reload();
            },


            //提现按钮
            goCash1(a){
                this.input6=a.money;
                this.o=3;
                this.id=a.id;
            },
            //提交提现
            cash_sub(){
                this.$prompt(this.$t('two_password'), this.$t('prompt'), {
                    confirmButtonText: this.$t('go_sure'),
                    inputValidator:val=>{
                        this.val=val;
                    },
                    cancelButtonText: this.$t('cancel'),
                }).then(({ value }) => {
                    let data={
                        amount:this.input6,
                        mt4Id:this.id,
                    }
                    this.ajaxE('/assets/transferAccountMt4',data,'post',this.sub1)
                })
            },
            sub1(res){
                if(res.data.code==0){
                    this.input6='';
                    this.case(this.$t('Gold_sure'));
                    this.ajaxC('/user/getUserInfo',{},'get',this.infor);
                }else if(res.data.code==26){
                    this.case(this.$t(res.data.code));
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //升级配套
            upgrade(a){
                this.money=a.ID;
                this.b=a.id;
                sessionStorage.setItem('type',7);
                sessionStorage.setItem('type1',14);
                sessionStorage.setItem('style',7);
                sessionStorage.setItem('up',7);
                this.reload();
                this.$router.push('/product/buyMating?type=3&money='+this.money+'&id='+this.b);
            },

            getM(){
                this.type=1;
                this.ajaxC('/matching/getUserMt4s',{pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.create_time,time:f.mat_name,ID:f.money,yl:parseFloat(f.mtMin*100).toFixed(0)+'%~'+parseFloat(f.mtMax*100).toFixed(0)+'%',name:f.mt4_user,phone:f.password,bankName
                                :f.mt4_money===null?'--':f.mt4_money,money:f.mt4_out==null?'0':f.mt4_out,address:f.mt4_get,sea:f.status2==0?this.$t('normal'):this.$t('unnormal'),id:f.id,suo:f.status2==0?1:2})
                    });
                    this.total=res.data.data.total;
                    this.type1=-1;
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'))
                }
            },

            handleSizeChange(val) {
                this.currentCount=val;
                this.getM();
            },
            handleCurrentChange(val) {
                this.currentPage=val;
                this.page=val;
                this.getM();
            },

            ht(a){
                let data={
                    lang:1,
                    mt4Id:a.id,
                }
                this.ajaxC('/system/hetong',data,'get',this.ok1)
            },
            ok1(res){
                //location.href=res.data.data;
                window.open(res.data.data,'top');
            }

        },
        watch:{
            radio(val,old){
                if(this.radio=='1'){
                    this.input4=this.list2.mobile
                }else{
                    this.input4=this.list2.email
                }
            }
        }
    }
</script>

<style scoped>
    @import "../../assets/css/cash.css";
    @import "../../assets/css/buyList.css";
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
    .from_group strong{
        width: 200px;
    }
    .from_group .strong_1{
        width: 80px;
        background-color: transparent;
        border: 1px solid rgba(50,168,238,1);
        color: rgba(50,168,238,1);
    }
    .wallet_con h5{
        font-family:Source Han Sans CN;
    }
    .wallet_con p{
        font-size: 12px;
    }
    @media (max-width: 1650px) {
        .cash_con{
            overflow-x: visible;
        }
        table{
            width: 100%;
        }
    }
    @media (max-width: 1000px) {
        /*.cash_con{*/
            /*overflow-x: scroll;*/
        /*}*/
        /*table{*/
            /*width: 700px;*/
        /*}*/
        /*::-webkit-scrollbar {*/
            /*width: 100%;*/
            /*height: 6px;*/
        /*}*/
    }
</style>
