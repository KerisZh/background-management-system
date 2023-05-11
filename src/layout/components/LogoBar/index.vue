<template>
  <div class="logo-bar">
    <h1 v-if="collapsed">V</h1>
    <h1 v-else>Vue3 Vite</h1>
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