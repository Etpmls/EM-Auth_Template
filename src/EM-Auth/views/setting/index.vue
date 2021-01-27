<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="medium" label-width="180px" label-position="left">
      <el-form-item :label="lang('clear_cache')" prop="clearCache">
        <el-button type="danger" size="mini" @click="open(SettingClearCache)"> {{ lang('clear') }} </el-button>
        <div class="el-upload__tip">
          <i class="el-icon-info"> {{ lang('m.clean_all_cache') }} </i>
        </div>
      </el-form-item>
      <el-form-item :label="lang('disk_cleanup')" prop="diskCleanup">
        <el-button type="warning" size="mini" @click="open(SettingDiskCleanup)"> {{ lang('clean_up') }} </el-button>
        <div class="el-upload__tip">
          <i class="el-icon-info"> {{ lang('m.disk_cleanup') }} </i>
        </div>
      </el-form-item>
      <!--<el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>
<script>
import { SettingClearCache, SettingDiskCleanup } from '@/EM-Auth/api/api'
import { successMessage, getlang } from '@/EM-Auth/utils/utils'
export default {
  components: {},
  props: [],
  data() {
    return {
      form: {
        clearCache: undefined
      },
      rules: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    open(callback) {
      this.$confirm('您确定要继续操作吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        callback()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    async SettingClearCache() {
      const { message } = await SettingClearCache()
      successMessage(this, this.lang('success'), message)
    },
    async SettingDiskCleanup() {
      const { message } = await SettingDiskCleanup()
      successMessage(this, this.lang('success'), message)
    },
    lang(field) {
      return getlang(this, field)
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
</style>
