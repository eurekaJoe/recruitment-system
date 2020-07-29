<template>
    <div style="height:100%">
        <h1>User</h1>
        <div>欢迎你，{{$store.state.username}}！</div>
        <el-link type="success"  @click="toHome" style="float:right;margin:0px 200px 40px 0;">返回首页</el-link>
        <el-tabs style="height:70%">
            <el-tab-pane label="收藏职位">
                <el-table :data="starPost" >
                    <el-table-column type="expand" width="30">
                    <template slot-scope="props">
                        <span class="resumeH">任职要求</span>
                        <div class="resumeB">{{props.row.requirement}}</div> 
                    </template>
                    </el-table-column>
                    <el-table-column  prop="no" label="编号" width="100" align="center"></el-table-column>
                    <el-table-column  prop="name" label="名称" width="150" align="center"></el-table-column>
                    <el-table-column  prop="number" label="人数" width="150" align="center"></el-table-column>
                    <el-table-column  prop="date" label="发布时间" width="150" align="center"></el-table-column>
                    <el-table-column  prop="treatment" label="待遇" width="150" align="center"></el-table-column>
                    <el-table-column  prop="ifAllowance" label="是否补助" width="150" align="center"></el-table-column>      
                    <el-table-column  prop="contact" label="联系方式" width="270" align="center"></el-table-column>
                    <el-table-column label="操作" width="120" align="center">
                        <template slot-scope="scope">
                            <el-popconfirm title="确定取消收藏该职位吗？" @onConfirm="delCollPost(scope.row)">
                                <el-button slot="reference" size="mini" round type="danger">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>   
            </el-tab-pane>

            <el-tab-pane label="收藏企业">
                <el-table :data="starComp"  style="width: 100%">
                    <el-table-column type="expand">
                    <template slot-scope="props">
                        <span class="resumeH">其他介绍</span>
                        <div class="resumeB">{{props.row.other}}</div> 
                    </template>
                    </el-table-column>
                    <el-table-column  prop="no" label="编号" width="100" align="center"></el-table-column>
                    <el-table-column  prop="industry" label="所属行业" width="180" align="center"></el-table-column>
                    <el-table-column  prop="name" label="名称" width="150" align="center"></el-table-column>
                    <el-table-column  prop="address" label="地址" width="150" align="center"></el-table-column>
                    <el-table-column  prop="legal_entity" label="法人" width="150" align="center"></el-table-column>
                    <el-table-column  prop="registered_capital" label="注册资本" width="150" align="center"></el-table-column>      
                    <el-table-column  prop="contact" label="联系方式" width="200" align="center"></el-table-column>
                    <el-table-column label="操作" width="120" align="center">
                        <template slot-scope="scope">
                            <el-popconfirm title="确定取消收藏该企业吗？" @onConfirm="delCollComp(scope.row)">
                                <el-button slot="reference" size="mini" round type="danger">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>  
            </el-tab-pane>

            <el-tab-pane label="应聘记录" class="flex_center">
                <el-table ref="filterTable" :data="offer">
                <el-table-column prop="company" label="公司" width="280" align="center"
                    :filters="compfilters" :filter-method="filterHandler"  
                ></el-table-column>
                <el-table-column prop="post" label="职位" width="280" align="center"
                    :filters="postfilters" :filter-method="filterHandler"  
                ></el-table-column>
                <el-table-column prop="status" label="状态" width="280" align="center"
                    :filters="statusfilters" :filter-method="filterHandler">
                </el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope" >
                        <el-button type="danger" size="mini" plain @click="delOffer(scope.$index,scope.row)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
                    </template>
                </el-table-column>
                </el-table>
            </el-tab-pane>

            <el-tab-pane :label="permission" class="flex_center">
                <keep-alive>                
                    <component v-bind:is="dynTab"></component>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
       
    </div>
</template>

