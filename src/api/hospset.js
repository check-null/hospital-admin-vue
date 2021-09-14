import request from '@/utils/request'

export default {
  getHospSetList(current, limit, searchOjb) {
    return request({
      url: `/admin/hosp/hospitalSet/page/${current}/${limit}`,
      method: 'post',
      data: searchOjb
    })
  },
  deleteHospSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/delete/${id}`,
      method: 'post'
    })
  },
  batchDelete(ids) {
    return request({
      url: '/admin/hosp/hospitalSet/batch-delete',
      method: 'post',
      data: ids
    })
  },
  lockHospSet(id, status) {
    return request({
      url: `/admin/hosp/hospitalSet/lock/${id}/${status}`,
      method: 'post'
    })
  },
  saveHospSet(hospSet) {
    return request({
      url: '/admin/hosp/hospitalSet/save',
      method: 'post',
      data: hospSet
    })
  },
  updateHospSet(hospSet) {
    return request({
      url: '/admin/hosp/hospitalSet/update',
      method: 'post',
      data: hospSet
    })
  },
  getHospSet(id) {
    return request({
      url: `/admin/hosp/hospitalSet/info/${id}`,
      method: 'get'
    })
  }

}
