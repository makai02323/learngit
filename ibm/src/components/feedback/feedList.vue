<template>
    <div class="page_box">
        <div class="cash_title">
            <h1 v-if="type1==1">{{$t('home_menu8_2')}}</h1>
            <h1 v-if="type1==2">{{$t('admin_10')}}</h1>
        </div>
        <div v-if="type1==1">
            <div class="cash_top">
                <el-date-picker
                    v-model="value1"
                    @change="change"
                    type="date"
                    value-format="yyyy-MM-dd"
                    :placeholder="$t('start_time')">
                </el-date-picker>
                <span>至</span>
                <el-date-picker
                    v-model="value2"
                    type="date"
                    @change="change1"
                    value-format="yyyy-MM-dd"
                    :disabled="sel"
                    :placeholder="$t('end_time')">
                </el-date-picker>
                <div class="cash_input">
                    <el-select v-model="value3" @change="change2">
                        <el-option
                            v-for="item in list2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="cash_con">
                <table width="100%">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            :label="$t('feed_back')">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            :label="$t('feed_users')">
                        </el-table-column>
                        <el-table-column
                            prop="ID"
                            :label="$t('user_id')">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            :label="$t('feed_title')">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            :label="$t('MT4_status')">
                        </el-table-column>
                        <el-table-column :label="$t('need_do')" width="200">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="type1=2,handleEdit(scope.row)">{{$t('look')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </table>
            </div>
            <div v-show="type==1" class="fen">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="currentCount"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>

            <div v-show="type==2" class="fen">
                <el-pagination
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="currentCount1"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total1">
                </el-pagination>
            </div>
            <div v-show="type==3" class="fen">
                <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage2"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="currentCount2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total2">
                </el-pagination>
            </div>
        </div>
        <div v-if="type1==2">
            <div class="wallet_con">
                <div class="from_group">
                    <label for="">{{$t('feed_title')}}</label>
                    <span v-html="title">{{title}}</span>
                </div>
                <div class="from_group">
                    <label for="">{{$t('feed_content')}}</label>
                    <div class="div_inline" v-html="content">{{content}}</div>
                </div>
                <div class="from_group">
                    <label for="">{{$t('feed_picture')}}</label>
                    <img :src="img" alt="" @click="dialogVisible=true">
                </div>
                <div class="from_group from_group_list">
                    <label for="">{{$t('feed_list')}}</label>
                    <div v-if="type2==2" class="div_list">
                        <div class="feed_list">
                            <div v-for="item in list4">
                                <span>{{$t('feed_content1')}}:</span>
                                <p><span v-html="item.content">{{item.content}}</span><img v-bind:class="{let:item.cion===null}" :src="item.cion" @click="dialogVisible2=true,img2=item.cion" alt=""></p>
                                <span>{{$t('feed_time')}}：{{item.createTime}}</span>
                            </div>
                        </div>
                        <div class="fen">
                            <el-pagination
                                @size-change="handleSizeChange3"
                                @current-change="handleCurrentChange3"
                                :current-page="currentPage3"
                                :page-sizes="[10, 20, 30, 40]"
                                :page-size="currentCount3"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total3">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="from_group from_group_list1">
                    <label for="">{{$t('feed_content1')}}</label>
                    <el-input
                        type="textarea"
                        :rows="7"
                        :placeholder="$t('please_content')"
                        v-model="value4">
                    </el-input>
                </div>
                <div class="from_group">
                    <label for="">{{$t('picture')}}</label>
                    <el-upload
                        v-if="IP==1"
                        class="upload-demo"
                        :data="updata"
                        show-file-list="false"
                        :on-change="fileChange"
                        action="http://ceshiapi.ibmcapital.co:11111/ibm/file/upload"
                        :on-success="getP"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture-card">
                    </el-upload>
                    <el-upload
                        v-if="IP==2"
                        class="upload-demo"
                        :data="updata"
                        show-file-list="false"
                        :on-change="fileChange"
                        action="http://ceshiapi.ibmcapital.co:11131/ibm/file/upload"
                        :on-success="getP"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        list-type="picture-card">
                    </el-upload>
                </div>
                <!--<div class="from_group">-->
                    <!--<label for="">{{$t('code_type')}}</label>-->
                    <!--<el-radio v-model="radio" label="1">{{$t('phone_note')}}</el-radio>-->
                    <!--<el-radio v-model="radio" label="2">{{$t('user_email')}}</el-radio>-->
                <!--</div>-->
                <!--<div class="from_group from_list">-->
                    <!--<label v-if="radio==1" for="#">{{$t('curr_phone')}}</label>-->
                    <!--<label v-if="radio==2" for="#">{{$t('curr_email')}}</label>-->
                    <!--<el-input-->
                        <!--:placeholder="$t('forget_phone')"-->
                        <!--v-model="input3"-->
                        <!--:disabled="true">-->
                    <!--</el-input>-->
                <!--</div>-->
                <!--<div class="from_group from_list">-->
                    <!--<label for="">{{$t('pass_code')}}</label>-->
                    <!--<span>-->
                        <!--<el-input-->
                            <!--:placeholder="$t('verification_code')"-->
                            <!--v-model="input5"-->
                        <!--&gt;-->
                        <!--</el-input>-->
                        <!--<b v-show="code==1" @click="getCode()">{{$t('get_code')}}</b>-->
                        <!--<b v-show="code==2">{{num1}}S</b>-->
                     <!--</span>-->
                <!--</div>-->
                <div class="from_group">
                    <label for=""></label>
                    <el-button type="primary" @click="gosure()">{{$t('bank_sure')}}</el-button>
                    <el-button @click="type1=1,goBak()">{{$t('home_back')}}</el-button>
                </div>
            </div>
        </div>

        <div class="alert_img">
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="img" alt="">
            </el-dialog>
            <el-dialog :visible.sync="dialogVisible1">
                <img width="100%" :src="img1" alt="">
            </el-dialog>
            <el-dialog :visible.sync="dialogVisible2">
                <img width="100%" :src="img2" alt="">
            </el-dialog>
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
        name: "cash",
        data(){
            return {
                //toolbarsFlag: false,
                sel:true,
                value1:'',
                value2:'',
                value3:1,
                value4:'',
                input3:'',
                input5:'',
                input:'',
                radio:'1',
                list:[],
                list1:[],
                list2:[
                    {
                        label:this.$t('no_back'),
                        value:0
                    },
                    {
                        label:this.$t('ok_back'),
                        value:1
                    }
                ],
                type:1,
                currentPage:1,
                currentCount:10,
                currentPage1:1,
                currentCount1:10,
                currentPage2:1,
                currentCount2:10,
                currentPage3:1,
                currentCount3:10,
                total:0,
                total1:0,
                total2:0,
                total3:0,
                isShow:false,
                msg:'',
                multipleSelection: [],
                tableData:[],
                staus:[this.$t('no_back'),this.$t('ok_back')],
                type1:1,
                val:'',
                title:'',
                content:'',
                img:'',
                img1:'',
                img2:'',
                list3:'',
                list4:[],
                dialogVisible:false,
                dialogVisible1:false,
                dialogVisible2:false,
                type2:1,
                fileList:[],
                updata:{
                    token:'',
                    Filedata:''
                },
                phone:'',
                code:1,
                num1:60,
                id:'',
                IP:1,
            }
        },
        mounted(){
            this.getM();

            this.list=JSON.parse(sessionStorage.getItem('trans_user_userInfor'));
            this.updata.token=this.list.token;
            this.phone=this.list.user.mobile;
            this.input3=this.list.user.mobile;

            // 判断是国内团队还是国外团队,从而用不同的上传地址
            if(JSON.parse(sessionStorage.getItem('trans_user_userInfor')).user.deptId==11){
                this.IP=1;
            }else if(JSON.parse(sessionStorage.getItem('trans_user_userInfor')).user.deptId==31){
                this.IP=2;
            }
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //获取验证码
            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{contactNumber:this.input3,type:this.radio},'get',this.getP1)
            },
            getP1(res){
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
                }else{
                    this.isShow=true;
                    this.case(this.$t(res.data.code));
                }
            },

            //提交
            gosure(){
                if(this.value4==''){
                    this.case(this.$t('zero_content'))
                }else{
                    let data={
                        content:this.value4,
                        feedbackId:this.id,
                        cion:this.img1[0],
                        type:0,
                        // codeType:this.radio,
                        // code:this.input5,
                    };
                    this.ajaxE('/system/addReply',data,'post',this.sur)
                }
            },
            sur(res){
                this.input5='';
                if(res.data.code==0){
                    this.case(this.$t('Gold_sure'));
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'))
                }else{
                    this.isShow=true;
                    this.cases(this.$t(res.data.code))
                }
            },
            //返回
            goBak(){
                this.currentPage=1;
                this.currentPage1=1;
                this.currentPage2=1;
                this.getM();
                this.value3=1;
            },


            //上传截图
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogVisible1 = true;
            },
            getP(response, file, fileList){
                this.img1=response.data;
            },
            fileChange(file){
                let a=file.raw;
                this.updata.Filedata=a;
            },

            //查看
            handleEdit(a){
                this.value4='';
                this.id=a.id;
                this.title=a.name;
                this.content=a.content;
                this.ajaxC('/system/selectReply',{feedbackId:a.id},'get',this.ge);
            },

            ge(res){
                if(res.data.code==0){
                    this.list3=res.data.datas;
                    this.list4=res.data.data.list;
                    if(res.data.data.total==0){
                        this.type2=1;
                    }else{
                        this.type2=2;
                    }
                    if(this.list3.cion==null || this.list3.cion==''){
                        this.img=''
                    }else{
                        this.img=this.list3.cion;
                    }
                    this.total3=res.data.data.total;
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            handleSizeChange3(val) {
                this.currentCount3=val;
            },
            handleCurrentChange3(val) {
                this.currentPage3=val;
            },

            change(){
                if(this.value1==null){
                    this.sel=true;
                    this.value2='';
                }else{
                    this.sel=false;
                }
            },

            getM(){
                this.type=1;
                this.ajaxC('/system/select',{type:1,startTime:'',endTime:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.create_time,time:f.username,ID:f.user_id,name:f.title,phone
                                :this.staus[f.status],content:f.content,id:f.id})
                    });
                    this.total=res.data.data.total
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'))
                }
            },

            handleSizeChange(val) {
                this.currentCount=val;
                this.getM();
            },
            handleCurrentChange(val) {
                this.currentPage=val;
                this.getM();
            },

            change1(){
                this.type=2;
                this.ajaxC('/system/select',{type:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.create_time,time:f.username,ID:f.user_id,name:f.title,phone
                                :this.staus[f.status],content:f.content,id:f.id})
                    });
                    this.total1=res.data.data.total
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'))
                }
            },
            handleSizeChange1(val) {
                this.currentCount1=val;
                this.change1();
            },
            handleCurrentChange1(val) {
                this.currentPage1=val;
                this.change1();
            },

            change2(){
                this.type=3;
                this.ajaxC('/system/select',{type:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage2,pageSize:this.currentCount2},'get',this.ok2)
            },
            ok2(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.create_time,time:f.username,ID:f.user_id,name:f.title,phone
                                :this.staus[f.status],content:f.content,id:f.id})
                    });
                    this.total2=res.data.data.total
                }else if(res.data.code==4){
                    this.cases(this.$t('login_wrong'))
                }
            },
            handleSizeChange2(val) {
                this.currentCount2=val;
                this.change2();
            },
            handleCurrentChange2(val) {
                this.currentPage2=val;
                this.change2();
            },
        },
        watch:{
            radio(val,old){
                if(val=='1'){
                    this.input3=this.list.user.mobile;
                }else{
                    this.input3=this.list.user.email;
                }
            }
        },
    }
