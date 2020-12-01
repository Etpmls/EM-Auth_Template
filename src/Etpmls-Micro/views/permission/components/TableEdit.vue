<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      :title="title"
      :before-close="handleClose"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="medium"
        label-width="80px"
      >
        <el-form-item :label="lang('name')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="lang('m.name_required')"
            :maxlength="50"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item :label="lang('method')" prop="method">
          <el-checkbox-group v-model="form.method" size="medium">
            <el-checkbox-button
              v-for="(item, index) in methodOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="lang('path')" prop="path">
          <el-input
            v-model="form.path"
            :placeholder="lang('m.path_required')"
            :maxlength="200"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item :label="lang('remark')" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            :placeholder="lang('m.remark_required')"
            :maxlength="200"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">{{ lang('cancel') }}</el-button>
        <el-button type="primary" @click="handelConfirm">{{ lang('submit') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { PermissionCreate, PermissionEdit } from '@/Etpmls-Micro/api/api'
import { successMessage, getlang } from '@/Etpmls-Micro/utils/utils'
const emptyForm = {
  name: '',
  method: [],
  path: '',
  remark: ''
}

export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    const validateName = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error(this.lang('m.name_required')))
      }
    }
    const validateMethod = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error(this.lang('m.method_required')))
      }
    }
    const validatePath = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error(this.lang('m.path_required')))
      }
    }
    return {
      form: {
        name: undefined,
        method: [],
        path: undefined,
        remark: undefined
      },
      rules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateName
          }
        ],
        method: [
          {
            required: true,
            type: 'array',
            trigger: 'change',
            validator: validateMethod
          }
        ],
        path: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePath
          }
        ],
        remark: []
      },
      methodOptions: [
        {
          label: 'ALL',
          value: 'ALL'
        },
        {
          label: 'GET',
          value: 'GET'
        },
        {
          label: 'POST',
          value: 'POST'
        },
        {
          label: 'PUT',
          value: 'PUT'
        },
        {
          label: 'DELETE',
          value: 'DELETE'
        },
        {
          label: 'PATCH',
          value: 'PATCH'
        },
        {
          label: 'OPTIONS',
          value: 'OPTIONS'
        }
      ],
      title: '',
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['form'].resetFields()
      this.form = Object.assign({}, emptyForm)
      this.isEdit = false
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        if (this.isEdit) {
          this.PermissionEdit()
        } else {
          this.PermissionCreate()
        }
      })
    },
    async PermissionCreate() {
      var f = this.form
      f.method = f.method.join(',')
      const { message } = await PermissionCreate(f)
      successMessage(this, this.lang('success'), message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async PermissionEdit() {
      var f = this.form
      f.method = f.method.join(',')
      const { message } = await PermissionEdit(f)
      successMessage(this, this.lang('success'), message)
      this.close()
      this.$emit('refreshTable', true)
    },
    showEdit(row) {
      if (!row) {
        this.title = this.lang('add') + ' ' + this.lang('permission')
        this.isEdit = false
      } else {
        this.title = this.lang('edit') + ' ' + this.lang('permission')
        this.isEdit = true
        this.form = Object.assign({}, row)
        // 把方法string变为数组
        this.form.method = row.method.split(',')
      }
    },
    lang(field) {
      return getlang(this, field)
    },
    handleClose(done) {
      this.$confirm(this.lang('m.confirm_close'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>

<style>
  .el-dialog {
    min-width: 500px;
  }
</style>
