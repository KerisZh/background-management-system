<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import router from '@/router'

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
        localStorage.setItem('userType', 'user')
        localStorage.setItem('userInfo', JSON.stringify({
          account: ruleForm.username,
          password: ruleForm.password,
          name: '张三'
        }));

        router.replace('./info')
      }
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const register = () => {
  router.replace('./register')
}

</script>

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
