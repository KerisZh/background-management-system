<template>
  <div class="logo-bar">
    <!-- <image src="../../../assets/vue.svg"></image> -->
    <h1 v-show="!collapsed">Vue3 Vite </h1>
  </div>
</template>

<script setup lang="ts"> 

defineProps({
  collapsed: {
    type: Boolean
  }
})

</script>

<style scoped>
.logo-bar{
  /* display: grid; */
  grid-template-columns: 1fr 1fr;
  text-align: center;
}
</style>