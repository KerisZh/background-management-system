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
        <el-button type="primary" @click="logIn(ruleFormRef)" @keyup.enter="(e: any) => keyUp(e)">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <slot name="header"></slot>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
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

onMounted(() => {
  window.addEventListener('keyup', keyUp)
})

onUnmounted(() => {
  //销毁事件
  window.removeEventListener('keyup', keyUp, false)
})

const keyUp = (e: any) => {
  if (e.keyCode === 13 || e.keyCode === 100) {
    logIn(ruleFormRef.value)
  }
}

//表单提交
const logIn = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (ruleForm.username === 'admin' && ruleForm.password === 'admin') {
        localStorage.setItem('userType', 'manager')
        router.push('/manage')
      } else {
        userLogin(ruleForm).then(async (res) => {
          if (res.data.code === 200) {
            localStorage.setItem('userType', 'user')
            localStorage.setItem('userInfo', JSON.stringify(res.data.data[0]));
            await router.push('/info')
            ElMessage.success('登录成功')
          } else {
            ElMessage.error(res.data.msg)
          }
        })
      }
    }
  })
}

const register = () => {
  router.push('/register')
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
  margin: 30px 0 0 176px;
}
</style>
