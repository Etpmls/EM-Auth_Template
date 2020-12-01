import store from '@/store'

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function filterAllRoutes(constantRoutes) {
  return constantRoutes.filter((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = (resolve) => require(['@/layout'], resolve)
      } else if (route.component === 'EmptyLayout') {
        route.component = (resolve) =>
          require(['@/Etpmls-Micro/layout/EmptyLayout'], resolve)
      } else {
        const path = route.component

        route.component = (resolve) => require([`@/${path}.vue`], resolve)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAllRoutes(route.children)
    }
    if (route.children && route.children.length === 0) {
      delete route.children
    }
    return true
  })
}

export function successMessage(_this, title, message, duration = 2000) {
  return _this.$notify({
    title: title,
    message: message,
    type: 'success',
    duration: duration
  })
}

export function errorMessage(_this, title, message, duration = 2000) {
  return _this.$notify({
    title: title,
    message: message,
    type: 'error',
    duration: duration
  })
}

export function errorTextMessage(_this, message) {
  return _this.$message.error(message)
}

export function confirmMessage(_this, message, title, options, doThen, doCatch) {
  return _this.$confirm(message, title, options)
    .then(doThen)
    .catch(doCatch)
}

export function deleteConfirmMessage(_this, message, doThen, type = 'warning', title = _this.$t('etpmls-micro.warning'), confirmButtonText = _this.$t('etpmls-micro.submit'), cancelButtonText = _this.$t('etpmls-micro.cancel')) {
  return _this.$confirm(message, title, { confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    type: type
  })
    .then(doThen)
    .catch(err => {
      console.error(err)
    })
}

export function getlang(_this, field) {
  return _this.$t('etpmls-micro.' + field)
}
export function getlang_Route(_this, field) {
  return _this.$t('route_etpmls-micro.' + field)
}

import { getToken } from '@/utils/auth'
export function getUserToken() {
  return getToken()
}

export function getBaseUrl() {
  return process.env.VUE_APP_BASE_API === '/' ? '' : process.env.VUE_APP_BASE_API
}

export function getUserId() {
  return store.getters.id
}

export function getUserName() {
  return store.getters.username
}
