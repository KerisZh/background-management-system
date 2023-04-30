<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group> -->
  <el-menu default-active="2" class="el-menu-vertical" :collapse="collapsed">
    <el-menu-item v-show="userType === 'user'" index="1">
      <el-icon>
        <Avatar />
      </el-icon>
      <template #title>个人信息</template>
    </el-menu-item>
    <el-menu-item v-show="userType === 'manager'" index="2">
      <el-icon>
        <setting />
      </el-icon>
      <template #title>用户管理</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import router from '@/router'

defineProps({
  collapsed: {
    type: Boolean
  }
})

const userType = ref('')
onMounted(() => {
  // 从 localStorage 中获取用户类型并存放在变量中
  userType.value = localStorage.getItem('userType') || ''
  if (!userType) {
    router.push('/login')
    alert('请先登录')
  }
})


const isManager = () => {
  return localStorage.getItem('userType') === 'manager' || false
}

</script>

<style>
.el-menu-vertical {
  /* width: 200px; */
  min-height: 400px;
  height: 100vh;
  background-color: #d9ecff;
}
</style>
