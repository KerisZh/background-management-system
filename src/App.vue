<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Login from '@/components/login.vue'
import SlotsAttrs from './components/SlotsAttrs.vue'
const recieveItem = (props: any) => {
  alert(props)
}
</script>

<template>
  <!-- <Login @parentClick="recieveItem" :list=[1,2,3,4]></Login> -->
  <!-- <slots-attrs color="red" msg="this is a message">
    <template #header>
      父组件插槽
    </template>
  </slots-attrs> -->
  <router-view />
</template>

<style scoped>

</style>
