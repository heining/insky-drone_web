import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  console.log(params)
  let url = `username=${params.username}&password=${params.password}&imageCode=${params.imageCode}`
  if(params.rememberMe){
    url = url + '&remember-me=true'
  }
  return request(`/authentication/form?${url}`, {
    method: 'POST',
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
