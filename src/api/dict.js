import request from '@/utils/request'

export default {
  getList(id) {
    return request({
      url: `/admin/cmn/dict/find-child/${id}`,
      method: 'get'
    })
  }
}
