import request from '@/utils/request';

const deviceCamera = [
  { id: '17160321', name: '摄像头1', type: 'insky', ifPTZ: '是', agreement: 'rtsp' },
  { id: '17160322', name: '摄像头2', type: 'insky', ifPTZ: '否', agreement: 'rtsp' },
  { id: '17160323', name: '摄像头3', type: 'insky', ifPTZ: '否', agreement: 'rtmp' },
  { id: '17160324', name: '摄像头4', type: 'insky', ifPTZ: '是', agreement: 'rtsp' },
  { id: '17160325', name: '摄像头5', type: 'insky', ifPTZ: '是', agreement: 'rtmp' },
  { id: '17160326', name: '摄像头6', type: 'insky', ifPTZ: '否', agreement: 'rtmp' },
  { id: '17160327', name: '摄像头7', type: 'insky', ifPTZ: '否', agreement: 'rtsp' },
  { id: '17160328', name: '摄像头8', type: 'insky', ifPTZ: '是', agreement: 'rtsp' },
  { id: '17160329', name: '摄像头9', type: 'insky', ifPTZ: '否', agreement: 'rtmp' }
]

const res = {
  code: 200,
  count: "2",
  data: deviceCamera,
  message: "操作成功",
  timestamp: "1587950206537",
}

// 获取盒子列表
export async function getDeviceCamera(params) {
  return res
  // return request('/api/v1/device', {
  //   // params,
  // });
}

// 添加盒子
export async function addDeviceCamera(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'POST',
  //   data: { ...params }
  // })
}


// 修改盒子信息
export async function updateDeviceCamera(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'PUT',
  //   data: { ...params }
  // })
}

// 删除盒子
export async function deleteDeviceCamera(params) {
  return res
  // console.log(params)
  // return request(`api/v1/device/${params}`, {
  //   method: 'DELETE',
  // })
}