<template>  
    <div>  
    <el-table :data="enterprises"  style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
              <span class="resumeH">其他介绍</span>
              <div class="resumeB">{{props.row.other}}</div> 
          </template>
        </el-table-column>
        <el-table-column  prop="no" label="编号" width="100" align="center"></el-table-column>
        <el-table-column  prop="industry" label="所属行业" width="150" align="center"></el-table-column>
        <el-table-column  prop="name" label="名称" width="150" align="center"  
          :filters="filterEnter"
          :filter-method="filterHandler"
          filter-placement="bottom-end"
        ></el-table-column>
        <el-table-column  prop="address" label="地址" width="150" align="center"></el-table-column>
        <el-table-column  prop="legal_entity" label="法人" width="150" align="center"></el-table-column>
        <el-table-column  prop="registered_capital" label="注册资本" width="150" align="center"></el-table-column>      
        <el-table-column  prop="contact" label="联系方式" width="200" align="center"></el-table-column>
        <el-table-column label="收藏" v-if="this.$store.state.curViewer!='company'" align="center" >
            <template slot-scope="scope">
                <el-button v-if="star[scope.$index]" @click="handleCollect(scope.$index,scope.row)" type="danger" icon="el-icon-star-on" size="small" circle></el-button>
                <el-button v-else @click="handleCollect(scope.$index,scope.row)" type="danger" icon="el-icon-star-off" size="small" circle></el-button>
            </template>
        </el-table-column>
    </el-table>  
  </div>  
</template>    

<script>
export default {
    name:"enterprise",
    data(){
        return{
          enterprises:[],
          star:[], //收藏的企业
          filterEnter:[]
        }
    },
    created(){ 
      this.$axios({
        method:'get',
        url:"http://www.tp5.com/home/enterprise/getdata"
      })
      .then(res=>{  
        this.enterprises=res.data;   
        for(var i in this.enterprises)  //企业名称筛选
        {
          this.filterEnter.push({text: this.enterprises[i].name, value: this.enterprises[i].name})
        } 
         if(!this.$store.state.username||this.$store.state.curViewer=="company"){
          this.star='';
        }
        else{
          for(var i in this.enterprises){   //如果该企业在收藏企业中
            if(this.$store.state.collectComp.find((obj)=>obj.no==this.enterprises[i].no))
              this.star[i]=true;
            else
              this.star[i]=false;
          }
        }
      })  

    },  
    
    methods:{        
      handleCollect(index,row){  
        if(this.$store.state.username=='')
        {
            const h = this.$createElement;
            this.$msgbox({
              title: '小提醒',
              message: h('p', null, [
                  h('span', null, '您还未登录无法收藏企业噢'),
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
              url:"http://www.tp5.com/user/compcollect/add",
              data:JSON.stringify({
                talent:this.$store.state.username,
                comp:row.no
              })
            })
            .then(res=>{ 
              //console.log(res.data) 
              this.$store.commit("handleComp",{  //更新本地collectComp
                operation:"add",
                obj:row
              })  
            })
          } 
          else{   //取消收藏
            this.$axios({
              method:'post',
              url:"http://www.tp5.com/user/compcollect/delete",
              data:JSON.stringify({
                talent:this.$store.state.username,
                comp:row.no
              })
            })
            .then(res=>{ 
              //console.log(res.data) 
              this.$store.commit("handleComp",{
                  operation:"delete",
                  obj:row
              })  
            })
          }
          this.star[index]=!this.star[index];
          this.star=Object.assign({}, this.star)
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
        margin-bottom: 100px;
    }
    .resumeH{
    font-weight:600;
  }
    .resumeB{
      line-height: 30px;
    }
    .el-table{
      margin-bottom: 50px;
    }
</style>