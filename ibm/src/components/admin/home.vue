<template>
    <div class="home">
        <div class="home_top">
            <div class="home_logo">
                <img src="../../assets/images/home/home_logo.png" alt="">
                <b @click="not=!not"></b>
            </div>
            <div class="home_top_right">
                <div class="usename">
                    <span>{{$t('welcome')}}{{name}}</span>
                </div>
                <div class="home_exit" @click="exit()">
                    <b></b>
                    <span>{{$t('home_exit')}}</span>
                </div>
            </div>
        </div>
        <!--<div class="home_middle">-->
        <!--<div class="home_middle_left">-->
        <!--<div class="home_clock">上次登录: <span>{{clock}}</span></div>-->
        <!--</div>-->
        <!--<div class="home_middle_right">-->
        <!--<span v-show="exit1">伺服器日期和时间: {{time}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="home_bottom">
            <div class="home_left" v-show="not">
                <div class="menu" @mouseleave="style=20" :style="contentStyleObj">
                    <div class="home_name">
                        <h1>{{home_name}}</h1>
                        <p>ID:{{home_id}}</p>
                    </div>
                    <div class="box">
                        <!--style="cursor:no-drop "-->
                        <div class="menu_group" v-bind:class="{active:type==1 || style==1}" @click="type=1,type1=0,goPage(),not=show" @mouseenter="style=1" @mouseleave="style!=1">
                            <router-link to="/admin/page">
                                <img src="../../assets/images/home/home_menu_icon1.png" alt="">
                                <span>{{$t('admin_1')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==2 || style==2}" @click="type=2,type1=0,gohistory(),not=show" @mouseenter="style=2" @mouseleave="style!=2">
                            <router-link to="/admin/withdraw_history">
                                <img src="../../assets/images/home/home_menu_icon2.png" alt="">
                                <span>{{$t('admin_2')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==3 || style==3}" @click="type=3,type1=0,gohistory1(),not=show" @mouseenter="style=3" @mouseleave="style!=3">
                            <router-link to="/admin/recharge_history">
                                <img src="../../assets/images/home/home_menu_icon3.png" alt="">
                                <span>{{$t('admin_3')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==4 || style==4}" @click="type=4,type1=0,goRu(),not=show" @mouseenter="style=4" @mouseleave="style!=4">
                            <router-link to="/admin/net_fund">
                                <img src="../../assets/images/home/home_menu_icon4.png" alt="">
                                <span>{{$t('admin_4')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==5 || style==5}" @click="type=5,type1=0,goReport(),not=show" @mouseenter="style=5" @mouseleave="style!=5">
                            <router-link to="/admin/wallet_report">
                                <img src="../../assets/images/home/home_menu_icon5.png" alt="">
                                <span>{{$t('admin_5')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==6 || style==6}" @click="type=6,type1=0,goAudit(),not=show" @mouseenter="style=6" @mouseleave="style!=6">
                            <router-link to="/admin/withdraw_audit">
                                <img src="../../assets/images/home/home_menu_icon6.png" alt="">
                                <span>{{$t('admin_6')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==7 || style==7}" @click="type=7,type1=0,goTrans(),not=show" @mouseenter="style=7" @mouseleave="style!=7">
                            <router-link to="/admin/admin_transfer">
                                <img src="../../assets/images/home/home_menu_icon7.png" alt="">
                                <span>{{$t('admin_7')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==8 || style==8}" @click="type=8,type1=0,goList(),not=show" @mouseenter="style=8" @mouseleave="style!=8">
                            <router-link to="/admin/member_list">
                                <img src="../../assets/images/home/home_menu_icon8.png" alt="">
                                <span>{{$t('admin_8')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==9 || style==9}" @click="type=9,type1=0,goReport1(),not=show" @mouseenter="style=9" @mouseleave="style!=9">
                            <router-link to="/admin/product_report">
                                <img src="../../assets/images/home/home_menu_icon2.png" alt="">
                                <span>{{$t('admin_9')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==10 || style==10}" @click="type=10,type1=0,goFeedback(),not=show" @mouseenter="style=10" @mouseleave="style!=10">
                            <router-link to="/admin/admin_feedback">
                                <img src="../../assets/images/home/home_menu_icon3.png" alt="">
                                <span>{{$t('admin_10')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==11 || style==11}" @click="type=11,type1=0,goNotice(),not=show" @mouseenter="style=11" @mouseleave="style!=11">
                            <router-link to="/admin/notice_list">
                                <img src="../../assets/images/home/home_menu_icon4.png" alt="">
                                <span>{{$t('admin_11')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==12 || style==12}" @click="type=12,type1=0,goNews(),not=show" @mouseenter="style=12" @mouseleave="style!=12">
                            <router-link to="/admin/news_report">
                                <img src="../../assets/images/home/home_menu_icon5.png" alt="">
                                <span>{{$t('admin_12')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==13 || style==13}" @click="type=13,type1=0,goDest(),not=show" @mouseenter="style=13" @mouseleave="style!=13">
                            <router-link to="/admin/destroy_audit">
                                <img src="../../assets/images/home/home_menu_icon6.png" alt="">
                                <span>{{$t('admin_13')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==14 || style==14}" @click="type=14,type1=0,goAudit1(),not=show" @mouseenter="style=14" @mouseleave="style!=14">
                            <router-link to="/admin/unusual_audit">
                                <img src="../../assets/images/home/home_menu_icon7.png" alt="">
                                <span>{{$t('admin_14')}}</span>
                            </router-link>
                        </div>
                        <div class="menu_group" v-bind:class="{active:type==15 || style==15}" @click="type=15,type1=0,goRlist(),not=show" @mouseenter="style=15" @mouseleave="style!=15">
                            <router-link to="/admin/recommend_list">
                                <img src="../../assets/images/home/home_menu_icon8.png" alt="">
                                <span>{{$t('admin_15')}}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home_right">
                <!--<div class="home_right_top">-->
                <!--<div class="exit">-->
                <!--<i v-if="phone"></i>-->
                <!--<span v-show="exit2"></span>-->
                <!--<span @click="exit()">-->
                <!--<img src="../assets/images/log_out.png" alt="">-->
                <!--退出-->
                <!--</span>-->
                <!--</div>-->
                <!--</div>-->
                <div class="home_content" :style="contentStyleObj">
                    <router-view></router-view>
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
        name: "home",
        data(){
            return {
                isShow:false,
                msg:'',
                type:1,
                style:1,
                time:0,
                type1:0,
                not:true,
                exit1:true,
                exit2:true,
                phone:false,
                show:true,
                name:'',
                up:1,
                clock:'',
                list:{},
                home_name:'',
                home_id:'',
                contentStyleObj:{
                    height:''
                }
            }
        },
        methods:{
            //保存localStroge是为了刷新页面导航栏不回到首页
            exit(){
                this.ajaxC('/user/logout',{},'get',this.exits);
            },
            exits(res){
                this.$router.push('/admin/login');
                sessionStorage.removeItem('trans_user_userInfor');
            },
            goPage(){
                sessionStorage.setItem('type',1);
                sessionStorage.setItem('style',1);
            },
            gohistory(){
                sessionStorage.setItem('type',2);
                sessionStorage.setItem('style',2);
            },
            gohistory1(){
                sessionStorage.setItem('type',3);
                sessionStorage.setItem('style',3);
            },
            goRu(){
                sessionStorage.setItem('type',4);
                sessionStorage.setItem('style',4);
            },
            goReport(){
                sessionStorage.setItem('type',5);
                sessionStorage.setItem('style',5);
            },
            goAudit(){
                sessionStorage.setItem('type',6);
                sessionStorage.setItem('style',6);
            },
            goTrans(){
                sessionStorage.setItem('type',7);
                sessionStorage.setItem('style',7);
            },
            goList(){
                sessionStorage.setItem('type',8);
                sessionStorage.setItem('style',8);
            },
            goReport1(){
                sessionStorage.setItem('type',9);
                sessionStorage.setItem('style',9);
            },
            goFeedback(){
                sessionStorage.setItem('type',10);
                sessionStorage.setItem('style',10);
            },
            goNotice(){
                sessionStorage.setItem('type',11);
                sessionStorage.setItem('style',11);
            },
            goNews(){
                sessionStorage.setItem('type',12);
                sessionStorage.setItem('style',12);
            },
            goDest(){
                sessionStorage.setItem('type',13);
                sessionStorage.setItem('style',13);
            },
            goAudit1(){
                sessionStorage.setItem('type',14);
                sessionStorage.setItem('style',14);
            },
            goRlist(){
                sessionStorage.setItem('type',15);
                sessionStorage.setItem('style',15);
            },
            getHeight(){
                this.contentStyleObj.height=this.getViewportSize().height+'px';
            },
        },
        created(){
            this.type=sessionStorage.getItem('type');
            this.type1=sessionStorage.getItem('type1');
            this.style=sessionStorage.getItem('style');
            this.up=sessionStorage.getItem('up');
            if(this.type==undefined){
                this.type=1;
            }
        },
        mounted(){
            //为了从客户端返回到管理员重新存储
            sessionStorage.setItem('admin_infor',sessionStorage.getItem('trans_user_userInfor'));

            if(sessionStorage.getItem('trans_user_userInfor')==null){
                this.isShow=true;
                this.cases1(this.$t('no_login'));
            }

            this.list=JSON.parse(sessionStorage.getItem('trans_user_userInfor'));
            this.name=this.list.user.username;
            this.home_name=this.list.user.username;
            this.home_id=this.list.user.userId;
            //this.clock=this.myFormDate(new Date(this.list.lastTime));

            window.addEventListener('resize', this.getHeight);
            this.getHeight()
            // this.contentStyleObj.height=this.getViewportSize().height;

            //禁止浏览器后退
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', function () {
                history.pushState(null, null, document.URL);
            });

            this.time=this.myFormDate(new Date(new Date().getTime()));
            //console.log(new Date(new Date().getTime()).getFullYear())
            //判断是否为手机
            function isMobile(){
                var sUserAgent= navigator.userAgent.toLowerCase(),
                    bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
                    bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
                    bIsMidp= sUserAgent.match(/midp/i) == "midp",
                    bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
                    bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
                    bIsAndroid= sUserAgent.match(/android/i) == "android",
                    bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
                    bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile",
                    bIsWebview = sUserAgent.match(/webview/i) == "webview";
                return (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM);
            }

            if(isMobile()){
                this.exit2=false;
                this.phone=true;
                this.show=false;
                this.not=false;
            }
        },
        watch:{
            //变化的时间
            time(val,oldVal){
                var a=new Date().getTime();
                var the=this;
                setTimeout(function(){
                    a+=1000;
                    the.time=the.myFormDate(new Date(a));
                },1000)
            }
        }
    }
</script>

<style scoped>
    .home{
        height: 100%;
    }
    .home_top{
        height: 70px;
        background-color:rgba(255,255,255,1);
        box-shadow:0 0 15px 0 rgba(22,5,24,0.2);
        position: relative;
        z-index: 1;
    }
    .home_logo{
        float: left;
        margin-top: 12px;
        margin-left: 112px;
    }
    .home_logo img{
        width: 100%;
    }
    .home_top_right{
        font-size:15px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        float: right;
        margin-right: 40px;
        margin-top: 28px;
        display: flex;
    }
    .home_top_right b{
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url("../../assets/images/home/home_use.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-right: 3px;
    }
    .home_top_right span{
        vertical-align: middle;
    }
    .home_exit b{
        background-image: url("../../assets/images/home/home_exit.png");
    }
    .home_exit{
        margin-left: 30px;
        cursor: pointer;
    }


    .home_bottom{
        position: relative;
        background:rgba(248,248,248,1);
    }
    .home_left{
        width: 280px;
        height: 100%;
        float: left;
        background-color: #002943;
        box-shadow:2px 0 6px 0 rgba(0,41,67,0.5);
    }
    .logo{
        height: 16%;
        background: #fff;
        position: relative;
    }
    .logo img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 46%;
    }
    .home_left>p{
        height: 4px;
        background: #00479d;
        margin: 0;
    }
    .menu{
        background-color: #004994;
        height: 84%;
        overflow: scroll;
        position: relative;
    }
    .home_name{
        text-align: center;
        padding-top: 20px;
    }
    .home_name h1{
        font-size:24px;
        font-family:Source Han Sans CN;
        font-weight:bold;
        color:rgba(255,255,255,1);
    }
    .home_name p{
        font-size:18px;
        font-family:Source Han Sans CN;
        font-weight:400;
        color:rgba(255,255,255,1);
        opacity:0.6;
        margin-top: 10px;
    }
    .box{
        font-size: 13px;
        padding-top: 20px;
        text-align: left;
        color:#D5EEFF;
    }
    .menu_group{
        width: 100%;
        margin: 0 auto;
        cursor: pointer;
    }
    .menu_group>a{
        height: 40px;
        line-height: 40px;
        color:rgba(255,255,255,1);
        text-decoration: none;
        display: inline-block;
        width: 100%;
        padding-left: 20px;
    }
    .active a{
        background:rgba(255,255,255,.2);
    }
    .menu_group img{
        margin-left: 16px;
        vertical-align: middle;
    }
    .menu_group a span{
        font-size:15px;
        font-family:SourceHanSansCN-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        margin-left: 30px;
        vertical-align: middle;
    }
    .menu_group i{
        display: inline-block;
        width: 10px;
        height: 10px;
        background: url("../../assets/images/home/dowm.png") no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
        margin-left: 52px;
    }
    .active1 i{
        transform: rotateZ(180deg);
        transition: transform .3s linear;
    }
    .menu ul{
        margin:0 auto;
        background: transparent;
    }
    .menu li{
        height: 37px;
        line-height: 37px;
        width: 100%;
        padding-left: 92px;
    }
    li>span{
        color:rgba(255,255,255,1);
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
        padding-left: 10px;
        opacity: 0.7;
        font-family:SourceHanSansCN-Regular;
    }
    li:hover{
        background:rgba(255,255,255,.2);
    }
    li:hover span{
        color: #fff;
        opacity: 1;
    }
    .current{
        background:rgba(255,255,255,.2);
    }
    .current span{
        color: #fff;
        opacity: 1;
    }
    .box>p{
        width: 80%;
        margin: 26px auto;
        background: #17253b;
        height: 1px;
    }
    footer{
        color: #b1b5c1;
        font-size: 12px;
        position: absolute;
        bottom: 16px;
    }
    footer .first{
        color:rgba(255,255,255,1);
        line-height:15px;
        opacity:0.2;
    }
    .home_right{
        overflow: hidden;
        height: 100%;
    }
    .exit{
        text-align: right;
        padding-right: 30px;
    }
    .exit i{
        width: 49px;
        height: 48px;
        display: inline-block;
        background: url("../../assets/images/home/phone_cli.png") no-repeat;
        vertical-align: middle;
    }
    .exit span{
        display: inline-block;
        vertical-align: middle;
    }
    .exit span:nth-child(2){
        display: inline-block;
        width: 1px;
        height: 70px;
        background: #dcddde;
        margin: 0 40px;
    }
    .exit span:last-child{
        cursor: pointer;
    }
    .home_content{
        height: 100%;
        overflow: scroll;
    }
    @media (max-width: 768px) {
        .home_logo{
            margin-left: 20px;
        }
        .home_top_right{
            margin-right: 20px;
        }
        .home_use{
            text-align: left;
        }
        .home_middle_left{
            margin-left: 10px;
        }
        .home_content{
            padding: 0;
        }
        .home_left{
            position: absolute;
            left: 0;
            top:0;
            z-index: 100;
        }
        .menu_right{
            display: none;
        }
        .home_logo img{
            display: none!important;
            /*width: 172px;*/
            /*height: auto;*/
            /*margin-top: 16px;*/
            /*margin-left: 10px;*/
        }
        .home_logo{
            width: auto;
            height: auto;
            margin-top: 22px;
        }
        .home_logo b{
            display: inline-block;
            width: 32px;
            height: 32px;
            background: url("../../assets/images/home/phone_icon.png") no-repeat;
            background-size: 100% 100%;
        }
    }
    @media (max-width: 680px){
        .home_middle_right{
            display: none;
        }
        .home_content .page_box{
            padding: 46px 30px 50px;
        }
    }
    @media (max-width: 480px){
        .home_clock{
            display: none;
        }
        footer .first{
            font-size: 10px;
        }
    }
</style>
