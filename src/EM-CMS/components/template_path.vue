<template>
  <el-autocomplete
    v-model="path"
    class="inline-input"
    style="width: 100%;"
    :fetch-suggestions="querySearch"
    :placeholder="lang('etp_message.template_path_placeholder')"
    clearable
    @input="inputValue"
  />
</template>

<script>
import { PageGetTemplatePath } from '@/EM-CMS/api/api'
import { getlang } from '@/EM-CMS/utils/utils'
export default {
  name: 'TemplatePath',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      path: this.value,
      path_list: []
    }
  },
  mounted() {
    this.PageGetTemplatePath()
  },
  methods: {
    // 模板路径
    querySearch(queryString, cb) {
      if (this.path_list.length === 0) return
      var path_list = this.path_list
      var results = queryString
        ? path_list.filter(this.createFilter(queryString))
        : path_list
        // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (path_list) => {
        return (
          path_list.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
            0
        )
      }
    },
    async PageGetTemplatePath() {
      const res = await PageGetTemplatePath()
      var tmp = []
      if (res.data) {
        for (var i of res.data) {
          tmp.push({ value: i })
        }
        this.path_list = tmp
      }
    },
    inputValue() {
      this.$emit('update:value', this.path)
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>

<style scoped></style>
