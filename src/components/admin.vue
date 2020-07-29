<template>
    <div>
      <el-row><h1>管理员界面</h1>
      <el-link type="info"  @click="toHome" style="float:right;margin:0px 200px 40px 0;">返回首页</el-link>
      </el-row>
      <el-tabs :tab-position="tabPosition" v-model="activeName">
          <el-tab-pane label="企业职位" name="checkPost" :key="'checkPost'">          
            <checkPost/>
          </el-tab-pane>
          <el-tab-pane label="人才应聘" name="checkDeliver" :key="'checkDeliver'">           
            <checkDeliver/>
          </el-tab-pane>
          <el-tab-pane label="广告管理" name="checkAd" :key="'checkAd'">
            <checkAd/>
          </el-tab-pane>
          <el-tab-pane label="访问流量">
            <el-row><!--每日/月新增选择-->
              <el-col :span="12">
                <el-date-picker
                  v-model="day"
                  type="date" value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </el-col>
              <el-col :span="12">
                <el-date-picker
                  v-model="month"
                  type="month" value-format="yyyy-MM"
                  placeholder="选择月">
                </el-date-picker>
              </el-col>
            </el-row>  
            <el-row><!--新增数据图 -->
              <el-col :span="12" >
                <div class="myChart" id="myChart1" ></div>
              </el-col>
              <el-col :span="12">
                <div class="myChart" id="myChart2" ></div>
              </el-col>
            </el-row> 
            <el-row> <!--DAU -->
              <el-col :span="12">
                <el-date-picker
                  v-model="day2"
                  type="date" value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <div class="myChart" id="myChart3" ></div>
              </el-col> 
            </el-row> 
          </el-tab-pane>
          <el-tab-pane label="权限管理">
            <el-row>
              <el-col :span="3"><div class="grid-content"></div></el-col>
              <el-col :span="18">              
              <el-table :data="users" >
                <el-table-column  prop="username" label="用户名" width="180" align="center"></el-table-column>
                <el-table-column  prop="createTime" label="创建时间" width="250" align="center"></el-table-column>
                <el-table-column  prop="activeTime" label="最近登录时间" width="250" align="center"></el-table-column>
                <el-table-column  prop="permission" label="权限" width="130" align="center"></el-table-column>
                <el-table-column  label="操作" width="150" align="center" >
                  <template slot-scope="scope">
                      <el-dropdown @command="hdlPerm">
                      <span class="el-dropdown-link">
                        修改<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="审核职位" icon="el-icon-info" @click.native="changePerm(scope.$index)">审核职位</el-dropdown-item>
                        <el-dropdown-item command="审核应聘" icon="el-icon-s-check" @click.native="changePerm(scope.$index)">审核应聘</el-dropdown-item>
                        <el-dropdown-item command="审核广告" icon="el-icon-s-finance" @click.native="changePerm(scope.$index)">审核广告</el-dropdown-item>
                        <el-dropdown-item command="无权限" icon="el-icon-s-order" @click.native="changePerm(scope.$index)">无权限</el-dropdown-item>
                      </el-dropdown-menu>
                      </el-dropdown>
                  </template>
                </el-table-column>
              </el-table></el-col>
              <el-col :span="3"><div class="grid-content"></div></el-col>
            </el-row>
          </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>   
  import echarts from 'echarts'
  import checkPost from '@/components/admin/checkPost'
  import checkDeliver from '@/components/admin/checkDeliver'
  import checkAd from '@/components/admin/checkAd'

  export default {
    name:"admin",
    components:{
      checkPost,
      checkDeliver,
      checkAd,
    },
    data() {
      return {
        tabPosition: 'left',
        activeName:"checkPost",
        users:[],
        permission:"",
        day:"",
        month: "",
        day2:"",
        option1:{
          title: { text: '该日新增数' },
          tooltip: {trigger: 'item',},
          xAxis: {
            data: ["企业","人才","职位"],
          },
          yAxis:{
            type: 'value',
            min: 0,
            max: 10,
          },
          series: [{
            name: '新增数量',
            type: 'bar',
            data: [0, 0, 0],
            barWidth: 50, //柱子宽度
            itemStyle: {//柱样式
              normal: {
                barBorderRadius: [5,5,0,0],
                color: function (params){//渐变色，也可以直接用数组给不同的柱子设置不同的颜色
                  var colorList = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6f86d6'
                  }, {
                    offset: 1,
                    color: '#48c6ef'
                  }]),new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#505285'
                  }, {
                    offset: 1,
                    color: '#b5aee4'
                  }]),new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#c71d6f'
                  }, {
                    offset: 1,
                    color: '#d09693'
                  }])];
                  return colorList[params.dataIndex];
                },
                opacity: 1,
              }
            }
          }]
        },
        option2:{
          title: { text: '该月新增数' },
          tooltip: {},
          xAxis: {
            data: ["企业","人才","职位"],
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 10,
          },
          series: [{
            name: '新增数量',
            type: 'bar',
            data: [0, 0, 0],
            barWidth: 50, //柱子宽度
           // barGap: 1, //柱子之间间距
            itemStyle: {//柱样式
              normal: {
                barBorderRadius: [5,5,0,0],
                color: function (params){//渐变色，也可以直接用数组给不同的柱子设置不同的颜色
                  var colorList = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#6f86d6'
                  }, {
                    offset: 1,
                    color: '#48c6ef'
                  }]),new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#505285'
                  }, {
                    offset: 1,
                    color: '#b5aee4'
                  }]),new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#c71d6f'
                  }, {
                    offset: 1,
                    color: '#d09693'
                  }])];
                  return colorList[params.dataIndex];
                },
                opacity: 1,
              }
            }
          }]
        },
        option3:{
          title: { text: '该日DAU' },
          tooltip: {},
          xAxis: {
            data: ["企业","人才"]
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 10,
          },
          series: [{
            name: 'DAU',
            type: 'bar',
            data: [0, 0],
            barWidth: 50, //柱子宽度
            itemStyle: {//柱样式
              normal: {
                barBorderRadius: [5,5,0,0],
                color: function (params){//渐变色，也可以直接用数组给不同的柱子设置不同的颜色
                  var colorList = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#ed6ea0'
                  }, {
                    offset: 1,
                    color: '#ec8c69'
                  }]),new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#ed6ea0'
                  }, {
                    offset: 1,
                    color: '#ec8c69'
                  }])];
                  return colorList[params.dataIndex];
                },
                opacity: 1,
              }
            }
          }]
        },
      }
    },
    created(){    
       this.$axios({   //获取用户应聘数据 
          method:'get',
          url:"http://www.tp5.com/admin/manage/search"
        }).then(res=>{  
          //console.log(res.data)
          this.users=res.data;
        });
      var aData = new Date();
      this.day=aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate()
      this.month=aData.getFullYear() + "-" + (aData.getMonth() + 1)
      this.day2=this.day
    },
    mounted(){
      this.SetChartsDay()
      this.SetChartsMonth()
      this.SetChartsDAU()
    },
    watch:{
      day:{
        handler(newVal,oldVal){
          //console.log("更新日数据")
          this.SetChartsDay()
        },
        deep:true
      },
      month:{
        handler(newVal,oldVal){
          //console.log("更新月数据")
          this.SetChartsMonth()
        },
        deep:true
      },
      day2:{
        handler(newVal,oldVal){
          //console.log("更新DAU日")
          this.SetChartsDAU()
        },
        deep:true
      }
    },
    methods: {
      toHome(){
        this.$router.push({ path: '/'})
      },  
      SetChartsDay(){
        // 基于准备好的dom，初始化echarts实例
        let myChart1 = echarts.init(document.getElementById('myChart1'))
        this.$axios({
          method:'post',									
          url:"http://www.tp5.com/admin/getflow/getnew",
          data:JSON.stringify({
            type:"day",
            day:this.day,
          })
        })
        .then((res)=>{
          //console.log(res.data)
          this.option1.series[0].data=res.data;
          myChart1.setOption(this.option1);
        })
      },
      SetChartsMonth(){
        let myChart2 = echarts.init(document.getElementById('myChart2'))
        this.$axios({
          method:'post',									
          url:"http://www.tp5.com/admin/getflow/getnew",
          data:JSON.stringify({
            type:"month",
            month:this.month
          })
        })
        .then((res)=>{
          //console.log(res.data)
          this.option2.series[0].data=res.data;
          myChart2.setOption(this.option2);
        })
      },
      SetChartsDAU(){
        let myChart3 = echarts.init(document.getElementById('myChart3'))
        this.$axios({
          method:'post',									
          url:"http://www.tp5.com/admin/getflow/getDAU",
          data:JSON.stringify({
            day:this.day2,
          })
        })
        .then((res)=>{
          //console.log(res.data)
          this.option3.series[0].data=res.data;
          myChart3.setOption(this.option3);
        })
      },
      hdlPerm(command){
        this.permission=command
      },
      changePerm(index){  //修改权限
        if(this.permission!=this.users[index].permission){ //如果状态有更改
          this.$axios({   
            method:'post',
            url:"http://www.tp5.com/admin/manage/update",
            data:JSON.stringify({
              username:this.users[index].username,
              permission:this.permission
            })
          })
          .then(res=>{  
            //console.log(res.data)
            if(res.data.msg=="修改成功"){
              this.users[index].permission=this.permission;
              this.$forceUpdate();  //强制页面
            }
          })
        }
      }
    }
  };
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .myChart{
    margin: 0 auto;
    width: 300px;
    height: 300px;
    margin-top: 30px;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .resumeH{
    font-weight:600;
  }
  .resumeB{
    line-height: 30px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  
</style>