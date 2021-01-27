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
        label-width="100px"
      >
        <el-form-item :label="lang('name')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="lang('m.username_required')"
            :maxlength="30"
            show-word-limit
            :readonly="form.id === 1"
            :clearable="form.id !== 1"
            prefix-icon="el-icon-user"
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
        <el-form-item :label="lang('permission')" prop="permissions">
          <el-transfer
            v-model="form.permissions"
            :data="allPermission"
            :titles="[lang('not_added'), lang('added')]"
            :props="{
              key: 'id',
              label: 'name',
            }"
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
import { RoleCreate, RoleEdit, PermissionGetAdvancedVerify } from '@/EM-Auth/api/api'
import { successMessage, getlang } from '@/EM-Auth/utils/utils'
const emptyForm = {
  name: undefined,
  remark: undefined,
  permissions: []
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
    return {
      form: {
        name: undefined,
        remark: undefined,
        permissions: []
      },
      rules: {
        name: [
          {
            required: true,
            trigger: 'blur',
            validator: validateName
          }
        ],
        remark: []
      },
      title: '',
      isEdit: false,
      allPermission: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.PermissionGetAdvancedVerify()
  },
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
        this.PermissionIdToObj()
        if (this.isEdit) {
          this.RoleEdit()
        } else {
          this.RoleCreate()
        }
      })
    },
    async RoleCreate() {
      const { message } = await RoleCreate(this.form)
      successMessage(this, this.lang('success'), message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async RoleEdit() {
      const { message } = await RoleEdit(this.form)
      successMessage(this, this.lang('success'), message)
      this.close()
      this.$emit('refreshTable', true)
    },
    showEdit(row) {
      if (!row) {
        this.title = this.lang('add') + ' ' + this.lang('role')
        this.isEdit = false
      } else {
        this.title = this.lang('edit') + ' ' + this.lang('role')
        this.isEdit = true
        this.form = Object.assign({}, row)
        if (!row.permissions) {
          this.form.permissions = []
        } else {
          var tmp = []
          for (var i = 0; i < this.form.permissions.length; i++) {
            tmp.push(this.form.permissions[i].id)
          }
          this.form.permissions = tmp
        }
      }
    },
    async PermissionGetAdvancedVerify() {
      const { data } = await PermissionGetAdvancedVerify()
      this.allPermission = data
    },
    PermissionIdToObj() {
      // 把permissionID转为对象
      if (this.form.permissions && this.form.permissions.length > 0) {
        var tmp = []
        for (var i = 0; i < this.form.permissions.length; i++) {
          tmp.push({ id: this.form.permissions[i] })
        }
        this.form.permissions = tmp
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
    min-width: 800px;
  }
</style>
