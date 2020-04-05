<template>
    <div class="page_box">
        <div class="cash_title">
            <h1 v-if="type1==1 && type2==1">新闻资讯</h1>
            <h1 v-if="type1==2 && type2==1">新闻详情</h1>
            <h1 v-if="type1==2 && type2==2">添加公告</h1>
        </div>
        <div v-if="type1==1">
            <div class="cash_top">
                <el-button type="primary" @click="type1=2,type2=2,goAdd()">添加</el-button>
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
                            label="标题">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="创建时间">
                        </el-table-column>
                        <el-table-column
                            prop="ID"
                            label="链接">
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
            <div class="fen">
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

        </div>
        <div v-if="type1==2">
            <div class="wallet_con">
                <div class="from_group">
                    <label for="">标题</label>
                    <el-input
                        placeholder="标题"
                        v-model="input1"
                        clearable>
                    </el-input>
                </div>
                <div class="from_group">
                    <label for="">链接</label>
                    <el-input
                        placeholder="链接"
                        v-model="input2"
                        clearable>
                    </el-input>
                </div>
                <!--<div class="from_group">-->
                    <!--<label for="">预览图</label>-->
                    <!--<el-upload-->
                        <!--class="upload-demo"-->
                        <!--:data="updata"-->
                        <!--show-file-list="false"-->
                        <!--:on-change="fileChange"-->
                        <!--action="http://192.168.0.11:8080/file/upload"-->
                        <!--:on-success="getP"-->
                        <!--:on-preview="handlePictureCardPreview"-->
                        <!--:on-remove="handleRemove"-->
                        <!--:file-list="fileList"-->
                        <!--list-type="picture-card">-->
                    <!--</el-upload>-->
                <!--</div>-->
                <div class="from_group">
                    <label for=""></label>
                    <el-button type="primary" @click="gosure()">提交</el-button>
                    <el-button @click="type1=1,type2=1,goBak()">返回</el-button>
                </div>
            </div>
        </div>

        <div class="alert_img">
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="img" alt="">
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
                input:'',
                input1:'',
                input2:'',
                list:[],
                type:1,
                currentPage:1,
                currentCount:10,
                total:0,
                isShow:false,
                msg:'',
                multipleSelection: [],
                tableData:[],
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
                id:'',
                dialogVisible:false,
                img:'',
            }
        },
        mounted(){
            this.getM();

            this.list=JSON.parse(sessionStorage.getItem('trans_user_userInfor'));
            this.updata.token=this.list.token;
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //添加新闻
            goAdd(){
                this.input1='';
                this.input2='';
            },

            //上传截图
            // handleRemove(file, fileList) {
            //     console.log(file, fileList);
            // },
            // handlePictureCardPreview(file) {
            //     this.dialogVisible = true;
            // },
            // getP(response, file, fileList){
            //     this.img=response.data;
            // },
            // fileChange(file){
            //     let a=file.raw;
            //     this.updata.Filedata=a;
            // },

            //提交
            gosure(){
                if(this.type1==2 && this.type2==1){
                    let data={
                        id:this.id,
                        title:this.input1,
                        content:this.input2
                    };
                    this.ajaxE('/system/updateJou',data,'post',this.sur)
                }else{
                    if(this.input1==''){
                        this.case('标题不能为空')
                    }else if(this.input2==''){
                        this.case('内容不能为空')
                    }else{
                        let data={
                            title:this.input1,
                            content:this.input2
                        };
                        this.ajaxE('/system/setJou',data,'post',this.sur1)
                    }
                }

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
            sur1(res){
                if(res.data.code==0){
                    this.case('发布成功');
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

            //编辑
            handleEdit(a){
                this.input1=a.date;
                this.input2=a.content;
                this.id=a.id;
            },

            //删除
            handleDelte(a){
                this.$confirm('确定删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(({ value }) => {
                    this.ajaxE('/system/deleteJou',{id:a.id},'post',this.delete)
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
                this.ajaxC('/system/getJous',{id:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.title,time:f.time,ID:f.content,content:f.content,id:f.id})
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
    .mavon{
        z-index: 80;
        flex: 1;
        height: 500px;
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
