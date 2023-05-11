<template>
  <div>
    <h1>欢迎使用后台管理系统</h1>
  </div>
  <div style="margin: 20px" />
  <el-form label-position="top" label-width="100px" :model="formLabelAlign" style="max-width: 460px" ref="modifyRef"
    :rules="rules">
    <el-form-item label="账号" prop="username">
      <el-input disabled v-model="formLabelAlign.username" />
    </el-form-item>
    <el-form-item label="姓名" prop="name">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formLabelAlign.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="modifyInfo">修改</el-button>
      <el-button @click="cancleModify">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { userModify } from '@/api/user'
import { FormRules, ElMessage } from 'element-plus'
interface UserInfo {
  username: string;
  name: string;
  password: string;
}
const userInfo = ref<UserInfo>({
  username: '',
  name: '',
  password: ''
});
const modifyRef = ref()
const rules = reactive<FormRules>({
  // username: [{
  //   required: true,
  //   message: '请输入用户名',
  //   trigger: 'blur'
  // }],
  name: [{
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  }],
  password: [{
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  }]
})
onMounted(() => {
  userInfo.value = JSON.parse(localStorage.getItem('userInfo') || '')
  formLabelAlign.username = userInfo.value.username
  formLabelAlign.name = userInfo.value.name
  formLabelAlign.password = userInfo.value.password
})

const formLabelAlign = reactive({
  username: '',
  name: '',
  password: '',
})

const modifyInfo = () => {
  modifyRef.value?.validate((valid: boolean) => { // 使用可选链运算符
    if (valid) {
      userModify(formLabelAlign).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          localStorage.setItem('userInfo', JSON.stringify(formLabelAlign))
          ElMessage.success(res.data.msg)
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  })
}

const cancleModify = () => {
  const cur = JSON.parse(localStorage.getItem('userInfo') || '')
  formLabelAlign.name = cur.name
  formLabelAlign.password = cur.password
}

</script>

<style scoped></style>
