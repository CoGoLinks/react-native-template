import { request } from '@/utils/request';

export const demoRequest = () => {
  return request({
    url: '/app/demo/get-demo',
    method: 'get',
  });
};
