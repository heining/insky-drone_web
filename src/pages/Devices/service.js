import request from '@/utils/request';

//获取用户设备
export async function getDevice(params) {
  return request('drone/v1/device', {
    params,
  });
}

export async function addDevice(params) {
  return request('drone/v1/device', {
    method: 'POST',
    data: { ...params, method: 'add' }
  })
}

export async function updateDevice(params) {
  return request('drone/v1/device', {
    method: 'PUT',
    data: { ...params, method: 'update' }
  })
}

export async function deleteDevice(params) {
  console.log(params)
  return request(`drone/v1/device/${params}`, {
    method: 'DELETE',
  })
}

//通过id获取设备数据详情
export async function getDeviceDataId() {
  return request('http://122.51.223.137:8089/drone/v1/device');
}