<template>
  <div class="table-container">
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="姓名">
        <el-input v-model.trim="searchForm.name" placeholder="请输入姓名" @keydown.enter.prevent="handleSearch"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
        <el-button @click="handleReset">清空</el-button>
        <el-button type="success" @click="handleAddUser">添加用户</el-button>
        <el-button type="danger" @click="handleBatchDelete">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="80" label="序号"></el-table-column>
      <el-table-column prop="username" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" @click="showDialog = true; currentRow = row">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" v-model="showAddDialog" width="30%">
      <el-form :model="addFormData" label-width="100px" label-position="top" :rules="rules" ref="addRef">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="addFormData.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="addFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="addFormData.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmAdd(addFormData)">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑用户" v-model="showEditDialog" width="30%">
      <el-form :model="editFormData" label-width="100px" label-position="top" :rules="rules" ref="editRef">
        <el-form-item label="账号" prop="username">
          <el-input v-model.trim="editFormData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="editFormData.password" show-password></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit(editFormData)">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" v-model="showDialog" width="30%">
      <p v-if="currentRow">确定要删除{{ currentRow.name }}吗？</p>
      <p v-else>确定要删除选中的{{ selectedRows && selectedRows.length }}条数据吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" showDialog = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmDelete">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script setup lang="ts">
import { userRegister, getUsers, deleteUser, userModify } from '@/api/user';
import { ElMessage, FormRules } from 'element-plus';
import { reactive, Ref, ref, onMounted } from 'vue';

interface TableData {
  username: string;
  name: string;
  password: string
}
const originalTableData = ref([] as TableData[]);
const tableData: Ref<TableData[]> = ref([]);
const selectedRows = ref<TableData[]>();
const currentRow = ref<TableData>();
const searchForm = reactive({
  name: '',
});
const showDialog = ref(false);
// let currentRow: TableData;


const addRef = ref()
const addFormData = reactive({
  username: '',
  name: '',
  password: ''
});
const showAddDialog = ref(false);

const editRef = ref()
const editFormData = reactive({
  username: '',
  name: '',
  password: ''
});
const showEditDialog = ref(false);

const rules = reactive<FormRules>({
  username: [{
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  }],
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
  getAllUsers()
});

const getAllUsers = () => {
  getUsers().then(res => {
    tableData.value = res.data.data;
    originalTableData.value = tableData.value;
  }).catch(err => {
    console.log(err);
  });
}

const deleteUsers = (arr: any) => {
  deleteUser(arr).then((res) => {
    if (res.data.code == 200) {
      getAllUsers()
      ElMessage.success(res.data.msg)
    }
  }).catch((err) => {
    console.log(err);
  })
}

function handleEdit(row: TableData) {
  editFormData.username = row.username;
  editFormData.name = row.name;
  editFormData.password = row.password;
  showEditDialog.value = true;
}

function handleAddUser() {
  showAddDialog.value = true;
}

function handleSelectionChange(rows: TableData[]) {
  selectedRows.value = rows;
}

function handleSearch() {
  const keyword = searchForm.name.trim();
  if (keyword === '') {
    return;
  }
  // 进行模糊查询，更新表格数据
  tableData.value = originalTableData.value.filter((item) => item.name.includes(keyword));
}

function handleReset() {
  searchForm.name = '';
  tableData.value = originalTableData.value;
}

function handleBatchDelete() {
  if (!selectedRows.value || selectedRows.value.length === 0) {
    console.log('至少选择一条数据');
    return;
  }
  showDialog.value = true;
}

function handleConfirmDelete() {
  if (currentRow.value) {
    const index = tableData.value.findIndex((item) => item.name === currentRow.value?.name);
    if (index !== -1) {
      deleteUsers([currentRow.value.username])
      currentRow.value = undefined
    }
  } else {
    const usernames: any = []
    selectedRows.value?.forEach((row) => {
      usernames.push(row.username)
    });
    deleteUsers(usernames)
  }
  selectedRows.value = [];
  showDialog.value = false;
}

const confirmEdit = (data: any) => {
  editRef.value?.validate((valid: boolean) => { // 使用可选链运算符
    if (valid) {
      userModify(data).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          ElMessage.success(res.data.msg)
          showEditDialog.value = false
          getAllUsers()
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  })
}

const confirmAdd = (data: any) => {
  addRef.value?.validate((valid: boolean) => { // 使用可选链运算符
    if (valid) {
      userRegister(data).then((res) => {
        if (res.data.code === 200) {
          getAllUsers()
          ElMessage.success('新增成功')
          showAddDialog.value = false
        }
      }).catch(() => {
        ElMessage.error('用户名已经存在！')
      })
    }
  })
}

</script>
  
<style scoped>
.table-container {
  margin: 20px;
}

.search-form {
  margin-bottom: 20px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>