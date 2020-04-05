<template>
    <div class="page_box">
        <div class="invite_title">
            <h1>{{$t('home_menu4_1')}}</h1>
        </div>
        <div class="invite_con">
            <div>
                <div class="invite_top">
                    <h2>{{$t('invite_id')}}</h2>
                    <h1 id = "inviteCode">{{user_id}}</h1>
                    <p @click="doCopy()">{{$t('repeat_id')}}</p>
                </div>
                <div class="invite_middle">
                    <div ref="qrcode" ></div>
                    <h1>{{$t('repeat')}}</h1>
                    <p>{{$t('click_repeat')}}</p>
                </div>
                <div class="invite_bottom">
                    <h1>{{$t('please_repeat')}}：</h1>
                    <a :href="href" target="_blank">http://ceshi.ibmcapital.co/#/login?code={{inv}}&s_1=1&type1=1&adress={{deptId}}</a>
                    <!--<a href="http://192.168.0.123:8080/#/login?code=5tFOFv&s_1=1&type1=1">http://192.168.0.123:8080/#/login?code=5tFOFv&s_1=1&type1=1</a>-->
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
    import QRCode from 'qrcodejs2'
    export default {
        name: "invite",
        data(){
            return {
                user_id:'',
                list:{},
                isShow:false,
                msg:'',
                inv:'',
                href:'',
                deptId:'',
            }
        },
        mounted(){
            this.list=JSON.parse(sessionStorage.getItem('trans_user_userInfor'));
            this.user_id=this.list.user.userId;
            this.inv=this.list.user.invite;
            this.deptId=this.list.user.deptId;
            this.href='http://ceshi.ibmcapital.co/#/login?code='+this.inv+'&s_1=1&type1=1&adress='+this.deptId;

            // 生产二维码
            this.$nextTick(()=> {

                var canvas = this.$refs.qrcode;

                new QRCode(canvas, {

                    text: this.href,

                    width: 160,

                    height: 160,

                })
            })

        },
        methods:{
            doCopy(){
                var Url2 = document.getElementById("inviteCode").innerText;
                var oInput = document.createElement("input");
                oInput.value = Url2;
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                oInput.className = "oInput";
                oInput.style.display = "none";
                this.case(this.$t('page_copy_success'));
                this.c=2;
                var the=this;
                setTimeout(function () {
                    the.c=1;
                },1600)
            },

        }
    }
</script>

<style scoped>
@import "../../assets/css/invite.css";
</style>
