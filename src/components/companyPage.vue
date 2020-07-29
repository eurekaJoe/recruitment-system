<template>
    <div class="template">
        <h1>Company</h1>
        <div>欢迎，{{$store.state.username}}公司！<br/><el-link type="info"  @click="toHome" style="float:right;margin:0px 50px 40px 0;">返回首页</el-link></div>
        <br/>
        <el-tabs>
            <el-tab-pane label="发布的职位">
                <el-table :data="mypost"  style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <span class="resumeH">任职要求</span>
                            <div class="resumeB">{{props.row.requirement}}</div> 
                        </template>
                    </el-table-column>
                    <el-table-column  prop="no" label="编号" width="100" align="center"></el-table-column>
                    <el-table-column  prop="name" label="名称" width="200" align="center"></el-table-column>
                    <el-table-column  prop="number" label="人数" width="70" align="center">
                        <template slot-scope="scope"><el-input size="small" v-model="scope.row.number"></el-input></template>
                    </el-table-column>
                    <el-table-column  prop="date" label="发布时间" width="200" align="center">
                        <template slot-scope="scope">
                            <el-date-picker type="date" placeholder="选择日期" v-model="scope.row.date" style="width:80%" value-format="yyyy-MM-dd"></el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column  prop="treatment" label="待遇" width="150" align="center">
                        <template slot-scope="scope"><el-input v-model="scope.row.treatment"></el-input></template>
                    </el-table-column>
                    <el-table-column  prop="ifAllowance" label="是否补助" width="100" align="center"><template slot-scope="scope">
                        <el-select v-model="scope.row.ifAllowance" placeholder="请选择是否补助">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select></template>
                    </el-table-column>      
                    <el-table-column  prop="contact" label="联系方式" width="200" align="center"></el-table-column>
                    <el-table-column  prop="collect" label="收藏人数" width="100" align="center"></el-table-column>
                    <el-table-column  align="center"      
                        prop="status"
                        label="状态"
                        width="120"
                        :filters="[{ text: '审核通过', value: '审核通过' }, { text: '审核不通过', value: '审核不通过' }, { text: '审核中', value: '审核中' }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                            :type="scope.row.status === '审核中' ? 'warning' : (scope.row.status === '审核通过'?'success':'danger')"
                            disable-transitions>{{scope.row.status}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-popconfirm title="确定修改该职位吗？" @onConfirm="handleEdit(scope.row)">
                                <el-button slot="reference" icon="el-icon-edit" type="warning" size="mini" circle></el-button>
                            </el-popconfirm>  
                            <el-popconfirm title="确定删除该职位吗？" @onConfirm="delOffer(scope.$index, scope.row)">
                                <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>  
                  <el-row>
                    <el-col :span="20"><div class="grid-content"></div></el-col>
                    <el-col :span="4">       
                    <el-button type="primary" size="medium" @click="showform=true">发布职位<i class="el-icon-upload el-icon--right"></i></el-button></el-col> 
                </el-row>

                <el-dialog title="发布职位" :visible.sync="showform">
                    <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="职位名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="人数" prop="number">
                            <el-input v-model="ruleForm.number"></el-input>
                        </el-form-item>
                        <el-form-item label="发布时间" prop="date">
                            <el-date-picker type="date" placeholder="选择日期" 
                            v-model="ruleForm.date" style="width: 100%;" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="任职要求" prop="requirement">
                            <el-input v-model="ruleForm.requirement"></el-input>
                        </el-form-item>
                        <el-form-item label="待遇" prop="treatment">
                            <el-input v-model="ruleForm.treatment"></el-input>
                        </el-form-item>
                        <el-form-item label="是否补助" prop="ifAllowance">
                            <el-select v-model="ruleForm.ifAllowance" placeholder="请选择是否补助" style="width: 50%;">
                                <el-option label="是" value="是"></el-option>
                                <el-option label="否" value="否"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="contact">
                            <el-input v-model="ruleForm.contact"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="submitForm('ruleForm')">立即创建</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>   
            </el-tab-pane>

            <el-tab-pane label="应聘的职位">
                <el-table ref="filterTable" :data="deliver">
                    <el-table-column type="expand" width="20">
                        <template slot-scope="props">
                            <span class="resumeH">简历</span>
                            <div class="resumeB">{{props.row.resume}}</div> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="post" label="应聘职位" width="200" align="center"></el-table-column>
                    <el-table-column prop="talent" label="姓名" width="150" align="center"></el-table-column>
                    <el-table-column prop="age" label="年龄" width="150" align="center"></el-table-column>
                    <el-table-column prop="place" label="籍贯" width="150" align="center"></el-table-column>
                    <el-table-column prop="diploma" label="学历" width="150" align="center"></el-table-column>
                    <el-table-column prop="contact" label="联系方式" width="200" align="center"></el-table-column>
                </el-table>
            </el-tab-pane>

            <el-tab-pane label="收藏统计">
                已有<strong> {{collectNum}} </strong>名用户收藏您公司，继续加油吧！
            </el-tab-pane>
        </el-tabs>

      

        
    </div>
</template>

<script>
    export default {
        name:"companyPage",
        data(){
            return{
                collectNum:0,   //收藏该公司的人数
                ruleForm: {
                    name: '',
                    number: '',
                    date: '',
                    requirement: '',
                    treatment: '',
                    ifAllowance: '',
                    contact: ''
                },
                rules:{
                    name:[
                        { required: true, message: '请输入职位名称', trigger: 'blur' }
                    ],
                    date:[
                        { required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    contact:[
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ]
                },
                showform:false,
                showEditForm:false,
                mypost:[],  //发布的职位
                deliver:[], //应聘该公司的职位
                tagType:[], //标签类型（由status决定
            }
        },
        created(){
            this.$axios({   //获取发布的职位
                method:'post',
                url:"http://www.tp5.com/company/login/collectNum",
                data:JSON.stringify({
                    no:this.$route.query.no
                })
            })
            .then(res=>{  
                console.log(res.data)
                this.collectNum=res.data
            })
            this.$axios({   //获取发布的职位
                method:'post',
                url:"http://www.tp5.com/company/post/search",
                data:JSON.stringify({
                    name:this.$store.state.username
                })
            })
            .then(res=>{  
                //console.log(res.data)
                this.mypost=res.data
            })
            this.$axios({   //获取应聘该公司的职位
                method:'post',
                url:"http://www.tp5.com/company/deliver/search",
                data:JSON.stringify({
                    name:this.$store.state.username
                })
            })
            .then(res=>{                  
                this.deliver=res.data
                for(var i=0;i<this.deliver.length;i++)
                {
                    if(this.deliver[i].status!="审核通过")
                        //delete this.deliver[i];
                        this.deliver.splice(i,1);
                }
            })
            //初始化时间
            var aData = new Date();
            this.ruleForm.date=aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
            
        },
        methods: {
            toHome(){
                this.$router.push({ path: '/'})
            },  
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {  //发布职位
                //console.log(this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            method:'post',
                            url:"http://www.tp5.com/company/post/add",
                            data:JSON.stringify({
                                info:this.ruleForm
                            })
                        })
                        .then(res=>{  
                            //console.log(res.data)
                            if(res.data.msg=='插入成功')
                            {
                                this.showform=false;
                                this.$message({
                                    message: '职位创建成功，请等待管理员审核',
                                    type: 'success'
                                });
                                this.resetForm(formName)
                                this.$forceUpdate()
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        this.$alert('您的输入不符合规范！', '创建职位失败', {
                            confirmButtonText: '确定',
                           
                        });
                    }
                });
            },
            handleEdit(row){    //提交修改               
                this.$axios({
                    method:'post',
                    url:"http://www.tp5.com/company/post/update",
                    data:JSON.stringify({
                        info:row
                    })
                })
                .then(res=>{  
                    //console.log(res.data)
                    if(res.data.msg=='修改成功')
                    {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.showEditForm=false;
                        this.$forceUpdate();
                    }
                })
            },
            delOffer(index,row)  //删除发布的职位
            {
                //console.log(index,row.no)
                this.$axios({
                    method:'post',
                    url:"http://www.tp5.com/company/post/delete",
                    data:JSON.stringify({
                        no:row.no
                    })
                })
                .then(res=>{  
                    console.log(res.data)
                    if(res.data.msg=='删除成功')
                    {
                        this.mypost.splice(index,1);

                    }
                })
            },
            filterTag(value, row) {
                return row.status === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
        }
    }
</script>

<style scoped>
    .template{
        padding:30px 30px;
    }
    .el-row {
        margin-top: 50px;
        margin-bottom: 50px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .resumeH{
        font-weight:600;  
    }
    .resumeB{
        line-height: 30px;
    }
    .myform{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding:30px 25px 10px 0;
        margin-bottom: 30px;
    }

</style>