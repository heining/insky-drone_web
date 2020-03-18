import request from '@/utils/request';

//获取用户设备数据
export async function getDevice() {
  return request('/drone/v1/device');
}