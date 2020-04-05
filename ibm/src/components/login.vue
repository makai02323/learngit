<template>
  <div class="login_box">
    <div class="login">
      <div class="login_left">
        <h1>{{$t('login_title3')}}</h1>
        <div class="line"></div>
        <h1 class="login_h1">{{$t('login_custom_center')}}</h1>
        <p>
          <b></b>
          {{$t('login_left')}}
        </p>
      </div>
      <div class="login_right">
        <div class="content">
          <div class="logo">
            <img src="../assets/images/logo.png" alt="">
          </div>
          <div v-if="s_1==2">
            <div v-if="type1==4">
              <div class="login_con">
                <div class="form_group"  id="select">
                  <span>
                    <b></b>
                    <i></i>
                    <el-select v-model="value">
                    <el-option
                      v-for="item in list1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                   </el-select>
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder=login_2 v-model="usename">
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="password" :placeholder=login_3 v-model="password">
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder=login_4 v-model="verification">
                    <img @click="getImages()" :src=img alt="">
                  </span>
                </div>
              </div>
              <div class="learn">
                <b @click="dui=!dui">
                  <i v-if="dui"></i>
                </b>
                <span>{{$t('re_usename')}}</span>
              </div>
              <div class="login_btn" @click="goLogin()">{{$t('login_btn')}}</div>
              <div class="login_footer">
                <span @click="goForget()">{{$t('login_title2')}}?</span>
                <span class="phone_register" @click="isShow1=true">{{$t('login_nouser')}}</span>
              </div>
            </div>
            <div v-if="type1==3">
              <div class="login_con login_con3">
                <div class="form_group">
                  <span>
                      <b></b>
                      <i></i>
                     <el-select v-model="forget_sel">
                        <el-option
                            v-for="item in list6"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <i></i>
                  </span>
                  </div>
                <div class="form_group">
                  <span v-if="forget_sel==='1'">
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder="$t('user_id')" v-model="user_id">
                  </span>
                    <span v-else>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder="$t('login_username')" v-model="user_count">
                  </span>
                </div>
                  <div class="form_group">
                  <span>
                      <b></b>
                      <i></i>
                     <el-select v-model="forget_sel1">
                        <el-option
                            v-for="item in list7"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <i></i>
                  </span>
                  </div>
                <div class="form_group form_group1" v-if="forget_sel1==='1'">
                  <span>
                     <el-select v-model="register_area1">
                        <el-option
                          v-for="item in list4"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                    <i></i>
                    <input type="text" :placeholder="$t('register_phone1')" v-model="register_phone1">
                  </span>
                </div>
                  <div class="form_group" v-else>
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder="$t('forget_email')" v-model="forget_email">
                  </span>
                  </div>
                <div class="form_group form_group2">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder=login_4 v-model="register_code1">
                    <strong v-show="code1==1" @click="getPhone1()">{{$t('get_code')}}</strong>
                    <strong v-show="code1==2">{{num1}}S</strong>
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="password" :placeholder="$t('register_pass1')" v-model="register_pass1">
                  </span>
                </div>
                <div class="login_btn" @click="goSubmit()">{{$t('bank_sure')}}</div>
                <div class="login_footer">
                  <span @click="type1=4,type2=1">{{$t('login_return')}}</span>
                  <span class="phone_register" @click="goWeb()">{{$t('login_left')}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="s_1==1">
            <div v-if="type1==1">
              <div class="login_con">
                <div class="form_group"  id="select">
                  <span>
                    <b></b>
                    <i></i>
                    <el-select v-model="register_value">
                    <el-option
                      v-for="item in list1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                   </el-select>
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder=login_2 v-model="register_usename">
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="password" :placeholder=login_3 v-model="register_pass">
                  </span>
                </div>
                <div class="form_group form_group1">
                  <span>
                     <el-select v-model="register_area">
                        <el-option
                          v-for="item in list3"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                    <i></i>
                    <input type="text" :placeholder="$t('register_phone1')" v-model="register_phone">
                  </span>
                </div>
                <div class="form_group form_group2">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder=login_4 v-model="register_code">
                    <strong v-show="code==1" @click="getPhone()">{{$t('get_code')}}</strong>
                    <strong v-show="code==2">{{num}}S</strong>
                  </span>
                </div>
              </div>
              <div class="login_btn" @click="goNext()">{{$t('bank_next')}}</div>
              <div class="login_footer">
                <span class="phone_register" @click="s_1=2,type2=1,type1=4,get_Id='',goLk()">{{$t('login_nuser')}}</span>
              </div>
            </div>
            <div v-if="type1==2">
              <div class="login_con login_con2">
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder="$t('register_englist')" v-model="register_eng">
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder="$t('register_true')" v-model="register_true">
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder="$t('register_id')" v-model="register_id">
                  </span>
                </div>
                <div class="form_group">
                  <span>
                    <b></b>
                    <i></i>
                    <input type="text" :placeholder="$t('register_email')" v-model="register_email">
                  </span>
                </div>
              </div>
              <div class="login_btn" @click="goRes()">{{$t('register')}}</div>
              <div class="login_btn1" @click="type1=1">{{$t('bank_pre')}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="login_select">
        <div v-bind:class="{active_1:s_1==2}" @click="s_1=2,type1=4,get_Id='',goLk()"><p v-if="type2==1">登<br>录</p><p class="type_span" v-if="type2==2">忘<br>记<br>密<br>码</p></div>
        <div v-bind:class="{active_1:s_1==1}" @click="isShow1=true,doubleRe()">注<br>册</div>
      </div>
    </div>
    <!--<footer>COPYRIGHT© 2019 E-TRANS GROUP LIMITED ALL RIGHT RESERVED</footer>-->

    <div class="msgzz1" v-show="isShow1">
      <div class="msgBox msgBox1">
        <div class="title1">
          {{$t('prompt')}}
          <b @click="isShow1=false">×</b>
        </div>
        <div class="msg msg1">
          <h1>{{$t('get_ID')}}</h1>
          <el-input
            :placeholder="$t('get_ID')"
            v-model="get_Id"
            clearable>
          </el-input>
          <p @click="goRegis()">{{$t('go_sure1')}}</p>
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
  import ElInput from "element-ui/packages/input/src/input";

  export default {
    components: {ElInput},
    name: 'hello',
    data(){
      return {
        login_1:this.$t('login_lanage'),
        login_2:this.$t('login_email'),
        login_3:this.$t('register_pass'),
        login_4:this.$t('verification_code'),
        type1:4,
        type2:1,
        register_value:this.$t('login_lanage'),
        register_usename:'',
        register_phone:'',
        register_phone1:'',
        register_code:'',
        register_code1:'',
        register_pass:'',
        register_pass1:'',
        register_surname:'',
        register_name:'',
        register_email:'',
        register_eng:'',
        register_true:'',
        register_area:'+86',
        register_area1:'+86',
        register_id:'',
        user_id:'',
        img:'',
        time:'',
        get_Id:'',
        tui:'',
          user_count:'',
          forget_email:'',

        usename:'',
        password:'',
        verification:'',
        isShow:false,
        isShow1:false,
        msg:'',
        value:this.$t('login_lanage'),
        list1: [{
          value: this.$t('login_lanage'),
          label: this.$t('login_lanage')
        },{
          value: 'English',
          label: 'English'
        }],
        value1:this.$t('login_email1'),
        list2: [{
          value: 0,
          label: this.$t('login_email1')
        },{
          value: 1,
          label: this.$t('login_phone')
        }],
        value2:'+86',
        value3:'+86',
        value4:'+86',
        list3:[
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
        list4:[
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
        list5:[
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
        list6:[
            {
                value: '1',
                label: this.$t('user_ID')
            },
            {
                value: '2',
                label: this.$t('user_acount'),
            }
        ],
          list7:[
              {
                  value: '1',
                  label: this.$t('user_phone')
              },
              {
                  value: '2',
                  label: this.$t('user_email')
              }
          ],
          forget_sel1:'1',
          forget_sel:'1',
        op:false,
        dui:false,
        s_1:2,
        code:1,
        code1:1,
        num:60,
        num1:60,
        phone:'',
        phone_code:'',
        phone_pass:'',
        register_2:2,
        inite:'',
          i:0,
          deptId:'',
          deptId1:'',
          deptId2:'',
      }
    },
    mounted(){
        //获取地址栏地址，用于邀请注册
        var params = this.getParamsFromURL(window.location.href);
        if(params.code===undefined){
            this.s_1=2;
        }else{
            this.inite=params.code;
            this.s_1=params.s_1;
            this.type1=params.type1;
            this.deptId2=params.adress;
        }



        //获取图片二维码
      this.time=new Date().getTime();
      this.ajax_code('/exhibition/getVC',{timestamp: this.time},'get',this.getImp);


      //按回车键登录
      this.keyupEnter();
      //判断有没有账号
      if(sessionStorage.getItem('usename')=='a' || sessionStorage.getItem('usename')==null){
        this.usename='';
        this.dui=false;
      }else{
        this.usename=sessionStorage.getItem('usename');
        this.dui=true;
      }

      //获取邀请码
      // var url=window.location.href;
      // var n=url.indexOf('=');
      // var j=url.length;
      // if(n!=-1){
      //   this.register_tui=url.slice(n-j+1);
      //   this.s_1=1;
      // }else{
      //   this.s_1=2;
      // }

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
        this.register_2=1;
      }

    },
    created(){

    },
    methods: {
        //点击登录时，注册的所有信息清空
        goLk(){
            this.register_usename='';
            this.register_area='+86';
            this.register_phone='';
            this.register_pass='';
            this.register_eng='';
            this.register_true='';
            this.register_id='';
            this.register_code='';
            this.register_pass='';
            this.register_email='';
        },



        //已经在注册页面了，再次点击不会出现填写id弹框
        doubleRe(){
          if(this.s_1==1){
              this.isShow1=false;
          }
        },


      getImp(res){
        this.img='data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      },
      //点击验证码图片
      getImages(){
        this.time=new Date().getTime();
        this.ajax_code('/exhibition/getVC',{timestamp:this.time},'get',this.getImp);
      },

      //点击注册
      goRegis(){
        if(this.get_Id==''){
          this.isShow=true;
          this.case(this.$t('get_ID'))
        }else{
          this.ajax_login('/user/getUserCode',{superUserId:this.get_Id},'get',this.getPar)
        }
      },
      getPar(res){
        this.get_Id='';
        this.isShow1=false;
        if(res.data.code==0){
          this.tui=res.data.data.invite;
          this.deptId=res.data.data.deptId;
          this.s_1=1;
          this.type1=1;
          this.type2=1;
        }else{
          this.isShow=true;
          this.case(this.$t(res.data.code));
        }
      },

      //获取验证码1
      getPhone(){
        if(this.register_phone==''){
          this.isShow=true;
          this.case(this.$t('phone'));
        }else{
          let a=this.register_area+this.register_phone;
          let data={key:a,type:1};
          this.ajaxB('/verification/sendCode',data,'get',this.getP)
        }
      },
      getP(res){
        if(res.data.code==0){
          this.isShow=true;
          this.case(this.$t('get_code1'));
          this.code=2;
          var the=this;
          var timer=setInterval(function () {
            the.num--;
            if(the.num<=0){
              the.num=60;
              the.code=1;
              clearInterval(timer);
            }
          },1000)
        }else{
          this.isShow=true;
          this.case(res.data.msg);
        }
      },
      //获取验证码2
      getPhone1(){
          var data={};
          if( this.forget_sel==='1' && this.user_id=='') {
                this.isShow=true;
                this.case(this.$t('ID_notNull'));
                return;
            }else if(this.forget_sel==='2'  && this.user_count==''){
                this.isShow=true;
                this.case(this.$t('acount_notNull'));
                return;
            }
          if(this.forget_sel1==='1' && this.register_phone1==='') {
              this.isShow=true;
              this.case(this.$t('phone'));
              return;
          }else if(this.forget_sel1==='2' && this.forget_email==''){
              this.isShow=true;
              this.case(this.$t('email'));
              return;
          }

          if(this.forget_sel==='1' && this.forget_sel1==='1'){
              data={
                  id:this.user_id,
                  accountType:1,
                  contactNumber:this.register_area1+this.register_phone1,
                  type:1,
              }
              this.ajax_login('/user/sendCodeRetrievepassword',data,'get',this.getP1)
          }else if(this.forget_sel==='1' && this.forget_sel1==='2'){
              data={
                  id:this.user_id,
                  accountType:1,
                  contactNumber:this.forget_email,
                  type:2,
              }
              this.ajax_login('/user/sendCodeRetrievepassword',data,'get',this.getP1)
          }else if(this.forget_sel==='2' && this.forget_sel1==='1'){
              data={
                  id:this.user_count,
                  accountType:2,
                  contactNumber:this.register_area1+this.register_phone1,
                  type:1,
              }
              this.ajax_login('/user/sendCodeRetrievepassword',data,'get',this.getP1)
          }else if(this.forget_sel==='2' && this.forget_sel1==='2'){
              data={
                  id:this.user_count,
                  accountType:2,
                  contactNumber:this.forget_email,
                  type:2,
              }
              this.ajax_login('/user/sendCodeRetrievepassword',data,'get',this.getP1)
          }


      },
      getP1(res){
        if(res.data.code==0){
          this.deptId1=res.data.data;
          this.case(this.$t('get_code1'));
          this.code1=2;
          var the=this;
          var timer=setInterval(function () {
              the.num1--;
              if(the.num1<=0){
              the.num1=60;
              the.code1=1;
              clearInterval(timer);
            }
          },1000)
        }else{
          this.isShow=true;
          this.case(this.$t(res.data.code));
        }
      },

      //注册点击下一步
        goNext(){
          if(this.register_usename==''){
              this.case(this.$t('login_email2'));
          }else if(this.register_pass==''){
              this.case(this.$t('password'));
          }else if(this.register_phone==''){
              this.case(this.$t('phone'));
          }else if(this.register_code==''){
              this.case(this.$t('get_code2'));
          }else{
              this.type1=2;
          }
        },

      //注册
      goRes(){
        if(this.register_eng==''){
          this.case(this.$t('englishName_notNull'));
        }else if(this.register_true==''){
          this.case(this.$t('Name_notNull'))
        }else if(this.register_id==''){
          this.case(this.$t('personCord_notNull'))
        }else if(this.register_email==''){
          this.case(this.$t('email'))
        }else{
          let a;
          if(this.inite==''){
            a=this.tui;
          }else{
              a=this.inite;
          }
          var data={
              username:this.register_usename,
              mobile:this.register_area+this.register_phone,
              password:this.register_pass,
              email:this.register_email,
              englishName:this.register_eng,
              name:this.register_true,
              cardNum:this.register_id,
              inviteSuper:a,
              codePhone:this.register_code,
          };
            if(this.deptId==11 || this.deptId2 == 11){
              this.ajax_re('/user/recommendRegistered',data,'post',this.ok_1,'http://ceshiapi.ibmcapital.co:11111/ibm')
              // this.ajax_re('/user/recommendRegistered',data,'post',this.ok_1,'http://192.168.0.11:11111')
          }else if(this.deptId==31 || this.deptId2 == 31){
              this.ajax_re('/user/recommendRegistered',data,'post',this.ok_1,'http://ceshiapi.ibmcapital.co:11131/ibm')
          }

        }
      },
      ok_1(res){
        if(res.data.code==0){
          this.goLk();
          this.case(this.$t('register_success'));
          let the=this;
          setTimeout(function () {
            the.s_1=2;
            the.type1=4;
          },1400)
        }else{
          this.case(res.data.msg);
        }
      },

      keyupEnter() {
        document.onkeydown = e => {
          let body = document.getElementsByTagName('body')[0];
          let input0 = document.getElementsByTagName('input')[0];
          let input1 = document.getElementsByTagName('input')[1];
          let input2 = document.getElementsByTagName('input')[2];
          let input3 = document.getElementsByTagName('input')[3];
          let input4 = document.getElementsByTagName('input')[4];
          if(e.target === input0 && e.keyCode === 13 || e.target === input1 && e.keyCode === 13 || e.target === input2 && e.keyCode === 13){
            this.goLogin();
          }
          if (e.keyCode === 13 && e.target === body || e.target === input3 && e.keyCode === 13 || e.target === input4 && e.keyCode === 13) {
            this.goLogin();
          }
        }
      },
      goRegister(){
        this.s_1=1;
        this.type1=1;
      },
      goLo(){
        this.s_1=2;
      },
      goForget(){
        this.type1=3;
        this.type2=2;
      },
      goLogin(){
        if(this.usename==''|| this.usename==null){
          this.isShow=true;
          this.case(this.$t('login_email2'));
           this.getImages();
        }else if(this.password==''){
          this.isShow=true;
          this.case(this.$t('password'));
          this.getImages();
        }else if(this.verification==''){
          this.isShow=true;
          this.case(this.$t('get_code2'));
          this.getImages();
        }else{
          let data={
            userName:this.usename,
            password:this.password,
            capText:this.verification,
            timestamp:this.time
          }
          this.ajax_login('/user/login',data,'get',this.ok)
        }
      },
      ok(res){
          if(res.data.code==0){

            //让公告和提示实名认证只出现一次
            sessionStorage.setItem('isFeed',true);
            //让公告和提示实名认证只出现一次
            sessionStorage.setItem('isFeed1',true);

          this.$router.push('/page');
          sessionStorage.setItem('type',1);
          sessionStorage.setItem('style',1);
          sessionStorage.setItem('type1',0);
          sessionStorage.setItem('up',1);
          sessionStorage.setItem('trans_user_userInfor',JSON.stringify(res.data.data));
          sessionStorage.setItem('in',res.data.data.user.deptId);
          //存储账号
          if(this.dui==true){
            sessionStorage.setItem('usename',this.usename);
          }else{
            sessionStorage.setItem('usename','a')
          }
        }else if(res.data==9999){
           this.case(this.$t(res.data));
        }else{
          this.getImages();
          this.verification='';
          this.isShow=true;
          this.case(this.$t(res.data.code));
        }
      },

        goSubmit(){
            let data1={};
            if( this.forget_sel==='1' && this.user_id=='') {
                this.isShow=true;
                this.case(this.$t('ID_notNull'));
                return;
            }else if( this.forget_sel==='2' && this.user_count==''){
                this.isShow=true;
                this.case(this.$t('acount_notNull'));
                return;
            }else if(this.register_code1==''){
                this.isShow=true;
                this.case(this.$t('get_code2'));
                return;
            }else if(this.register_pass1==''){
                this.isShow=true;
                this.case(this.$t('register_pass1'));
                return;
            }
            if(this.forget_sel=='1' && this.forget_sel1=='1'){
                data1={
                    id:this.user_id,
                    accountType:1,
                    newPassword:this.register_pass1,
                    code:this.register_code1,
                    codeType:1,
                    passwordType:1
                }
                if(this.deptId1==11){
                    this.ajax_re('/user/retrievePassword',data1,'post',this.gai,'http://ceshiapi.ibmcapital.co:11111/ibm')
                    // this.ajax_re('/user/recommendRegistered',data,'post',this.ok_1,'http://192.168.0.11:11111')
                }else if(this.deptId1==31){
                    this.ajax_re('/user/retrievePassword',data1,'post',this.gai,'http://ceshiapi.ibmcapital.co:11131/ibm')
                }
            }else if(this.forget_sel=='2' && this.forget_sel1=='1'){
                data1={
                    id:this.user_count,
                    accountType:2,
                    newPassword:this.register_pass1,
                    code:this.register_code1,
                    codeType:1,
                    passwordType:1
                }
                if(this.deptId1==11){
                    this.ajax_re('/user/retrievePassword',data1,'post',this.gai,'http://ceshiapi.ibmcapital.co:11111/ibm')
                    // this.ajax_re('/user/recommendRegistered',data,'post',this.ok_1,'http://192.168.0.11:11111')
                }else if(this.deptId1==31){
                    this.ajax_re('/user/retrievePassword',data1,'post',this.gai,'http://ceshiapi.ibmcapital.co:11131/ibm')
                }
            }else if(this.forget_sel=='1' && this.forget_sel1=='2'){
                data1={
                    id:this.user_id,
                    accountType:1,
                    newPassword:this.register_pass1,
                    code:this.register_code1,
                    codeType:2,
                    passwordType:1
                }
                if(this.deptId1==11){
                    this.ajax_re('/user/retrievePassword',data1,'post',this.gai,'http://ceshiapi.ibmcapital.co:11111/ibm')
                    // this.ajax_re('/user/recommendRegistered',data,'post',this.ok_1,'http://192.168.0.11:11111')
                }else if(this.deptId1==31){
                    this.ajax_re('/user/retrievePassword',data1,'post',this.gai,'http://ceshiapi.ibmcapital.co:11131/ibm')
                }
            }else if(this.forget_sel=='2' && this.forget_sel1=='2'){
                data1={
                    id:this.user_count,
                    accountType:2,
                    newPassword:this.register_pass1,
                    code:this.register_code1,
                    codeType:2,
                    passwordType:1
                }
                if(this.deptId1==11){
                    this.ajax_re('/user/retrievePassword',data1,'post',this.gai,'http://ceshiapi.ibmcapital.co:11111/ibm')
                    // this.ajax_re('/user/recommendRegistered',data,'post',this.ok_1,'http://192.168.0.11:11111')
                }else if(this.deptId1==31){
                    this.ajax_re('/user/retrievePassword',data1,'post',this.gai,'http://ceshiapi.ibmcapital.co:11131/ibm')
                }
            }
      },
      gai(res){
        if(res.data.code==0){
          this.isShow=true;
          this.case(this.$t('password1'));
          let the=this;
          setTimeout(function () {
            the.s_1=2;
            the.type1=4;
            the.type2=1;
          },1400)
        }else{
          this.isShow=true;
          this.case(this.$t(res.data.code));
        }
      },
    },
    watch:{

    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .t_text,.p_line{
    display: none;
  }
  input{
    font-size: 14px;
  }
  .login_box{
    background: url("../assets/images/login_bg.png") no-repeat;
    background-size: 100% 100%;
    height: 100%;
  }
  select{
    height: 20px;
    margin-left: 6px;
    vertical-align: middle;
  }
  .login{
    width: 1000px;
    display: flex;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color:#fff;
    background-color: #fff;
    border-radius:6px;
    border: 10px solid #0383CF;
  }
  .lanage{
    font-size:14px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    width:109px;
    height:30px;
    line-height: 28px;
    border:1px solid rgba(153,153,153,1);
    border-radius:3px;
    position: absolute;
    top:40px;
    right: 40px;
  }
  .login_left{
    width: 542px;
    height: 560px;
    background: url("../assets/images/login_left.png") no-repeat;
    background-size: 100% 100%;
    text-align: left;
    position: relative;
    padding-left: 50px;
  }
  .login_left h1{
    font-size:30px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(0,73,148,1);
    line-height:30px;
    text-shadow:0 3px 6px rgba(0, 0, 0, 0.28);
    margin-top:100px;
  }
  .login_left .login_h1{
    margin-top: 0;
  }
  .login_left h1 b{
    display: inline-block;
    width: 28px;
    height: 28px;
    background: url("../assets/images/login_left_icon.png") no-repeat;
    background-size: 100% 100%;
    margin-left: 17px;
  }
  .line{
    width:57px;
    height:3px;
    background:rgba(0,160,255,1);
    margin: 10px 0;
  }
  .login_left p{
    font-size:16px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:#fff;
    line-height:46px;
    position: absolute;
    right: 20px;
    top: 10px;
    margin-bottom: 0;
  }
  .login_left b{
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url("../assets/images/icon_back.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: middle;
    margin-left: 3px;
  }
  .login_right{
    padding: 48px 50px 0;
    flex: 1;
    position: relative;
    background:rgba(0,73,148,1);
  }
  .content{
    width: 100%;
    /*background: #fff;*/
    border-radius:10px;
    padding: 0 16px;
  }
  .content:before{
    display: table;
    content: '';
  }
  .el-select{
    width: 100%;
  }
  .form_group1 .el-select{
    position: absolute;
    left: 0;
    top:0;
    width: 40px;
  }
  .logo{
    width: 149px;
    margin: 0 auto;
  }
  .logo img{
    width: 100%;
  }
  .login_con{
    margin-top: 40px;
  }
  .form_group{
    margin-bottom: 20px;
  }
  .form_group span{
    display: inline-block;
    width: 100%;
    height: 40px;
    position: relative;
  }
  .form_group span b{
    position: absolute;
    width: 20px;
    height: 20px;
    background: url("../assets/images/login_1.png") no-repeat;
    background-size: 100% 100%;
    top:10px;
    left: 10px;
    z-index: 1;
  }
  .form_group span i{
    position: absolute;
    width:1px;
    height:40px;
    background:#004994;
    top:0;
    left: 40px;
    z-index: 1;
  }
  .form_group img{
    position: absolute;
    right: 5px;
    top:5px;
    width: 81px;
    height: 30px;
  }
  .form_group label{
    font-size:15px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .form_group input{
    width: 100%;
    height:40px;
    background:#2B69AA;
    border-radius:4px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:#fff;
    line-height:9px;
    padding-left: 53px;
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color: #fff;
    font-size: 14px;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #fff;
    font-size: 16px;
  }

  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #fff;
    font-size: 16px;
  }
  .form_group:nth-child(4) input,.form_group:nth-child(3) input{
    padding-left: 53px;
  }
  .form_group:nth-child(2) b{
    background-image: url("../assets/images/login_2.png");
  }
  .form_group:nth-child(3) b{
    background-image: url("../assets/images/login_3.png");
  }
  .form_group:nth-child(4) b{
    background-image: url("../assets/images/login_4.png");
  }
  .form_group .login_code input,.login_con1 .form_group input{
    padding-left: 36px;
  }
  .form_group2 span b{
    background-image: url("../assets/images/login_4.png");
  }
  .form_group2 strong{
    font-size:14px;
    font-family:Microsoft YaHei;
    text-align: center;
    position: absolute;
    right: 4px;
    top: 5px;
    width:86px;
    height:30px;
    line-height: 30px;
    background:rgba(0,160,255,1);
    border-radius:4px;
    cursor: pointer;
  }
  .form_group .login_code i{
    position: absolute;
    right: 4px;
    top:4px;
    width: 80px;
    height:32px;
    font-size: 12px;
    font-style:normal;
    background:rgba(206,32,71,1);
    border-radius:4px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
  }
  .form_group:nth-child(3) .county_code_pre,.login_con1 .form_group .county_code_pre{
    padding-left: 90px;
  }
  .form_group:nth-child(1) .county_code_pre1{
    padding-left: 90px;
  }
  .login_con1 .form_group:nth-child(1) b{
    background-image: url("../assets/images/login_6.png");
  }
  .login_con1 .form_group:nth-child(5) b,.login_con1 .form_group:nth-child(6) b{
    background-image: url("../assets/images/login_3.png");
  }
  .learn{
    text-align: left;
  }
  .learn span{
    vertical-align: middle;
    margin-left: 4px;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    opacity:0.5;
  }
  .learn b{
    display: inline-block;
    width:10px;
    height:10px;
    border:2px solid rgba(255, 255, 255, 0.5);
    border-radius:50%;
    vertical-align: middle;
    cursor: pointer;
    position: relative;
  }
  .learn i{
    position: absolute;
    width: 6px;
    height: 6px;
    background: #fff;
    border-radius: 50%;
    top:0;
    left: 0;
  }
  .login_btn{
    margin-top: 20px;
    height:40px;
    line-height: 40px;
    background:rgba(0,160,255,1);
    border-radius:4px;
    cursor: pointer;
    text-align: center;
  }
  .login_con2+.login_btn{
    margin-top: 30px;
  }
  .login_con2 .form_group:first-child b{
    background-image: url("../assets/images/login_2.png");
  }
  .login_con2 .form_group:nth-child(3) b{
    background-image: url("../assets/images/login_5.png");
  }
  .login_con2 .form_group:nth-child(4) b{
    background-image: url("../assets/images/login_6.png");
  }
  .login_con3 .form_group:first-child b{
    background-image: url("../assets/images/login_2.png");
  }
  .login_con3 .form_group:nth-child(3) b{
    background-image: url("../assets/images/login_4.png");
  }
  .login_con3 .form_group:nth-child(4) b{
    background-image: url("../assets/images/login_3.png");
  }
  .login_con3 .login_btn{
    margin-top: 30px;
  }
  .login_btn1{
    height:40px;
    line-height: 40px;
    text-align: center;
    border:1px solid rgba(255,255,255,1);
    border-radius:4px;
    font-size:16px;
    font-family:Microsoft YaHei;
    margin-top: 20px;
    cursor: pointer;
  }
  .login_footer{
    margin-top: 10px;
    text-align: left;
    padding-bottom: 40px;
  }
  .login_footer span{
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:9px;
    opacity:0.5;
    cursor: pointer;
  }
  .login_footer .phone_register{
    float: right;
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(0,160,255,1);
    line-height:16px;
  }
  footer{
    position: absolute;
    bottom: 26px;
    left: 50%;
    transform: translateX(-50%);
  }
  .login_select{
    position: absolute;
    right: -50px;
    top:50%;
    transform: translateY(-50%);
    z-index: -1;
  }
  .login_select div{
    width: 40px;
    height: 120px;
    background: url("../assets/images/normal.png") no-repeat;
    background-size:100% 100%;
    line-height: 38px;
    padding-top: 20px;
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
    opacity:0.5;
    padding-right: 13px;
    text-align: right;
    cursor: pointer;
  }
  .login_select div .type_span{
    line-height: 20px;
  }
  .login_select div:last-child{
    margin-top: 10px;
  }
  .login_select .active_1{
    background-image: url("../assets/images/selected.png");
    opacity: 1;
  }

  @media (max-width: 768px) {
    .login_footer .phone_register{
      float:right;
      margin-right:0;
      margin-top: 6px;
    }
    .login_select{
      display: none;
    }
    .login_left{
      display: none;
    }
    .login_right{
      width: 100%;
      margin: 0 auto;
      padding: 40px 0 20px;
    }
    .login_footer{
      padding-bottom: 20px;
    }
    .login{
      width: 90%;
      min-height: 510px;
      padding-bottom: 0;
    }
    footer{
      width: 100%;
      padding: 0 20px;
      bottom: 10px;
      font-size: 10px;
    }
    .title,.f_sure,.f_bu,.login_click{
      font-size: 16px;
      height: 40px;
      line-height: 40px;
    }
    option{
      height: 10px!important;
    }
    .t_text{
      display: block;
      color: #666;
      font-size: 18px;
      margin-top: 20px;
    }
    .p_line{
      display: block;
      width: 100%;
      height: 1px;
      background: rgba(204,204,204,1);
      margin: 6px 0 10px;
    }
    .lanage{
      display: none;
    }
    .lanage1{
      display: block;
      font-size: 14px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: rgba(55,55,55,1);
      width: 109px;
      height: 30px;
      line-height: 28px;
      border: 1px solid rgba(153,153,153,1);
      margin: 20px auto;
    }
    .lanage1 b{
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url("../assets/images/china.png") no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
    }
    .lanage1 i{
      display: inline-block;
      width: 9px;
      height: 9px;
      background: url("../assets/images/down.png") no-repeat;
      background-size: 100% 100%;
      vertical-align: middle;
    }
    .login_line{
      display: none;
    }
    .use_login{
      margin-top: 40px;
    }
    .use_forget{
      margin-top: 36px;
    }
  }
  @media (max-width: 320px) {
    .use_phone1 input{
      width: 130px;
    }
    .use_login,.use_forget{
      margin-top: 20px;
    }
    .re_top{
      margin-top: 6px;
    }
  }
</style>
