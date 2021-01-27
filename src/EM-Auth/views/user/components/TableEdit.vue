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
        <el-form-item :label="lang('username')" prop="username">
          <el-input
            v-model="form.username"
            :placeholder="lang('m.username_required')"
            :maxlength="50"
            show-word-limit
            clearable
            prefix-icon="el-icon-user"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item :label="lang('password')" prop="password" :required="isEdit === false">
          <el-input
            v-model="form.password"
            :placeholder="lang('m.password_required')"
            :maxlength="50"
            clearable
            prefix-icon="el-icon-lock"
            show-password
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item :label="lang('role')" prop="roles">
          <el-checkbox-group v-model="form.roles" size="medium">
            <el-checkbox
              v-for="(item, index) in rolesOptions"
              :key="index"
              :label="item"
              :disabled="item.disabled"
            >
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
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
import { RoleGetAll, UserCreate, UserEdit } from '@/EM-Auth/api/api'
import { successMessage, getlang } from '@/EM-Auth/utils/utils'
export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data() {
    var checkPassword = (rule, value, callback) => {
      // 修改时对密码没有要求
      if ((!value && !this.isEdit) || (value && value.length < 6)) {
        return callback(new Error(this.lang('m.password_required')))
      }
      if (value && value.length > 50) {
        return callback(new Error(this.lang('m.password_max_length')))
      } else {
        callback()
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error(this.lang('m.username_required')))
      }
    }
    const validateRole = (rule, value, callback) => {
      if (value && value.length > 0) {
        callback()
      } else {
        callback(new Error(this.lang('m.role_required')))
      }
    }
    return {
      form: {
        username: undefined,
        password: '',
        roles: []
      },
      rules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ],
        roles: [
          {
            required: true,
            type: 'array',
            trigger: 'change',
            validator: validateRole
          }
        ]
      },
      rolesOptions: [],
      title: '',
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created() {
    this.RoleGetAll()
  },
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form // 防止编辑关闭再打开创建，留下编辑的信息
      this.isEdit = false
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        if (this.isEdit) {
          this.UserEdit()
        } else {
          this.UserCreate()
        }
      })
    },
    showEdit(row) {
      if (!row) {
        this.title = this.lang('add') + ' ' + this.lang('user')
        this.isEdit = false
      } else {
        this.title = this.lang('edit') + ' ' + this.lang('user')
        this.isEdit = true
        this.form = Object.assign({}, row)
        // 初始化roles，防止roles为null报错
        this.form.roles_tmp = this.form.roles
        this.form.roles = []
        if (this.form.roles_tmp != null) {
          for (var i = 0; i < this.form.roles_tmp.length; i++) {
            for (var v = 0; v < this.rolesOptions.length; v++) {
              if (this.form.roles_tmp[i].id === this.rolesOptions[v].id) {
                this.form.roles.push(this.rolesOptions[v])
                break
              }
            }
          }
        }
        delete this.form.roles_tmp
      }
    },
    RoleGetAll() {
      RoleGetAll().then((result) => {
        const { data } = result.data
        this.rolesOptions = data
      })
    },
    async UserCreate() {
      const { message } = await UserCreate(this.form)
      successMessage(this, this.lang('success'), message)
      this.close()
      this.$emit('refreshTable', true)
    },
    async UserEdit() {
      const { message } = await UserEdit(this.form)
      successMessage(this, this.lang('success'), message)
      this.close()
      this.$emit('refreshTable', true)
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
