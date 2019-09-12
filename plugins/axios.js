// 是用于处理axios的请求拦截插件
//提示在vue组件中可以使用this.$message来使用，但是在js文件中this指向的不是单文件组件，所以需要按需引入
import {Message} from "element-ui"

export default ( {$axios,redirect} ) => {
    // console.log(nuxt); => 为了解构出 $axios
    // 错误拦截,onError用户错误拦截
    $axios.onError(res => {
        // 返回的res是一个错误的对象，Error对象下都有一个response属性可以访问错误信息
        // console.log(res.response,123) => 为了解构出 message,statusCode
        const {message,statusCode} = res.response.data;

        if(statusCode === 400){
            Message.error(message)
        }

        // if(statusCode === 401 || statusCode === 401){
        //     Message.error('暂未登录，请先登录！')
        //     redirect('/user/login')
        // }

    })
}