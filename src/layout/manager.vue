<template>
  <el-container class="layout-container">
    <el-aside width="auto">
      <logo-bar :collapsed="collapsed" />
      <menu-bar :collapsed="collapsed" />
    </el-aside>

    <el-container style="background-color: #ecf5ff;">
      <el-header>
        <el-row>
          <el-icon style="font-size: 26px;" @click="changeCollapsed">
            <component :is="collapsed ? Expand : Fold" />
          </el-icon>
        </el-row>
        <div class="logout">
          <el-button @click="logOut">退出登录</el-button>
        </div>
      </el-header>

      <el-main>
        <el-scrollbar>
          <UserManage v-if="userType === 'manager'" />
          <a @click="goLogin" v-else>请先登录</a>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import LogoBar from './components/LogoBar/index.vue'
import MenuBar from './components/MenuBar/index.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import UserManage from '@/view/userManage/UserManage.vue'
import router from '@/router'

const collapsed = ref<boolean>(false)
const userType = ref('')


onMounted(() => {
  // 从 localStorage 中获取用户类型并存放在变量中
  userType.value = localStorage.getItem('userType') || ''
})
const changeCollapsed = () => {
  collapsed.value = !collapsed.value
}
const goLogin = () => {
  router.replace('./login')
}

const logOut = () => {
   	localStorage.removeItem('userType')
    router.replace('./login')
}
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.layout-container .el-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  background-color: #c6e2ff;

  /* position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary); */
}

.layout-container .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  overflow: hidden;
}
</style>