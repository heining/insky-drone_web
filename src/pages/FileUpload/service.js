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

export async function getFiles(params) {
  return request('/api/v1/file', {
    // params
  })
}

export async function uploadFile(params) {
  let formdata = new FormData()
  params.forEach(file => {
    formdata.append('file',file)
  })
  return request(`/api/v1/file/upload/${2020}`, {
    method: 'POST',
    data: formdata
  })
}