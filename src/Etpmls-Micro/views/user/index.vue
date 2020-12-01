<template>
  <div class="app-container">
    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="left-panel">
        <el-button class="top-element" icon="el-icon-plus" type="primary" size="small" @click="handleAdd">
          {{ lang('add') }}
        </el-button>
        <el-button class="top-element" icon="el-icon-delete" type="danger" size="small" @click="handleDelete">
          {{ lang('delete') }}
        </el-button>
      </div>
    </el-col>

    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="right-panel">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.search" class="top-element" size="small" :placeholder="lang('title')" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              type="primary"
              class="top-element"
              native-type="submit"
              size="small"
              @click="handleQuery"
            >
              {{ lang('search') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      :element-loading-text="lang('loading') + '...'"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        type="selection"
        width="55"
      />
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="ID"
      />
      <el-table-column
        show-overflow-tooltip
        :label="lang('username')"
        prop="username"
      />
      <el-table-column
        show-overflow-tooltip
        :label="lang('role')"
        prop="roles_name"
        sortable
      />
      <el-table-column
        show-overflow-tooltip
        :label="lang('operate')"
        width="180px"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">{{ lang('edit') }}</el-button>
          <el-button type="text" @click="handleDelete(scope.row)">
            {{ lang('delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.number"
      :layout="layout"
      :page-size="queryForm.size"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <table-edit
      ref="edit"
      :visible.sync="isShow"
      @refreshTable="fetchData"
    />
  </div>
</template>

<script>
import { UserGetAll, UserDelete } from '@/Etpmls-Micro/api/api'
import TableEdit from './components/TableEdit'
import { successMessage, errorTextMessage, deleteConfirmMessage, getlang } from '@/Etpmls-Micro/utils/utils'
export default {
  name: 'ComprehensiveTable',
  components: {
    TableEdit
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      imgShow: true,
      list: [],
      imageList: [],
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      queryForm: {
        number: 1,
        size: 20,
        search: ''
      },
      isShow: false // 添加编辑的框是否显示
    }
  },
  created() {
    this.fetchData()
  },
  beforeDestroy() {},
  mounted() {},
  methods: {
    tableSortChange() {
      const imageList = []
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
    },
    setSelectRows(val) {
      this.selectRows = val
    },
    handleAdd() {
      this.isShow = true // 显示添加编辑的框
      this.$refs['edit'].showEdit()
    },
    handleEdit(row) {
      this.isShow = true // 显示添加编辑的框
      this.$refs['edit'].showEdit(row)
    },
    handleDelete(row) {
      if (row.id) {
        deleteConfirmMessage(this, this.lang('m.delete_current_item'), async() => {
          const { message } = await UserDelete({ users: [{ id: row.id }] })
          successMessage(this, this.lang('success'), message)
          this.fetchData()
        })
      } else {
        if (this.selectRows.length > 0) {
          const ids = this.selectRows.map((item) => item)
          deleteConfirmMessage(this, this.lang('m.delete_selected_item'), async() => {
            const { message } = await UserDelete({ users: ids })
            successMessage(this, this.lang('success'), message)
            this.fetchData()
          })
        } else {
          errorTextMessage(this, this.lang('m.no_rows_selected'))
          return false
        }
      }
    },
    handleSizeChange(val) {
      this.queryForm.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.queryForm.number = val
      this.fetchData()
    },
    handleQuery() {
      this.queryForm.number = 1
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      const result = await UserGetAll(this.queryForm)
      const { data, count } = result.data
      for (var i = 0; i < data.length; i++) {
        if (data[i].roles != null) {
          data[i].roles_name = []
          for (var v = 0; v < data[i].roles.length; v++) {
            data[i].roles_name.push(data[i].roles[v].name)
          }
          data[i].roles_name = data[i].roles_name.join(' | ')
        }
      }
      this.list = data
      const imageList = []
      data.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
      this.total = count
      setTimeout(() => {
        this.listLoading = false
      }, 500)
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>

<style>
  .right-panel {
    float: right;
    margin: 10px;
  }
  .left-panel {
    float: left;
    margin: 10px;
  }
  .top-element {
    margin: 5px !important;
  }
</style>

<style scoped>
  .app-container {
    padding: 20px;
    margin: 20px 20px ;
    background: #fff;
    border-radius: 2px;
  }
  .el-pagination {
    padding: 2px 5px;
    margin: 15px 0 0 0;
    font-weight: normal;
    text-align: center;
    overflow: hidden;
  }
</style>
