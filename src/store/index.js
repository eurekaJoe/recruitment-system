import Vue from 'vue'
import Vuex from 'vuex'
import localStore from './localStore.js'
//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state:{
        curViewer:sessionStorage.getItem('curViewer') ? JSON.parse(sessionStorage.getItem('curViewer')):'',
        username:sessionStorage.getItem('username') ? JSON.parse(sessionStorage.getItem('username')):'',
        permission:sessionStorage.getItem('permission') ? JSON.parse(sessionStorage.getItem('permission')):'',
    },
    mutations:{        
        handleComp (state, arg) {
            if(arg.operation=="add")
                state.collectComp.push(arg.obj);
            else if(arg.operation=="delete"){
                var i=state.collectComp.findIndex((item) => item.no === arg.obj.no);
                state.collectComp.splice(i,1);
            }
        },
        initPost(state,array){
            state.collectPost=array;
        },
        initComp(state,array){
            state.collectComp=array;
        },
        handlePost (state, arg) {
            if(arg.operation=="add"){
                state.collectPost.push(arg.obj);
            }
            else if(arg.operation=="delete")
                for(var i=0;i<state.collectPost.length;i++){
                    if(state.collectPost[i].no==arg.obj.no){
                        state.collectPost.splice(i,1);
                        break;
                    }
                }
        }
       
    }
})

export default store