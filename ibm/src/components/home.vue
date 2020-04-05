<template>
  <div class="home">
    <div class="home_top">
      <div class="home_logo">
        <img src="../assets/images/home/home_logo.png" alt="">
        <b @click="not=!not"></b>
      </div>
      <div class="home_top_right">
        <div class="usename">
          <span>{{$t('welcome')}}{{name}}</span>
        </div>
        <div v-if="s_1==1" class="home_exit" @click="exit()">
          <b></b>
          <span>{{$t('home_exit')}}</span>
        </div>
          <div v-if="s_1==2" class="home_exit" @click="goBack()">
              <!--<b></b>-->
              <span>{{$t('home_back')}}</span>
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
            <div class="menu_group" v-bind:class="{active:type==1 || style==1}" @click="type=1,type1=0,goPage(),not=show" @mouseenter="style=1" @mouseleave="style!=1">
              <router-link to="/page">
                <img src="../assets/images/home/home_menu_icon1.png" alt="">
                <span>{{$t('home_menu1')}}</span>
              </router-link>
            </div>
            <div class="menu_group" v-bind:class="{active:type==2 || style==2,active1:up==2}" @click="type=2,up=2" @mouseenter="style=2" @mouseleave="style!=2">
              <a id="my_count1" href="#my_count" class="nav-header collapsed" data-toggle="collapse">
                <img src="../assets/images/home/home_menu_icon2.png" alt="">
                <span>{{$t('home_menu2')}}</span>
                <i></i>
              </a>
              <ul id="my_count" class="nav nav-list secondmenu" v-bind:class="{collapse:type!=2}">
                <li @click="type1=1;goInfor(),not=show" v-bind:class="{current:type1==1}"><span>{{$t('home_menu2_1')}}</span></li>
                <li @click="type1=2;goWallet(),not=show" v-bind:class="{current:type1==2}"><span>{{$t('home_menu2_2')}}</span></li>
                <li @click="type1=3;goPassword(),not=show" v-bind:class="{current:type1==3}"><span>{{$t('home_menu2_3')}}</span></li>
                <li @click="type1=4;goPassword1(),not=show" v-bind:class="{current:type1==4}"><span>{{$t('home_menu2_4')}}</span></li>
                <li @click="type1=5;goMPhone(),not=show" v-bind:class="{current:type1==5}"><span>{{$t('home_menu2_5')}}</span></li>
                <li @click="type1=6;goTransfer(),not=show" v-bind:class="{current:type1==6}"><span>{{$t('home_menu2_6')}}</span></li>
              </ul>
            </div>
            <div class="menu_group" v-bind:class="{active:type==3 || style==3,active1:up==3}" @click="type=3,up=3" @mouseenter="style=3" @mouseleave="style!=3">
              <a href="#my_pay" class="nav-header collapsed" data-toggle="collapse">
                <img src="../assets/images/home/home_menu_icon3.png" alt="">
                <span>{{$t('home_menu3')}}</span>
                <i></i>
              </a>
              <ul id="my_pay" class="nav nav-list secondmenu" v-bind:class="{collapse:type!=3}">
                <li @click="type1=7;goCash(),not=show" v-bind:class="{current:type1==7}"><span>{{$t('home_menu3_1')}}</span></li>
                <li @click="type1=8;goRegisterWallet(),not=show" v-bind:class="{current:type1==8}"><b></b><span>{{$t('home_menu3_2')}}</span></li>
                <li @click="type1=9;goCustomManage(),not=show" v-bind:class="{current:type1==9}"><b></b><span>{{$t('home_menu3_3')}}</span></li>
              </ul>
            </div>
            <div class="menu_group" v-bind:class="{active:type==4 || style==4,active1:up==4}" @click="type=4,up=4" @mouseenter="style=4" @mouseleave="style!=4">
              <a href="#my_infor" class="nav-header collapsed" data-toggle="collapse">
                <img src="../assets/images/home/home_menu_icon4.png" alt="">
                <span>{{$t('home_menu4')}}</span>
                <i></i>
              </a>
              <ul id="my_infor" class="nav nav-list secondmenu" v-bind:class="{collapse:type!=4}">
                <li @click="type1=10;goInvite(),not=show" v-bind:class="{current:type1==10}"><span>{{$t('home_menu4_1')}}</span></li>
              </ul>
            </div>
            <div class="menu_group" v-bind:class="{active:type==5 || style==5,active1:up==5}" @click="type=5,up=5" @mouseenter="style=5" @mouseleave="style!=5">
              <a href="#my_ru" class="nav-header collapsed" data-toggle="collapse">
                <img src="../assets/images/home/home_menu_icon5.png" alt="">
                <span>{{$t('home_menu5')}}</span>
                <i></i>
              </a>
              <ul id="my_ru" class="nav nav-list secondmenu" v-bind:class="{collapse:type!=5}">
                <li @click="type1=11;goDeposit(),not=show" v-bind:class="{current:type1==11}"><span>{{$t('home_menu5')}}</span></li>
                <li @click="type1=12;goCustomBank(),not=show" v-bind:class="{current:type1==12}"><span>{{$t('home_menu5_1')}}</span></li>
              </ul>
            </div>
            <div class="menu_group" v-bind:class="{active:type==6 || style==6,active1:up==6}" @click="type=6,up=6" @mouseenter="style=6" @mouseleave="style!=6">
              <a href="#my_ch" class="nav-header collapsed" data-toggle="collapse">
                <img src="../assets/images/home/home_menu_icon6.png" alt="">
                <span>{{$t('home_menu6')}}</span>
                <i></i>
              </a>
              <ul id="my_ch" class="nav nav-list secondmenu" v-bind:class="{collapse:type!=6}">
                <li @click="type1=19;goGold(),not=show" v-bind:class="{current:type1==19}"><span>{{$t('home_menu6_1')}}</span></li>
                <li @click="type1=13;goGoldRecord(),not=show" v-bind:class="{current:type1==13}"><span>{{$t('home_menu6_2')}}</span></li>
              </ul>
            </div>
            <div class="menu_group" v-bind:class="{active:type==7 || style==7,active1:up==7}" @click="type=7,up=7" @mouseenter="style=7" @mouseleave="style!=7">
              <a href="#my_man" class="nav-header collapsed" data-toggle="collapse">
                <img src="../assets/images/home/home_menu_icon7.png" alt="">
                <span>{{$t('home_menu7')}}</span>
                <i></i>
              </a>
              <ul id="my_man" class="nav nav-list secondmenu" v-bind:class="{collapse:type!=7}">
                <li @click="type1=14;goBuy(),not=show" v-bind:class="{current:type1==14}"><span>{{$t('home_menu7_1')}}</span></li>
                <li @click="type1=15;goBuyList(),not=show" v-bind:class="{current:type1==15}"><span>{{$t('home_menu7_2')}}</span></li>
                <li @click="type1=16;goResc(),not=show" v-bind:class="{current:type1==16}"><span>{{$t('home_menu7_3')}}</span></li>
              </ul>
            </div>
              <div class="menu_group" v-if="limit==1" v-bind:class="{active:type==9 || style==9}" @click="type=9,goTipList(),not=show" @mouseenter="style=9" @mouseleave="style!=9">
                  <router-link to="/tip_lists">
                      <img src="../assets/images/home/home_menu_icon10.png" alt="">
                      <span>{{$t('home_menu10')}}</span>
                  </router-link>

              </div>
            <div class="menu_group" v-bind:class="{active:type==8 || style==8,active1:up==8}" @click="type=8,up=8" @mouseenter="style=8" @mouseleave="style!=8">
              <a href="#my_fk" class="nav-header collapsed" data-toggle="collapse">
                <img src="../assets/images/home/home_menu_icon9.png" alt="">
                <span>{{$t('home_menu9')}}</span>
                <i></i>
              </a>
              <ul id="my_fk" class="nav nav-list secondmenu" v-bind:class="{collapse:type!=8}">
                <li @click="type1=17;goFeed(),not=show" v-bind:class="{current:type1==17}"><span>{{$t('home_menu8_1')}}</span></li>
                <li @click="type1=18;goFeedList(),not=show" v-bind:class="{current:type1==18}"><span>{{$t('home_menu8_2')}}</span></li>
              </ul>
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
            },
              s_1:1,
              status:'',
              limit:0,
          }
    },
    methods:{


      //保存localStroge是为了刷新页面导航栏不回到首页
      exit(){
        this.ajaxC('/user/logout',{},'get',this.exits);
      },
      exits(res){
          this.$router.push('/login');
          sessionStorage.removeItem('trans_user_userInfor');
      },
      //返回管理员
        goBack(){
            sessionStorage.setItem('type',1);
            sessionStorage.setItem('style',1);
            this.$router.push('/admin/page');
            //this.$router.push('/admin/withdraw_history');
            sessionStorage.removeItem('trans_user_userInfor');
            sessionStorage.setItem('in1',0);
            sessionStorage.setItem('trans_user_userInfor',sessionStorage.getItem('admin_infor'))
        },

      goPage(){
        sessionStorage.setItem('type',1);
        sessionStorage.setItem('style',1);
        this.up=1;
        sessionStorage.setItem('up',1);
      },
      goInfor(){
        this.$router.push('/mycount/infor');
        sessionStorage.setItem('type',2);
        sessionStorage.setItem('type1',1);
        sessionStorage.setItem('style',2);
        sessionStorage.setItem('up',2);
      },
      goPassword1(){
        this.$router.push('/mycount/2_password');
        sessionStorage.setItem('type',2);
        sessionStorage.setItem('type1',4);
        sessionStorage.setItem('style',2);
        sessionStorage.setItem('up',2);
      },
      goMPhone(){
        this.$router.push('/mycount/phone');
        sessionStorage.setItem('type',2);
        sessionStorage.setItem('type1',5);
        sessionStorage.setItem('style',2);
          sessionStorage.setItem('up',2);
      },
      goGold(){
          this.$router.push('/Gold/gold');
          sessionStorage.setItem('type',6);
          sessionStorage.setItem('type1',19);
          sessionStorage.setItem('style',6);
          sessionStorage.setItem('up',6);
      },
      goGoldRecord(){
          this.$router.push('/Gold/goldRecord');
          sessionStorage.setItem('type',6);
          sessionStorage.setItem('type1',13);
          sessionStorage.setItem('style',6);
          sessionStorage.setItem('up',6);
      },
      goBuy(){
          this.$router.push('/product/buyMating');
          sessionStorage.setItem('type',7);
          sessionStorage.setItem('type1',14);
          sessionStorage.setItem('style',7);
          sessionStorage.setItem('up',7);
      },
       goBuyList(){
           this.$router.push('/product/buyList');
           sessionStorage.setItem('type',7);
           sessionStorage.setItem('type1',15);
           sessionStorage.setItem('style',7);
           sessionStorage.setItem('up',7);
       },
        goResc(){
            this.$router.push('/product/Rescission');
            sessionStorage.setItem('type',7);
            sessionStorage.setItem('type1',16);
            sessionStorage.setItem('style',7);
            sessionStorage.setItem('up',7);
        },
        goTipList(){
            sessionStorage.setItem('type',9);
            sessionStorage.setItem('style',9);
            this.up=1;
        },
        goFeed(){
            this.$router.push('/feedback/feedback');
            sessionStorage.setItem('type',8);
            sessionStorage.setItem('type1',17);
            sessionStorage.setItem('style',8);
            sessionStorage.setItem('up',8);
        },
        goFeedList(){
            this.$router.push('/feedback/feedList');
            sessionStorage.setItem('type',8);
            sessionStorage.setItem('type1',18);
            sessionStorage.setItem('style',8);
            sessionStorage.setItem('up',8);
        },
      goTransfer(){
        this.$router.push('/mycount/transfer_accounts');
        sessionStorage.setItem('type',2);
        sessionStorage.setItem('type1',6);
        sessionStorage.setItem('style',2);
        sessionStorage.setItem('up',2);
      },
      goWallet(){
        this.$router.push('/mycount/wallet');
        sessionStorage.setItem('type',2);
        sessionStorage.setItem('type1',2);
        sessionStorage.setItem('style',2);
        sessionStorage.setItem('up',2)
      },
      goPassword(){
        this.$router.push('/mycount/password');
        sessionStorage.setItem('type',2);
        sessionStorage.setItem('type1',3);
        sessionStorage.setItem('style',2);
          sessionStorage.setItem('up',2)
      },
      goPhone(){
        this.$router.push('/phone');
        sessionStorage.setItem('type',2);
        sessionStorage.setItem('type1',5);
        sessionStorage.setItem('style',2);
      },
      goMail(){
        this.$router.push('/mail');
        sessionStorage.setItem('type',2);
        sessionStorage.setItem('type1',6);
        sessionStorage.setItem('style',2);
      },
      goRegisterWallet(){
        this.$router.push('/wallet/registerWallet');
        sessionStorage.setItem('type',3);
        sessionStorage.setItem('type1',8);
        sessionStorage.setItem('style',3);
        sessionStorage.setItem('up',3);
      },
      goCustomManage(){
        this.$router.push('/wallet/MT4Wallet');
        sessionStorage.setItem('type',3);
        sessionStorage.setItem('type1',9);
        sessionStorage.setItem('style',3);
          sessionStorage.setItem('up',3);
      },
      // goManage(){
      //   sessionStorage.setItem('type',3);
      //   sessionStorage.setItem('style',3);
      // },
      goCenter(){
        sessionStorage.setItem('type',4);
        sessionStorage.setItem('style',4);
      },
      goInvite(){
        this.$router.push('/register/invite');
        sessionStorage.setItem('type',4);
        sessionStorage.setItem('type1',10);
        sessionStorage.setItem('style',4);
        sessionStorage.setItem('up',4);
      },
      goDeposit(){
          this.$router.push('/Deposit/deposit');
          sessionStorage.setItem('type',5);
          sessionStorage.setItem('type1',11);
          sessionStorage.setItem('style',5);
          sessionStorage.setItem('up',5);
      },
      goCustomBank(){
        this.$router.push('/Deposit/depositRecord');
        sessionStorage.setItem('type',5);
        sessionStorage.setItem('type1',12);
        sessionStorage.setItem('style',5);
        sessionStorage.setItem('up',5);
      },
      goCustomPass(){
        this.$router.push('/customPass');
        sessionStorage.setItem('type',5);
        sessionStorage.setItem('type1',7);
        sessionStorage.setItem('style',5);
      },
      goCustomPhone(){
        this.$router.push('/customPhone');
        sessionStorage.setItem('type',5);
        sessionStorage.setItem('type1',8);
        sessionStorage.setItem('style',5);
      },
      goCash(){
        this.$router.push('/wallet/cash');
        sessionStorage.setItem('type',3);
        sessionStorage.setItem('type1',7);
        sessionStorage.setItem('style',3);
        sessionStorage.setItem('up',3)
      },
      goUseAd(){
        sessionStorage.setItem('type',7);
        sessionStorage.setItem('style',7);
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



        //管理员直接登录
        if(sessionStorage.getItem('isAdmin') === 'true'){
            let params = this.getParamsFromURL(window.location.href);
            if(params.k===undefined){
                this.s_1=1;
                sessionStorage.setItem('s_1',1);
            }else{
                this.s_1=2;
                sessionStorage.setItem('s_1',2);
            }
            sessionStorage.setItem('isAdmin',false);
        }

        if(sessionStorage.getItem('s_1')==1){
            this.s_1=1;
        }else if(sessionStorage.getItem('s_1')==2){
            this.s_1=2;
        }


      if(sessionStorage.getItem('trans_user_userInfor')==null){
        this.cases(this.$t('no_login'));
      }

      //判断直推列表是不是打开
        if(JSON.parse(sessionStorage.getItem('trans_user_userInfor')).organization==1){
            this.limit=1;
        }else if(sessionStorage.getItem('in1')==1){
            this.limit=1;
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
    background: url("../assets/images/home/home_use.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-right: 3px;
  }
  .home_top_right span{
    vertical-align: middle;
  }
  .home_exit b{
    background-image: url("../assets/images/home/home_exit.png");
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
    padding-top: 44px;
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
    padding-top: 48px;
    text-align: left;
    color:#D5EEFF;
  }
  .menu_group{
    width: 100%;
    margin: 0 auto;
    cursor: pointer;
  }
  .menu_group>a{
    height: 50px;
    line-height: 50px;
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
    margin-left: 43px;
    vertical-align: middle;
  }
  .menu_group i{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: url("../assets/images/home/dowm.png") no-repeat;
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
    background: url("../assets/images/home/phone_cli.png") no-repeat;
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
    .home_content{
      padding: 0;
    }
    .home_left{
      position: absolute;
      left: 0;
      top:0;
      z-index: 100;
    }
    .home_logo img{
      display: none!important;
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
      background: url("../assets/images/home/phone_icon.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  @media (max-width: 480px){

  }
</style>
