<template>
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
import { ref, onMounted } from 'vue'
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
</script>

<style>
.el-menu-vertical {
  /* width: 200px; */
  min-height: 400px;
  height: 100vh;
  background-color: #d9ecff;
}
</style>
