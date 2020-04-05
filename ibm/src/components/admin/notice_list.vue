<template>
    <div class="page_box">
        <div class="cash_title">
            <h1 v-if="type1==1 && type2==1">公告列表</h1>
            <h1 v-if="type1==2 && type2==1">公告详情</h1>
            <h1 v-if="type1==2 && type2==2">添加公告</h1>
        </div>
        <div v-if="type1==1">
            <div class="cash_top">
                <el-button type="primary" @click="type1=2,type2=2,add()">添加</el-button>
                <div class="cash_input">
                    <el-select v-model="value1" @change="change1">
                        <el-option
                            v-for="item in list1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!--<el-select v-model="value2" @change="change2">-->
                        <!--<el-option-->
                            <!--v-for="item in list2"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
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
                            label="创建时间">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="标题">
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--prop="ID"-->
                            <!--label="分类">-->
                        <!--</el-table-column>-->
                        <el-table-column
                            prop="name"
                            label="语言">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="排序">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="type1=2,type2=1,handleEdit(scope.row)">编辑</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelte(scope.row)">删除</el-button>
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
            <div class="wallet_con wallet_con1">
                <!--<div class="from_group">-->
                    <!--<label for="">分类</label>-->
                    <!--<el-select v-model="value3">-->
                        <!--<el-option-->
                            <!--v-for="item in list3"-->
                            <!--:key="item.value"-->
                            <!--:label="item.label"-->
                            <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</div>-->
                <div class="from_group">
                    <label for="">语言</label>
                    <el-select v-model="value4">
                        <el-option
                            v-for="item in list4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="from_group">
                    <label for="">排序</label>
                    <el-input
                        placeholder="序号"
                        v-model="input"
                        clearable>
                    </el-input>
                </div>
                <div class="from_group from_group_list">
                    <label for="">标题</label>
                    <el-input
                        placeholder="标题"
                        v-model="input1"
                        clearable>
                    </el-input>
                </div>
                <div class="from_group from_group_list1">
                    <label for="">内容</label>
                    <!--<mavon-editor class="mavon" ref=md v-model="value5"/>-->
                    <div class="edit_container">
                        <quill-editor
                            v-model="value5"
                            ref="myQuillEditor"
                            :options="editorOption"
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                        </quill-editor>
                    </div>
                </div>
                <div class="from_group from_group_code">
                    <label style="line-height: 40px" for="">验证码</label>
                    <span>
                        <el-input
                            placeholder="请输入验证码"
                            v-model="input5"
                        >
                        </el-input>
                        <b v-show="code==1" @click="getCode()">{{$t('get_code')}}</b>
                        <b v-show="code==2">{{num1}}S</b>
                     </span>
                </div>
                <div class="from_group">
                    <label for=""></label>
                    <el-button type="primary" @click="gosure()">提交</el-button>
                    <el-button @click="type1=1,type2=1,goBak()">返回</el-button>
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
        name: "cash",
        data(){
            return {
                //toolbarsFlag: false,
                sel:true,
                value1:0,
                value2:0,
                value3:0,
                value4:1,
                value5:'',
                input5:'',
                input:'',
                input1:'',
                list:[],
                list1:[
                    {
                        label:'全部',
                        value:0
                    },
                    {
                        label:'中文',
                        value:1
                    },
                    {
                        label:'English',
                        value:2
                    },
                    {
                        label:'日本語',
                        value:3
                    }
                ],
                list2:[
                    {
                        label:'全部',
                        value:0
                    },
                    {
                        label:'partner',
                        value:1
                    },
                    {
                        label:'login',
                        value:2
                    }
                ],
                list3:[
                    {
                        label:'partner',
                        value:0
                    },
                    {
                        label:'login',
                        value:1
                    },
                    {
                        label:'partner&login',
                        value:2
                    }
                ],
                list4:[
                    {
                        label:'中文',
                        value:1
                    },
                    {
                        label:'English',
                        value:2
                    },
                    {
                        label:'日本語',
                        value:3
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
                staus:['','中文','English','日本語'],
                type1:1,
                val:'',
                title:'',
                content:'',
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
                editorOption: {
                    modules:{
                        toolbar:[
                            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                            ['blockquote', 'code-block'],     //引用，代码块


                            // [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                            // [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标

                            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题


                            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                            [{ 'font': [] }],     //字体
                            [{ 'align': [] }],    //对齐方式
                        ]
                    }
                }
            }
        },
        mounted(){
            this.getM();

            this.list=JSON.parse(sessionStorage.getItem('trans_user_userInfor'));
            this.updata.token=this.list.token;
            this.phone=this.list.user.mobile;
        },
        methods:{
            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(){}, // 获得焦点事件
            onEditorChange(){}, // 内容改变事件

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //提交
            gosure(){
                if(type1==2 && type2==1){
                    let data={
                        title:this.input1,
                        content:this.value5,
                        id:this.id,
                        type:this.value4,
                        code:this.input5,
                        whole:this.input
                    };
                    //this.ajaxE('/system/addReply',data,'post',this.sur)
                }
            },
            sur(res){
                if(res.data.code==0){
                    this.case('提交成功');
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases(res.data.msg);
                }else{
                    this.isShow=true;
                    this.case(res.data.msg);
                }
            },
            //返回
            goBak(){
                this.getM();
            },

            //获取验证码
            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{contactNumber:this.phone,type:1},'get',this.getP2)
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
                    this.cases(res.data.msg);
                }else{
                    this.isShow=true;
                    this.case(res.data.msg);
                }
            },
            //增加
            add(){
                this.input='';
                this.input1='';
                this.value4=1;
                this.value5='';
            },

            //编辑
            handleEdit(a){
                this.id=a.id;
                this.input=a.phone;
                this.input1=a.time;
                this.value4=this.staus[a.lanage];
                this.value5=a.content;
                this.ajaxC('/system/getNotices',{id:a.id},'get',this.ge);
            },

            ge(res){
                if(res.data.code==0){

                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //删除
            handleDelte(a){
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(({ value }) => {
                    this.ajaxE('/system/deleteNotices',{id:a.id},'post',this.delete)
                })
            },
            delete(res){
                if(res.data.code==0){
                    this.case('删除成功');
                    this.getM();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },


            getM(){
                this.type=1;
                this.ajaxC('/system/getNotices',{id:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.createTime,time:f.title,name:this.staus[f.type],phone
                                :f.whole,content:f.content,id:f.id,lanage:f.type})
                    });
                    this.total=res.data.data.total
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
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
                this.ajaxC('/system/getNotices',{type:this.value1,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.createTime,time:f.title,name:this.staus[f.type],phone
                                :f.whole,content:f.content,id:f.id})
                    });
                    this.total1=res.data.data.total;
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
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

            // change2(){
            //     this.type=3;
            //     this.ajaxC('/system/selectFeedback',{type:this.value3,startTime:this.value1,endTime:this.value2,pageNum:this.currentPage2,pageSize:this.currentCount2},'get',this.ok2)
            // },
            // ok2(res){
            //     this.tableData=[];
            //     if(res.data.code==0){
            //         res.data.data.list.forEach((f)=>{
            //             this.tableData.push({date:f.create_time,time:f.username,ID:f.user_id,name:f.title,phone
            //                     :this.staus[f.status],content:f.content,id:f.id})
            //         });
            //         this.total2=res.data.data.total;
            //     }else if(res.data.code==4){
            //         this.isShow=true;
            //         this.cases1(this.$t('login_wrong'))
            //     }
            // },
            // handleSizeChange2(val) {
            //     this.currentCount2=val;
            //     this.change2();
            // },
            // handleCurrentChange2(val) {
            //     this.currentPage2=val;
            //     this.change2();
            // },
        }
    }
</script>

<style scoped>
    @import "../../assets/css/cash.css";
    @import "../../assets/css/wallet.css";
    .from_group .div_inline{
        display: inline-block;
        flex: 1;
    }
    .from_group label{
        width: 56px;
        text-align: left;
        line-height: 40px;
    }
    .from_group{
        display: flex;
    }
    .from_group_list1{
        display: flex;
    }
    .wallet_con{
        padding: 40px;
        height: auto;
    }
    .edit_container{
        flex: 1;
    }
    /*.from_group_code{*/
        /*margin-top: 20px;*/
    /*}*/
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
        ::-webkit-scrollbar {
            width: 100%;
            height: 6px;
        }
        .from_group_list1{
            display: block;
        }
    }
    @media (max-width: 480px){
        .wallet_con{
            padding: 10px;
        }
        .wallet_con .el-input{
            width: 230px;
        }
        .from_group label{
            margin-right: 0;
        }
    }
</style>
