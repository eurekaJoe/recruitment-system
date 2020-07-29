<template>
  <div class="hello">
      <el-container>
        <el-header >
          <el-row type="flex" align="center" justify="space-around" class="row-bg">
            <el-col :span="4" class="flex_center">
              <el-image :src="url"></el-image>
            </el-col>
            <el-col :span="10"><div class="grid-content"></div></el-col>
            <el-col :span="8" v-if="!this.$store.state.username" class="flex_center">                  
              <router-link to="../login" class="headerlink">
                <el-button type="primary" plain>登录</el-button>
              </router-link>
              <router-link to="../register" class="headerlink">
                <el-button type="primary" plain>注册<i ></i></el-button>
              </router-link>
              <div class="headerlink" @click="intoAdmin"> 
                <el-button type="success" plain icon="el-icon-s-custom">管理员<i ></i></el-button>
              </div>
            </el-col>
            <el-dialog title="管理员登录" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                <el-form-item label="账号名" label-width=60px>
                  <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码"  label-width=60px>
                 <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="adminRegister">确 定</el-button>
              </div>
            </el-dialog>
            <el-col :span="8" v-if="this.$store.state.username" class="flex_center">                 
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <el-dropdown trigger="hover"  @command="handleCommand" style="margin-left:25px">
                  <span class="el-dropdown-link" >
                    {{$store.state.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-if="this.$store.state.curViewer=='user'" command="enterPage" icon="el-icon-user">我的主页</el-dropdown-item>
                    <el-dropdown-item v-else command="enterPage" icon="el-icon-user">公司主页</el-dropdown-item>
                    <el-dropdown-item command="logout" icon="el-icon-unlock">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>            
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <el-aside width="200px" >
            <el-menu :default-active="activeIndex" class="el-menu-demo" @select="scroll" background-color="#8faad5" text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="1" ><i class="el-icon-s-home" style="font-size:20px;"></i>首页</el-menu-item>
              <el-menu-item index="2" ><i class="fontFamily iconqiye"></i>企业</el-menu-item>
              <el-menu-item index="3" ><i class="fontFamily icongongzuojingli"></i>职位</el-menu-item>
              <el-menu-item index="4" ><i class="fontFamily iconrencai"></i>人才</el-menu-item>
            </el-menu>
          </el-aside>
          
          <el-container>
            <el-main class="main">
              <keep-alive>                
                <component v-bind:is="tabView"></component>
              </keep-alive>
            </el-main>         
          </el-container>
        </el-container>
      </el-container>
    
  </div>
</template>

<script>
import ad from '@/components/home/ad'
import enterprise from '@/components/home/enterprise'
import post from '@/components/home/post'
import talent from '@/components/home/talent'

export default {
  name: 'Home',
  data () {
    var url=require('@/assets/logo.jpg');
    return {
      msg: 'Welcome to Your Vue.js App',
      url:url,
      activeIndex:"1",
      tabView: "ad",
      dialogFormVisible:false, //管理员登录对话框
      form:{name:"",password:""},//管理员登录表单
    }
  },
  methods:{
    scroll(key,keyPath){
      switch(keyPath[0]){
        case"1":
          this.tabView = `ad`;break;
        case "2":
          this.tabView = 'enterprise';break;
        case "3":
          this.tabView = 'post';break;
        case "4":
          this.tabView = 'talent';break;
      }
    },    
    handleCommand(command){
      if(command=="enterPage"){
        if(this.$store.state.curViewer=="user"){
          this.$router.push({ path: '/userPage'})
        }
        else if(this.$store.state.curViewer=="company"){
          this.$router.push({ path: '/companyPage'})
        }
      }
      else if(command=="logout"){
        this.$store.state.username="";
        this.$forceUpdate();
      }
    },
    intoAdmin(){  
      if(this.$store.state.curViewer=='admin'){ //如果管理员已经登录，直接进入管理员界面
        this.$router.push({ path: '/admin'})
      }
      else{ //否则，展示管理员登录表单
        this.dialogFormVisible=true;
      }
    },
    adminRegister(){  //管理员登录
      if(this.form.name=="root" && this.form.password=="root"){        
        this.$router.push({ path: '/admin'})
        this.dialogFormVisible=false;
        this.form.name="";
        this.form.password="";
        this.$store.state.curViewer='admin';
      }
    }
  },
  components:{
    ad,
    enterprise,
    post,
    talent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  #app,.el-container,.hello{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
      /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
    overflow: hidden;
  }

  .el-header{
    background-color: #F9FAFC;
    display: flex;
    flex-direction:row; 
    align-items : center;
  }
  .el-header, .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
  }
  
  .el-aside {
    background-color: #8faad5;
    color: #333;
    text-align: center;
    line-height: 260px;
    display: flex;
    flex-direction:column; 
    justify-content: center;float: left;
  }

  .el-menu-item{
    margin-bottom: 30px;
    font-size: 16px;
    letter-spacing: 8px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 700px;
    
  }  
  .el-image{
    max-height: 40px;
  }
  .el-row {
    width: 100%;
    height: 60px;
  }
  .row-bg {    
    background-color: #f9fafc;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 60px;
  }
  .iconqiye, .icongongzuojingli, .iconrencai, .el-icon-s-home {
    color: white;
  }

  .flex_center{
    display: flex;
    justify-content: center;
    align-items : center;
  }
  .headerlink{
    margin-left: 20px;
  }
</style>
