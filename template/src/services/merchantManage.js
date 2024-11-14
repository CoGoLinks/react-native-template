import { request } from '@/utils/request';

// 商户列表
export async function merchantList(data) {
  return request({
    url: '/app/merchant/list',
    method: 'post',
    data,
  });
}

// 商户详情
export async function merchantInfo(data) {
  return request({
    url: '/app/merchant/info',
    method: 'post',
    data,
  });
}
