<template>
  <div id="app">
    <router-view/>    
  </div>
</template>

<script>
import localStore from '../src/store/localStore'
export default {
  name: 'App',
   mounted () {
    window.addEventListener('unload', this.saveState),  //一旦页面已下载时触发（或者浏览器窗口已被关闭）
    window.addEventListener("load", () => { //页面结束加载之后触发
      sessionStorage.clear();
    });
  },
  methods: {
    saveState () {
      localStore.set('collectPost',this.$store.state.collectPost)      
      localStore.set('collectComp', this.$store.state.collectComp)
      localStore.set('username', this.$store.state.username)
      localStore.set('curViewer', this.$store.state.curViewer)
      permission.set('permission', this.$store.state.permission)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
   
html,body{
   padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
    /* overflow: hidden; */
}
  
</style>