</script>

<style scoped>
    @import "../../assets/css/cash.css";
    @import "../../assets/css/wallet.css";
    .from_group .div_inline{
        display: inline-block;
        flex: 1;
    }
    .from_group p .let{
        display: none!important;
    }
    .from_group label{
        width: 100px;
        text-align: left;
    }
    .from_list label{
        line-height: 40px;
    }
    .from_group{
        display: flex;
    }
    .from_group_list{
        display: block;
    }
    .from_group_list1{
        display: flex;
    }
    .wallet_con{
        padding: 40px;
        height: auto;
    }
    .from_group b{
        top: 5px;
    }
    @media (max-width: 1650px) {
        .cash_con{
            overflow-x: visible;
        }
        table{
            width: 100%;
        }
    }
    @media (max-width: 900px) {
        .cash_con{
            overflow-x: scroll;
        }
        table{
            width: 600px;
        }
        .cash_con ::-webkit-scrollbar {
            width: 100%;
            height: 6px;
        }
        .from_group_list1{
            display: block;
        }
    }
    @media (max-width: 480px){
        .mavon{
             min-height: 500px;
         }
        .wallet_con{
            padding: 10px;
        }
        .from_group label{
            width: 56px;
        }
        .from_list label{
            line-height: 20px;
        }
        label+label{
            line-height: 40px;
        }
        .from_group label+label+label{
            margin-left: 20px;
        }
        .wallet_con .el-input{
            width: 200px;
        }
    }
</style>
