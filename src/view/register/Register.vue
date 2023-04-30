<template>
  <el-card style="width: 500px;">
    <h2 style="text-align: center;">账号注册</h2>
    <el-form label-width="80px" :model="formData" ref="form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="formData.confirmPassword" @blur="checkPassword"></el-input>
        <div v-if="passwordError" style="color: red;">两次输入的密码不相同，请重新输入。</div>
      </el-form-item>
      <el-form-item>
        <el-button style="margin-left: 170px;" type="primary" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'

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

const formRef = ref()
const passwordError = ref(false)

function checkPassword() {
  if (formData.value.password !== formData.value.confirmPassword) {
    passwordError.value = true
  } else {
    passwordError.value = false
  }
}

function submitForm() {
  formRef.value?.validate((valid: boolean) => { // 使用可选链运算符
    if (valid && !passwordError.value) {
      console.log(`Username: ${formData.value.username}`)
      console.log(`Name: ${formData.value.name}`)
      console.log(`Password: ${formData.value.password}`)
      console.log(`Confirm Password: ${formData.value.confirmPassword}`)
    }
  })
}
</script>

<style></style>
