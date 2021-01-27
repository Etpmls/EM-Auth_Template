<template>
  <div class="app-container">
    <el-form ref="form" :model="formData" :rules="rules" size="medium" label-width="160px">
      <el-form-item :label="lang('reload_template')" prop="reload_template">
        <el-button type="primary" size="small" @click="reloadTemplate"> {{ lang('reload') }} </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getlang } from '@/EM-CMS/utils/utils'
import { SettingReloadTemplate } from '@/EM-CMS/api/api'
import { successMessage } from '@/EM-Auth/utils/utils'
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        reload_template: undefined
      },
      rules: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    lang(field) {
      return getlang(this, field)
    },
    async reloadTemplate() {
      const { message } = await SettingReloadTemplate()
      successMessage(this, this.lang('success'), message)
    }
  }
}

</script>

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
  .el-transfer__buttons {
    margin: 10px;
  }
</style>
