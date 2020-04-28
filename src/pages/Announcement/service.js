import request from '@/utils/request';

const announcement = [
  { id: '18190321', title: '上海市人民政府关于加强无人机等“低慢小”航空器安全管理通告',content:'上海市人民政府关于加强首届中国国际进口博览会期间无人机等“低慢小”航空器安全管理的通告为维护首届中国国际进口博览会期间上海地区的空中安全，杜绝各类违法违规飞行活动发生，现就加强首届中国国际进口博览会期间无人机等“低慢小”航空器安全管理通告如下：\n一、本通告所称的无人机等“低慢小”航空器，是指轻型和超轻型飞机、轻型直升机、滑翔机、三角翼、动力三角翼、滑翔伞、动力伞、热气球、飞艇、无人机、模型航空器（包括航空模型和航天模型）、空飘气球、系留气球等13类。\n二、2018年10月23日0时至2018年11月12日24时期间，在本市禁止无人机等“低慢小”航空器飞行、施放，但经依法批准用于电视转播、航拍、警务、应急救援、气象探测等活动的除外。\n三、违反本通告规定的，依据相关法律法规予以处罚。本通告自2018年10月23日起施行，有效期至2018年11月12日。', origin: '上海市人民政府', type: '禁飞通知', posttime: '2020-04.22 12:15' },
  { id: '18190322', title: '五一期间停飞通告',content:'', origin: '上海市人民政府', type: '禁飞通知', posttime: '2020-04.22 12:15' },
  { id: '18190323', title: '关于规范使用计划申报平台的通知',content:'', origin: '上海市人民政府', type: '禁飞通知', posttime: '2020-04.22 12:15' },
  { id: '18190328', title: '临时空域申请模板',content:'', origin: '上海市人民政府', type: '禁飞通知', posttime: '2020-04.22 12:15' },
]

const res = {
  code: 200,
  count: "2",
  data: announcement,
  message: "操作成功",
  timestamp: "1587950206537",
}

// 获取盒子列表
export async function getAnnouncement(params) {
  return res
  // return request('/api/v1/device', {
  //   // params,
  // });
}

// 添加盒子
export async function addAnnouncement(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'POST',
  //   data: { ...params }
  // })
}


// 修改盒子信息
export async function updateAnnouncement(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'PUT',
  //   data: { ...params }
  // })
}

// 删除盒子
export async function deleteAnnuncement(params) {
  return res
  // console.log(params)
  // return request(`api/v1/device/${params}`, {
  //   method: 'DELETE',
  // })
}