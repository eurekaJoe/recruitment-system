<template>
    <div class="rg_layout">
        <div class="left">
            <div @click="tab='users'" :class="{active:tab=='users'}" class="rg_left">
                <p>新用户注册</p>
                <p>USER REGISTER</p>
            </div>
            <div @click="tab='companies'" :class="{active:tab=='companies'}" class="rg_left">
                <p>新企业注册</p>
                <p>ENTER REGISTER</p>
            </div>
        </div>

        <div class="rg_center">
            <div class="rg_form">
                <!--定义表单 form-->
                <form v-show="tab=='users'">
                    <table>
                        <tr>
                            <td class="td_left"><label for="name">姓名</label></td>
                            <td class="td_right"><input v-model="user.name" type="text" name="name" placeholder="请输入姓名">
                                <span class="error">*</span>
                            </td>                            
                        </tr>                       
                        <tr>
                            <td class="td_left"><label for="password">密码</label></td>
                            <td class="td_right"><input v-model="user.password" type="password" name="password" placeholder="请输入密码">
                                <span class="error">*</span>
                            </td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="type">求职类型</label></td>
                            <td class="td_right"><input v-model="user.type" type="text" name="type" placeholder="请输入求职类型"></td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="age">年龄</label></td>
                            <td class="td_right"><input v-model="user.age" type="text" name="age" placeholder="请输入年龄"></td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="place">籍贯</label></td>
                            <td class="td_right"><input v-model="user.place" type="text" name="place" placeholder="请输入籍贯"></td>
                        </tr>
                        <tr>
                            <td class="td_left"><label for="diploma">学历</label></td>
                            <td class="td_right"><input v-model="user.diploma" type="text" name="diploma" placeholder="请输入学历"></td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="contact">联系方式</label></td>
                            <td class="td_right"><input v-model="user.contact" type="text" name="contact" placeholder="请输入联系方式">
                                
                            </td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="resume">简历</label></td>
                            <td class="td_right">
                                <textarea v-model="user.resume" rows="5" warp="virtual" name="resume" placeholder="请输入简历"></textarea>
                            </td>
                        </tr>   
                                     
                    </table>
                </form>
                <form v-show="tab=='companies'">
                    <table>
                        <tr>
                            <td class="td_left"><label for="name">名称</label></td>
                            <td class="td_right"><input v-model="company.name" type="text" placeholder="请输入名称">
                                <span class="error">*</span>
                            </td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="password">密码</label></td>
                            <td class="td_right"><input v-model="company.password" type="password" placeholder="请输入密码">
                                <span class="error">*</span>
                            </td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="type">所属行业</label></td>
                            <td class="td_right"><input v-model="company.industry" type="text" placeholder="请输入所属行业"></td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="age">地址</label></td>
                            <td class="td_right"><input v-model="company.address" type="text" placeholder="请输入地址"></td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="place">法人</label></td>
                            <td class="td_right"><input v-model="company.entity" type="text" placeholder="请输入法人代表"></td>
                        </tr>
                        <tr>
                            <td class="td_left"><label for="diploma">注册资本</label></td>
                            <td class="td_right"><input v-model="company.capital" type="text" placeholder="请输入注册资本"></td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="contact">联系方式</label></td>
                            <td class="td_right"><input v-model="company.contact" type="text" placeholder="请输入联系方式">
                               
                            </td>
                        </tr>

                        <tr>
                            <td class="td_left"><label for="resume">其他介绍</label></td>
                            <td class="td_right">
                                <textarea v-model="company.other" rows="5" warp="virtual" placeholder="请输入其他介绍"></textarea>
                            </td>
                        </tr>                        
                    </table>
                </form>
                <input type="submit" id="btn_sub" value="注册" @click="register">
               
            </div>
        </div>
        
        <div class="rg_right">
            <p>已有账号?<router-link class="fr" to="/login">点我登录</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tab:"users", //默认选中第一个tab
            user:{name:"",password:"",type:"",age:"",place:"",diploma:"",contact:"",resume:""},
            company:{industry:"",name:"",password:"",address:"",entity:"",capital:"",contact:"",other:""},
            errorFlag:false
        }
    },
    methods:{
        register(){
            if(this.tab=="users")
            {
                if(this.user.name=="")
                {
                    var error=document.getElementsByClassName('error')[0];
                    error.innerHTML="*姓名是必须的";this.errorFlag=true;
                }else{
                    var error=document.getElementsByClassName('error')[0];
                    error.innerHTML="*";this.errorFlag=false;
                }              
                if(this.user.password=="")
                {
                    var error=document.getElementsByClassName('error')[1];
                    error.innerHTML="*密码是必须的";this.errorFlag=true;
                }else{
                    var error=document.getElementsByClassName('error')[1];
                    error.innerHTML="*";this.errorFlag=false;
                }
               
                if(this.user.age=="")   this.user.age="0";
            }
            if(this.tab=="companies")
            {
                if(this.company.name=="")
                {
                    var error=document.getElementsByClassName('error')[2];
                    error.innerHTML="*名称是必须的";this.errorFlag=true;
                }else{
                    var error=document.getElementsByClassName('error')[2];
                    error.innerHTML="*";this.errorFlag=false;
                }       
                if(this.company.password=="")
                {
                    var error=document.getElementsByClassName('error')[3];
                    error.innerHTML="*密码是必须的";this.errorFlag=true;
                }else{
                    var error=document.getElementsByClassName('error')[3];
                    error.innerHTML="*";this.errorFlag=false;
                }               
            }
            if(this.tab=="users")
            {                
                var data=JSON.stringify(this.user);
            }else{                
                var data=JSON.stringify(this.company);
            }
            if(this.errorFlag==false)
            {
                if(this.tab=="users"){
                    this.$axios({
                        method:'post',
                        url:"http://www.tp5.com/user/register/add",
                        data:JSON.stringify({
                            name:this.user.name,
                            password:this.user.password,
                            type:this.user.type,
                            age:this.user.age,
                            place:this.user.place,
                            diploma:this.user.diploma,
                            contact:this.user.contact,
                            resume:this.user.resume,
                        })
                    })
                    .then((res) =>{
                        //console.log(res.data);
                        if(res.data.msg=="注册成功")
                        {
                            this.$router.push({ name: 'login'})
                        }
                        else if(res.data.msg=="已存在")
                        {                           
                            var error=document.getElementsByClassName('error')[0];
                            error.innerHTML="*该用户已注册";this.errorFlag=true;
                            this.user.name="";this.user.password="";this.user.age="";
                        }                        
                    })
                    .catch((err) =>{
                        console.log(err);
                    })
                }
                else{   //企业注册
                    this.$axios({
                        method:'post',
                        url:"http://www.tp5.com/company/register/add",
                        data:JSON.stringify({
                            name:this.company.name,
                            password:this.company.password,
                            industry:this.company.industry,
                            address:this.company.address,
                            entity:this.company.entity,
                            capital:this.company.capital,
                            contact:this.company.contact,
                            other:this.company.other,
                        })
                    })
                    .then((res) =>{
                        //console.log(res.data);
                        if(res.data.msg=="注册成功")
                        {
                            this.$router.push({ name: 'login'})
                        }
                        else if(res.data.msg=="已存在")
                        {
                            var error=document.getElementsByClassName('error')[0];
                            error.innerHTML="*该企业已注册";this.errorFlag=true;
                            this.company.name="";this.company.password="";
                        }
                    })
                    .catch((err) =>{
                        console.log(err);
                    })
                }
            }

        }
    }
}
</script>

