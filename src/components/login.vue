<template>
  <div>
      <div class="login_warp">
		<div class="loginbox fl">
            <!-- 三个选项卡按钮 -->
			<div class="login_header">
				<span @click="type='users'" :class="{active:type=='users'}">用户登录</span>
				<span @click="type='companies'" :class="{active:type=='companies'}">企业登录</span>
			</div>
			<div class="login_content">
                <!-- 在cur==0时此板块显示 其他时候此板块不显示 -->
				<div v-show="type=='users'" class="Cbody_item">
					<div class="form_item"><input type="text" v-model="name" placeholder="用户名"></div>
					<div class="form_item"><input type="password" v-model="password" placeholder="密码"></div>
					<div class="form_item">						
						<router-link class="fr" to="/register">还未注册？点我注册</router-link>
					</div>
					<label class="errorMsg" v-if="errorFlag" v-cloak >{{ errorMsg }}</label>
					<div class="clear"></div>
					<div class="form_item">
						<button type="submit" @click="login">登陆</button>
					</div>
				</div>
                <!-- 在cur==1时此板块显示 其他时候此板块不显示 -->
				<div v-show="type=='companies'" class="Cbody_item">
					<div class="form_item"><input type="text" v-model="name" placeholder="企业名"></div>
					<div class="form_item"><input type="password" v-model="password" placeholder="密码"></div>
					<div class="form_item">						
						<router-link class="fr" to="/register">还未注册？点我注册</router-link>
					</div>
					<div class="clear"></div>
					<div class="form_item">
						<button type="submit" @click="login" >登陆</button>
					</div>
				</div>                
			</div>
		</div>
        <!-- 右边蓝色板块 -->
		<div class="loginrslider fl"></div>
	</div>
  </div>
</template>
 
<script>
export default {
	name:'login',
    data () {
        return {
            type:"users", //默认选中第一个tab
            name:'',
            password:'',            
            errorFlag:false,
            errorMsg:''
        }
    },
    mounted () {
        
    },
    methods:{
        login(){
            var thisvue = this;
            if(thisvue.name==''||thisvue.password=='')
            {
                thisvue.errorMsg = '请输入用户名和密码';
                thisvue.errorFlag = true;
            }
            else{			    
				this.$axios({
                    method:'post',
                    url:this.type=="users"?"http://www.tp5.com/user/login":"http://www.tp5.com/company/login",
                    data:JSON.stringify({    //这里是发送给后台的数据
                    	name:this.name,
						password:this.password
					})
				}).then((res) =>{          //返回promise(ES6语法)
					//console.log(res.data);
					if(res.data.code==1)
					{
						thisvue.errorFlag = false;
						this.$store.state.username=this.name;
						sessionStorage.setItem('username', JSON.stringify(this.$store.state.username))
						
						if(thisvue.type=='users')
						{
							this.$store.state.curViewer='user';
							this.$store.state.permission=res.data.permission
							sessionStorage.setItem('permission', JSON.stringify(this.$store.state.permission))
							this.$router.push({ name: 'userPage', params: { permission:res.data.permission}})
						}							
						else if(thisvue.type=='companies')
						{
							this.$store.state.curViewer='company';
							this.$router.push({ path: '/companyPage', query: { no: res.data.no}})
						}
					}
					else{
						thisvue.errorMsg = res.data.msg;
						thisvue.name = '';
						thisvue.errorFlag = true;
					}
				}).catch((error) =>{
					console.log(error)       //请求失败返回的数据
				})
            }
        }
    }
    
}
</script>
 
<style scoped>
.fl{
	float: left;
}
.fr{
	float: right;
}
.clear{
	clear: both;
}
a{
	text-decoration: none;
	color: #333;
	transition: ease all 0.5s;
}
a{
	color: #1c65ff
}
.login_header{
	margin-bottom: 40px;
}
.login_header span{
	margin-right: 20px;
	cursor: pointer;
}
.loginbox{
	width: 300px;
	overflow: hidden;
	padding: 20px;
	padding-top: 15px;
}
.Cbody_item{
	border: 0px solid #999;
	overflow: hidden;
}
.form_item{
	font-size: 13px;
}
.form_item input[type="text"],.form_item input[type="password"]{
	display: block;
	width: calc(100% - 20px);
	height: 36px;
	margin:0 auto; 
	padding-left: 16px;
	outline: none;
	border: 1px solid #999;
	transition: ease all 0.5s;
	margin-bottom: 20px;
}
.form_item input[type="text"]:focus,.form_item input[type="password"]:focus{
	border: 1px solid #1c65ff
}
.form_item button[type="submit"]{
	display: block;
	width: calc(100% - 0px);
	height: 40px;
	margin:0 auto; 
	padding-left: 16px;
	outline: none;
	border: 1px solid #1c65ff;
	transition: ease all 0.5s;
	margin-top: 20px;
	margin-bottom: 20px;
	background-color: #1c65ff;
	color: #fff;
	cursor: pointer;
}
.form_item button[type="submit"]:hover{
	background-color: #3f7dff;
	border: 1px solid #3f7dff;
}
.active{
    color: #3f7dff;
    padding-bottom: 10px;
    border-bottom: 3px solid #3f7dff;
}
.loginrslider{
	width: 160px;
	height: 322px;
	background-color: #1c65ff;
}
.login_warp{
	width: 500px;
    margin: 50px auto;
    border-radius: 10px;
    box-shadow: 0 0px 0px #ccc;
    overflow: hidden;
    border:1px solid #3f7dff;
    margin-top: 10%;
    transition: ease all 0.5s;
    position: relative;
	top: 0px;
	cursor: pointer;
}
.login_warp:hover{
	top: -30px;
	box-shadow: 0 15px 21px #ccc;
}
.loginrslider{
	color: #fff;
 
}
.qcode{
	width: 160px;
	height: 160px;
	background-color: #ccc;
	margin: 0 auto;
	margin-top: 2px;
}
.beizhu{
	text-align: center;
	font-size: 13px;
	margin-top: 10px;
	color: #999
}

</style>
 