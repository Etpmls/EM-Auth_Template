<template>
  <el-upload
    class="avatar-uploader"
    :action="avatarAction"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :headers="headers"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
    <div slot="tip" class="el-upload__tip">
      {{ lang('m.no_more_than_200kb_jpg') }}
    </div>
  </el-upload>
</template>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
import { getUserToken /* getBaseUrl*/ } from '@/Etpmls-Micro/utils/utils' // get token from cookie
// import { AttachmentUploadImage } from '@/Etpmls-Micro/api/api'
import { getlang } from '@/Etpmls-Micro/utils/utils'
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          path: undefined
        }
      }
    }
  },
  data() {
    return {
      image: this.value,
      imageUrl: '',
      // avatarAction: getBaseUrl() + AttachmentUploadImage(),
      // TODO 服务url
      avatarAction: 'http://localhost:8083/uploadImage',
      headers: {}
    }
  },
  created() {
    this.setUploadHeader()
    if (this.image.path) {
      this.imageUrl = this.image.path
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      var rtnpath = JSON.parse(res.data).path
      this.imageUrl = rtnpath
      this.$emit('update:value', { path: rtnpath })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 < 200

      if (!isJPG) {
        this.$message.error(this.lang('m.uploaded_only_jpg'))
      }
      if (!isLt2M) {
        this.$message.error(this.lang('m.cannot_exceed_200kb_jpg'))
      }
      return isJPG && isLt2M
    },
    setUploadHeader() {
      if (getUserToken()) {
        this.headers['token'] = getUserToken()
      }
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>
