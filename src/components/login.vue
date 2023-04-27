<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'

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


//表单提交
const logIn = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm.username);
      console.log(ruleForm.password);

      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const props = withDefaults(
  defineProps<{
    msg: string,
    list: Array<number>
  }>(), {
  msg: "123",
  list: () => [1, 2]
}
)

// const emits = defineEmits(['parentClick'])
const emits = defineEmits<{
  (e:'parentClick', data:string): void
}>()
const sendItem = () => {
  emits('parentClick', '这是子组件的值2')
}

const store = useStore()
const count = computed(() => {
  return store.state.count
})

const increment = () => {
  store.commit('increment')
}



</script>

<template>
  <el-card shadow="always">
    <!-- 登录表单 -->
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="logIn(ruleFormRef)">登录{{ list }}</el-button>
        <el-button @click="sendItem" >注册{{ msg }}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <button @click="increment">{{ count }}</button>
  <slot name="header"></slot>
</template>

<style scoped>
/* .read-the-docs {
  color: #888;
} */
</style>