<style scoped>
    .rg_layout{
        width: 900px;
        height: 550px;
        border: 8px solid #EEEEEE;
        background-color: white;
        /*让div水平居中*/
        margin: auto;
    }

    .left{
        float: left;
        display: flex;
        flex-direction:column;
        justify-content : flex-start;
    }
    .rg_left{
        /*border: 1px solid red;*/
        margin: 15px;
    }
    .active{
        background-color: grey;
        margin: 15px;

    }
    .rg_left > p:first-child{
        color:#FFD026;
        font-size: 20px;
    }
    .rg_left > p:last-child{
        color:#A6A6A6;
        font-size: 20px;
    }

    .rg_center{
        float: left;
        /* border: 1px solid red;*/
    }

    .rg_right{
        /* border: 1px solid red; */
        float: right;
    }

    .rg_right > p:first-child{
        font-size: 15px;

    }
    .rg_right p a {
        color:pink;
    }

    .td_left{
        width: 100px;
        text-align: right;
        height: 45px;
    }
    .td_right{
        padding-left: 50px ;
        float: left;
    }
    .error {
        color: #FF0000;
        font-size: 14px;
    }
    .td_right input,textarea{
        width: 251px;
        height: 32px;
        border: 1px solid #A6A6A6 ;
        /*设置边框圆角*/
        border-radius: 5px;
        padding-left: 10px;
    }
    
    textarea{      
        height: 100px;
    }

    #img_check{
        height: 32px;
        vertical-align: middle;
    }

    #btn_sub{
        width: 150px;
        height: 40px;
        background-color: #FFD026;
        border: 1px solid #FFD026 ;
        float: left;
        margin-left: 120px;
        margin-top: 20px;
    }
</style>