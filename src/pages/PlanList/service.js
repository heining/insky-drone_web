import request from '@/utils/request';

const plans = [
  { id: '18190321', status: '执行完成', name: '电力巡检', createtime: '2020-04.22 12:13', applytime: '2020-04.22 12:15',checktime:'2020-04.22 12:23',finishtime:'2020-04.22 12:30',flytype:'自由飞',flytarget:'巡检' },
  { id: '18190322', status: '执行完成', name: '电力巡检', createtime: '2020-04.22 12:13', applytime: '2020-04.22 12:15',checktime:'2020-04.22 12:23',finishtime:'2020-04.22 12:30',flytype:'一键起飞',flytarget:'巡检' },
  { id: '18190323', status: '新创建', name: '电力巡检', createtime: '2020-04.22 12:13', applytime: '2020-04.22 12:15',checktime:'2020-04.22 12:23',finishtime:'2020-04.22 12:30',flytype:'自由飞',flytarget:'巡检' },
  { id: '18190324', status: '执行完成', name: '路况监控', createtime: '2020-04.22 12:13', applytime: '2020-04.22 12:15',checktime:'2020-04.22 12:23',finishtime:'2020-04.22 12:30',flytype:'自由飞',flytarget:'巡检' },
  { id: '18190325', status: '执行完成', name: '电力巡检', createtime: '2020-04.22 12:13', applytime: '2020-04.22 12:15',checktime:'2020-04.22 12:23',finishtime:'2020-04.22 12:30',flytype:'自由飞',flytarget:'巡检' },
  { id: '18190326', status: '待审核', name: '电力巡检', createtime: '2020-04.22 12:13', applytime: '2020-04.22 12:15',checktime:'2020-04.22 12:23',finishtime:'2020-04.22 12:30',flytype:'一键起飞',flytarget:'巡检' },
  { id: '18190327', status: '执行完成', name: '河道检测', createtime: '2020-04.22 12:13', applytime: '2020-04.22 12:15',checktime:'2020-04.22 12:23',finishtime:'2020-04.22 12:30',flytype:'自由飞',flytarget:'巡检' },
  { id: '18190328', status: '执行完成', name: '电力巡检', createtime: '2020-04.22 12:13', applytime: '2020-04.22 12:15',checktime:'2020-04.22 12:23',finishtime:'2020-04.22 12:30',flytype:'自由飞',flytarget:'巡检' },
]

const res = {
  code: 200,
  count: "2",
  data: plans,
  message: "操作成功",
  timestamp: "1587950206537",
}

// 获取盒子列表
export async function getPlans(params) {
  return res
  // return request('/api/v1/device', {
  //   // params,
  // });
}

// 添加盒子
export async function addPlan(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'POST',
  //   data: { ...params }
  // })
}


// 修改盒子信息
export async function updatePlan(params) {
  return res
  // return request('/api/v1/device', {
  //   method: 'PUT',
  //   data: { ...params }
  // })
}

// 删除盒子
export async function deletePlan(params) {
  return res
  // console.log(params)
  // return request(`api/v1/device/${params}`, {
  //   method: 'DELETE',
  // })
}