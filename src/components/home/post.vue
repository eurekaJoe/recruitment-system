<template>  
    <div>  
    <el-table :data="posts" >
        <el-table-column type="expand" width="30">
        <template slot-scope="props">
            <span class="resumeH">任职要求</span>
            <div class="resumeB">{{props.row.requirement}}</div> 
        </template>
        </el-table-column>
        <el-table-column  prop="no" label="编号" width="100" align="center"></el-table-column>
        <el-table-column  prop="name" label="名称" width="150" align="center" :filters="filterPost" :filter-method="filterHandler"></el-table-column>
        <el-table-column  prop="number" label="人数" width="150" align="center"></el-table-column>
        <el-table-column  prop="date" label="发布时间" width="150" align="center"></el-table-column>
        <el-table-column  prop="treatment" label="待遇" width="150" align="center"></el-table-column>
        <el-table-column  prop="ifAllowance" label="是否补助" width="150" align="center"></el-table-column>      
        <el-table-column  prop="contact" label="联系方式" width="270" align="center"></el-table-column>
        <el-table-column label="操作" width="120" align="center" v-if="this.$store.state.curViewer!='company'">
            <template slot-scope="scope">
                <el-button v-if="star[scope.$index]" @click="handleCollect(scope.$index,scope.row)" type="danger" icon="el-icon-star-on" size="small" circle></el-button>
                <el-button v-else @click="handleCollect(scope.$index,scope.row)" type="danger" icon="el-icon-star-off" size="small" circle></el-button>            
                <el-button class="submit" type="warning" icon="el-icon-s-custom" size="small" circle @click="handleOffer(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>   

  </div>  
</template>    

<script>
import localStore from '@/store/localStore.js'
export default {
    name:"post",
    data(){
        return{
            posts:[],
            star:[],
            filterPost:[]
        }
    },
    created(){ 
        this.$axios({
            method:'get',
            url:"http://www.tp5.com/home/post/getdata"
        })
        .then(res=>{  
            //console.log(res.data)
            this.posts=res.data;//获取职位列表 
            for(var i in this.posts){   //如果没有审核通过，就不显示
                if(this.posts[i].status!="审核通过")
                    this.posts.splice(i,1);
            }
            for(var i in this.posts)  //职位名称筛选
            {
                if(!this.filterPost.find((obj)=>obj.text==this.posts[i].name))
                    this.filterPost.push({text: this.posts[i].name, value: this.posts[i].name})
            } 
            if(!this.$store.state.username||this.$store.state.curViewer=="company"){
                this.star='';
            }
            else{
                for(var i in this.posts){   //如果该职位在收藏职位中
                    if(this.$store.state.collectPost.find((obj)=>obj.no==this.posts[i].no))
                        this.star[i]=true;
                    else
                        this.star[i]=false;
                }
            }
        })
    },     
    methods:{        
        handleCollect(index,row){  //收藏
            if(this.$store.state.username=='')
            {
                const h = this.$createElement;
                this.$msgbox({
                    title: '小提醒',
                    message: h('p', null, [
                        h('span', null, '您还未登录无法收藏职位噢'),
                        //h('i', { style: 'color: teal' }, 'VNode')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '去登录',
                    cancelButtonText: '我再看看',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '跳转中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 100);
                            }, 300);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$router.push({ path: '/login'})                      
                })
                .catch(()=>{});//这个.catch()删除掉就会打印Uncaught (in promise) cancel
            }
            else{                                  
                if(!this.star[index]){   //添加收藏
                    this.$axios({
                        method:'post',
                        url:"http://www.tp5.com/user/postcollect/add",
                        data:JSON.stringify({
                            talent:this.$store.state.username,
                            post:row.no
                        })
                    })
                    .then(res=>{ 
                        //console.log(res.data) 
                        this.$store.commit("handlePost",{  //更新本地collectPost
                            operation:"add",
                            obj:row
                        })  
                    })
                } 
                else{   //取消收藏
                    this.$axios({
                        method:'post',
                        url:"http://www.tp5.com/user/postcollect/delete",
                        data:JSON.stringify({
                            talent:this.$store.state.username,
                            post:row.no
                        })
                    })
                    .then(res=>{ 
                        //console.log(res.data) 
                        this.$store.commit("handlePost",{
                            operation:"delete",
                            obj:row
                        })  
                    })
                }
                this.star[index]=!this.star[index];
                this.star=Object.assign({}, this.star)
            }     
        },
        handleOffer(row){   //用户应聘职位
            if(this.$store.state.username=='')
            {
                const h = this.$createElement;
                this.$msgbox({
                    title: '小提醒',
                    message: h('p', null, [
                        h('span', null, '您还未登录无法应聘噢'),
                        //h('i', { style: 'color: teal' }, 'VNode')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '去登录',
                    cancelButtonText: '我再看看',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '跳转中...';
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.confirmButtonLoading = false;
                                }, 100);
                            }, 300);
                        } else {
                            done();
                        }
                    }
                }).then(action => {
                    this.$router.push({ path: '/login'})                      
                })
                .catch(()=>{});//这个.catch()删除掉就会打印Uncaught (in promise) cancel
            }
            else{   
                this.$axios({
                    method:'post',
                    url:"http://www.tp5.com/user/deliver/insert",
                    data:JSON.stringify({
                        contact:row.contact,
                        post:row.name,
                        talent:this.$store.state.username
                    })
                })
                .then(res=>{  
                    console.log(res.data)
                    if(res.data.msg=="插入成功")
                    {
                        this.$message({
                            message: '应聘请求发送成功，请等待管理员审核！',
                            type: 'success'
                        });
                    }
                    else if(res.data.msg=="该记录已存在")
                    {
                        this.$message({
                            message: '您已应聘了该职位！',
                            type: 'warning'
                        });
                    }
                })
            }        
         
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        }
    }
}
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #264166;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 80%;
    }
    .el-table{
        margin-bottom: 130px;
    }
    .resumeH{
        font-weight:600;
    }
    .resumeB{
        line-height: 30px;
    }
    .el-table__header{
        margin: 0;
    }

</style>