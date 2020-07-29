const storage = {
    set(key, value){ // 调用这个方法时候传入一个 key 和 value 
        //  将传入的 value 转换成JSON 字符串
        sessionStorage.setItem(key,JSON.stringify(value))
    },
    get(key){  // get 方法 直接传入 key 就行
        // 反序列化，将 JSON 字符串转换成 JSON 对象
        return JSON.parse(sessionStorage.getItem(key)||'[]')
    },
    remove(){  //  删除
        sessionStorage.removeItem(key)
    }
}
export default storage   //  将 storage 暴露出去