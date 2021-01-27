<template>
  <div>
    <el-dialog
      v-if="isShow"
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
        label-position="top"
      >
        <el-form-item :label="lang('name')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="lang('etp_message.category_name_required')"
            :maxlength="255"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item :label="lang('parent_category')" prop="parent_id">
          <category-list
            :value.sync="form.parent_id"
            :current-id="form.id"
            with-root
          />
        </el-form-item>
        <el-form-item :label="lang('kind')" prop="kind">
          <el-select
            v-model="form.kind"
            :placeholder="lang('etp_message.category_kind_required')"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in kindOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="lang('url_path')" prop="url_path">
          <el-input
            v-model="form.url_path"
            :placeholder="lang('etp_message.automatic_url_path')"
            :maxlength="200"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          >
            <template slot="prepend">category/</template>
          </el-input>
        </el-form-item>
        <el-form-item :label="lang('sort')" prop="sort">
          <el-input-number
            v-model="form.sort"
            :placeholder="lang('etp_message.sort_required')"
            :step="1"
            :max="999999"
          />
        </el-form-item>
        <el-form-item :label="lang('thumbnail')" prop="thumbnail">
          <thumbnail :value.sync="form.thumbnail" />
        </el-form-item>
        <el-form-item :label="lang('summary')" prop="summary">
          <el-input
            v-model="form.summary"
            type="textarea"
            :placeholder="lang('etp_message.summary_placeholder')"
            :maxlength="1000"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 4 }"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item :label="lang('template_path')" prop="template_path">
          <templatePath :value.sync="form.template_path" />
        </el-form-item>
        <el-form-item :label="lang('post_default_template_path')" prop="post_template_path">
          <templatePath :value.sync="form.post_template_path" />
        </el-form-item>
        <el-form-item :label="lang('status')" prop="status">
          <el-radio-group v-model="form.status" size="mini">
            <el-radio-button
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="lang('hidden')" prop="is_hidden">
          <el-radio-group v-model="form.is_hidden" size="mini">
            <el-radio-button
              v-for="(item, index) in is_hiddenOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="lang('main')" prop="is_main">
          <el-radio-group v-model="form.is_main" size="mini">
            <el-radio-button
              v-for="(item, index) in is_mainOptions"
              :key="index"
              :label="item.value"
              :disabled="item.disabled"
            >
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">{{ lang('cancel') }}</el-button>
        <el-button type="primary" @click="handelConfirm">{{ lang('submit') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { CategoryCreate, CategoryEdit } from '@/EM-CMS/api/api'
import templatePath from '@/EM-CMS/components/template_path'
import categoryList from '@/EM-CMS/components/category_list'
import thumbnail from '@/EM-Auth/components/thumbnail'
import { getlang } from '@/EM-CMS/utils/utils'
import { successMessage } from '@/EM-Auth/utils/utils'
const emptyForm = {
  name: '',
  parent_id: 0,
  kind: 'page',
  url_path: '',
  sort: 100,
  summary: '',
  template_path: '',
  post_template_path: '',
  status: 1,
  is_hidden: 0,
  is_main: 0,
  thumbnail: []
}
export default {
  components: {
    templatePath: templatePath,
    thumbnail: thumbnail,
    categoryList: categoryList
  },
  inheritAttrs: false,
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: undefined,
        parent_id: 0,
        kind: 'page',
        url_path: undefined,
        sort: 100,
        thumbnail: [],
        summary: undefined,
        template_path: undefined,
        post_template_path: undefined,
        status: 1,
        is_hidden: 0,
        is_main: 0
      },
      title: '',
      isEdit: false // Edit? 是否编辑
    }
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.lang('etp_message.category_name_required'),
            trigger: 'blur'
          }
        ],
        parent_id: [
          {
            required: true,
            message: this.lang('etp_message.category_parent_required'),
            trigger: 'change'
          }
        ],
        kind: [
          {
            required: true,
            message: this.lang('etp_message.category_kind_required'),
            trigger: 'change'
          }
        ],
        url_path: [],
        sort: [
          {
            required: true,
            message: this.lang('etp_message.sort_required'),
            trigger: 'blur'
          }
        ],
        summary: [],
        template_path: [],
        post_template_path: [],
        status: [
          {
            required: true,
            message: this.lang('etp_message.category_status_required'),
            trigger: 'change'
          }
        ],
        is_hidden: [
          {
            required: true,
            message: this.lang('etp_message.category_is_hidden_required'),
            trigger: 'change'
          }
        ],
        is_main: [
          {
            required: true,
            message: this.lang('etp_message.category_is_main_required'),
            trigger: 'change'
          }
        ]
      }
    },
    statusOptions() {
      return [
        {
          label: this.lang('normal'),
          value: 1
        },
        {
          label: this.lang('disable'),
          value: 0
        }
      ]
    },
    is_hiddenOptions() {
      return [
        {
          label: this.lang('yes'),
          value: 1
        },
        {
          label: this.lang('no'),
          value: 0
        }
      ]
    },
    is_mainOptions() {
      return [
        {
          label: this.lang('yes'),
          value: 1
        },
        {
          label: this.lang('no'),
          value: 0
        }
      ]
    },
    kindOptions() {
      return [
        {
          label: this.lang('page'),
          value: 'page'
        },
        {
          label: this.lang('link'),
          value: 'link'
        }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['form'].resetFields()
      this.form = JSON.parse(JSON.stringify(emptyForm))
      this.isEdit = false
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return
        /* if (this.form.parent_id === -1) {
            this.form.parent_id = 0;
          }*/
        if (this.isEdit) {
          this.CategoryEdit()
        } else {
          this.CategoryCreate()
        }
      })
    },
    getParent_idOptions() {},
    showEdit(row) {
      if (!row) {
        this.title = this.lang('add_category')
        this.isEdit = false
      } else {
        this.title = this.lang('edit_category')
        this.isEdit = true
        this.form = JSON.parse(JSON.stringify(row))
      }
    },
    async CategoryCreate() {
      const { message } = await CategoryCreate(this.form)
      successMessage(this, this.lang('success'), message)
      this.onClose()
      this.$emit('refreshTable', true)
    },
    async CategoryEdit() {
      const { message } = await CategoryEdit(this.form)
      successMessage(this, this.lang('success'), message)
      this.onClose()
      this.$emit('refreshTable', true)
    },
    lang(field) {
      return getlang(this, field)
    },
    handleClose(done) {
      this.$confirm(this.lang('etp_message.confirm_close'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style>
  .el-upload__tip {
    line-height: 1.2;
  }

  .el-dialog {
    min-width: 500px;
  }
</style>
