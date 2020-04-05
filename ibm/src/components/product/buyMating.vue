<template>
<div class="page_box">
    <!--弹出配套-->
    <div class="alert_box" v-if="type3==2">
        <div class="alert">
            <div v-if="type1==1">
                <i @click="type3=1"></i>
                <h1>{{$t('home_menu7_1')}}</h1>
                <img src="../../assets/images/buy/buy_4.png" alt="">
                <h2>AI Basic</h2>
                <p>{{$t('mating_title1')}}</p>
                <h3>6<span>%</span>~10<span>%</span></h3>
                <h4>{{$t('return_money')}}</h4>
                <div class="count">
                    <span :class="{active:type2==1}">IBM：3000</span>
                </div>
                <div @click="type=3,type3=1,gobuy()" class="a_btn">{{$t('fast_buy')}}</div>
            </div>
            <div v-if="type1==2">
                <i @click="type3=1"></i>
                <h1>{{$t('home_menu7_1')}}</h1>
                <img src="../../assets/images/buy/buy_5.png" alt="">
                <h2>AI Pro</h2>
                <p>{{$t('mating_title2')}}</p>
                <h3>8<span>%</span>~12<span>%</span></h3>
                <h4>{{$t('return_money')}}</h4>
                <div class="count">
                    <span @click="type2=2" :class="{active:type2==2}">IBM：5000</span>
                    <span @click="type2=3" class="last" :class="{active:type2==3}">IBM：10000</span>
                </div>
                <div @click="type=3,type3=1,gobuy()" class="a_btn">{{$t('fast_buy')}}</div>
            </div>
            <div v-if="type1==3">
                <i @click="type3=1"></i>
                <h1>{{$t('home_menu7_1')}}</h1>
                <img src="../../assets/images/buy/buy_6.png" alt="">
                <h2>AI Genius</h2>
                <p>{{$t('mating_title3')}}</p>
                <h3>10<span>%</span>~14<span>%</span></h3>
                <h4>{{$t('return_money')}}</h4>
                <div class="count">
                    <span @click="type2=4" :class="{active:type2==4}">IBM：20000</span>
                    <span @click="type2=5" :class="{active:type2==5}" class="last1">IBM：50000</span>
                    <span @click="type2=6" :class="{active:type2==6}">IBM：100000</span>
                </div>
                <div @click="type=3,type3=1,gobuy()" class="a_btn">{{$t('fast_buy')}}</div>
            </div>
        </div>
    </div>


    <div class="buy_title">
        <h1 v-if="o1==0">{{$t('home_menu7_1')}}</h1>
        <h1 v-if="o1==1">{{$t('next_mating')}}</h1>
        <h1 v-if="o1==2">{{$t('buy_success')}}</h1>
        <span v-if="type==2" @click="type=1">{{$t('home_back')}}</span>
    </div>
    <div class="buy_con">
        <div class="buy_show" v-if="type==1">
            <div>
                <img src="../../assets/images/buy/buy_1.png" alt="">
                <h1>AI Basic</h1>
                <p>{{$t('mating_title1')}}</p>
                <h2>6<span>%</span>~10<span>%</span></h2>
                <h3>{{$t('return_money')}}</h3>
                <div @click="type3=2,type1=1,type2=1" class="b_btn">{{$t('select')}}</div>
                <div @click="type=2,type4=2,return1()" class="k_btn">{{$t('look_pre')}}</div>
            </div>
            <div>
                <img src="../../assets/images/buy/buy_2.png" alt="">
                <h1>AI Pro</h1>
                <p>{{$t('mating_title2')}}</p>
                <h2>8<span>%</span>~12<span>%</span></h2>
                <h3>{{$t('return_money')}}</h3>
                <div @click="type3=2,type1=2,type2=2" class="b_btn">{{$t('select')}}</div>
                <div @click="type=2,type4=3,return2()" class="k_btn">{{$t('look_pre')}}</div>
            </div>
            <div>
                <img src="../../assets/images/buy/buy_3.png" alt="">
                <h1>AI Genius</h1>
                <p>{{$t('mating_title3')}}</p>
                <h2>10<span>%</span>~14<span>%</span></h2>
                <h3>{{$t('return_money')}}</h3>
                <div @click="type3=2,type1=3,type2=4" class="b_btn">{{$t('select')}}</div>
                <div @click="type=2,type4=4,return3()" class="k_btn">{{$t('look_pre')}}</div>
            </div>
        </div>
        <div class="buy_look" v-if="type==2">
            <div id="myChart"></div>
        </div>
        <div class="buy_buy" v-if="type==3">
            <div class="from_group" v-if="o1==0">
                <label for="">{{$t('select_mating')}}</label>
                <el-input
                    v-model="input"
                    :disabled="true">
                </el-input>
            </div>
            <div class="from_group" v-if="o1==1">
                <label for="">{{$t('need_mating')}}</label>
                <el-select v-model="input6" @change="change3">
                    <el-option
                        v-for="item in list1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="from_group" v-if="o1==0">
                <label for="">{{$t('need_money')}}(USD)</label>
                <el-input
                    v-model="input1"
                    :disabled="true">
                </el-input>
            </div>
            <div class="from_group" v-if="o1==1">
                <label for="">{{$t('need_money')}}(USD)</label>
                <el-input
                    v-model="input7"
                    :disabled="true">
                </el-input>
            </div>
            <div class="from_group">
                <label for="">{{$t('home_menu3_1')}}</label>
                <el-input
                    :placeholder="$t('please_money')"
                    v-model="input2"
                    @blur="change1"
                    clearable>
                </el-input>
                <p>{{cp}}</p>
            </div>
            <div class="from_group">
                <label for="">{{$t('home_menu3_2')}}</label>
                <el-input
                    :placeholder="$t('please_money')"
                    v-model="input3"
                    @blur="change2"
                    clearable>
                </el-input>
                <p>{{rp}}</p>
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
                    v-model="input4"
                    :disabled="true">
                </el-input>
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
                <label for=""></label>
                <strong><b @click="o=!o" :class="{gou:o}"></b>{{$t('recept')}}<a href="../../../static/file/GENERAL_RISK__DISCLOSURE.pdf" target="_blank">《风险披露声明》</a></strong>
            </div>
            <div class="from_group">
                <label for=""></label>
                <el-button @click="sub()" type="primary" :disabled="!o">{{$t('bank_sure')}}</el-button>
                <el-button @click="type=1,fanhui()">{{$t('home_back')}}</el-button>
            </div>
        </div>
        <div class="buy_buy buy_buy1" v-if="type==4">
            <div>
                <div>
                    <img src="../../assets/images/buy/ok.png" alt="">
                </div>
                <div>
                    <h1>{{$t('buy_mating_success')}}</h1>
                    <p>{{$t('buy_mating_money')}}:{{input1}}</p>
                </div>
            </div>
            <b @click="mat_close()">×</b>
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
        name: "buy-mating",
        inject: ['reload'],//点击跳转的时候刷新
        data(){
            return {
                type:1,
                myChart: null,
                type1:1,
                type2:1,
                type3:1,
                type4:1,
                o:false,
                input:'',
                input1:'',
                input2:0,
                input3:0,
                input4:'',
                input5:'',
                input6:'',
                input7:0,
                code:1,
                num1:60,
                list:{},
                list1:[],
                list2:[0,3000,5000,10000,20000,50000,100000],
                isShow:false,
                msg:'',
                cp:0,
                rp:0,
                a:1,
                t:0,
                o1:0,
                id:'',
                val:'',
                val1:'',
                radio:'1',
                list3:{},
            }
        },
        mounted(){
            //获取地址栏地址，用于升级配套
            var params = this.getParamsFromURL(window.location.href);
            if(params.type===undefined){
                this.type=1;
                this.o1=0
            }else{
                this.o1=1;
                this.type=params.type;
                this.t=params.money;
                this.id=params.id;
                this.list2.forEach((f,index)=>{
                    if(f>=params.money){
                        if(index>=6){
                            return;
                        }
                        this.list1.push({label:'IBM'+this.list2[index+1],value:this.list2[index+1]});
                    }
                })
            }


            //获取个人信息
            this.ajaxC('/user/getUserInfo',{},'get',this.infor);

            //获取cp,rp
            this.getM();

            //画echarts
            this.drawLine(a,b);



        },
        methods:{
            //个人信息
            infor(res){
                if(res.data.code==0){
                    this.list3=res.data.data.user;
                    this.input4=this.list3.mobile
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },


            //购买成功返回
            mat_close(){
              this.type=1;
              this.o1=0;
              this.input='';
              this.input1='';
              this.input2='';
              this.input3='';
            },

            //购买
            gobuy(){
                this.input='IBM'+this.list2[this.type2];
                this.input1=this.list2[this.type2];
            },

            //返回
            fanhui(){
                this.$router.push('/product/buyMating');
                this.o1=0;
            },

            getM(){
                this.ajaxC('/assets/getUserAssets',{},'get',this.getCash);
            },
            getCash(res){
                if(res.data.code==0){
                    this.rp=this.moneyToFloat(res.data.data.rp);
                    this.cp=this.moneyToFloat(res.data.data.cp);
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },
            change3(){
                this.input7=this.input6-this.t;
            },


            //获取验证码
            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{contactNumber:this.input4,type:this.radio},'get',this.getP2)
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
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            },

            //判断现金钱包和注册钱包输入
            change1(){
                if(parseFloat(this.input2)>this.cp){
                    this.case(this.$t('max_money'))
                }else if(this.input2<0){
                    this.case(this.$t('under_money'))
                }
            },
            change2(){
                if(parseFloat(this.input3)>this.rp){
                    this.case(this.$t('max_money1'))
                }else if(this.input3<0){
                    this.case(this.$t('under_money'))
                }
            },

            //提交购买配套
            sub(){
                console.log(this.a);
                if(this.o1==0){
                  if(this.input2===''){
                      this.case(this.$t('zero_cash'))
                  }else if(this.input3===''){
                      this.case(this.$t('zero_re'))
                  }else if(this.input5==''){
                      this.case(this.$t('get_code2'))
                  }else if(this.o==false){
                      this.case(this.$t('please_suc'))
                  }else if(parseFloat(this.input2)+parseFloat(this.input3) != parseFloat(this.input1)){
                      this.case(this.$t('cash_and_re'))
                  }else{
                      this.$prompt(this.$t('two_password'), this.$t('prompt'), {
                          confirmButtonText: this.$t('go_sure'),
                          inputValidator:val=>{
                              this.val=val;
                          },
                          cancelButtonText: this.$t('cancel'),
                      }).then(({ value }) => {
                          let data={
                              matchingId:this.a,
                              cp:this.input2,
                              ap:0,
                              rp:this.input3,
                              code:this.input5,
                              securityPassword:this.val,
                              type:this.radio,
                          }
                          this.ajaxE('/matching/buyMatching',data,'post',this.oye)
                      })
                  }
              }else{
                  if(this.input2===''){
                      this.case(this.$t('zero_cash'))
                  }else if(this.input3===''){
                      this.case(this.$t('zero_re'))
                  }else if(this.input5==''){
                      this.case(this.$t('get_code2'))
                  }else if(this.o==false){
                      this.case(this.$t('please_suc'))
                  }else if(parseFloat(this.input2)+parseFloat(this.input3) != parseFloat(this.input7)){
                      this.case(this.$t('cash_and_re'))
                  }else{
                      this.$prompt(this.$t('two_password'), this.$t('prompt'), {
                          confirmButtonText: this.$t('go_sure'),
                          inputValidator:val=>{
                              this.val=val;
                          },
                          cancelButtonText: this.$t('cancel'),
                      }).then(({ value }) => {
                          let p;
                          if(this.input6==3000){
                              p=1
                          }else if(this.input6==5000){
                              p=2
                          }else if(this.input6==10000){
                              p=3
                          }else if(this.input6==20000){
                              p=4
                          }else if(this.input6==50000){
                              p=5
                          }else if(this.input6==100000){
                              p=6
                          }
                          let data={
                              matchingId: p,
                              cp:this.input2,
                              ap:0,
                              rp:this.input3,
                              code:this.input5,
                              mt4Id:this.id,
                              securityPassword:this.val,
                              type:this.radio,
                          };
                          this.ajaxE('/matching/upgradeMatching',data,'post',this.oye1)
                      })
                  }
              }

            },
            oye(res){
                if(res.data.code==0){
                    this.o1=2;
                    this.type=4;
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
            oye1(res){
                if(res.data.code==0){
                    this.case(this.$t('next_success'));
                    let the=this;
                    setTimeout(function () {
                        sessionStorage.setItem('type',7);
                        sessionStorage.setItem('type1',15);
                        sessionStorage.setItem('style',7);
                        sessionStorage.setItem('up',7);
                        the.reload();
                        the.$router.push('/product/buyList');
                    },1400)
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.case(this.$t(res.data.code));
                }
            },


            //画echarts
            drawLine(a,b){
                var echarts = require('echarts');
                this.myChart = echarts.init(document.getElementById('myChart'));
                var data = a;
                var yMax = 0.1;
                var dataShadow = [];

                for (var i = 0; i < data.length; i++) {
                    dataShadow.push(yMax);
                }

                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            },
                        },
                        formatter: function (params) {

                            var res='<div><p>时间：'+params[0].name+'</p></div>'
                            res+='<p>资产:'+' '+params[2].data+'</p>'
                            return res;
                        },

                    },
                    grid: {
                        left:0,
                        top:'10px',
                        bottom:0,
                        right: 0,
                        containLabel: true
                    },
                    xAxis: {
                        axisLine: {
                            show: false
                        },
                        axisTick: {show: false},
                        data: b
                    },
                    yAxis: {
                        splitLine:{show: false},
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#999'
                            }
                        }
                    },
                    series: [
                        { // For shadow
                            type: 'bar',
                            itemStyle: {
                                normal: {color: 'rgba(0,0,0,0)'}
                            },
                            barGap:'-100%',
                            barCategoryGap:'40%',
                            data: dataShadow,
                            animation: false
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#F6FBFE'},
                                            {offset: 0.5, color: '#C1E8F9'},
                                            {offset: 1, color: '#5C9AF1'}
                                        ]
                                    )
                                },
                            },
                            data: data
                        },
                        {
                            type: 'line',
                            smooth:true,
                            itemStyle: {
                                normal: {
                                    color: 'transparent'
                                },
                            },
                            data: data
                        }
                    ]
                };
                this.myChart.setOption(option);
                window.addEventListener("resize", function() {
                    this.myChart.resize;
                });
            },


            //点击回报画echarts
            return1(){
                this.ajaxC('/matching/yhb',{name:'basic'},'get',this.mt1);
            },
            mt1(res){
                let a=res.data.data.vales,b=res.data.data.date;
                this.drawLine(a,b);
            },
            return2(){
                this.ajaxC('/matching/yhb',{name:'pro'},'get',this.mt2);
            },
            mt2(res){
                let a=res.data.data.vales,b=res.data.data.date;
                this.drawLine(a,b);
            },
            return3(){
                this.ajaxC('/matching/yhb',{name:'genius'},'get',this.mt3);
            },
            mt3(res){
                let a=res.data.data.vales,b=res.data.data.date;
                this.drawLine(a,b);
            },

        },
        watch:{
            // type4(val,old){
            //     console.log(val);
            //     this.$nextTick(()=> {
            //         if(val==2){
            //             this.ajaxC('/matching/yhb',{name:'basic'},'get',o);
            //             function o(res) {
            //                 let a=res.data.data.vales,b=res.data.data.date;
            //                 sessionStorage.setItem('data1',JSON.stringify(a));
            //                 sessionStorage.setItem('valus',JSON.stringify(b))
            //             }
            //             this.drawLine(JSON.parse(sessionStorage.getItem('data1')),JSON.parse(sessionStorage.getItem('valus')));
            //         }else if(val==3){
            //             this.ajaxC('/matching/yhb',{name:'pro'},'get',o);
            //             function o(res) {
            //                 let a=res.data.data.vales,b=res.data.data.date;
            //                 sessionStorage.setItem('data1',JSON.stringify(a));
            //                 sessionStorage.setItem('valus',JSON.stringify(b))
            //             }
            //             this.drawLine(JSON.parse(sessionStorage.getItem('data1')),JSON.parse(sessionStorage.getItem('valus')));
            //         }else if(val==4){
            //             this.ajaxC('/matching/yhb',{name:'genius'},'get',o);
            //             function o(res) {
            //                 let a=res.data.data.vales,b=res.data.data.date;
            //                 sessionStorage.setItem('data1',JSON.stringify(a));
            //                 sessionStorage.setItem('valus',JSON.stringify(b))
            //             }
            //             this.drawLine(JSON.parse(sessionStorage.getItem('data1')),JSON.parse(sessionStorage.getItem('valus')));
            //         }
            //
            //     });
            //
            // },
            type2(val,old){
                    if(this.type2==1){
                        this.a=1;
                    }else if(this.type2==2){
                        this.a=2;
                    }else if(this.type2==3){
                        this.a=3;
                    }else if(this.type2==4){
                        this.a=4;
                    }else if(this.type2==5){
                        this.a=5;
                    }else if(this.type2==6){
                        this.a=6;
                    }
            },
            radio(val,old){
                if(this.radio=='1'){
                    this.input4=this.list3.mobile
                }else{
                    this.input4=this.list3.email
                }
            }
        }
    }
</script>

<style scoped>
@import "../../assets/css/buyMating.css";
.from_group label+label{
    width: 60px;
}
.from_group label+label+label{
    width: 100px;
}
</style>
