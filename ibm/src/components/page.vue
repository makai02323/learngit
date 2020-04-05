<template>
    <div class="page_box">
      <div class="page_top page_top1">
        <div class="page_left">
          <div>
             <h1>{{$t('page_rp')}}</h1>
             <p><span v-if="rp!=0">$</span>{{rp}}</p>
          </div>
          <div>
              <h1>{{$t('page_ap')}}</h1>
             <p><span v-if="ap!=0">$</span>{{ap}}</p>
          </div>
          <div>
              <h1>{{$t('page_cp')}}</h1>
             <p><span v-if="cp!=0">$</span>{{cp}}</p>
          </div>
        </div>
        <div class="page_right">
            <h1 class="page_title">
                <span>{{$t('money_operate')}}</span>
                <i class="left"></i>
                <i class="right"></i>
            </h1>
            <div class="page_con">
                <div class="adorn">
                    <img src="../assets/images/page/left_top.png" alt="">
                    <img src="../assets/images/page/right_top.png" alt="">
                    <img src="../assets/images/page/left_bottom.png" alt="">
                    <img src="../assets/images/page/right_bottom.png" alt="">
                </div>
                <div class="page_contact">
                    <p @click="invest()">
                        <b></b>
                        <span>{{$t('investMoney')}}</span>
                    </p>
                    <p @click="Withdraw()">
                        <b></b>
                        <span>{{$t('reflect')}}</span>
                    </p>
                </div>
            </div>
        </div>
      </div>
      <div class="page_top page_top_middle">
          <div class="page_left_middle">
              <h1 class="page_title">
                  <span>{{$t('MT4_cMoney')}}</span>
                  <i class="left"></i>
                  <i class="right"></i>
              </h1>
              <div>
                  <div class="adorn">
                      <img src="../assets/images/page/left_top.png" alt="">
                      <img src="../assets/images/page/right_top.png" alt="">
                      <img src="../assets/images/page/left_bottom.png" alt="">
                      <img src="../assets/images/page/right_bottom.png" alt="">
                  </div>
                  <div class="page_contact page_contact3">
                      <!--<div>-->
                          <!--<div class="page_middle_img">-->
                              <!--<img src="../assets/images/page/page_4.png" alt="">-->
                          <!--</div>-->
                          <!--<div class="page_middle_title">-->
                              <!--<h1>配置列表</h1>-->
                              <!--<div class="page_line"></div>-->
                              <!--<h1>上次登录时间：{{pre_time}}</h1>-->
                          <!--</div>-->
                      <!--</div>-->
                      <div>
                        <div id="myChart"></div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="page_right">
              <h1 class="page_title">
                  <span>{{$t('user_infor')}}</span>
                  <i class="left"></i>
                  <i class="right"></i>
              </h1>
              <div class="page_con">
                  <div class="adorn">
                      <img src="../assets/images/page/left_top.png" alt="">
                      <img src="../assets/images/page/right_top.png" alt="">
                      <img src="../assets/images/page/left_bottom.png" alt="">
                      <img src="../assets/images/page/right_bottom.png" alt="">
                  </div>
                  <div class="page_contact page_contact1">
                      <div class="page_img">
                          <img src="../assets/images/page/page_5.png" alt="">
                      </div>
                      <div>
                          <h1>IBM {{IBM_id}}</h1>
                          <div>
                              <h2>{{$t('con_welcome')}}Active Member</h2>
                              <h3>Congratulations ! You have become our Assistant Level Member</h3>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
        <div class="page_top page_top_bottom">
            <div class="page_left_middle page_left_middle1">
                <h1 class="page_title">
                    <span>{{$t('Matching_list')}}</span>
                    <i class="left"></i>
                    <i class="right"></i>
                </h1>
                <div>
                    <div class="adorn">
                        <img src="../assets/images/page/left_top.png" alt="">
                        <img src="../assets/images/page/right_top.png" alt="">
                        <img src="../assets/images/page/left_bottom.png" alt="">
                        <img src="../assets/images/page/right_bottom.png" alt="">
                    </div>
                    <div class="page_contact page_contact_table">
                        <!--<div>-->
                            <!--<div id="myChart1"></div>-->
                        <!--</div>-->
                        <div>
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
                                    prop="id"
                                    label="ID">
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
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--公告-->
        <div class="feed">
            <el-dialog
                title="公告信息"
                :visible.sync="centerDialogVisible"
                width="30%"
                center>
                <el-scrollbar style="height:100%">
                    <div class="notice" v-for="item in list1">
                        <h1 v-html="item.title">{{item.title}}</h1>
                        <p v-html="item.content">{{item.content}}</p>
                    </div>
                </el-scrollbar>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">{{$t('page_sure')}}</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "page",
        inject: ['reload'],//点击跳转的时候刷新
        data(){
            return {
                ap:0,
                cp:0,
                rp:0,
                pre_time:'',
                myChart: null,
                myChart1: null,
                IBM_id:'',
                list:{},
                multipleSelection: [],
                tableData:[],
                s_1:1,
                sesstype:0,
                centerDialogVisible:false,
                list1:[],
                list2:[],
                list3:[],
                list4:[],
                list5:[],
                max:0,
            }
        },
        created(){
            //获得电子钱包，注册钱包，现金钱包
            this.ajaxC('/assets/getUserAssets',{},'get',this.getPay);

            //配套列表
            this.getM();

            //管理员直接登录
            var params = this.getParamsFromURL(window.location.href);
            if(params.k===undefined){
                this.s_1=1;
            }else{
                this.s_1=2;
            }

            this.sesstype=sessionStorage.getItem('type');

            //获取个人信息
            this.ajaxC('/user/getUserInfo',{},'get',this.infor);
        },
        mounted(){
            // this.list=JSON.parse(sessionStorage.getItem('trans_user_userInfor'));
            // this.pre_time=this.list.userLog.createDate;
            //获取公告
            this.ajaxC('/system/getNotice',{type:1},'get',this.getAdd);

            if(sessionStorage.getItem('isFeed')=='true'){
                this.centerDialogVisible=true;
                sessionStorage.setItem('isFeed',false);
            }else{
                this.centerDialogVisible=false;
            }

            //获取出金明细
            this.ajaxC('/assets/assA',{},'get',this.assa);



            //画echarts1
            this.drawLine();

            //画echarts2
            this.drawLine1();

            // 把写的提示信心需要换行的地方分成数组 confirmText
            // const confirmText = ['请尽快完善个人信息!', '并且提交审核']
            // const newDatas = []
            // const h = this.$createElement;
            // for (const i in confirmText) {
            //     newDatas.push(h('p', null, confirmText[i]))
            // }



        },
        methods:{
            //获取出金明细
            assa(res){
                this.list2=res.data.data.time;
                this.list2.forEach((f,index)=>{
                    if(index%2==0){
                        let str=f.substring(0,10);
                        this.list3.push(str)
                    }
                });
                this.list4=res.data.data.profit;
                this.list4.forEach((f,index)=>{
                    if(index%2==0){
                        this.list5.push(f);
                        this.max=this.list5[0];
                        for(var i = 1; i < this.list5.length; i++) {
                            var cur = this.list5[i];
                            cur > this.max ? this.max = cur : null
                        }
                    }
                });
                sessionStorage.setItem('pro',JSON.stringify(this.list5));
                sessionStorage.setItem('pro1',JSON.stringify(this.list3))
            },

            //获取公告
            getAdd(res){
                this.list1=res.data.data.list;
            },

            //画echarts1
            drawLine(){
                var echarts = require('echarts');
                this.myChart = echarts.init(document.getElementById('myChart'));
                var data =JSON.parse(sessionStorage.getItem('pro'));
                var yMax = this.max+1;
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
                        // axisLine: {
                        //     show: false
                        // },
                        data: JSON.parse(sessionStorage.getItem('pro1'))
                    },
                    yAxis: {
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['#eee'],
                                width: 1,
                                type: 'solid'
                            }
                        },
                        // axisLine: {
                        //     show: false
                        // },
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
                                    color: '#00A0FF'
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

            //画echarts2
            drawLine1(){
                var echarts1 = require('echarts');
                this.myChart1 = echarts1.init(document.getElementById('myChart1'));

                var data1= [820, 932, 901, 934, 1290, 1330, 1320];
                var yMax1=Math.max.apply(null,data1)+50;
                var dataShadow1 = [];

                for (var i = 0; i < data1.length; i++) {
                    dataShadow1.push(yMax1);
                }

                var option1 = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            },
                        },
                        textStyle:{
                            color:'rgba(0,160,255,1)',
                            fontSize:14,
                            fontWeight:'bold',
                            fontFamily:'Source Han Sans CN'
                        },
                        position:function (p) {
                            return [p[0]-34,p[1]-64]
                        },
                        formatter: function (params) {

                            var res='<div><p>'+params[0].name+'</p></div>'
                            res+='<p>盈利:'+params[2].data+'</p>'
                            return res;
                        },
                        backgroundColor:'transparent',

                    },
                    grid: {
                        left:0,
                        top:'10px',
                        bottom:0,
                        right: '6%',
                        containLabel: true
                    },
                    xAxis: {
                        axisLine: {
                            show: false
                        },
                        boundaryGap:false,
                        axisLabel:{
                          interval:0
                        },
                        axisTick: {show: false},
                        data: ['2012', '2013', '2014', '2015', '2016', '2017']
                    },
                    yAxis: {
                        min:0,
                        splitLine:{
                            show: true,
                            lineStyle:{
                                color:'#eee',
                                opacity:'0.4'
                            }
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color:'rgba(102,102,102,1)',
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
                            data: dataShadow1,
                            animation: false
                        },
                        {
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: 'transparent'
                                },
                            },
                            data: data1
                        },
                        {
                            type: 'line',
                            smooth:true,
                            itemStyle: {
                                normal: {
                                    color: '#00A0FF',
                                    lineStyle:{
                                        width:4
                                    }
                                },
                            },
                            data: data1
                        }
                    ]
                };
                this.myChart1.setOption(option1);
                window.addEventListener("resize", function() {
                    this.myChart1.resize;
                });

            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //个人信息
            infor(res){
                if(res.data.code==0){
                    this.status=res.data.data.card.status;
                    this.IBM_id=res.data.data.user.userId;
                    if(this.status==0 && sessionStorage.getItem('isFeed1')=='true'){
                        // this.centerDialogVisible=true;
                        this.$confirm(this.$t('please_infor'), this.$t('prompt'), {
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
                        sessionStorage.setItem('isFeed1',false);
                    }
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            //配套列表
            getM(){
                this.ajaxC('/matching/getUserMt4s',{},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.create_time,time:f.mat_name,ID:f.money,yl:parseFloat(f.mtMin*100).toFixed(0)+'%~'+parseFloat(f.mtMax*100).toFixed(0)+'%',name:f.mt4_user,phone:f.password,bankName
                                :f.mt4_money===null?'--':f.mt4_money,money:f.mt4_out==null?'--':f.mt4_out,address:f.mt4_get,sea:f.status2==0?'正常':'锁定',id:f.id,suo:f.status2==0?1:2})
                    });
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases(this.$t('login_wrong'))
                }
            },


            //获得电子钱包，注册钱包，现金钱包
            getPay(res){
                this.rp=this.moneyToFloat(res.data.data.rp);
                this.ap=this.moneyToFloat(res.data.data.ap);
                this.cp=this.moneyToFloat(res.data.data.cp);
            },

            //充值按钮
            invest(){
                sessionStorage.setItem('type',5);
                sessionStorage.setItem('type1',11);
                sessionStorage.setItem('style',5);
                sessionStorage.setItem('up',5);
                this.reload();
                this.$router.push('/Deposit/deposit');
            },
            //跳转账号出金
            Withdraw(){
                sessionStorage.setItem('type',6);
                sessionStorage.setItem('type1',19);
                sessionStorage.setItem('style',6);
                sessionStorage.setItem('up',6);
                this.reload();
                this.$router.push('/Gold/gold');
            },
        },
        watch:{
            s_1(val,old){
                if(val==2){
                    this.$nextTick(()=> {
                        //画echarts1
                        this.drawLine();
                    })
                }
            },
            sesstype(val,old){
                this.$nextTick(()=> {
                    //画echarts1
                    this.drawLine();
                })
            },
            list3(val,old){
                this.$nextTick(()=> {
                    //画echarts1
                    this.drawLine();
                })
            }
        }

    }
</script>

<style scoped>
  @import "../assets/css/page.css";
</style>
