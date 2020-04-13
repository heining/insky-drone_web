import request from '@/utils/request';

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