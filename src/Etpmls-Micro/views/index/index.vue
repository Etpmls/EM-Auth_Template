<template>
  <div class="app-container">
    <el-scrollbar>
      <el-row :gutter="20" style="min-width: 800px">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-card class="card" shadow="never">
            <div slot="header">
              <span>{{ lang('version_information') }}</span>
              <div style="float: right;">Etpmls-Micro</div>
            </div>
            <table class="table">
              <tr>
                <td>Database</td>
                <td>go-gorm/gorm v2.x</td>
                <td>Captcha</td>
                <td>dchest/captcha</td>
              </tr>
              <tr>
                <td>Env</td>
                <td>joho/godotenv</td>
                <td>JWT Token</td>
                <td>dgrijalva/jwt-go v3.2.0</td>
              </tr>
              <tr>
                <td>Log</td>
                <td>sirupsen/logrus v1.5.0</td>
                <td>Log cutting</td>
                <td>natefinch/lumberjack.v2 v2.0.0</td>
              </tr>
              <tr>
                <td>Yaml</td>
                <td>go-yaml/yaml v2.2.8</td>
                <td>UUID</td>
                <td>google/uuid v1.1.1</td>
              </tr>
              <tr>
                <td>Redis</td>
                <td>go-redis/redis v8.0.0-beta.3</td>
                <td>Validate</td>
                <td>go-playground/validator v10.2.0</td>
              </tr>
              <tr>
                <td>Web frame</td>
                <td>gin-gonic/gin v1.6.1</td>
                <td>Cors</td>
                <td>gin-contrib/cors v1.3.1</td>
              </tr>
            </table>
          </el-card>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import { getlang } from '@/Etpmls-Micro/utils/utils'
export default {
  name: 'Index',
  methods: {
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>

<style>
  .app-container {
    padding: 20px;
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

<style lang="scss" scoped>
  .app-container {
    background: #f5f7f8 !important;

  .card {
    min-height: 420px;
  }

  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;

  td {
    position: relative;
    min-height: 20px;
    padding: 9px 15px;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #e6e6e6;

  &:nth-child(odd) {
     width: 20%;
     text-align: right;
     background-color: #f7f7f7;
   }
  }
  }

  }
</style>
