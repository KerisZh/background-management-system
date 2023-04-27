<script setup lang="ts">
import { onMounted, useAttrs, useSlots } from 'vue';
const slots = useSlots()
const attrs = useAttrs()
defineProps<{
  msg: string
}>()// 使用props的参数无法被attrs接收
onMounted(() => {
  console.log(slots.header && slots.header())
  console.log(attrs)
})
</script>

<template>
  <h1>hello</h1>
  <slot name="header" />
</template>

<style></style>