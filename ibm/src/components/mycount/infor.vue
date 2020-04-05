<template>
    <div class="page_box">
        <div class="infor_title">
            <h1>{{$t('home_menu2_1')}}</h1>
        </div>
        <div class="infor_top">
            <h1>{{$t('basic_infor')}}</h1>
            <div class="infor_content infor_content2">
                <div class="form_group">
                    <label for="">{{$t('true_name')}}</label>
                    <el-input
                        v-if="status1==1"
                        :placeholder="$t('true_name')"
                        v-model="input"
                        clearable>
                    </el-input>
                    <span v-if="status1==2">{{input}}</span>
                </div>
                <div class="form_group">
                    <label for="">{{$t('english_name')}}</label>
                    <el-input
                        v-if="status1==1"
                        :placeholder="$t('english_name')"
                        v-model="input1"
                        clearable>
                    </el-input>
                    <span v-if="status1==2">{{input1}}</span>
                </div>
                <div class="form_group form_group_radio">
                    <label for="">{{$t('customInfo_sexuality')}}</label>
                    <el-radio v-if="status1==1" v-model="radio" label="1">{{$t('man')}}</el-radio>
                    <el-radio v-if="status1==1" v-model="radio" label="0">{{$t('grail')}}</el-radio>
                    <span v-if="status1==2">{{mysex}}</span>
                </div>
                <div class="form_group">
                    <label for="">{{$t('phone1')}}</label>
                    <el-input
                        :placeholder="$t('phone1')"
                        v-if="status1==1"
                        v-model="input2"
                        :disabled="true">
                    </el-input>
                    <span v-if="status1==2">{{input2}}</span>
                </div>
            </div>
        </div>
        <div class="infor_top">
            <h1>{{$t('per_infor')}}</h1>
            <div class="infor_content infor_content1 infor_content2">
                <div class="form_group">
                    <label for="">{{$t('customInfo1')}}</label>
                    <el-select v-model="infor_sel" v-if="status1==1">
                        <el-option
                            v-for="item in list1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <span v-if="status1==2">{{person_type}}</span>
                </div>
                <div class="form_group">
                    <label for="">{{$t('card_type')}}</label>
                    <el-input
                        v-if="status1==1"
                        :placeholder="$t('card_type')"
                        v-model="input4"
                        clearable>
                    </el-input>
                    <span v-if="status1==2">{{input4}}</span>
                </div>
                <div class="form_group">
                    <label for="">{{$t('county')}}</label>
                    <!--<el-select class="sl_1" v-model="f_count.item" value-key="value" @change="countChange">-->
                        <!--<el-option-->
                            <!--v-for="item in list2"-->
                            <!--:key="item.value" -->
                            <!--:value="item" -->
                            <!--:label="item.label">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                    <el-select class="sl_1" v-model="f_count" @change="countChange" :disabled="status1==2">
                        <el-option
                            v-for="item in list2"
                            :key="item.value"
                            :value="item.value"
                            :label="item.label">
                        </el-option>
                    </el-select>
                    <el-select class="sl_2" v-model="f_count1" @change="countChange1" :disabled="status1==2">
                        <el-option
                            v-for="item in list3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select class="sl_3" v-model="f_count2" @change="countChange2" :disabled="status1==2">
                        <el-option
                            v-for="item in list4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="form_group">
                    <label for="">{{$t('customInfo_adress')}}</label>
                    <el-input
                        v-if="status1==1"
                        type="textarea"
                        :rows="2"
                        :placeholder="$t('customInfo_adress')"
                        v-model="input3"
                        clearable>
                    </el-input>
                    <span v-if="status1==2">{{input3}}</span>
                </div>
                <div class="form_group">
                    <label for="">{{$t('card_pre')}}</label>
                    <el-upload
                        v-if="imgType==1 && IP==1"
                        class="upload-demo"
                        :data="updata"
                        show-file-list="false"
                        :on-change="fileChange"
                        action="http://ceshiapi.ibmcapital.co:11111/ibm/file/upload"
                        :on-success="getP"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">{{$t('upload')}}</el-button>
                    </el-upload>
                    <el-upload
                        v-if="imgType==1 && IP==2"
                        class="upload-demo"
                        :data="updata"
                        show-file-list="false"
                        :on-change="fileChange"
                        action="http://ceshiapi.ibmcapital.co:11131/ibm/file/upload"
                        :on-success="getP"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">{{$t('upload')}}</el-button>
                    </el-upload>
                    <img class="img_show" v-if="imgType==2" :src="img" alt="">
                </div>
                <img class="img_hide" v-if="imgType==1" :src="img" alt="">
                <div class="form_group form_group1">
                    <label for="">{{$t('card_back')}}</label>
                    <el-upload
                        v-if="imgType==1 && IP==1"
                        class="upload-demo"
                        :data="updata1"
                        show-file-list="false"
                        :on-change="fileChange1"
                        action="http://ceshiapi.ibmcapital.co:11111/ibm/file/upload"
                        :on-success="getP1"
                        :file-list="fileList1"
                        list-type="picture">
                        <el-button size="small" type="primary">{{$t('upload')}}</el-button>
                    </el-upload>
                    <el-upload
                        v-if="imgType==1 && IP==2"
                        class="upload-demo"
                        :data="updata1"
                        show-file-list="false"
                        :on-change="fileChange1"
                        action="http://ceshiapi.ibmcapital.co:11131/ibm/file/upload"
                        :on-success="getP1"
                        :file-list="fileList1"
                        list-type="picture">
                        <el-button size="small" type="primary">{{$t('upload')}}</el-button>
                    </el-upload>
                    <img class="img_show" v-if="imgType1==2" :src="img1" alt="">
                </div>
                <img class="img_hide" v-if="imgType1==1" :src="img1" alt="">

                <div class="form_group form_group_type" v-if="status1==1">
                    <label for="">{{$t('code_type')}}</label><br>
                    <el-radio v-model="radio1" label="1">{{$t('phone_note')}}</el-radio>
                    <el-radio v-model="radio1" label="2">{{$t('user_email')}}</el-radio>
                </div>
                <div class="form_group" v-if="status1==1">
                    <label v-if="radio1==1" for="#">{{$t('curr_phone')}}</label>
                    <label v-if="radio1==2" for="#">{{$t('curr_email')}}</label>
                    <el-input
                        :placeholder="$t('phone1')"
                        v-model="input6"
                        :disabled="true">
                    </el-input>
                </div>
                <div class="form_group from_group2" v-if="status1==1">
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

                <div class="form_group">
                    <label for="">{{$t('MT4_status')}}</label>
                    <span>{{status}}</span>
                </div>
            </div>
        </div>
        <div v-if="status1==1" class="infor_btn" @click="goSure()">{{$t('bank_sure')}}</div>

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
        name: "infor",
        data(){
            return {
                input:'',
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:'',
                radio:'1',
                radio1:'1',
                list:{},
                code:1,
                num1:60,
                isShow:false,
                msg:'',
                list1:[
                    {
                        value: '1',
                        label: this.$t('ID_card')
                    },
                    {
                        value: '0',
                        label: this.$t('passport')
                    }
                ],
                infor_sel:'1',
                list2:[],
                list3:[],
                list4:[],
                f_count:'',
                f_count1:'',
                f_count2:'',
                // f_count: {
                //     item: {
                //
                //     }
                // },
                // f_count1: {
                //     item: {
                //
                //     }
                // },
                // f_count2: {
                //     item: {
                //
                //     }
                // },
                infor_sel2:'',
                infor_sel3:'',
                fileList:[],
                updata:{
                    token:'',
                    Filedata:''
                },
                img:'',
                fileList1:[],
                updata1:{
                    token:'',
                    Filedata:''
                },
                img1:'',
                imgType:1,
                imgType1:1,
                status:this.$t('no_pass'),
                states1:[this.$t('no_pass'),this.$t('check_pending'),this.$t('egis')],
                status1:1,
                mysex:'',
                mysex1:[this.$t('grail'),this.$t('man')],
                person_type:'',
                person_type1:[this.$t('passport'),this.$t('ID_card')],
                email:'',
                a:'',
                phone:'',
                IP:1,
            }
        },
        mounted(){



            this.list=JSON.parse(sessionStorage.getItem('trans_user_userInfor'));
            this.updata.token=this.list.token;
            this.updata1.token=this.list.token;

            // 判断是国内团队还是国外团队,从而用不同的上传地址
            if(JSON.parse(sessionStorage.getItem('trans_user_userInfor')).user.deptId==11){
                this.IP=1;
            }else if(JSON.parse(sessionStorage.getItem('trans_user_userInfor')).user.deptId==31){
                this.IP=2;
            }

            //返回所有国家
            this.ajaxC('/exhibition/getCountry',{code:'',type:1},'get',this.count);

            //获取个人信息
            this.ajaxC('/user/getUserInfo',{},'get',this.infor);
        },
        methods:{
            //个人信息
            infor(res){
                if(res.data.code==0){
                    this.input=res.data.data.card.name;
                    this.input1=res.data.data.card.englishName;
                    this.radio=res.data.data.card.sex+'';
                    this.infor_sel=res.data.data.card.cardType;
                    this.person_type=this.person_type1[res.data.data.card.cardType];
                    this.input4=res.data.data.card.cardNum;
                    this.f_count=res.data.data.card.country;
                    if(this.f_count==null){

                    }else{
                        this.ajaxF('/exhibition/getCountry',{code:this.f_count,type:1},'get',this.count1);
                    }
                    this.f_count1=res.data.data.card.province;
                    if(this.f_count1==null){

                    }else{
                        this.ajaxF('/exhibition/getCountry',{code:this.f_count1,type:1},'get',this.count2);
                    }
                    this.f_count2=res.data.data.card.city;
                    this.input3=res.data.data.card.address;
                    this.img=res.data.data.card.cardUrlJust;
                    this.img1=res.data.data.card.cardUrlBack;
                    if(res.data.data.card.status==0){
                        this.imgType=1;
                        this.imgType1=1;
                        this.status1=1;
                    }else{
                        this.imgType=2;
                        this.imgType1=2;
                        this.status1=2;
                    }
                    this.status=this.states1[res.data.data.card.status];
                    this.mysex=this.mysex1[res.data.data.card.sex];
                    this.input2=res.data.data.user.mobile;
                    this.input6=res.data.data.user.mobile;
                    this.phone=res.data.data.user.mobile;
                    this.a=res.data.data.user.mobile;
                    this.email=res.data.data.user.email;
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'));
                }
            },

            count(res){
                for(let i=0;i<res.data.data.length;i++){
                    this.list2.push({label:res.data.data[i].name,value:res.data.data[i].code,})
                }
            },
            countChange(){
                this.ajaxC('/exhibition/getCountry',{code:this.f_count,type:1},'get',this.count1)
            },
            count1(res){
                for(let i=0;i<res.data.data.length;i++){
                    this.list3.push({label:res.data.data[i].name,value:res.data.data[i].code,})
                }
            },
            countChange1(){
                this.ajaxC('/exhibition/getCountry',{code:this.f_count1,type:1},'get',this.count2)
            },
            count2(res){
                for(let i=0;i<res.data.data.length;i++){
                    this.list4.push({label:res.data.data[i].name,value:res.data.data[i].code,})
                }
            },
            countChange2(){
                // console.log(this.f_count2.item);
            },
            getP(response, file, fileList){
                this.img=response.data[0];
            },
            fileChange(file){
                let a=file.raw;
                this.updata.Filedata=a;
            },
            getP1(response, file, fileList){
                this.img1=response.data[0];
            },
            fileChange1(file){
                this.updata1.Filedata=file.raw;
            },

            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{contactNumber:this.a,type:this.radio1},'get',this.getP2)
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
                    this.isShow=true;
                    this.cases(this.$t('login_wrong'));
                }else{
                    this.isShow=true;
                    this.case(this.$t('res.data.code'));
                }
            },


            goSure(){
                if(this.input5==''){
                    this.case(this.$t('verification_code'))
                }else{
                    this.$prompt(this.$t('two_password'), this.$t('prompt'), {
                        confirmButtonText: this.$t('go_sure'),
                        inputValidator:val=>{
                            this.val=val;
                        },
                        cancelButtonText: this.$t('cancel'),
                        inputType:'password'
                    }).then(({ value }) => {
                        let data={
                            cardType:this.infor_sel,
                            cardNum:this.input4,
                            sex:this.radio,
                            englishName: this.input1,
                            name:this.input,
                            country:this.f_count,
                            province:this.f_count1,
                            city:this.f_count2,
                            address:this.input3,
                            cardUrlJust:this.img,
                            cardUrlBack:this.img1,
                            code:this.input5,
                            type:this.radio1,
                            securityPassword:this.val,
                        }
                        this.ajaxE('/user/updateUserInfo',data,'post',this.myFor)
                    })
                }
            },
            myFor(res){
                if(res.data.code==0){
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
        },
        watch:{
            radio1(val,old){
                if(this.radio1=='1'){
                    this.a=this.input2;
                    this.input6=this.input2;
                }else{
                    this.a=this.email;
                    this.input6=this.email;
                }
            }
        }
    }
</script>

<style scoped>
@import "../../assets/css/infor.css";
.form_group label{
    width: 120px;
}
.form_group label+label{
    width: 120px;
}
.form_group label+label+label {
    width: 100px;
}
@media (max-width: 480px) {
    .form_group label{
        width: 60px;
    }
    .form_group_radio label{
        width: 60px;
    }
    .form_group label+label{
        width: 90px;
    }
}
</style>
