import request from '@/utils/request';

const deviceBox = [
  { id: '18190321', model: 'insky01', sn: '202002021314090', linkdev: '无人机', manufacturer: '厂家1' },
  { id: '18190322', model: 'insky02', sn: '202002021314091', linkdev: '无人机', manufacturer: '厂家2' },
  { id: '18190323', model: 'insky02', sn: '202002021314092', linkdev: '无人机', manufacturer: '厂家3' },
  { id: '18190324', model: 'insky03', sn: '202002021314093', linkdev: '无人机', manufacturer: '厂家2' },
  { id: '18190325', model: 'insky01', sn: '202002021314094', linkdev: '无人机', manufacturer: '厂家3' },
  { id: '18190326', model: 'insky03', sn: '202002021314095', linkdev: '无人机', manufacturer: '厂家4' },
  { id: '18190327', model: 'insky04', sn: '202002021314096', linkdev: '无人机', manufacturer: '厂家1' }
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