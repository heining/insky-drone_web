import request from '@/utils/request';

//获取用户设备数据
export async function getDevice() {
  return request('/api/v1/device');
  // return request('/api/v1/device/data');
}

//通过id获取设备数据详情
export async function getDeviceDataId() {
  return request('http://api.inskylab.cn/api/v1/device');
}

// wss
export async function wss() {
  return request('/websocket')
}
