<script setup lang="ts">
import {reactive, ref} from 'vue'
import {FormInstance} from 'element-plus'

const formRef = ref<FormInstance>()
// const form = reactive({
//   username: '',
//   password: ''
// })
const username = ref('')
const password = ref('')

const logIn = () => {
  console.log('123213');
  // console.log(form.value);
}

</script>

<template>
  <el-card shadow="always">
    <!-- 登录表单 -->
    <el-form
    ref="formRef"

    >
      <el-form-item label="用户名" prop="username"
      :rules="[{
        required: true,
        message: '请输入用户名'
      }]"
      >
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password"
      :rules="[{
        required: true,
        message: '请输入密码'
      }]">
        <el-input type="password" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="logIn">登录</el-button>
      <el-button>注册</el-button>
    </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
/* .read-the-docs {
  color: #888;
} */
</style>
