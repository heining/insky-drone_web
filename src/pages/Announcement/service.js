import request from '@/utils/request';

const announcement = [
  { id: '18190321', title: '关于规范使用计划申报平台的通知', origin: '上海市人民政府', type: '禁飞通知', posttime: '2020-04.22 12:15' },
  { id: '18190322', title: '五一期间停飞通告', origin: '上海市人民政府', type: '禁飞通知', posttime: '2020-04.22 12:15' },
  { id: '18190323', title: '关于规范使用计划申报平台的通知', origin: '上海市人民政府', type: '禁飞通知', posttime: '2020-04.22 12:15' },
  { id: '18190328', title: '临时空域申请模板', origin: '上海市人民政府', type: '禁飞通知', posttime: '2020-04.22 12:15' },
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