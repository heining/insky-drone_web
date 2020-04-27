import request from '@/utils/request';

const deviceControl = [
  { id: '15140321', model: 'insky1', driver: '李明', receiver: '1号接收机', manufacturer: '厂家1' },
  { id: '15140322', model: 'insky2', driver: '吴勇', receiver: '2号接收机', manufacturer: '厂家2' },
  { id: '15140323', model: 'insky3', driver: '王兵', receiver: '2号接收机', manufacturer: '厂家2' },
  { id: '15140324', model: 'insky4', driver: '王红', receiver: '1号接收机', manufacturer: '厂家1' },
  { id: '15140325', model: 'insky2', driver: '李明', receiver: '3号接收机', manufacturer: '厂家3' },
  { id: '15140326', model: 'insky1', driver: '何娜', receiver: '3号接收机', manufacturer: '厂家3' },
  { id: '15140327', model: 'insky3', driver: '王兵', receiver: '1号接收机', manufacturer: '厂家1' },
  { id: '15140328', model: 'insky4', driver: '杜文辉', receiver: '2号接收机', manufacturer: '厂家2' }
]

const res = {
  code: 200,
  count: "2",
  data: deviceControl,
  message: "操作成功",
  timestamp: "1587950206537",
}

// 获取盒子列表
export async function getDeviceControl(params) {
  return res
  // return request('/api/v1/device', {
  //   // params,
  // });
}

// 添加盒子
export async function addDeviceControl(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'POST',
  //   data: { ...params }
  // })
}


// 修改盒子信息
export async function updateDeviceControl(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'PUT',
  //   data: { ...params }
  // })
}

// 删除盒子
export async function deleteDeviceControl(params) {
  return res
  // console.log(params)
  // return request(`api/v1/device/${params}`, {
  //   method: 'DELETE',
  // })
}