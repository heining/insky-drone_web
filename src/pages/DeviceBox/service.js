import request from '@/utils/request';

const deviceBox = [
  { id: '18190321', model: 'insky01', sn: '202002021314090', linkdev: '无人机', manufacturer: '大疆' }
]

const res = {
  code: 200,
  count: "2",
  data: deviceBox,
  message: "操作成功",
  timestamp: "1587950206537",
}

// 获取盒子列表
export async function getDeviceBox(params) {
  return res
  // return request('/api/v1/device', {
  //   // params,
  // });
}

// 添加盒子
export async function addDeviceBox(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'POST',
  //   data: { ...params }
  // })
}


// 修改盒子信息
export async function updateDeviceBox(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'PUT',
  //   data: { ...params }
  // })
}

// 删除盒子
export async function deleteDeviceBox(params) {
  return res
  // console.log(params)
  // return request(`api/v1/device/${params}`, {
  //   method: 'DELETE',
  // })
}