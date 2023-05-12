<template>
  <el-card style="width: 500px;">
    <h2 style="text-align: center;">账号注册</h2>
    <el-form label-width="80px" :model="formData" ref="formRef" :rules="rules">
      <el-form-item label="账号" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="formData.confirmPassword" show-password></el-input>
      </el-form-item>
      <el-form-item class="centerItem">
        <el-button style="margin: 0 70px 0 120px" type="primary" @click="submitForm">注册</el-button>
        <a href="/login">已有账号？立即登录</a>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { userRegister } from '@/api/user'
import { ElMessage, FormRules } from 'element-plus'
import router from '@/router'

interface FormData {
  username: string
  name: string
  password: string
  confirmPassword: string
}

const formData = ref<FormData>({
  username: '',
  name: '',
  password: '',
  confirmPassword: ''
})

const rules = reactive<FormRules>({
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }],
  name: [{
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }],
  confirmPassword: [{
    required: true,
    message: '请确认密码',
    trigger: 'blur'
  },
  { validator: checkPassword, trigger: 'blur' }]
})

const formRef = ref()
const passwordError = ref(false)

function checkPassword(rule: any, value: string, callback: Function) {
  if (value !== formData.value.password) {
    callback(new Error('两次输入的密码不相同，请重新输入。'))
  } else {
    callback()
  }
}


function submitForm() {
  formRef.value?.validate((valid: boolean) => { // 使用可选链运算符
    if (valid && !passwordError.value) {
      userRegister(formData.value).then((res) => {
        if (res.data.code === 200) {
          ElMessage.success(res.data.msg)
          router.push('/login')
        }
      }).catch(() => {
        ElMessage.error('用户名已经存在！')
      })
    }
  })
}
</script>

<style></style>
