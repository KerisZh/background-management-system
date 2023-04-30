<template>
  <div class="table-container">
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="姓名">
        <el-input v-model.trim="searchForm.name" placeholder="请输入姓名"></el-input>
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
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" @click="showDialog = true; currentRow = row">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" v-model=" showAddDialog " width="30%">
      <el-form :model=" addFormData " label-width="100px" label-position="top">
        <el-form-item label="账号">
          <el-input v-model.trim=" addFormData.account "></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model.trim=" addFormData.name "></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model.trim=" addFormData.password "></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" showAddDialog = false ">取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑用户" v-model=" showEditDialog " width="30%">
      <el-form :model=" editFormData " label-width="100px" label-position="top">
        <el-form-item label="账号">
          <el-input v-model.trim=" editFormData.account " disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model.trim=" editFormData.name "></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model.trim=" editFormData.password " ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" showEditDialog = false ">取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" v-model=" showDialog " width="30%">
      <p v-if=" currentRow ">确定要删除{{ currentRow.name }}吗？</p>
      <p v-else>确定要删除选中的{{ selectedRows?.values.length }}条数据吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" showDialog = false ">取消</el-button>
        <el-button type="primary" @click=" handleConfirmDelete ">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script setup lang="ts">
import { reactive, Ref, ref } from 'vue';

interface TableData {
  account: string;
  name: string;
}

const originalTableData: Ref<TableData[]> = ref([
  { account: '001', name: '张三' },
  { account: '002', name: '李四' },
  { account: '003', name: '王五' },
]);

const tableData: Ref<TableData[]> = ref(originalTableData.value);
const selectedRows = ref<TableData[]>();
const searchForm = reactive({
  name: '',
});
const showDialog = ref(false);
let currentRow: TableData;


const addFormData = reactive({
  account: '',
  name: '',
  password: ''
});
const showAddDialog = ref(false);

const editFormData = reactive({
  account: '',
  name: '',
  password: ''
});
const showEditDialog = ref(false);

function handleEdit(row: TableData) {
  editFormData.account = row.account;
  editFormData.name = row.name;
  editFormData.password = '';
  showEditDialog.value = true;
}

function handleAddUser() {
  console.log('123213');

  showAddDialog.value = true;
}

function handleSelectionChange(rows: TableData[]) {
  selectedRows.value = rows;
}

// function handleEdit(row: TableData) {
//   // 编辑逻辑
// }

function handleDelete(row: TableData) {
  currentRow = row;
  showDialog.value = true;
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
  if (currentRow) {
    const index = tableData.value.findIndex((item) => item.name === currentRow.name);
    if (index !== -1) {
      tableData.value.splice(index, 1);
    }
  } else {
    selectedRows.value?.forEach((row) => {
      const index = tableData.value.findIndex((item) => item.name === row.name);
      if (index !== -1) {
        tableData.value.splice(index, 1);
      }
    });
  }

  // currentRow = [];
  selectedRows.value = [];
  showDialog.value = false;
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