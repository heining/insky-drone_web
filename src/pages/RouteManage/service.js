import request from '@/utils/request';

const routes = [
  { id: '18190321', name: '电力巡检', createtime: '2020-04.22 12:13', linelength: '8.6 km', pointNum: '20', times: '5' },
  { id: '18190322', name: '电力巡检', createtime: '2020-04.22 12:13', linelength: '13.2 km', pointNum: '26', times: '6' },
  { id: '18190323', name: '电力巡检', createtime: '2020-04.22 12:13', linelength: '10.8 km', pointNum: '18', times: '5' },
  { id: '18190324', name: '路况监控', createtime: '2020-04.22 12:13', linelength: '13 km', pointNum: '34', times: '4' },
  { id: '18190325', name: '电力巡检', createtime: '2020-04.22 12:13', linelength: '8.8 km', pointNum: '75', times: '5' },
  { id: '18190326', name: '电力巡检', createtime: '2020-04.22 12:13', linelength: '6.5 km', pointNum: '20', times: '5' },
  { id: '18190327', name: '河道检测', createtime: '2020-04.22 12:13', linelength: '16.8 km', pointNum: '53', times: '12' },
  { id: '18190328', name: '电力巡检', createtime: '2020-04.22 12:13', linelength: '13 km', pointNum: '49', times: '5' },
]

const res = {
  code: 200,
  count: "2",
  data: routes,
  message: "操作成功",
  timestamp: "1587950206537",
}

// 获取盒子列表
export async function getRoutes(params) {
  return res
  // return request('/api/v1/device', {
  //   // params,
  // });
}

// 添加盒子
export async function addRoute(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'POST',
  //   data: { ...params }
  // })
}


// 修改盒子信息
export async function updateRoute(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'PUT',
  //   data: { ...params }
  // })
}

// 删除盒子
export async function deleteRoute(params) {
  return res
  // console.log(params)
  // return request(`api/v1/device/${params}`, {
  //   method: 'DELETE',
  // })
}