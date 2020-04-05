<template>
    <div class="page_box">
        <div class="cash_title">
            <h1 v-if="type2==1">{{$t('admin_8')}}</h1>
            <h1 v-if="type2==2">{{$t('member_infor')}}</h1>
            <h1 v-if="type2==3">{{$t('modify_email')}}</h1>
            <h1 v-if="type2==4">{{$t('Change_phone')}}</h1>
            <h1 v-if="type2==5">{{$t('modify_phone')}}</h1>
            <h1 v-if="type2==6">{{$t('modify_leval')}}</h1>
            <h1 v-if="type2==7">{{$t('modify_next')}}</h1>
        </div>
        <div v-if="type2==1">
            <div class="cash_top cash_top1">
                <el-select v-model="value1">
                    <el-option
                        v-for="item in list1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value2">
                    <el-option
                        v-for="item in list2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <div class="cash_input">
                    <el-input
                        :placeholder="$t('user_ID1')"
                        v-model="value3"
                        clearable>
                    </el-input>
                    <b @click="sou()">{{$t('search')}}</b>
                </div>
            </div>
            <div class="cash_con cash_con1">
                    <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            :label="$t('user_id')">
                            <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            :label="$t('user_name')">
                        </el-table-column>
                        <el-table-column
                            prop="ID"
                            :label="$t('phone1')">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            :label="$t('login_phone1')">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            :label="$t('user_email')">
                        </el-table-column>
                        <el-table-column
                            prop="bankName"
                            :label="$t('name_1')">
                        </el-table-column>
                        <el-table-column
                            prop="money"
                            :label="$t('english_name')">
                        </el-table-column>
                        <el-table-column
                            prop="adress"
                            :label="$t('register_time')">
                        </el-table-column>
                        <el-table-column
                            prop="scrible"
                            :label="$t('MT4_status')">
                        </el-table-column>
                        <el-table-column :label="$t('need_do')" width="600">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="look(scope.row)">{{$t('look')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="type2=3,goEmail(scope.row)">{{$t('user_email')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="type2=4,goPhone(scope.row)">{{$t('phone1')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="type2=5,goPhone1(scope.row)">{{$t('login_phone1')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="type2=6,goRank(scope.row)">{{$t('leval')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="type2=7,goNext(scope.row)">{{$t('pre_next')}}</el-button>
                                <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row)">{{$t('delete')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
        </div>
        <div v-if="type2==2">
            <div class="infor_top">
                <h1>基本信息</h1>
                <div class="infor_content">
                    <div class="form_group">
                        <label for="">用户名</label>
                        <span>{{username}}</span>
                    </div>
                    <div class="form_group">
                        <label for="">真实姓名</label>
                        <el-input
                            placeholder="真实姓名"
                            v-model="input"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">英文名</label>
                        <el-input
                            placeholder="英文名"
                            v-model="input1"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">性别</label>
                        <el-radio v-model="radio" label="1">男</el-radio>
                        <el-radio v-model="radio" label="0">女</el-radio>
                    </div>
                    <div class="form_group">
                        <label for="">手机号</label>
                        <span>{{input2}}</span>
                    </div>
                </div>
            </div>
            <div class="infor_top infor_top1">
                <h1>身份信息</h1>
                <div class="infor_content infor_content1">
                    <div class="form_group">
                        <label for="">证件类型</label>
                        <el-select v-model="infor_sel">
                            <el-option
                                v-for="item in list5"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form_group">
                        <label for="">证件号码</label>
                        <el-input
                            placeholder="证件号码"
                            v-model="input4"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">国家</label>
                        <el-select class="sl_1" v-model="f_count" @change="countChange">
                            <el-option
                                v-for="item in list6"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label">
                            </el-option>
                        </el-select>
                        <el-select class="sl_2" v-model="f_count1" @change="countChange1">
                            <el-option
                                v-for="item in list3"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                                >
                            </el-option>
                        </el-select>
                        <el-select class="sl_3" v-model="f_count2" @change="countChange2">
                            <el-option
                                v-for="item in list4"
                                :key="item.value"
                                :value="item.value"
                                :label="item.label"
                                >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form_group">
                        <label for="">地址</label>
                        <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="地址"
                            v-model="input3"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">证件正面</label>
                        <el-upload
                            v-if="IP==1"
                            class="upload-demo"
                            :class="{hide:hideUpload}"
                            :data="updata"
                            show-file-list="false"
                            :on-change="fileChange"
                            action="http://ceshiapi.ibmcapital.co:11111/ibm/file/upload"
                            :on-success="getP"
                            :file-list="fileList"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            list-type="picture-card">
                        </el-upload>
                        <el-upload
                            v-if="IP==2"
                            class="upload-demo"
                            :class="{hide:hideUpload}"
                            :data="updata"
                            show-file-list="false"
                            :on-change="fileChange"
                            action="http://ceshiapi.ibmcapital.co:11131/ibm/file/upload"
                            :on-success="getP"
                            :file-list="fileList"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            list-type="picture-card">
                        </el-upload>
                    </div>
                    <div class="form_group form_group1" style="margin-top: 20px">
                        <label for="">证件反面</label>
                        <el-upload
                            v-if="IP==1"
                            class="upload-demo"
                            :class="{hide:hideUpload1}"
                            :data="updata1"
                            show-file-list="false"
                            :on-change="fileChange1"
                            action="http://ceshiapi.ibmcapital.co:11111/ibm/file/upload"
                            :on-success="getP1"
                            :file-list="fileList1"
                            :on-preview="handlePictureCardPreview1"
                            :on-remove="handleRemove1"
                            list-type="picture-card">
                        </el-upload>
                        <el-upload
                            v-if="IP==2"
                            class="upload-demo"
                            :class="{hide:hideUpload1}"
                            :data="updata1"
                            show-file-list="false"
                            :on-change="fileChange1"
                            action="http://ceshiapi.ibmcapital.co:11131/ibm/file/upload"
                            :on-success="getP1"
                            :file-list="fileList1"
                            :on-preview="handlePictureCardPreview1"
                            :on-remove="handleRemove1"
                            list-type="picture-card">
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="infor_top infor_top2">
                <h1>钱包信息</h1>
                <div class="infor_content">
                    <div class="form_group">
                        <label for="">注册钱包：</label>
                        <span>{{rp}}</span>
                    </div>
                    <div class="form_group">
                        <label for="">电子钱包：</label>
                        <span>{{ap}}</span>
                    </div>
                    <div class="form_group">
                        <label for="">现金钱包：</label>
                        <span>{{cp}}</span>
                    </div>
                    <div class="form_group">
                        <label for="">BTC地址：</label>
                        <el-input
                            placeholder="BTC地址"
                            v-model="input5"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">ETH地址：</label>
                        <el-input
                            placeholder="ETH地址"
                            v-model="input6"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group form_group_last">
                        <label for="">USDT地址：</label>
                        <el-input
                            placeholder="USDT地址"
                            v-model="input7"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">获取验证码方式</label>
                        <el-radio v-model="radio2" label="1">手机短信</el-radio>
                        <el-radio v-model="radio2" label="2">邮箱</el-radio>
                    </div>
                    <div class="form_group">
                        <label for="#">验证码</label>
                        <span>
                            <el-input
                                placeholder="请输入验证码"
                                v-model="input10"
                            >
                            </el-input>
                            <b v-show="code==1" @click="getCode()">{{$t('get_code')}}</b>
                            <b v-show="code==2">{{num1}}S</b>
                        </span>
                    </div>
                </div>
            </div>
            <div class="m_bottom">
                <el-button type="primary" @click="sub()">提交</el-button>
                <el-button type="primary" @click="goCusm()">登录会员系统</el-button>
                <el-button type="primary" v-if="stues==1" @click="dialogVisible2=true">审核</el-button>
                <el-button @click="goReturn()">返回</el-button>
            </div>
            <div class="alert_img">
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="img" alt="">
                </el-dialog>
                <el-dialog :visible.sync="dialogVisible1">
                    <img width="100%" :src="img1" alt="">
                </el-dialog>
            </div>

            <!--审核-->
            <div class="alert_check">
                <el-dialog
                    title="审核"
                    :visible.sync="dialogVisible2"
                    width="36%"
                    >
                    <div class="alert_group">
                        <div>
                            <label for="">操作</label>
                            <el-radio v-model="radio1" label="0">未通过</el-radio>
                            <el-radio v-model="radio1" label="2">审核通过</el-radio>
                        </div>
                        <div>
                            <label for="">原因(ZH-CN)</label>
                            <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="原因(ZH-CN)"
                                v-model="input8"
                                clearable>
                            </el-input>
                        </div>
                        <div>
                            <label for="">原因(ZH-EN)</label>
                            <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="原因(ZH-EN)"
                                v-model="input9"
                                clearable>
                            </el-input>
                        </div>
                        <div>
                            <label for="#">验证码</label>
                            <span>
                            <el-input
                                placeholder="请输入验证码"
                                v-model="input17"
                            >
                            </el-input>
                            <b v-show="code7==1" @click="getCode7()">{{$t('get_code')}}</b>
                            <b v-show="code7==2">{{num8}}S</b>
                        </span>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible2 = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible2 = false,sureStaus()">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
        </div>
        <div v-if="type2==3">
            <div class="infor_top">
                <div class="infor_content">
                    <div class="form_group">
                        <label for="">原邮箱</label>
                        <span>{{old_email}}</span>
                    </div>
                    <div class="form_group">
                        <label for="">新邮箱</label>
                        <el-input
                            placeholder="新邮箱"
                            v-model="value10"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">获取验证码方式</label>
                        <el-radio v-model="radio3" label="1">手机短信</el-radio>
                        <el-radio v-model="radio3" label="2">邮箱</el-radio>
                    </div>
                    <div class="form_group">
                        <label for="#">验证码</label>
                        <span>
                            <el-input
                                placeholder="请输入验证码"
                                v-model="input11"
                            >
                            </el-input>
                            <b v-show="code1==1" @click="getCode1()">{{$t('get_code')}}</b>
                            <b v-show="code1==2">{{num2}}S</b>
                        </span>
                    </div>
                </div>
            </div>
            <div class="m_bottom">
                <el-button type="primary" @click="alterEmail()">提交</el-button>
                <el-button @click="goReturn()">返回</el-button>
            </div>
        </div>
        <div v-if="type2==4">
            <div class="infor_top">
                <div class="infor_content">
                    <div class="form_group">
                        <label for="">原手机号</label>
                        <span>{{old_phone}}</span>
                    </div>
                    <div class="form_group form_group_phone">
                        <label for="">新手机号</label>
                        <el-select v-model="value11">
                            <el-option
                                v-for="item in list8"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input
                            placeholder="新手机号"
                            v-model="value15"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">获取验证码方式</label>
                        <el-radio v-model="radio4" label="1">手机短信</el-radio>
                        <el-radio v-model="radio4" label="2">邮箱</el-radio>
                    </div>
                    <div class="form_group">
                        <label for="#">验证码</label>
                        <span>
                            <el-input
                                placeholder="请输入验证码"
                                v-model="input12"
                            >
                            </el-input>
                            <b v-show="code2==1" @click="getCode2()">{{$t('get_code')}}</b>
                            <b v-show="code2==2">{{num3}}S</b>
                        </span>
                    </div>
                </div>
            </div>
            <div class="m_bottom">
                <el-button type="primary" @click="alterPhone()">提交</el-button>
                <el-button @click="goReturn()">返回</el-button>
            </div>
        </div>
        <div v-if="type2==5">
            <div class="infor_top">
                <div class="infor_content">
                    <div class="form_group">
                        <label for="">原手机号</label>
                        <span>{{old_phone1}}</span>
                    </div>
                    <div class="form_group form_group_phone">
                        <label for="">新手机号</label>
                        <el-select v-model="value13">
                            <el-option
                                v-for="item in list9"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input
                            placeholder="新手机号"
                            v-model="value12"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">获取验证码方式</label>
                        <el-radio v-model="radio5" label="1">手机短信</el-radio>
                        <el-radio v-model="radio5" label="2">邮箱</el-radio>
                    </div>
                    <div class="form_group">
                        <label for="#">验证码</label>
                        <span>
                            <el-input
                                placeholder="请输入验证码"
                                v-model="input13"
                            >
                            </el-input>
                            <b v-show="code3==1" @click="getCode3()">{{$t('get_code')}}</b>
                            <b v-show="code3==2">{{num4}}S</b>
                        </span>
                    </div>
                </div>
            </div>
            <div class="m_bottom">
                <el-button type="primary" @click="alterPhone1()">提交</el-button>
                <el-button @click="goReturn()">返回</el-button>
            </div>
        </div>
        <div v-if="type2==6">
            <div class="infor_top">
                <div class="infor_content">
                    <div class="form_group">
                        <label for="">原等级</label>
                        <span>{{old_rank}}</span>
                    </div>
                    <div class="form_group form_group_rank">
                        <label for="">选择等级</label>
                        <el-select v-model="value14">
                            <el-option
                                v-for="item in list10"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="form_group">
                        <label for="">获取验证码方式</label>
                        <el-radio v-model="radio6" label="1">手机短信</el-radio>
                        <el-radio v-model="radio6" label="2">邮箱</el-radio>
                    </div>
                    <div class="form_group">
                        <label for="#">验证码</label>
                        <span>
                            <el-input
                                placeholder="请输入验证码"
                                v-model="input14"
                            >
                            </el-input>
                            <b v-show="code4==1" @click="getCode4()">{{$t('get_code')}}</b>
                            <b v-show="code4==2">{{num5}}S</b>
                        </span>
                    </div>
                </div>
            </div>
            <div class="m_bottom">
                <el-button type="primary" @click="alterLeval()">提交</el-button>
                <el-button type="primary" @click="zeroLeval()">重置等级</el-button>
                <el-button @click="goReturn()">返回</el-button>
            </div>
        </div>
        <div v-if="type2==7">
            <div class="infor_top">
                <div class="infor_content">
                    <div class="form_group">
                        <label for="">上级ID</label>
                        <span>{{old_pre}}</span>
                    </div>
                    <div class="form_group">
                        <label for="">新上级ID</label>
                        <el-input
                            placeholder="新上级ID"
                            v-model="value15"
                            clearable>
                        </el-input>
                    </div>
                    <div class="form_group">
                        <label for="">转入用户名</label>
                        <el-button v-if="type3==1" @click="polling()">查询</el-button>
                        <span v-if="type3==2">{{user_name}}</span>
                    </div>
                    <div class="form_group">
                        <label for="">获取验证码方式</label>
                        <el-radio v-model="radio7" label="1">手机短信</el-radio>
                        <el-radio v-model="radio7" label="2">邮箱</el-radio>
                    </div>
                    <div class="form_group">
                        <label for="#">验证码</label>
                        <span>
                            <el-input
                                placeholder="请输入验证码"
                                v-model="input15"
                            >
                            </el-input>
                            <b v-show="code5==1" @click="getCode5()">{{$t('get_code')}}</b>
                            <b v-show="code5==2">{{num6}}S</b>
                        </span>
                    </div>
                </div>
            </div>
            <div class="m_bottom">
                <el-button type="primary" @click="updateNext()">提交</el-button>
                <el-button @click="goReturn()">返回</el-button>
            </div>
        </div>

        <div class="feed_history">
            <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="320px"
                center>
                <el-scrollbar style="height:100%">
                    <div class="history">
                        <h1>获取验证码方式</h1>
                        <el-radio v-model="radio8" label="1">手机短信</el-radio>
                        <el-radio v-model="radio8" label="2">邮箱</el-radio>
                        <div class="form_group">
                            <label for="#">验证码</label>
                            <span>
                                <el-input
                                    placeholder="请输入验证码"
                                    v-model="input16"
                                >
                                </el-input>
                                <b v-show="code6==1" @click="getCode6()">{{$t('get_code')}}</b>
                                <b v-show="code6==2">{{num7}}S</b>
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
        inject: ['reload'],//点击跳转的时候刷新
        name: "cash",
        data(){
            return {
                sel:true,
                value1:3,
                value2:2,
                value3:'',
                input:'',
                input1:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
                input6:'',
                input7:'',
                input8:'',
                input9:'',
                input10:'',
                input11:'',
                input12:'',
                input13:'',
                input14:'',
                input15:'',
                input16:'',
                input17:'',
                value10:'',
                value11:'+86',
                value12:'',
                value13:'+86',
                value15:'',
                rp:0,
                ap:0,
                cp:0,
                list:[],
                list1:[
                    {
                        label:'全部',
                        value:3
                    },
                    {
                        label:'未通过',
                        value:0
                    },
                    {
                        label:'待审核',
                        value:1
                    },
                    {
                        label:'审核通过',
                        value:2
                    }
                ],
                list2:[
                    {
                        label:'全部',
                        value:2
                    },
                    {
                        label:'已删除',
                        value:0
                    },
                    {
                        label:'未删除',
                        value:1
                    },
                ],
                type:1,
                currentPage:1,
                currentCount:10,
                currentPage1:1,
                currentCount1:10,
                total:0,
                total1:0,
                isShow:false,
                msg:'',
                multipleSelection: [],
                tableData:[],
                staus:['未通过','待审核','审核通过'],
                type1:1,
                val:'',
                type2:1,
                type3:1,
                user_name:'',
                username:'',
                radio:'0',
                list5:[
                    {
                        value: '1',
                        label: '身份证'
                    },
                    {
                        value: '0',
                        label: '护照'
                    }
                ],
                infor_sel:'1',
                f_count: '',
                f_count1: '',
                f_count2: '',
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
                list3:[],
                list4:[],
                list6:[],
                list7:{},
                list8:[
                    {
                        value: '+86',
                        label: '+86'
                    },{
                        value: '+60',
                        label: '+60'
                    },{
                        value: '+63',
                        label: '+63'
                    },
                    {
                        value: '+001',
                        label: '+001'
                    },{
                        value: '+886',
                        label: '+886'
                    },
                    {
                        value: '+852',
                        label: '+852'
                    },{
                        value: '+33',
                        label: '+33'
                    },{
                        value: '+44',
                        label: '+44'
                    },{
                        value: '+31',
                        label: '+31'
                    },
                    {
                        value: '+46',
                        label: '+46'
                    },{
                        value: '+48',
                        label: '+48'
                    },{
                        value: '+7',
                        label: '+7'
                    },{
                        value: '+41',
                        label: '+41'
                    },
                    {
                        value: '+349',
                        label: '+349'
                    },{
                        value: '+39',
                        label: '+39'
                    },{
                        value: '+45',
                        label: '+45'
                    },{
                        value: '+81',
                        label: '+81'
                    },{
                        value: '+82',
                        label: '+82'
                    },{
                        value: '+62',
                        label: '+62'
                    },{
                        value: '+34',
                        label: '+34'
                    }
                ],
                list9:[
                    {
                        value: '+86',
                        label: '+86'
                    },{
                        value: '+60',
                        label: '+60'
                    },{
                        value: '+63',
                        label: '+63'
                    },
                    {
                        value: '+001',
                        label: '+001'
                    },{
                        value: '+886',
                        label: '+886'
                    },
                    {
                        value: '+852',
                        label: '+852'
                    },{
                        value: '+33',
                        label: '+33'
                    },{
                        value: '+44',
                        label: '+44'
                    },{
                        value: '+31',
                        label: '+31'
                    },
                    {
                        value: '+46',
                        label: '+46'
                    },{
                        value: '+48',
                        label: '+48'
                    },{
                        value: '+7',
                        label: '+7'
                    },{
                        value: '+41',
                        label: '+41'
                    },
                    {
                        value: '+349',
                        label: '+349'
                    },{
                        value: '+39',
                        label: '+39'
                    },{
                        value: '+45',
                        label: '+45'
                    },{
                        value: '+81',
                        label: '+81'
                    },{
                        value: '+82',
                        label: '+82'
                    },{
                        value: '+62',
                        label: '+62'
                    },{
                        value: '+34',
                        label: '+34'
                    }
                ],
                list10:[
                    {
                        label:'Member',
                        value:0,
                    },
                    {
                        label:'Active Member',
                        value:1,
                    },
                    {
                        label:'IB',
                        value:2,
                    },
                    {
                        label:'MIB',
                        value:3,
                    },
                    {
                        label:'PIB1',
                        value:4,
                    },
                    {
                        label:'PIB2',
                        value:5,
                    },
                    {
                        label:'PIB3',
                        value:6,
                    }
                ],
                value14:0,
                province:'',
                city:'',
                dialogVisible: false,
                dialogVisible1: false,
                dialogVisible2:false,
                hideUpload:false,
                limitCount:1,
                hideUpload1:false,
                limitCount1:1,
                old_pre:'',
                stues:'',
                radio1:'0',
                userId:'',
                old_email:'',
                old_phone:'',
                old_phone1:'',
                rank:['Member','Active Member','IB','MIB','PIB1','PIB2','PIB3'],
                old_rank:'',
                radio2:'1',
                radio3:'1',
                radio4:'1',
                radio5:'1',
                radio6:'1',
                radio7:'1',
                radio8:'1',
                code:1,
                num1:60,
                code1:1,
                num2:60,
                code2:1,
                num3:60,
                code3:1,
                num4:60,
                code4:1,
                num5:60,
                code5:1,
                num6:60,
                code6:1,
                num7:60,
                code7:1,
                num8:60,
                centerDialogVisible:false,
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



            //一进来查询所以用户信息
            this.getM();

            //返回所有国家
            this.ajaxC('/exhibition/getCountry',{code:'',type:1},'get',this.count);

        },
        methods:{
            //通过ID查用户名
            polling(){
                this.ajaxC('/user/selectUserId',{userId:this.value15},'get',this.getID)
            },
            getID(res){
                if(res.data.code==0){
                    this.user_name=res.data.data.username;
                    this.type3=2;
                }else if(res.data.code==4){
                    this.cases1(res.data.msg);
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //查看个人信息
            getM1(){
                this.ajaxC('/user/getUsers',{userId:this.userId},'get',this.getPerson)
            },
            getPerson(res){
                this.old_email=res.data.data.list[0].email;
                this.old_phone=res.data.data.list[0].mobile;
                this.old_phone1=res.data.data.list[0].mobile2;
                this.old_rank=this.rank[res.data.data.list[0].level_id];
            },

            //提交用户信息获取验证码
            getCode(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio2},'get',this.getPh)
            },
            getPh(res){
                if(res.data.code==0){
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
                    this.cases1(res.data.msg);
                }else{
                    this.case(res.data.msg);
                }
            },
            //修改邮箱获取验证码
            getCode1(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio3},'get',this.getPh1)
            },
            getPh1(res){
                if(res.data.code==0){
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
                    this.cases1(res.data.msg);
                }else{
                    this.case(res.data.msg);
                }
            },
            //修改手机获取验证码
            getCode2(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio4},'get',this.getPh2)
            },
            getPh2(res){
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
                    this.cases1(res.data.msg);
                }else{
                    this.case(res.data.msg);
                }
            },
            //修改登录手机获取验证码
            getCode3(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio5},'get',this.getPh3)
            },
            getPh3(res){
                if(res.data.code==0){
                    this.case(this.$t('get_code1'));
                    this.code3=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num4--;
                        if(the.num4<=0){
                            the.num4=60;
                            the.code3=1;
                            clearInterval(timer);
                        }
                    },1000)
                }else if(res.data.code==4){
                    this.cases1(res.data.msg);
                }else{
                    this.case(res.data.msg);
                }
            },
            //修改等级获取验证码
            getCode4(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio6},'get',this.getPh4)
            },
            getPh4(res){
                if(res.data.code==0){
                    this.case(this.$t('get_code1'));
                    this.code4=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num5--;
                        if(the.num5<=0){
                            the.num5=60;
                            the.code4=1;
                            clearInterval(timer);
                        }
                    },1000)
                }else if(res.data.code==4){
                    this.cases1(res.data.msg);
                }else{
                    this.case(res.data.msg);
                }
            },
            //修改上下级获取验证码
            getCode5(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio7},'get',this.getPh5)
            },
            getPh5(res){
                if(res.data.code==0){
                    this.case(this.$t('get_code1'));
                    this.code5=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num6--;
                        if(the.num6<=0){
                            the.num6=60;
                            the.code5=1;
                            clearInterval(timer);
                        }
                    },1000)
                }else if(res.data.code==4){
                    this.cases1(res.data.msg);
                }else{
                    this.case(res.data.msg);
                }
            },
            //删除获取验证码
            getCode6(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:this.radio8},'get',this.getPh6)
            },
            getPh6(res){
                if(res.data.code==0){
                    this.case(this.$t('get_code1'));
                    this.code6=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num7--;
                        if(the.num7<=0){
                            the.num7=60;
                            the.code6=1;
                            clearInterval(timer);
                        }
                    },1000)
                }else if(res.data.code==4){
                    this.cases1(res.data.msg);
                }else{
                    this.case(res.data.msg);
                }
            },

            //审核获取验证码
            getCode7(){
                this.ajaxE('/verification/verificationCodeAfterLogin',{type:1},'get',this.getPh7)
            },
            getPh7(res){
                if(res.data.code==0){
                    this.case(this.$t('get_code1'));
                    this.code7=2;
                    var the=this;
                    var timer=setInterval(function () {
                        the.num8--;
                        if(the.num8<=0){
                            the.num8=60;
                            the.code7=1;
                            clearInterval(timer);
                        }
                    },1000)
                }else if(res.data.code==4){
                    this.cases1(res.data.msg);
                }else{
                    this.case(res.data.msg);
                }
            },

            count(res){
                for(let i=0;i<res.data.data.length;i++){
                    this.list6.push({label:res.data.data[i].name,value:res.data.data[i].code,})
                }
            },
            countChange(){
                this.ajaxC('/exhibition/getCountry',{code:this.f_count,type:1},'get',this.count1)
            },
            count1(res){
                this.list3=[];
                this.f_count1='';
                for(let i=0;i<res.data.data.length;i++){
                    this.list3.push({label:res.data.data[i].name,value:res.data.data[i].code,})
                }
            },
            countChange1(){
                this.ajaxC('/exhibition/getCountry',{code:this.f_count1,type:1},'get',this.count2)
            },
            count2(res){
                this.list4=[];
                this.f_count2='';
                for(let i=0;i<res.data.data.length;i++){
                    this.list4.push({label:res.data.data[i].name,value:res.data.data[i].code,})
                }
            },
            countChange2(){
                console.log(this.f_count2.item);
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },


            //审核
            sureStaus(){
                let data={
                    userId:this.userId,
                    status:this.radio1,
                    reason:this.input8,
                    reasonEnglish:this.input9,
                    type:1,
                    code:this.input17,
                }
                this.ajaxE('/user/updateUserInfoSuper',data,'post',this.ss)
            },
            ss(res){
                if(res.data.code==0){
                   this.case('操作成功')
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //查看
            look(a){
                this.type2=2;
                this.fileList=[];
                this.fileList1=[];
                this.ajaxC('/user/getUsers',{userId:a.date},'get',this.sure)
            },
            sure(res){
                if(res.data.code==0){
                    this.list7=res.data.data.list[0];
                    this.userId=this.list7.user_id;
                    this.username=this.list7.username;
                    this.input=this.list7.cdName;
                    this.input1=this.list7.english_name;
                    this.radio=this.list7.sex+'';
                    this.input2=this.list7.mobile;
                    this.infor_sel=this.list7.cardType+'';
                    this.input4=this.list7.cardNum;
                    this.input5=this.list7.btc;
                    this.input6=this.list7.eth;
                    this.input7=this.list7.usdt;
                    this.f_count=this.list7.country;
                    if(this.f_count===undefined || this.f_count===''){
                        this.ajaxC('/exhibition/getCountry',{code:'',type:1},'get',this.count31);
                    }else{
                        this.ajaxC('/exhibition/getCountry',{code:this.f_count,type:1},'get',this.count3);
                    }
                    this.province=this.list7.province;
                    if(this.province===undefined || this.province ===''){
                        this.list3=[];
                        this.f_count1=''
                    }else{
                        this.ajaxC('/exhibition/getCountry',{code:this.province,type:1},'get',this.count4);
                    }
                    this.city=this.list7.city;
                    this.input3=this.list7.address;
                    if(this.list7.rp===undefined){
                        this.rp=0
                    }else{
                        this.rp=this.list7.rp;
                    }
                    if(this.list7.ap===undefined){
                        this.ap=0
                    }else{
                        this.ap=this.list7.ap;
                    }
                    if(this.list7.cp===undefined){
                        this.cp=0
                    }else{
                        this.cp=this.list7.cp;
                    }
                    this.stues=this.list7.cdStatus;
                    //如果有身份证的正面则隐藏上传框
                    if(this.list7.card_url_just !== undefined){
                        this.hideUpload=true;
                        this.img=this.list7.card_url_just;
                        this.fileList=[{name:'',url:this.list7.card_url_just}];
                    }else{
                        this.img='';
                        this.hideUpload=false;
                    }
                    //如果有身份证的反面则隐藏上传框
                    if(this.list7.card_url_back !== undefined){
                        this.hideUpload1=true;
                        this.img1=this.list7.card_url_back;
                        this.fileList1=[{name:'',url:this.list7.card_url_back}];
                    }else{
                        this.img1='';
                        this.hideUpload1=false;
                    }
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            count3(res){
                for(let i=0;i<res.data.data.length;i++){
                    if(res.data.data[i].code==this.province){
                        this.f_count1=res.data.data[i].code;
                    }
                    this.list3.push({label:res.data.data[i].name,value:res.data.data[i].code})
                }
            },
            count31(res){
                this.list3=[];
                this.f_count1='';
                this.list4=[];
                this.f_count2=''
            },
            count4(res){
                for(let i=0;i<res.data.data.length;i++){
                    if(res.data.data[i].code==this.city){
                        this.f_count2=res.data.data[i].code;
                    }
                    this.list4.push({label:res.data.data[i].name,value:res.data.data[i].code})
                }
            },
            //审核
            //1.审核取消

            //登录会员系统
            goCusm(){
                this.ajaxB('/user/loginTest',{userName:this.username},'get',this.login)
            },
            login(res){
                if(res.data.code==0){
                    sessionStorage.setItem('isAdmin',true);
                    //让公告和提示实名认证只出现一次
                    sessionStorage.setItem('isFeed',true);
                    //让公告和提示实名认证只出现一次
                    sessionStorage.setItem('isFeed1',true);

                    this.reload();
                    sessionStorage.setItem('in1',1);

                    this.$router.push('/page?k=1');
                    sessionStorage.setItem('type',1);
                    sessionStorage.setItem('style',1);
                    sessionStorage.setItem('type1',0);
                    sessionStorage.setItem('up',1);
                    sessionStorage.setItem('trans_user_userInfor',JSON.stringify(res.data.data));
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //管理员提交信息
            sub(){
                let data={
                    userId:this.userId,
                    cardType:this.infor_sel,
                    cardNum:this.input4,
                    sex:this.radio,
                    englishName:this.input1,
                    name:this.input,
                    province:this.f_count1,
                    city:this.f_count2,
                    address:this.input3,
                    cardUrlJust:this.img[0],
                    cardUrlBack:this.img1[0],
                    country:this.f_count,
                    btc:this.input5,
                    eth:this.input6,
                    usdt:this.input7,
                    status:this.stues,
                    code:this.input10,
                    type:this.radio2
                }
                this.ajaxE('/user/updateUserInfoSuper',data,'post',this.submit1)
            },
            submit1(res){
                if(res.data.code==0){
                    this.case('提交成功');
                    this.look(a);
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },


            //修改邮箱
            goEmail(a){
                this.old_email=a.phone;
                this.userId=a.date;
            },
            //修改提交邮箱
            alterEmail(){
                let data={
                    userId:this.userId,
                    email:this.value10,
                    code:this.input11,
                    type:this.radio3
                };
                this.ajaxE('/user/updateUserInfoSupers',data,'post',this.email);
            },
            email(res){
                if(res.data.code==0){
                    this.case('邮箱修改成功');
                    this.getM1();
                    this.value10='';
                    this.input11='';
                    this.radio3='1';
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //修改手机号
            goPhone(a){
                this.old_phone=a.name;
                this.userId=a.date;
            },
            //修改提交手机号
            alterPhone(){
                let data={
                    userId:this.userId,
                    mobile:this.value11+this.value15,
                    code:this.input12,
                    type:this.radio4
                };
                this.ajaxE('/user/updateUserInfoSupers',data,'post',this.phone);
            },
            phone(res){
                if(res.data.code==0){
                    this.case('手机号修改成功');
                    this.getM1();
                    this.value11='+86';
                    this.input12='';
                    this.value15='';
                    this.radio4='1';
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //修改登录手机号
            goPhone1(a){
                this.old_phone1=a.ID;
                this.userId=a.date;
            },
            //修改提交手机号
            alterPhone1(){
                let data={
                    userId:this.userId,
                    mobile2:this.value13+this.value12,
                    code:this.input13,
                    type:this.radio5
                };
                this.ajaxE('/user/updateUserInfoSupers',data,'post',this.phone);
            },
            phone(res){
                if(res.data.code==0){
                    this.case('登录手机号修改成功');
                    this.getM1();
                    this.value13='+86';
                    this.input13='';
                    this.value12='';
                    this.radio5='1';
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            //修改等级
            goRank(a){
                this.old_rank=this.rank[a.rank];
                this.userId=a.date;
            },
            //修改用户等级
            alterLeval(){
                let data={
                    levelId:this.value14,
                    uId:this.userId,
                    code:this.input14,
                    type:this.radio6
                };
                this.ajaxE('/system/updateUserLevel',data,'post',this.leval);
            },
            leval(res){
                if(res.data.code==0){
                    this.case('用户等级修改成功');
                    this.getM1();
                    this.value14=0;
                    this.input14='';
                    this.radio6='1';
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            //重置用户等级
            zeroLeval(){
                if(this.input14==''){
                    this.case('请输入验证码')
                }else{
                    let data={
                        uId:this.userId,
                        code:this.input14,
                        type:this.radio6
                    };
                    this.ajaxE('/system/resetLevel',data,'post',this.Rleval);
                }
            },
            Rleval(res){
                if(res.data.code==0){
                    this.case('用户等级重置成功');
                    this.getM1();
                    this.input14='';
                    this.radio6='1';
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            //修改上下级
            goNext(a){
                this.userId=a.date;
                this.ajaxC('/system/getParentId',{userId:this.userId},'get',this.getPreID)
            },
            getPreID(res){
                this.old_pre=res.data.data.parentId;
            },
            //修改上下级确认
            updateNext(){
                if(this.type3==1){
                    this.case('请输入正确的新上级ID');
                    this.value15='';
                }else{
                    let data={
                        parUserId:this.value15,
                        subUserId:this.userId,
                        code:this.input15,
                        type:this.radio7
                    }
                    this.ajaxE('/system/ladder',data,'post',this.upDte)
                }
            },
            upDte(res){
                if(res.data.code==0){
                    this.case('修改成功');
                    this.ajaxF('/system/getParentId',{userId:this.userId},'get',this.getPreID);
                    this.input15='';
                    this.radio7='1';
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },
            //用户信息返回
            goReturn(){
                this.type2=1;
                this.value1=3;
                this.status='';
                this.getM();
            },
            //删除
            handleDelete(a){
                this.userId=a.date;
                this.centerDialogVisible=true;
            },
            //确认删除
            goH(){
                let data={
                    uId:this.userId,
                    code:this.input16,
                    type:this.radio8
                };
                this.ajaxE('/system/delectUser',data,'post',this.useDelete)
            },
            useDelete(res){
                if(res.data.code==0){
                    this.case('删除成功');
                    this.getM();
                    this.input16='';
                    this.radio8='1';
                }else if(res.data.code==4){
                    this.cases1(this.$t('login_wrong'))
                }else{
                    this.case(this.$t(res.data.code));
                }
            },

            //上传文件
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.hideUpload = fileList.length >= this.limitCount;
            },
            handlePictureCardPreview(file) {
                this.dialogVisible = true;
            },
            handleRemove1(file, fileList) {
                console.log(file, fileList);
                this.hideUpload1 = fileList.length >= this.limitCount1;
            },
            handlePictureCardPreview1(file) {
                this.dialogVisible1 = true;
            },
            getP(response, file, fileList){
                this.img=response.data;
                this.hideUpload = fileList.length >= this.limitCount;
            },
            fileChange(file){
                let a=file.raw;
                this.updata.Filedata=a;
            },
            getP1(response, file, fileList){
                this.img1=response.data;
                this.hideUpload1 = fileList.length >= this.limitCount1;
            },
            fileChange1(file){
                this.updata1.Filedata=file.raw;
            },

            //一进来获取的所有用户信息
            getM(){
                this.type=1;
                this.ajaxC('/user/getUsers',{status:'',userStatus:'',userId:'',pageNum:this.currentPage,pageSize:this.currentCount},'get',this.ok)
            },
            ok(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.user_id,time:f.username,ID:f.mobile2,name:f.mobile,phone:f.email,bankName
                                :f.cdName,money:f.english_name,adress:f.createTime,scrible:this.staus[f.cdStatus],id:f.id,rank:f.level_id})
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

            //搜索
            sou(){
                let a;
                this.type=2;
                if(this.value1==3){
                    a=''
                }else{
                    a=this.value1
                }
                let b;
                if(this.value2==2){
                    b=''
                }else{
                    b=this.value2
                }
                this.ajaxC('/user/getUsers',{status:a,userStatus:b,userId:this.value3,pageNum:this.currentPage1,pageSize:this.currentCount1},'get',this.ok1)
            },
            ok1(res){
                this.tableData=[];
                if(res.data.code==0){
                    res.data.data.list.forEach((f)=>{
                        this.tableData.push({date:f.user_id,time:f.username,ID:f.mobile2,name:f.mobile,phone:f.email,bankName
                                :f.cdName,money:f.english_name,adress:f.createTime,scrible:this.staus[f.cdStatus],id:f.id,rank:f.level_id})
                    });
                    this.total1=res.data.data.total;
                }else if(res.data.code==4){
                    this.isShow=true;
                    this.cases1(this.$t('login_wrong'))
                }
            },
            handleSizeChange1(val) {
                this.currentCount1=val;
                this.sou();
            },
            handleCurrentChange1(val) {
                this.currentPage1=val;
                this.sou();
            },
        }
    }
</script>

<style scoped>
    @import "../../assets/css/cash.css";
    @import "../../assets/css/infor.css";
    .alert_group>div span .el-input{
        width: 240px;
    }
    .form_group_rank .el-select{
        width: 160px;
    }
    .form_group_phone .el-select{
        width: 90px;
    }
    .infor_top .form_group:nth-child(2) .el-input {
        width: 200px;
    }
    .infor_top .form_group:nth-child(3) .el-input {
        width: 200px;
    }
    .infor_top1{
        padding-bottom: 20px;
    }
    .form_group_last{
        margin-top: 20px;
    }
    .m_bottom{
        margin-top: 20px;
    }
    /*.infor_top2 .el-input{*/
        /*width: 300px;*/
    /*}*/
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
    .history .form_group{
        margin-top: 20px;
    }
    @media (max-width: 480px) {
        .el-select{
            width: 140px;
        }
        .el-select,.el-input{
            width: 180px;
        }
        .infor_top .form_group:nth-child(2) .el-input {
            width: 160px;
        }
        .infor_top .form_group:nth-child(3) .el-input{
            width: 160px;
        }
        .sl_1,.sl_2,.sl_3{
            margin-left: 94px;
        }
        .el-textarea{
            width: 160px;
        }
    }
</style>