<script>
    import checkPost from '@/components/admin/checkPost'
    import checkDeliver from '@/components/admin/checkDeliver'
    import checkAd from '@/components/admin/checkAd'

    export default {
        name:"userPage",
        data(){
            return{
                starPost:[],
                starComp:[],
                offer:[],
                compfilters:[],  //格式数组[{value:,text:}]
                postfilters:[],
                statusfilters:[],
                permission:"",  //用户权限
                dynTab:"",  //动态标签，根据用户权限生成
            }
        },
        components:{
            checkPost,
            checkDeliver,
            checkAd,
        },
        created(){   
            this.$axios({   //获取应聘记录
                method:'post',
                url:"http://www.tp5.com/user/deliver/search",
                data:JSON.stringify({
                    talent:this.$store.state.username
                })
            })
            .then(res=>{ 
                //console.log(res.data)
                this.offer=res.data
                //初始化compfilters，postfilters, statusfilters
                for(var i in this.offer)    
                {
                    if(!this.compfilters.find((obj)=>obj.value===this.offer[i].company))
                        this.compfilters.push({value:this.offer[i].company,text:this.offer[i].company})
                    if(!this.postfilters.find((obj)=>obj.value===this.offer[i].post))
                        this.postfilters.push({value:this.offer[i].post,text:this.offer[i].post})
                    if(!this.statusfilters.find((obj)=>obj.value===this.offer[i].status))
                        this.statusfilters.push({value:this.offer[i].status,text:this.offer[i].status})
                }
            })
            this.$axios({       //获取收藏的职位
                method:'post',
                url:"http://www.tp5.com/user/postcollect/search",
                data:JSON.stringify({
                    talent:this.$store.state.username
                })
            })
            .then(res=>{
                this.starPost=res.data;
                this.$store.commit("initPost",this.starPost) 
            })
            this.$axios({       //获取收藏的企业
                method:'post',
                url:"http://www.tp5.com/user/compcollect/search",
                data:JSON.stringify({
                    talent:this.$store.state.username
                })
            })
            .then(res=>{
                this.starComp=res.data;
                this.$store.commit("initComp",this.starComp) 
            })            
            if(!this.$route.params.permission)
                this.permission=this.$store.state.permission
            else
                this.permission=this.$route.params.permission
            //console.log(this.permission)
            if(this.permission=="审核职位")
                this.dynTab="checkPost"
            else if(this.permission=="审核应聘")
                this.dynTab="checkDeliver"
            else if(this.permission=="审核广告")
                this.dynTab="checkAd"
        },
        methods:{
            toHome(){
                this.$router.push({ path: '/'})
            },  
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            delCollPost(row){
                this.$axios({       //删除收藏的职位
                    method:'post',
                    url:"http://www.tp5.com/user/postcollect/delete",
                    data:JSON.stringify({
                        talent:this.$store.state.username,
                        post:row.no
                    })
                })
                .then(res=>{
                    //console.log(res.data)                    
                    if(res.data.msg=="删除成功"){                        
                        this.$message({
                            showClose: true,
                            message: '成功取消收藏该职位',
                            type: 'success'
                        });
                        this.$store.commit("handlePost",{
                            operation:"delete",
                            obj:row
                        })    //更新本地collectPost
                    }
                    else{
                        this.$message({
                            showClose: true,
                            message: '取消收藏失败',
                            type: 'error'
                        });
                    }
                    this.$forceUpdate();  //强制页面刷新                     
                })
            },
            delCollComp(row){
                this.$axios({       //删除收藏的企业
                    method:'post',
                    url:"http://www.tp5.com/user/compcollect/delete",
                    data:JSON.stringify({
                        talent:this.$store.state.username,
                        comp:row.no
                    })
                })
                .then(res=>{
                    //console.log(res.data)                    
                    if(res.data.msg=="删除成功"){                        
                        this.$message({
                            showClose: true,
                            message: '成功取消收藏该企业',
                            type: 'success'
                        });
                        this.$store.commit("handleComp",{
                            operation:"delete",
                            obj:row
                        })    //更新本地collectComp
                    }
                    else{
                        this.$message({
                            showClose: true,
                            message: '取消收藏失败',
                            type: 'error'
                        });
                    }
                    this.$forceUpdate();  //强制页面刷新                     
                })
            },
            delOffer(index,row){
                this.$axios({
                    method:'post',
                    url:"http://www.tp5.com/user/deliver/delete",
                    data:JSON.stringify({
                        talent:this.$store.state.username,
                        post:row.post,
                        company:row.company
                    })
                }).then(res=>{
                    console.log(res.data)
                    if(res.data.msg=="删除成功"){
                        this.offer.splice(index,1); //更新职位数组                   
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .flex_center{
        display: flex;
        flex-direction:row; 
        justify-content: center;
        align-items : center;
        height: 100%;
    }
    .el-tabs{
        padding:30px 60px;
    }
    .active{
        margin:20px 0;
    }
    .resumeH{
        font-weight:600;
    }
    .resumeB{
        line-height: 30px;
    }
</style>