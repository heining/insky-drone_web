import request from '@/utils/request';

const deviceControl = [
  {id:'15140321',model:'insky1',driver:'李明',receiver:'1号接收机',manufacturer:'厂家1'}
]

//获取用户设备
export async function getDevice(params) {
  return request('/api/v1/device', {
    // params,
  });
}

export async function addDevice(params) {
  return request('/api/v1/device', {
    method: 'POST',
    data: { ...params}
  })
}

export async function updateDevice(params) {
  return request('/api/v1/device', {
    method: 'PUT',
    data: { ...params}
  })
}

export async function deleteDevice(params) {
  console.log(params)
  return request(`api/v1/device/${params}`, {
    method: 'DELETE',
  })
}

//通过id获取设备数据详情
export async function getDeviceDataId() {
  return request('http://122.51.223.137:8089/drone/v1/device');
}