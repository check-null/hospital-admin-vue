import request from '@/utils/request'

export default {
  getHospSetList(current, limit, searchOjb) {
    return request({
      url: `/admin/hosp/hospitalSet/page/${current}/${limit}`,
      method: 'post',
      data: searchOjb
    })
  }
}
