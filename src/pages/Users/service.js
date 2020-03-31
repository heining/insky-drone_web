import request from '@/utils/request';

//获取用户
export async function getUser(params) {
  return request('/drone/v1/user', {
    // params,
  });
}

export async function addUser(params) {
  return request('/drone/v1/user', {
    method: 'POST',
    data: { ...params}
  })
}

export async function updateDevice(params) {
  return request('/drone/v1/device', {
    method: 'PUT',
    data: { ...params}
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