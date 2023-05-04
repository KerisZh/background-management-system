<template>
  <el-card class="loginCard" shadow="always">
    <!-- 登录表单 -->
    <h2 style="text-align: center;">后台管理系统</h2>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="left">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item class="login-button">
        <el-button type="primary" @click="logIn(ruleFormRef)">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <slot name="header"></slot>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import router from '@/router'
import { userLogin } from '@/api/user'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: ''
})
const rules = reactive<FormRules>({
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }]
})


//表单提交
const logIn = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (ruleForm.username === 'admin' && ruleForm.password === 'admin') {
        localStorage.setItem('userType', 'manager')
        router.replace('./manage')
      } else {
        userLogin(ruleForm).then(res => {
          if (res.data.code === 200) {
            localStorage.setItem('userType', 'user')
            localStorage.setItem('userInfo', JSON.stringify(res.data.data[0]));
            router.push('./info')
            ElMessage.success('登录成功')
          } else {
            ElMessage.warning(res.data.msg)
          }

        })

      }
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const register = () => {
  router.push('./register')
}

</script>



<style scoped>
/* .read-the-docs {
  color: #888;
} */
.loginCard {
  width: 500px;
  height: 300px;
}

.login-button {
  display: inline-block;
  margin-left: 176px;
}
</style>
