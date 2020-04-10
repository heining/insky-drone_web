import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  console.log(params)
  let searchParams = new URLSearchParams()
  searchParams.set('username', params.username)
  searchParams.set('password', params.password)
  searchParams.set('imageCode', params.imageCode)
  if (params.rememberMe) {
    searchParams.set('remember', true);
  }
  return request(`/authentication/form`, {
    method: 'POST',
    // headers: {
    //   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    // },
    data: searchParams,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
