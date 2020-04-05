<template>
    <div class="page_box">
        <div class="tip_title">
            <h1>推荐列表</h1>
        </div>
        <div class="tip_con">
            <div class="tip_top">
                <el-input
                    placeholder="请输入用户ID"
                    v-model="input"
                    clearable>
                </el-input>
                <el-button type="primary" @click="sou()">搜索</el-button>
                <el-button type="primary" v-if="i>0" @click="goPre()">返回上一级</el-button>
            </div>
            <div class="line"></div>
            <div class="tip_middle">
                <h1>当前</h1>
                <div>
                    <div class="tip_middle_left">
                        <img :src="img" alt="">
                    </div>
                    <div class="tip_middle_right">
                        <h2><span>用户名：</span>{{user_name}}</h2>
                        <h2><span>用户ID：</span>{{user_id}}</h2>
                        <h2><span>会员等级：</span>{{member_leval}}</h2>
                        <h2><span>个人业绩：</span>{{person_results}}</h2>
                        <h2><span>团队业绩：</span>{{total_results}}</h2>
                        <h2><span>推荐人数：</span>{{tip_person}}</h2>
                        <h2><span>团队人数：</span>{{total_person}}</h2>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="tip_bottom">
                <h1>下级</h1>
                <div>
                    <div class="tip_next" v-for="item in list1" @click="goNext(item.user_id)">
                        <img :src="item.icon" alt="">
                        <h2>{{item.username}}</h2>
                        <p>{{item.user_id}}</p>
                    </div>
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
        name: "tip_lists",
        data(){
          return {
              input:'',
              isShow:false,
              msg:'',
              img:'',
              user_name:'',
              user_id:'',
              member_leval:'',
              person_results:0,
              total_results:0,
              tip_person:0,
              total_person:0,
              list:{},
              list1:[],
              i:0,
              list2:[],
              id:'',
          }
        },
        mounted(){
          this.getM()
        },
        methods:{
            getM(){
               this.ajaxC('/user/superGetUserInfo',{uuId:''},'get',this.ok)
            },
            ok(res){
                if(res.data.code==0){
                    this.list=res.data;
                    this.img=this.list.data.icon;
                    this.user_name=this.list.data.username;
                    this.user_id=this.list.data.user_id;
                    this.member_leval=this.list.data.name;
                    if(this.list.datas.totalDeposit==null){
                        this.person_results=0
                    }else{
                        this.person_results=this.moneyToFloat(this.list.datas.totalDeposit);
                    }
                    if(this.list.datas.totalDeposits==null){
                        this.total_results=0
                    }else{
                        this.total_results=this.moneyToFloat(this.list.datas.totalDeposits);
                    }
                    this.tip_person=this.list.datas.subordinateQuantity;
                    this.total_person=this.list.datas.number;
                    this.list1=this.list.datass;
                    this.list2[0]='';
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            //搜索
            sou(){
                this.ajaxC('/user/superGetUserInfo',{uuId:this.input},'get',this.ok)
            },

            //点击某个用户
            goNext(a){
                this.id=a;
                this.ajaxC('/user/superGetUserInfo',{uuId:a},'get',this.ok1)
            },
            ok1(res){
                if(res.data.code==0){
                    this.i++;
                    this.list=res.data;
                    this.img=this.list.data.icon;
                    this.user_name=this.list.data.username;
                    this.user_id=this.list.data.user_id;
                    this.member_leval=this.list.data.name;
                    if(this.list.datas.totalDeposit==null){
                        this.person_results=0
                    }else{
                        this.person_results=this.list.datas.totalDeposit;
                    }
                    if(this.list.datas.totalDeposits==null){
                        this.total_results=0
                    }else{
                        this.total_results=this.list.datas.totalDeposits;
                    }
                    this.tip_person=this.list.datas.subordinateQuantity;
                    this.total_person=this.list.datas.number;
                    this.list1=this.list.datass;
                    this.list2.push(this.id);
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            //点击返回上一步
            goPre(){
                this.i--;
                this.ajaxC('/user/superGetUserInfo',{uuId:this.list2[this.i]},'get',this.ok2)
            },
            ok2(res){
                if(res.data.code==0){
                    this.list=res.data;
                    this.img=this.list.data.icon;
                    this.user_name=this.list.data.username;
                    this.user_id=this.list.data.user_id;
                    this.member_leval=this.list.data.name;
                    if(this.list.datas.totalDeposit==null){
                        this.person_results=0
                    }else{
                        this.person_results=this.list.datas.totalDeposit;
                    }
                    if(this.list.datas.totalDeposits==null){
                        this.total_results=0
                    }else{
                        this.total_results=this.list.datas.totalDeposits;
                    }
                    this.tip_person=this.list.datas.subordinateQuantity;
                    this.total_person=this.list.datas.number;
                    this.list1=this.list.datass;
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

        }
    }
</script>

<style scoped>
@import "../assets/css/tip_lists.css";
</style>
