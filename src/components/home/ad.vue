<template>
    <div>
        <el-carousel indicator-position="outside">
            <el-carousel-item v-for="(item,index) in imgList" :key="index">
                <img :src="item.img_url" alt="" class="carousel-img">
            </el-carousel-item>
        </el-carousel>
       
    </div>
</template>

<script>
export default {
    name:"ad",
    data(){
        return{
            imgList:[],
         
        }
    },
    created(){
        this.$axios({
            method:'get',
            url:"http://www.tp5.com/admin/ad/search"
        })
        .then(res=>{  
            this.imgList=res.data;//获取数据 
            //console.log(res.data)
        })
    }
}
</script>

<style scoped>
    img{    /*图片大小等比缩放 */
        width: auto;  
        height: auto;  
        max-width: 100%;  
        max-height: 100%;     
    }
   
</style>