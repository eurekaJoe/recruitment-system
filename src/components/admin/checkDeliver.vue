<template>
    <el-table :data="deliver"  style="width: 100%">
        <el-table-column  prop="id" label="编号" width="100" align="center"></el-table-column>
        <el-table-column  
        prop="company" label="企业名称" width="150" align="center"></el-table-column>
        <el-table-column  prop="post" label="职位名称" width="180" align="center"></el-table-column>
        <el-table-column  prop="talent" label="人才名称" width="150" align="center"></el-table-column>
        <el-table-column  prop="status" label="管理状态" width="170" align="center">
            <template slot-scope="scope">
                <el-tag
                :type="scope.row.status === '审核中' ? 'warning' : (scope.row.status === '审核通过'?'success':'danger')"
                disable-transitions>{{scope.row.status}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column  label="操作" width="150" align="center">
        <template slot-scope="scope">
            <el-dropdown @command="hdlTalentCom">
            <span class="el-dropdown-link">
                修改<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="审核中" icon="el-icon-info" @click.native="changeTalentStatus(scope.$index)">审核中</el-dropdown-item>
                <el-dropdown-item command="审核通过" icon="el-icon-success" @click.native="changeTalentStatus(scope.$index)">审核通过</el-dropdown-item>
                <el-dropdown-item command="审核不通过" icon="el-icon-error" @click.native="changeTalentStatus(scope.$index)">审核不通过</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </template>
        </el-table-column>
    </el-table> 
</template>

<script>
export default {
    name:"checkDeliver",
    data(){
        return{
            deliver:[],
            TalentStatus:'', //要更改的人才应聘的状态
        }
    },
    created(){
        this.$axios({   //获取用户应聘数据 
            method:'get',
            url:"http://www.tp5.com/admin/deliver/search"
        }).then(res=>{  
            this.deliver=res.data;
        });
    },
    methods:{
        hdlTalentCom(command) {
            this.TalentStatus=command;
        },
        changeTalentStatus(index){
            console.log(this.deliver[index].id,this.TalentStatus)
            if(this.TalentStatus!=this.deliver[index].status){ //如果状态有更改
                this.$axios({   
                    method:'post',
                    url:"http://www.tp5.com/admin/deliver/update",
                    data:JSON.stringify({
                        id:this.deliver[index].id,
                        status:this.TalentStatus
                    })
                })
                .then(res=>{  
                    console.log(res.data)
                    if(res.data.msg=="修改成功"){
                        this.deliver[index].status=this.TalentStatus;
                        this.$forceUpdate();
                    }
                })
            }
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