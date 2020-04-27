import request from '@/utils/request';

const drivers = [
  { id: '1314092781', name: '李明', gender: '男', certificateType: '身份证', certificateNo: '320582200002295903', driveType: '飞行资格证', driveNo: '866803201', phone: 18866655320 },
  { id: '1314092782', name: '王红', gender: '女', certificateType: '身份证', certificateNo: '320582200002295904', driveType: '飞行资格证', driveNo: '866803202', phone: 18866655321 },
  { id: '1314092783', name: '吴勇', gender: '男', certificateType: '身份证', certificateNo: '320582200002295905', driveType: '飞行资格证', driveNo: '866803203', phone: 18866655322 },
  { id: '1314092784', name: '王兵', gender: '男', certificateType: '身份证', certificateNo: '320582200002295906', driveType: '飞行资格证', driveNo: '866803204', phone: 18866655323 },
  { id: '1314092785', name: '杜文辉', gender: '男', certificateType: '身份证', certificateNo: '320582200002295907', driveType: '飞行资格证', driveNo: '866803205', phone: 18866655324 },
  { id: '1314092786', name: '何娜', gender: '女', certificateType: '身份证', certificateNo: '320582200002295908', driveType: '飞行资格证', driveNo: '866803206', phone: 18866655325 }
]

const res = {
  code: 200,
  count: "2",
  data: drivers,
  message: "操作成功",
  timestamp: "1587950206537",
}

//获取用户
export async function getUserDriver(params) {
  return res
  // return request('/api/v1/user', {
  //   // params,
  // });
}

export async function addUserDriver(params) {
  return res
  // return request('/api/v1/user', {
  //   method: 'POST',
  //   data: { ...params }
  // })
}

export async function updateUserDriver(params) {
  return res
  // return request('/api/v1/user', {
  //   method: 'PUT',
  //   data: { ...params }
  // })
}

export async function deleteUserDriver(params) {
  return res
  // console.log(params)
  // return request(`api/v1/user/${params}`, {
  //   method: 'DELETE',
  // })
}

export async function deleteUserDrivers(params) {
  return res
  //   console.log(params)
  //   return request('api/v1/user/batch', {
  //     method: 'DELETE',
  //     data: params
  //   })
}