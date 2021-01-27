<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="160px" class="demo-dynamic">
      <div v-for="(item, index) in form.variable" :key="item.key">
        <el-form-item
          :label="lang('variable_name') + (index + 1)"
          :prop="'variable.' + index + '.name'"
          :rules="{
            required: true,
            message: lang('etp_message.variable_name_required'),
            trigger: 'blur',
          }"
        >
          <el-input v-model="item.name" />
        </el-form-item>

        <el-form-item
          :label="lang('variable_value') + (index + 1)"
          :prop="'variable.' + index + '.value'"
          :rules="{
            required: true,
            message: lang('etp_message.variable_value_required'),
            trigger: 'blur',
          }"
        >
          <el-input v-model="item.value" />
        </el-form-item>

        <el-form-item
          :label="lang('remark') + (index + 1)"
          :prop="'variable.' + index + '.remark'"
        >
          <el-input v-model="item.remark" />
        </el-form-item>

        <el-form-item>
          <el-button @click.prevent="removeItem(item)">{{ lang('delete') }}</el-button>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button @click="addItem"> {{ lang('add_variable') }}</el-button>
        <el-button type="primary" @click="validateItem('form')">
          {{ lang('submit') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VariableCreate, VariableGetAll } from '@/EM-CMS/api/api'
import { getlang } from '@/EM-CMS/utils/utils'
import { successMessage } from '@/EM-Auth/utils/utils'

const defaultItem = {
  name: '',
  value: ''
}

const defaultForm = {
  variable: [JSON.parse(JSON.stringify(defaultItem))]
}

export default {
  data() {
    return {
      form: JSON.parse(JSON.stringify(defaultForm))
    }
  },
  created() {
    this.VariableGetAll()
  },
  methods: {
    removeItem(item) {
      var index = this.form.variable.indexOf(item)
      if (index !== -1) {
        this.form.variable.splice(index, 1)
      }
    },
    addItem() {
      this.form.variable.push({
        name: '',
        value: '',
        remark: '',
        key: Date.now()
      })
    },
    // 验证数据
    validateItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmItem()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async confirmItem() {
      const { message } = await VariableCreate(this.form)
      successMessage(this, this.lang('success'), message)
      this.VariableGetAll()
    },
    // 获取数据
    async VariableGetAll() {
      const { data } = await VariableGetAll()
      this.form.variable = (data === null ? [] : data)
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
  .el-transfer__buttons {
    margin: 10px;
  }
</style>
