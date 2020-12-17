import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/auth/v1/user/login',
    method: 'post',
    data
  })
}

export function UserGetCurrent(token) {
  return request({
    url: '/api/auth/v1/user/getCurrent',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/auth/v1/user/logout',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/api/auth/v1/user/register',
    method: 'post',
    data
  })
}

export function RoleCreate(data) {
  return request({
    url: '/api/auth/v1/role/create',
    method: 'post',
    data
  })
}

export function RoleEdit(data) {
  return request({
    url: '/api/auth/v1/role/edit',
    method: 'put',
    data
  })
}

export function RoleGetAll(param) {
  return request({
    url: '/api/auth/v1/role/getAll',
    method: 'get',
    params: param
  })
}

export function RoleDelete(data) {
  return request({
    url: '/api/auth/v1/role/delete',
    method: 'delete',
    data
  })
}

export function UserCreate(data) {
  return request({
    url: '/api/auth/v1/user/create',
    method: 'post',
    data
  })
}

export function UserEdit(data) {
  return request({
    url: '/api/auth/v1/user/edit',
    method: 'put',
    data
  })
}

export function UserGetAll(param) {
  return request({
    url: '/api/auth/v1/user/getAll',
    method: 'get',
    params: param
  })
}

export function UserDelete(data) {
  return request({
    url: '/api/auth/v1/user/delete',
    method: 'delete',
    data
  })
}

export function UserUpdateInformation(data) {
  return request({
    url: '/api/auth/v1/user/updateInformation',
    method: 'put',
    data
  })
}

export function MenuGetAll() {
  return request({
    url: '/api/auth/v1/menu/getAll',
    method: 'get'
  })
}

export function MenuCreate(data) {
  return request({
    url: '/api/auth/v1/menu/create',
    method: 'post',
    data
  })
}

export function PermissionCreate(data) {
  return request({
    url: '/api/auth/v1/permission/create',
    method: 'post',
    data
  })
}

export function PermissionEdit(data) {
  return request({
    url: '/api/auth/v1/permission/edit',
    method: 'put',
    data
  })
}

export function PermissionGetAll(param) {
  return request({
    url: '/api/auth/v1/permission/getAll',
    method: 'get',
    params: param
  })
}

export function PermissionDelete(data) {
  return request({
    url: '/api/auth/v1/permission/delete',
    method: 'delete',
    data
  })
}

export function SettingClearCache() {
  return request({
    url: '/api/auth/v1/setting/cacheClear',
    method: 'get'
  })
}

export function SettingDiskCleanup() {
  return request({
    url: '/api/auth/v1/setting/diskCleanUp',
    method: 'get'
  })
}

export function PermissionGetAdvancedVerify() {
  return request({
    url: '/api/auth/v1/permission/getAdvancedVerify',
    method: 'get'
  })
}

/**
 * @return {string}
 */
export function AttachmentUploadImage() {
  return '/api/attachment/v1/attachment/uploadImage'
}
