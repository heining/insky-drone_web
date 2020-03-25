import request from '@/utils/request';

//获取用户设备数据
export async function getDeviceData() {
  return request('/api/v1/device/data');
}

//通过id获取设备数据详情
export async function getDeviceDataId() {
  return request('http://api.inskylab.cn/api/v1/device');
}