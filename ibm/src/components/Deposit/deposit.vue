<template>
    <div class="page_box">
        <!--弹出-->
        <div class="alert_code" v-if="alert==2">
            <div class="alert_con">
                <div class="a_close" @click="alert=1">×</div>
                <div class="alert_title">
                    <h1>{{$t('Deposit_pay')}}{{value2}}：<span>{{c_value}}</span></h1>
                    <h1>{{$t('Deposit_pay1')}}<span> {{c_usd}}</span></h1>
                </div>
                <div class="c_img">
                    <img :src="erCode" alt="">
                </div>
                <div class="c_footer">
                    <div class="c_top">
                        <span>{{value2}}</span>
                        <span>{{c_value}}</span>
                    </div>
                    <div class="c_top">
                        <span @click="doCopy()">{{$t('page_copy')}}</span>
                        <span id = "inviteCode"><b v-bind:class="{color:c==2}">{{c_adress}}</b></span>
                    </div>
                </div>
            </div>
        </div>


        <div class="deposit_title">
            <h1>{{$t('home_menu5')}}</h1>
        </div>
        <div class="deposit_con">
            <div class="deposit_con_title">
                <h1>{{$t('pay_way5')}}</h1>
            </div>
            <div class="deposit_sel">
                <div @click="type='BTC'">
                    <b></b>
                    <div>
                        <h1>{{$t('bit')}}</h1>
                        <p>Bitcoin</p>
                    </div>
                    <i v-if="type=='BTC'"></i>
                </div>
                <div @click="type='ETH'">
                    <b></b>
                    <div>
                        <h1>{{$t('eth')}}</h1>
                        <p>Ether</p>
                    </div>
                    <i v-if="type=='ETH'"></i>
                </div>
                <div @click="type='USDT'">
                    <b></b>
                    <div>
                        <h1>{{$t('usdt')}}</h1>
                        <p>USDT</p>
                    </div>
                    <i v-if="type=='USDT'"></i>
                </div>
            </div>
            <div class="deposit_zf">
                <h1>{{$t('select_usd')}}</h1>
                <el-select v-model="money" @change="gaib">
                    <el-option
                        v-for="item in list1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <h2>{{$t('play_usd')}}：<span>{{money1}}</span></h2>
                <h2 v-if="type!=1">{{$t('need_pay')}}{{money_type}}：<span>{{money2}}</span></h2>
                <div @click="sure()" class="de_btn">{{$t('please_pay')}}</div>
            </div>
            <div class="explain">
                <h1>
                    <b></b>
                    <span>{{$t('deposite_suct')}}</span>
                </h1>
                <p>{{$t('deposite_suct1')}} <br> {{$t('deposite_suct2')}}</p>
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
        name: "deposit",
        data(){
            return {
                isShow:false,
                msg:'',
                type:1,
                money:100,
                list1:[],
                list:[100,200,300,400,500,600,700,800,900,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000,30000,40000,50000,60000,70000,80000,90000,100000],
                money1:103,
                money_type:'BTC',
                money2:'',
                btc:'',
                eth:'',
                alert:1,
                c_value:'',
                c_usd:'',
                value2:'',
                erCode:'',
                c_adress:'',
                c:1,
            }
        },
        mounted(){
            this.list.forEach((f)=>{
                this.list1.push({label:f,value:f})
            });
            //获取汇率
            this.ajaxC('/system/exchangeRate',{},'get',this.getR)
        },
        methods:{
            gaib(){
                this.money1=this.money*1.03;
                if(this.type=='BTC'){
                    this.money2=(parseFloat(1/this.btc)*this.money*1.03).toFixed(4);
                }else if(this.type=='ETH'){
                    this.money2=(parseFloat(1/this.eth)*this.money*1.03).toFixed(4);
                }else{
                    this.money2=this.money1;
                }
            },
            getR(res){
                this.btc=JSON.parse(res.data.data)[0].price;
                this.eth=JSON.parse(res.data.data)[1].price;
            },

            sure(){
                if(this.type==1){
                    this.case(this.$t('please_select'))
                }else{
                    if(this.type=='BTC'){
                        let data={
                            usd:this.money1,
                            rate:'',
                            from:this.type,
                            to:this.btc,
                            money:this.money2
                        }
                        this.ajaxE('/tra/mat',data,'post',this.ok)
                    }else if(this.type=='ETH'){
                        let data={
                            usd:this.money1,
                            rate:'',
                            from:this.type,
                            to:this.eth,
                            money:this.money2
                        }
                        this.ajaxE('/tra/mat',data,'post',this.ok)
                    }else{
                        let data={
                            usd:this.money1,
                            rate:'',
                            from:this.type,
                            to:1,
                            money:this.money2
                        }
                        this.ajaxE('/tra/mat',data,'post',this.ok)
                    }
                }
            },
            ok(res){
                console.log(res);
            },

            //复制
            doCopy(){
                var Url2 = document.getElementById("inviteCode").innerText;
                var oInput = document.createElement("input");
                oInput.value = Url2;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = "oInput";
                oInput.style.display = "none";
                this.isShow=true;
                this.case(this.$t('page_copy_success'));
                this.c=2;
                var the=this;
                setTimeout(function () {
                    the.c=1;
                },1600)
            },
        },
        watch:{
            type(val,old){
                if(val=='BTC'){
                    this.money2=(parseFloat(1/this.btc)*this.money*1.03).toFixed(4);
                }else if(val=='ETH'){
                    this.money2=(parseFloat(1/this.eth)*this.money*1.03).toFixed(4);
                }else{
                    this.money2=this.money1;
                }
            }
        }
    }
</script>

<style scoped>
@import "../../assets/css/deposit.css";
</style>
