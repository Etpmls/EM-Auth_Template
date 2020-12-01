<template>
  <div class="app-container">
    <el-scrollbar>
      <el-row>
        <el-alert
          :title="lang('warning')"
          type="warning"
          :description="lang('m.menu_warning')"
          show-icon
        />
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="left-panel">
            <el-button class="top-element" icon="el-icon-plus" type="primary" size="small" @click="handleSave">
              {{ lang('save') }}
            </el-button>
            <el-button class="top-element" icon="el-icon-delete" type="danger" size="small" @click="handleReset">
              {{ lang('reset') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <json-editor ref="JsonEditor" :value="jsonData" />
    </el-scrollbar>
  </div>
</template>

<script>
import { MenuCreate, MenuGetAll } from '@/Etpmls-Micro/api/api'
import { successMessage, getlang } from '@/Etpmls-Micro/utils/utils'
import JsonEditor from '../../components/JsonEditor'
export default {
  name: 'App',
  components: { JsonEditor },
  data: function() {
    return {
      jsonData: {}
    }
  },
  created() {
    this.MenuGetAll()
  },
  methods: {
    async MenuGetAll() {
      const res = await MenuGetAll()
      this.jsonData = res.data
    },
    async handleSave() {
      const textData = this.$refs['JsonEditor'].getValue()
      const { message } = await MenuCreate({ menu: textData })
      successMessage(this, this.lang('success'), message)
      this.MenuGetAll()
    },
    handleReset() {
      this.MenuGetAll()
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>

<style>
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
</style>
