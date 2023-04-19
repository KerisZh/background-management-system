<script setup lang="ts">
import { reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: ''
})
const rules =  reactive<FormRules>({
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
      console.log(ruleForm.username);
      console.log(ruleForm.password);
      
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<template>
  <el-card shadow="always">
    <!-- 登录表单 -->
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="logIn(ruleFormRef)">登录</el-button>
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
