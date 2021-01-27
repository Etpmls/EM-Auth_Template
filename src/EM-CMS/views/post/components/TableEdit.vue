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
        <el-form-item :label="lang('title')" prop="name">
          <el-input
            v-model="form.name"
            :placeholder="lang('etp_message.title_required')"
            :maxlength="255"
            show-word-limit
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item :label="lang('parent_category')" prop="category_id">
          <category-list :value.sync="form.category_id" />
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
            <template slot="prepend">post/</template>
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
        <el-form-item :label="lang('language')" prop="language">
          <el-select
            v-model="form.language"
            :placeholder="lang('etp_message.language_required')"
            clearable
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in languageOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>

        <div v-for="(item, index) in form.tmp_parameter" :key="item.key">
          <el-form-item
            :label="lang('parameter_name') + (index + 1)"
            :prop="'tmp_parameter.' + index + '.name'"
            :rules="{
              required: true,
              message: lang('etp_message.parameter_name_required'),
              trigger: 'blur',
            }"
          >
            <el-input v-model="item.name" />
          </el-form-item>

          <el-form-item
            :label="lang('parameter_value') + (index + 1)"
            :prop="'tmp_parameter.' + index + '.value'"
            :rules="{
              required: true,
              message: lang('etp_message.parameter_value_required'),
              trigger: 'blur',
            }"
          >
            <el-input v-model="item.value" />
          </el-form-item>

          <el-form-item>
            <el-button @click.prevent="removeItem(item)">{{ lang('delete') }}</el-button>
          </el-form-item>
        </div>
        <el-form-item label="">
          <el-button
            type="text"
            icon="el-icon-plus"
            size="medium"
            @click="addItem"
          >
            {{ lang('add_parameter') }}
          </el-button>
        </el-form-item>

        <el-form-item :label="lang('thumbnail')" prop="thumbnail">
          <thumbnail :value.sync="form.thumbnail" />
        </el-form-item>
        <el-form-item :label="lang('content')" prop="content">
          <editor
            :value.sync="form.content"
            @content-images="getContentImages"
          />
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
      </el-form>
      <div slot="footer">
        <el-button @click="onClose">{{ lang('cancel') }}</el-button>
        <el-button type="primary" @click="handelConfirm">{{ lang('submit') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import templatePath from '@/EM-CMS/components/template_path'
import categoryList from '@/EM-CMS/components/category_list'
import thumbnail from '@/EM-Auth/components/thumbnail'
import Editor from '@/EM-Auth/components/editor'
import { CategoryGetAll, PostCreate, PostEdit } from '@/EM-CMS/api/api'
import { getlang } from '@/EM-CMS/utils/utils'
import { successMessage } from '@/EM-Auth/utils/utils'

const emptyForm = {
  name: '',
  category_id: 0,
  url_path: '',
  sort: 100,
  language: 'zh-CN',
  thumbnail: [],
  content: '',
  summary: '',
  template_path: '',
  tmp_parameter: [],
  content_image: []
}
export default {
  components: {
    editor: Editor,
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
        category_id: 0,
        url_path: undefined,
        sort: 100,
        language: 'zh-CN',
        thumbnail: null,
        content: null,
        summary: undefined,
        template_path: undefined,
        tmp_parameter: [],
        content_image: []
      },
      category_idOptions: [],
      category_idProps: {
        multiple: false,
        checkStrictly: true,
        emitPath: false,
        label: 'name',
        value: 'id',
        children: 'children'
      },
      title: ''
    }
  },
  computed: {
    rules() {
      return {
        name: [
          {
            required: true,
            message: this.lang('etp_message.title_required'),
            trigger: 'blur'
          }
        ],
        category_id: [
          {
            required: true,
            message: this.lang('etp_message.category_parent_required'),
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
        language: [
          {
            required: true,
            message: this.lang('etp_message.language_required'),
            trigger: 'change'
          }
        ],
        content: [],
        summary: [],
        template_path: []
      }
    },
    languageOptions() {
      return [
        {
          label: this.lang('english'),
          value: 'en'
        },
        {
          label: this.lang('chinese'),
          value: 'zh-CN'
        }
      ]
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.CategoryGetAll()
  },
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['form'].resetFields()
      // this.form = Object.assign({}, emptyForm);
      this.form = JSON.parse(JSON.stringify(emptyForm))
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['form'].validate((valid) => {
        if (!valid) return

        // If the parameter is added, it will be converted to JSON
        // 如果增加了参数，则转为JSON
        if (this.form.tmp_parameter.length > 0) {
          this.form.parameter = JSON.stringify(this.form.tmp_parameter)
        }

        if (this.isEdit) {
          this.PostEdit()
        } else {
          this.PostCreate()
        }
      })
    },
    thumbnailBeforeUpload(file) {
      const isRightSize = file.size / 1024 < 600
      if (!isRightSize) {
        this.$message.error('文件大小超过 600KB')
      }
      const isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error('应该选择image/*类型的文件')
      }
      return isRightSize && isAccept
    },
    showEdit(row) {
      if (!row) {
        this.title = this.lang('add_post')
        this.isEdit = false
      } else {
        this.title = this.lang('edit_post')
        this.isEdit = true
        this.form = Object.assign({}, row)
        if (this.form.parameter) {
          this.form.tmp_parameter = JSON.parse(this.form.parameter)
        } else {
          this.form.tmp_parameter = []
        }
      }
    },
    addItem() {
      this.form.tmp_parameter.push({
        name: '',
        value: '',
        key: Date.now()
      })
    },
    removeItem(item) {
      var index = this.form.tmp_parameter.indexOf(item)
      if (index !== -1) {
        this.form.tmp_parameter.splice(index, 1)
      }
    },
    async CategoryGetAll() {
      const res = await CategoryGetAll()
      this.category_idOptions = res.data
    },
    async PostCreate() {
      const { message } = await PostCreate(this.form)
      successMessage(this, this.lang('success'), message)
      this.onClose()
      this.$emit('refreshTable', true)
    },
    async PostEdit() {
      const { message } = await PostEdit(this.form)
      successMessage(this, this.lang('success'), message)
      this.onClose()
      this.$emit('refreshTable', true)
    },
    getContentImages(data) {
      this.form.content_image = data
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

  .tox-tinymce-aux {
    z-index: 5000 !important;
  }
</style>
