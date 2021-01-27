import request from '@/utils/request'

export function CategoryCreate(data) {
  return request({
    url: '/api/cms/v1/category/create',
    method: 'post',
    data
  })
}

export function CategoryGetAll(param) {
  return request({
    url: '/api/cms/v1/category/getTree',
    method: 'get',
    params: param
  })
}

export function CategoryEdit(data) {
  return request({
    url: '/api/cms/v1/category/edit',
    method: 'put',
    data
  })
}

export function CategoryDelete(data) {
  return request({
    url: '/api/cms/v1/category/delete',
    method: 'delete',
    data
  })
}

export function PageGetTemplatePath(param) {
  return request({
    url: '/api/cms/v1/page/getTemplatePath',
    method: 'get',
    params: param
  })
}

export function PostCreate(data) {
  return request({
    url: '/api/cms/v1/post/create',
    method: 'post',
    data
  })
}

export function PostGetAll(param) {
  return request({
    url: '/api/cms/v1/post/getAll',
    method: 'get',
    params: param
  })
}

export function PostEdit(data) {
  return request({
    url: '/api/cms/v1/post/edit',
    method: 'put',
    data
  })
}

export function PostDelete(data) {
  return request({
    url: '/api/cms/v1/post/delete',
    method: 'delete',
    data
  })
}

export function VariableCreate(data) {
  return request({
    url: '/api/cms/v1/variable/create',
    method: 'post',
    data
  })
}

export function VariableGetAll(param) {
  return request({
    url: '/api/cms/v1/variable/getAll',
    method: 'get',
    params: param
  })
}

export function SettingReloadTemplate() {
  return request({
    url: '/api/cms/v1/setting/reloadTemplate',
    method: 'get'
  })
}
