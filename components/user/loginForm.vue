<template>
    <el-form 
        :model="loginForm" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            v-model="loginForm.username"
            placeholder="请输入用户名">
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            v-model="loginForm.password"
            placeholder="请输入密码" 
            type="password">
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    data(){
        return {
            // 表单数据
            loginForm: {
                username:'',
                password:''
            },
            // 表单规则
            rules: {
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        // 提交登录
        handleLoginSubmit(){
            this.$refs.form.validate((valid) => {
                if(valid) {
                    this.$axios({
                        url:'/accounts/login',
                        method:'POST',
                        data:this.loginForm
                    }).then(res=>{
                        this.$store.commit('user/setUserInfo',res.data)
                        this.$router.back()
                    })
                }else {
                    this.$message.error('请填写您的用户名和密码')
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>