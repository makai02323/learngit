<template>
    <div class="page_box">
        <div class="cash_title">
            <h1 v-if="type1==1">推荐列表</h1>
            <h1 v-if="type1==2">修改状态</h1>
            <h1 v-if="type1==3">新增可查看推荐列表会员</h1>
        </div>
        <div v-if="type1==1">
            <div class="cash_top">
                <el-button type="primary" @click="type1=3">添加</el-button>
                <div class="cash_input">
                    <el-select v-model="value1" @change="change1">
                        <el-option
                            v-for="item in list1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select v-if="value1==0" v-model="value2" @change="change2">
                        <el-option
                            v-for="item in list2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="cash_input">
                    <el-input
                        placeholder="请输入用户ID"
                        v-model="input2"
                        clearable>
                    </el-input>
                    <b @click="sou()">搜索</b>
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
                            label="用户ID">
                        </el-table-column>
                        <el-table-column
                            prop="ID"
                            label="用户名">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="开始时间">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="结束时间">
                        </el-table-column>
                        <el-table-column
                            prop="stats"
                            label="开放状态">
                        </el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="type1=2,handleEdit(scope.row)">编辑</el-button>
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
            <div v-show="type==4" class="fen">
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
        <div v-if="type1==2">
            <div class="wallet_con wallet_con1">
                <div class="from_group">
                    <label for="">开放类型</label>
                    <el-select v-model="value3" @change="change3">
                        <el-option
                            v-for="item in list3"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="from_group from_group_time" v-if="type2==2">
                    <label for="">开放时间</label>
                    <el-date-picker
                        v-model="value4"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="from_group from_group_time" v-if="type2==3">
                    <label for="">开放时间</label>
                    <el-date-picker
                        v-model="value6"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </div>
                <div class="from_group">
                    <label for="">获取验证码方式</label>
                    <el-radio v-model="radio" label="1">手机短信</el-radio>
                    <el-radio v-model="radio" label="2">邮箱</el-radio>
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
        <div v-if="type1==3">
            <div class="wallet_con wallet_con1">
                <div class="from_group">
                    <label for="">用户ID</label>
                    <el-input
                        placeholder="请输入用户ID"
                        v-model="input6"
                        clearable>
                    </el-input>
                </div>
                <div class="from_group">
                    <label for="">开放类型</label>
                    <el-select v-model="value7" @change="change4">
                        <el-option
                            v-for="item in list7"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="from_group from_group_time" v-if="type2==4">
                    <label for="">开放时间</label>
                    <el-date-picker
                        v-model="value8"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="from_group from_group_time" v-if="type2==5">
                    <label for="">开放时间</label>
                    <el-date-picker
                        v-model="value9"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </div>
                <div class="from_group">
                    <label for="">获取验证码方式</label>
                    <el-radio v-model="radio2" label="1">手机短信</el-radio>
                    <el-radio v-model="radio2" label="2">邮箱</el-radio>
                </div>
                <div class="from_group from_group_code">
                    <label style="line-height: 40px" for="">验证码</label>
                    <span>
                        <el-input
                            placeholder="请输入验证码"
                            v-model="input7"
                        >
                        </el-input>
                        <b v-show="code1==1" @click="getCode1()">{{$t('get_code')}}</b>
                        <b v-show="code1==2">{{num2}}S</b>
                     </span>
                </div>
                <div class="from_group">
                    <label for=""></label>
                    <el-button type="primary" @click="gosure1()">提交</el-button>
                    <el-button @click="type1=1,type2=1,goBak()">返回</el-button>
                </div>
            </div>
        </div>

        <!--点删除-->
        <div class="feed_history">
            <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="320px"
                center>
                <el-scrollbar style="height:100%">
                    <div class="history history1">
                        <h1>获取验证码方式</h1>
                        <el-radio v-model="radio1" label="1">手机短信</el-radio>
                        <el-radio v-model="radio1" label="2">邮箱</el-radio>
                        <div class="from_group">
                            <label for="#">验证码</label>
                            <span>
                                <el-input
                                    placeholder="请输入验证码"
                                    v-model="input4"
                                >
                                </el-input>
                                <b v-show="code2==1" @click="getCode2()">{{$t('get_code')}}</b>
                                <b v-show="code2==2">{{num3}}S</b>
                            </span>
                        </div>
                    </div>
                </el-scrollbar>
                <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false,goH()">确 定</el-button>
            </span>
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
                value1:0,
                value2:1,
                value3:1,
                value4:'',
                value5:'',
                value6:'',
                value7:1,
                value8:'',
                value9:'',
                input4:'',
                input5:'',
                input6:'',
                input7:'',
                input:'',
                input1:'',
                input2:'',
                list:[],
                list1:[
                    {
                        label:'未永久开放',
                        value:0
                    },
                    {
                        label:'永久开放',
                        value:1
                    }
                ],
                list2:[
                    {
                        label:'目前开放',
                        value:1
                    },
                    {
                        label:'目前未开放',
                        value:2
                    }
                ],
                list3:[
                    {
                        label:'永久开放',
                        value:1
                    },
                    {
                        label:'开放一天',
                        value:2
                    },
                    {
                        label:'指定开放时间',
                        value:3
                    }
                ],
                list7:[
                    {
                        label:'永久开放',
                        value:1
                    },
                    {
                        label:'开放一天',
                        value:2
                    },
                    {
                        label:'指定开放时间',
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
                staus:['未回复','已回复'],
                type1:1,
                val:'',
                title:'',
                content:'',
                type2:1,
                phone:'',
                code:1,
                num1:60,
                code1:1,
                num2:60,
                code2:1,
                num3:60,
                id:'',
                list8:['未永久开放','永久开放'],
                radio:'1',
                radio1:'1',
                radio2:'1',
                centerDialogVisible:false,
            }
        },
        mounted(){
            this.getM();

        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //增加提交
            gosure1(){
                let a,b;
                if(this.value7==1){
                    a='';
                    b='';
                }else if(this.value7==2){
                    a=this.value8;
                    b=this.value8;
                }else{
                    a=this.value9[0];
                    b=this.value9[1];
                }
                let data={
                    uId:this.input6,
                    startTime:a,
                    endTime:b,
                    type:this.value7,
                    code:this.input7,
                    codeType:this.radio2,
                };
                this.ajaxE('/system/addOrganization',data,'post',this.addSur)
            },
            addSur(res){
                if(res.data.code==0){
                    this.case('增加成功');
                    this.input6='';
                    this.input7='';
                    this.radio2='1';
                }else if(res.data.code==4){
                    this.cases1(res.data.msg);
                }else{
                    this.isShow=true;
                    this.case(res.data.msg);
                }
            },

            //修改提交
            gosure(){
                let a,b;
                if(this.value3==1){
                    a='';
                    b='';
                }else if(this.value3==2){
                    a=this.value4;
                    b=this.value4;
                }else{
                    a=this.value6[0];
                    b=this.value6[1];
                }
                let data={
                    id:this.id,
                    startTime:a,
                    endTime:b,
                    type:this.value3,
                    code:this.input5,
                    codeType:this.radio,
                };
                this.ajaxE('/system/updateOrganization',data,'post',this.sur)
            },
            sur(res){
                if(res.data.code==0){
                    this.case('修改成功');
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
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio},'get',this.getP2)
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
                    this.cases(res.data.msg);
                }else{
                    this.isShow=true;
                    this.case(res.data.msg);
                }
            },
            //获取验证码1
            getCode1(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio2},'get',this.getP3)
            },
            getP3(res){
                if(res.data.code==0){
                    this.isShow=true;
                    this.case(this.$t('get_code1'));
                    this.code1=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num2--;
                        if(the.num2<=0){
                            the.num2=60;
                            the.code1=1;
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
            //获取验证码2
            getCode2(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio1},'get',this.getP4)
            },
            getP4(res){
                if(res.data.code==0){
                    this.case(this.$t('get_code1'));
                    this.code2=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num3--;
                        if(the.num3<=0){
                            the.num3=60;
                            the.code2=1;
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

            //编辑
            handleEdit(a){
                this.id=a.id;
                this.input5='';
            },


            //删除
            handleDelte(a){
                this.id=a.id;
                this.centerDialogVisible=true;
            },
            //确认删除
            goH(){
                let data={
                    id:this.id,
                    code:this.input4,
                    type:this.radio1
                }
                this.ajaxE('/system/delectOrganization',data,'post',this.delete);
                this.input4='';
            },
            delete(res){
                if(res.data.code==0){
                    this.case('删除成功');
                    this.value1=0;
                    this.getM();
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },


            getM(){
                this.type=1;
                this.ajaxC('/system/selectOrganization',{uId:'',status:this.value2,type:this.value1,pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.time,time:f.user_id,ID:f.username,name:f.start_time,phone
                                :f.end_time,stats:this.list8[f.type],id:f.id})
                    });
                    this.total=res.data.data.total;
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
                let a;
                if(this.value1==1){
                    a=''
                }else{
                    a=this.value2
                }
                this.ajaxC('/system/selectOrganization',{uId:this.input2,status:a,type:this.value1,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.time,time:f.user_id,ID:f.username,name:f.start_time,phone
                                :f.end_time,stats:this.list8[f.type],id:f.id})
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

            change2(){
                this.type=3;
                this.ajaxC('/system/selectOrganization',{uId:this.input2,status:this.value2,type:this.value1,pageNum:this.currentPage2,pageSize:this.currentCount2},'get',this.ok2)
            },
            ok2(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.time,time:f.user_id,ID:f.username,name:f.start_time,phone
                                :f.end_time,stats:this.list8[f.type],id:f.id})
                    });
                    this.total2=res.data.data.total;
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
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

            sou(){
                this.type=4;
                this.ajaxC('/system/selectOrganization',{uId:this.input2,status:this.value2,type:this.value1,pageNum:this.currentPage3,pageSize:this.currentCount3},'get',this.ok3)
            },
            ok3(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.time,time:f.user_id,ID:f.username,name:f.start_time,phone
                                :f.end_time,stats:this.list8[f.type],id:f.id})
                    });
                    this.total3=res.data.data.total;
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
                }
            },
            handleSizeChange3(val) {
                this.currentCount3=val;
                this.sou();
            },
            handleCurrentChange3(val) {
                this.currentPage3=val;
                this.sou();
            },

            //指定时间、一天
            change3(){
              if(this.value3==1){
                  this.type2=1;
              }else if(this.value3==2){
                  this.type2=2;
              }else{
                  this.type2=3;
              }
            },
            //指定时间、一天
            change4(){
                if(this.value7==1){
                    this.type2=1;
                }else if(this.value7==2){
                    this.type2=4;
                }else{
                    this.type2=5;
                }
            },
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
        width: 110px;
        text-align: left;
        line-height: 40px;
    }
    .from_group{
        display: flex;
    }
    .wallet_con{
        padding: 40px;
        height: auto;
    }
    .from_group b{
        top: 5px;
    }
    .history label{
        text-align: left;
    }
    .history h1+label{
        width: 100px;
    }
    .history h1{
        margin-bottom: 20px;
        font-family:Source Han Sans CN;
    }
    .history label+label{
        width: 100px;
        margin-left: 30px;
    }
    .history .from_group{
        margin-top: 20px;
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
        .mavon{
            min-height: 500px;
        }
        .wallet_con{
            padding: 10px;
        }
    }
</style>
