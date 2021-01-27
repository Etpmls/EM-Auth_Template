<template>
  <editor
    v-model="val"
    placeholder="请输入内容"
    :init="init"
    @input="inputValue"
  />
</template>

<script>
import { getUserToken, getBaseUrl } from '@/EM-Auth/utils/utils'
import { AttachmentUploadImage } from '@/EM-Auth/api/api'
import Editor from '@tinymce/tinymce-vue'
// Import TinyMCE
import tinymce from 'tinymce/tinymce'

// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default'

// A theme is also required
import 'tinymce/themes/silver'
// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste'
import 'tinymce/plugins/link'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/image'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/print'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
export default {
  name: 'Editor',
  components: {
    editor: Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      val: this.value,
      content_images: [],
      init: {
        vue_this: this,
        language_url: '/em/static/em-auth/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/em/static/em-auth/tinymce/skins/ui/oxide',
        content_css:
            '/em/static/em-auth/tinymce/skins/content/default/content.min.css',
        theme_url: '/mytheme/mytheme.js',
        branding: false, // 去掉版权
        convert_urls: false, // 不转义绝对路径
        height: 500,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code wordcount'
        ],
        toolbar:
        /* eslint-disable */
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | image media',
        images_upload_handler: function(
          blobInfo,
          success,
          failure,
          progress
        ) {
          var xhr, formData

          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', getBaseUrl() + AttachmentUploadImage())
          xhr.setRequestHeader('token', getUserToken())

          xhr.upload.onprogress = function(e) {
            progress((e.loaded / e.total) * 100)
          }

          xhr.onload = function() {
            var json

            if (xhr.status < 200 || xhr.status >= 300) {
              failure('HTTP Error: ' + xhr.status)
              return
            }

            json = JSON.parse(xhr.responseText)

            if (!json || typeof json.data.path !== 'string') {
              failure('Invalid JSON: ' + xhr.responseText)
              return
            }

            var self = tinymce.settings.vue_this
            self.content_images.push({ path: json.data.path })
            self.$emit('content-images', self.content_images)
            if (json.data.path.substr(0, 1) !== '/') {
              json.data.path = '/' + json.data.path
            }

            success(json.data.path)
          }

          xhr.onerror = function() {
            failure(
              'Image upload failed due to a XHR Transport error. Code: ' +
                  xhr.status
            )
          }

          formData = new FormData()
          formData.append('file', blobInfo.blob(), blobInfo.filename())

          xhr.send(formData)
        }
      }
    }
  },
  methods: {
    inputValue() {
      this.$emit('update:value', this.val)
    }
  }
}
</script>

<style scoped></style>
