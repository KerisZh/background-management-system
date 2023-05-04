<template>
  <div>
    <h1>欢迎使用后台管理系统</h1>
  </div>
  <div style="margin: 20px" />
  <el-form label-position="top" label-width="100px" :model="formLabelAlign" style="max-width: 460px">
    <el-form-item label="账号">
      <el-input disabled v-model="formLabelAlign.username" />
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formLabelAlign.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="modifyInfo">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue'
import { userModify } from '@/api/user'
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
  console.log(formLabelAlign)
  userModify(formLabelAlign).then((res) => {
    console.log(res);
    if(res.data.code === 200) {
      localStorage.setItem('userInfo', JSON.stringify(formLabelAlign))
    }

  })
}
</script>

<style scoped></style>
