<template>
    <el-table :data="posts"  style="width: 100%">
        <el-table-column type="expand" width="20">
        <template slot-scope="props">
            <span class="resumeH">任职要求</span>
            <div class="resumeB">{{props.row.requirement}}</div> 
        </template>
        </el-table-column>
        <el-table-column  prop="no" label="编号" width="100" align="center"></el-table-column>
        <el-table-column  
        prop="name" label="名称" width="150" align="center"></el-table-column>
        <el-table-column  prop="number" label="人数" width="100" align="center"></el-table-column>
        <el-table-column  prop="date" label="发布时间" width="150" align="center"></el-table-column>
        <el-table-column  prop="treatment" label="待遇" width="150" align="center"></el-table-column>
        <el-table-column  prop="ifAllowance" label="是否补助" width="150" align="center"></el-table-column>      
        <el-table-column  prop="contact" label="联系方式" width="270" align="center"></el-table-column>
        <el-table-column  prop="status" label="管理状态" width="150" align="center">
        <template slot-scope="scope">
            <el-tag
            :type="scope.row.status === '审核中' ? 'warning' : (scope.row.status === '审核通过'?'success':'danger')"
            disable-transitions>{{scope.row.status}}</el-tag>
        </template>
        </el-table-column>
        <el-table-column  label="操作" width="120" align="center">
        <template slot-scope="scope">
            <el-dropdown @command="hdlPostCom">
            <span class="el-dropdown-link">
                修改<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="审核中" icon="el-icon-info" @click.native="changePostStatus(scope.$index)">审核中</el-dropdown-item>
                <el-dropdown-item command="审核通过" icon="el-icon-success" @click.native="changePostStatus(scope.$index)">审核通过</el-dropdown-item>
                <el-dropdown-item command="审核不通过" icon="el-icon-error" @click.native="changePostStatus(scope.$index)">审核不通过</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </template>
        </el-table-column>
    </el-table> 
</template>

<script>
export default {
    name:"checkPost",
    data(){
        return{
            posts:[],
            PostStatus:'',   //要更改的企业职位的状态
        }
    },
    created(){
        this.$axios({   //获取企业发布职位数据 
            method:'get',
            url:"http://www.tp5.com/admin/post/search"
        })
        .then(res=>{  
            //console.log(res.data)
            this.posts=res.data;
        })
    },
    methods:{
        hdlPostCom(command) {
            this.PostStatus=command;
        },
        changePostStatus(index){
            this.$axios({   
                method:'post',
                url:"http://www.tp5.com/admin/post/update",
                data:JSON.stringify({
                    no:this.posts[index].no,
                    status:this.PostStatus
                })
            })
            .then(res=>{  
                //console.log(res.data)
                if(res.data.msg=="修改成功"){
                    this.posts[index].status=this.PostStatus;
                    this.$forceUpdate();  //强制页面刷新
                }
            })
        },
    }
}
</script>

<style scoped>
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
</style>