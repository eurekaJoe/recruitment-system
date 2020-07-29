<template>
    <div>
        <el-table :data="imgList" height="500" style="width: 100%">
            <el-table-column  prop="id" label="企业ID" width="100" align="center"></el-table-column>
            <el-table-column  prop="name" label="企业名称" width="150" align="center"></el-table-column>
            <el-table-column  prop="img_url" label="广告图片地址" width="300" align="center"></el-table-column>
            <el-table-column  label="操作" width="150" align="center">
            <template slot-scope="scope" >
                <el-button type="danger" size="mini" plain @click="delAd(scope.$index,scope.row.id)">删除<i class="el-icon-delete el-icon--right"></i></el-button>
            </template>
            </el-table-column>
        </el-table>  
        <el-button type="primary" icon="el-icon-circle-plus" @click="dialogFormVisible = true">添加</el-button>
        <el-dialog title="添加企业广告" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="企业名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="广告图片地址" :label-width="formLabelWidth">
                    <el-input v-model="form.img" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addAd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"checkAd",
    data(){
        return{
            imgList:[],   //广告数据
            dialogFormVisible: false,
            form:{    //添加广告表单
                name:"",
                img:""
            },
            formLabelWidth: '120px',
        }
    },
    created(){
        this.$axios({   //获取广告数据
            method:'get',
            url:"http://www.tp5.com/admin/ad/search"
        })
        .then(res=>{  
            this.imgList=res.data;//获取数据 
            //console.log(res.data)
        })
    },
    methods:{
        delAd(index,id){  //删除广告
            this.$axios({   
                method:'post',
                url:"http://www.tp5.com/admin/ad/delete",
                data:JSON.stringify({
                    id:id
                })
            })
            .then(res=>{  
                //console.log(res.data)
                if(res.data.msg=="删除成功"){
                    this.imgList.splice(index,1)
                    this.$forceUpdate();  //强制页面刷新
                    this.$message({
                        showClose: true,
                        message: '删除广告成功',
                        type: 'success'
                    });
                }
            })
        },
        addAd(){  //添加广告
            this.$axios({   
            method:'post',
                url:"http://www.tp5.com/admin/ad/insert",
                data:JSON.stringify({
                    name:this.form.name,
                    img_url:this.form.img
                })
            })
            .then(res=>{  
                console.log(res.data)
                this.dialogFormVisible = false;
                
                if(res.data.msg=="添加广告成功"){            
                    this.imgList.push({"id":res.data.id,"name":this.form.name,"img_url":this.form.img})            
                    this.$message({
                        showClose: true,
                        message: '添加广告成功',
                        type: 'success'
                    })
                }
                else{
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
                this.form.name="";
                this.form.img="";
                this.$forceUpdate();  //强制页面刷新
            })
        },
    }
}
</script>

<style scoped>

</style>