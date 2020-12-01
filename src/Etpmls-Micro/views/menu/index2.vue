<template>
  <div class="app-container">
    <!--<el-scrollbar>
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
      <el-row :gutter="20" style="min-width: 1500px">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <JsonEditor
            v-model="jsonData"
            :options="{
              confirmText: 'confirm',
              cancelText: 'cancel',
            }"
            :obj-data="jsonData"
          />
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="w-2">
            <div class="code-pre">
              <div slot="content">
                <pre>
            <code id="res_code" class="json" />
          </pre>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-scrollbar>-->
  </div>
</template>

<!--<script>
import hljs from 'vue-json-edit/node_modules/highlight.js'
import { MenuCreate, MenuGetAll } from '@/Etpmls-Micro/api/api'
import { successMessage, getlang } from '@/Etpmls-Micro/utils/utils'
export default {
  name: 'App',
  data: function() {
    return {
      jsonData: {}
    }
  },
  watch: {
    jsonData: function() {
      const c = this.formatJson(JSON.stringify(this.jsonData))
      this.drawResCode(c)
    }
  },
  created() {
    this.fetchData()
  },
  mounted: function() {
    const c = this.formatJson(JSON.stringify(this.jsonData))
    this.drawResCode(c)
  },
  methods: {
    // JSON format print
    /* eslint-disable */
    formatJson: function(txt, compress /* 是否为压缩模式*/) {
      /* 格式化JSON源码(对象转换为JSON文本) */
      var indentChar = '  '
      if (/^\s*$/.test(txt)) {
        console.error('数据为空,无法格式化! ')
        return
      }
      try {
        var data = eval('(' + txt + ')')
      } catch (e) {
        throw (
          ('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err')
        )
        return
      }
      var draw = []
      var last = false
      var This = this
      var line = compress ? '' : '\n'
      var nodeCount = 0
      var maxDepth = 0

      var notify = function(name, value, isLast, indent /* 缩进*/, formObj) {
        nodeCount++ /* 节点计数*/
        for (var i = 0, tab = ''; i < indent; i++) { tab += indentChar } /* 缩进HTML */
        tab = compress ? '' : tab /* 压缩模式忽略缩进*/
        maxDepth = ++indent /* 缩进递增并记录*/
        if (value && value.constructor == Array) {
          /* 处理数组*/
          draw.push(
            tab + (formObj ? '"' + name + '":' : '') + '[' + line
          ) /* 缩进'[' 然后换行*/
          for (var i = 0; i < value.length; i++) { notify(i, value[i], i == value.length - 1, indent, false) }
          draw.push(
            tab + ']' + (isLast ? line : ',' + line)
          ) /* 缩进']'换行,若非尾元素则添加逗号*/
        } else if (value && typeof value === 'object') {
          /* 处理对象*/
          draw.push(
            tab + (formObj ? '"' + name + '":' : '') + '{' + line
          ) /* 缩进'{' 然后换行*/
          var len = 0
          var i = 0
          for (var key in value) len++
          for (var key in value) { notify(key, value[key], ++i == len, indent, true) }
          draw.push(
            tab + '}' + (isLast ? line : ',' + line)
          ) /* 缩进'}'换行,若非尾元素则添加逗号*/
        } else {
          if (typeof value === 'string') value = '"' + value + '"'
          draw.push(
            tab +
                (formObj ? '"' + name + '":' : '') +
                value +
                (isLast ? '' : ',') +
                line
          )
        }
      }
      var isLast = true
      var indent = 0
      notify('', data, isLast, indent, false)
      return draw.join('')
    },

    // 绘制res body
    drawResCode: function(content) {
      var target = document.getElementById('res_code')
      target.textContent = content
      hljs.highlightBlock(target)
    },
    async fetchData() {
      const res = await MenuGetAll()
      this.jsonData = {
        data: res.data
      }
      this.res = res
    },
    async handleSave() {
      var menuJson = JSON.stringify(this.jsonData.data)
      const { message } = await MenuCreate({ menu: menuJson })
      successMessage(this, this.lang('success'), message)
      this.fetchData()
    },
    handleReset() {
      this.fetchData()
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>

<style>
  @import "~vue-json-edit/node_modules/highlight.js/styles/github.css";
</style>

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
</style>-->
