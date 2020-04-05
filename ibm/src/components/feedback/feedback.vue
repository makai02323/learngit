<template>
    <div class="page_box">
        <div class="feed_title">
            <h1>{{$t('home_menu8_1')}}</h1>
        </div>
        <div class="feed_con">
            <div class="from_group">
                <label for="">{{$t('title')}}</label>
                <input v-model="input1" type="text" :placeholder="$t('please_title')">
            </div>
            <div class="from_group">
                <label for="">{{$t('content')}}</label>
                <textarea v-model="input2" :placeholder="$t('please_content')"></textarea>
            </div>
            <div class="from_group">
                <label for="">{{$t('picture')}}</label>
                <el-upload
                    v-if="IP==1"
                    action="http://ceshiapi.ibmcapital.co:11111/ibm/file/upload"
                    :data="updata"
                    list-type="picture-card"
                    :on-change="fileChange"
                    :on-success="getP"
                    multiple
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-upload
                    v-if="IP==2"
                    action="http://ceshiapi.ibmcapital.co:11131/ibm/file/upload"
                    :data="updata"
                    list-type="picture-card"
                    :on-change="fileChange"
                    :on-success="getP"
                    multiple
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="from_group">
                <label for=""></label>
                <div @click="sub()" class="btn">{{$t('bank_sure')}}</div>
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
        name: "feedback",
        data(){
          return {
              dialogImageUrl: '',
              dialogVisible: false,
              updata:{
                  token:'',
                  Filedata:''
              },
              list:{},
              data:'',
              input1:'',
              input2:'',
              isShow:false,
              msg:'',
              IP:1
          }
        },
        mounted(){
            this.list=JSON.parse(sessionStorage.getItem('trans_user_userInfor'));
            this.updata.token=this.list.token;

            // 判断是国内团队还是国外团队,从而用不同的上传地址
            if(JSON.parse(sessionStorage.getItem('trans_user_userInfor')).user.deptId==11){
                this.IP=1;
            }else if(JSON.parse(sessionStorage.getItem('trans_user_userInfor')).user.deptId==31){
                this.IP=2;
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            fileChange(file){
                let a=file.raw;
                this.updata.Filedata=a;
            },
            getP(response, file, fileList){
                this.data=response.data[0];
            },
            sub(){
                if(this.input1==''){
                    this.case(this.$t('zero_title'))
                }else if(this.input2==''){
                    this.case(this.$t('zero_content'))
                }else{
                    let data={
                        title:this.input1,
                        content:this.input2,
                        cion:this.data,
                    }
                    this.ajaxE('/system/addFeed',data,'post',this.ok)
                }
            },
            ok(res){
                if(res.data.code==0){
                    this.case(this.$t('send_success'));
                    this.input1='';
                    this.input2='';
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            }
        }
    }
</script>

<style scoped>
@import "../../assets/css/feedback.css";
</style>
