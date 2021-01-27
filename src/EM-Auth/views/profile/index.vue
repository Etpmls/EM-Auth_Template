<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="basicTab">
              <el-tab-pane :label="lang('basic_information')" name="basic">
                <basic :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Basic from './components/Basic'
import { getlang } from '@/EM-Auth/utils/utils'

export default {
  name: 'Profile',
  components: { UserCard, Basic },
  data() {
    return {
      user: {},
      basicTab: 'basic'
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        username: this.username,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar
      }
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>

<style scoped>
  .app-container {
    background: none;
  }
</style>
