<template>  
  <div>  
    <el-input placeholder="请输入人才名" suffix-icon="el-icon-date" v-model="filterTalent" style="width:180px"></el-input>
    <el-input placeholder="请输入求职类型" suffix-icon="el-icon-date" v-model="filterPost" style="width:200px"></el-input>
    <el-button type="warning" round @click="filter">筛选</el-button>
    <el-button type="warning" round @click="reset">重置</el-button>
    <el-table :data="talent2" style="width: 1130px;text-align:center">
      <el-table-column type="expand">
        <template slot-scope="props">
            <span class="resumeH">简历</span>
            <div class="resumeB">{{props.row.resume}}</div> 
        </template>
      </el-table-column>
      <el-table-column  prop="no" label="编号" width="100" align="center"></el-table-column>
      <el-table-column  prop="name" label="姓名" width="150" align="center"></el-table-column>
      <el-table-column  prop="type" label="求职类型" width="200" align="center"></el-table-column>
      <el-table-column  prop="age" label="年龄" width="100" align="center"></el-table-column>
      <el-table-column  prop="place" label="籍贯" width="150" align="center"></el-table-column>
      <el-table-column  prop="diploma" label="学历" width="150" align="center"></el-table-column>      
      <el-table-column  prop="contact" label="联系方式" width="200" align="center"></el-table-column>      
    </el-table>  
  </div>  
</template>     

<script>  

export default {
    name:"talent",
    data(){  
        return{  
          talent:[],
          talent2:[], //筛选后的表格数组
          filterTalent:"",
          filterPost:"",
        }  
    },  
    created(){ 
      this.$axios({
        method:'get',
        url:"http://www.tp5.com/home/talent/getdata"
      })
      .then(res=>{  
        this.talent=res.data
        this.talent2=this.talent
      })  
    },
    methods:{
      filter(){
        this.talent2=[]
        for(var i in this.talent)
        {
          if(this.talent[i].name== this.filterTalent && this.talent[i].type==this.filterPost){
            this.talent2.push(this.talent[i])
          }
        }
        //console.log(this.talent2)
      },
      reset(){
        this.talent2=this.talent
        this.filterTalent=""
        this.filterPost=""
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