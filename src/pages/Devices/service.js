import request from '@/utils/request';

//获取用户设备数据
export async function getDevice() {
  return request('/drone/v1/device');
}

//通过id获取设备数据详情
export async function getDeviceDataId() {
  return request('http://api.inskylab.cn/drone/v1/device/data');
}