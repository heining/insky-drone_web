import request from '@/utils/request';

const drivers = [
  {id:'1314092781',name:'李明',gender:'男',certificateType:'身份证',certificateNo:'320582200002295903',driveType:'飞行资格证',driveNo:'866803201',phone:18866655320}
]

//获取用户
export async function getUser(params) {
  return request('/api/v1/user', {
    // params,
  });
}

export async function addUser(params) {
  return request('/api/v1/user', {
    method: 'POST',
    data: { ...params }
  })
}

export async function updateUser(params) {
  return request('/api/v1/user', {
    method: 'PUT',
    data: { ...params }
  })
}

export async function deleteUser(params) {
  console.log(params)
  return request(`api/v1/user/${params}`, {
    method: 'DELETE',
  })
}

export async function deleteUsers(params) {
  console.log(params)
  return request('api/v1/user/batch', {
    method: 'DELETE',
    data: params
  })
}