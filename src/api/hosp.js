import request from '@/utils/request'

export default {
  // 医院列表
  getHospList(page, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospital/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  // 根据dictcode查询所有子节点
  findByDictCode(dictCode) {
    return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },
  // 根据id查数据列表
  findChildId(id) {
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  },
  // 更新医院上线状态
  updateStatus(id, status) {
    return request({
      url: `/admin/hosp/hospital/updateHospStatus/${id}/${status}`,
      method: 'get'
    })
  },
  // 通过id获得医院详情
  getHospById(id) {
    return request({
      url: `/admin/hosp/hospital/showHospDetail/${id}`,
      method: 'get'
    })
  },
  // 通过id获得医院详情
  getDeptByHospcode(hospcode) {
    return request({
      url: `/admin/hosp/department/getDeptList/${hospcode}`,
      method: 'get'
    })
  },
  // 查询预约规则
  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `/admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  },
  getScheduleDetail(hoscode, depcode, workDate) {
    return request({
      url: `/admin/hosp/schedule/getScheduleDetail/${hoscode}/${depcode}/${workDate}`,
      method: 'get'
    })
  },
  addSchedule(schedule) {
    return request({
      url: '/admin/hosp/schedule/add',
      method: 'post',
      data: schedule
    })
  }
}
