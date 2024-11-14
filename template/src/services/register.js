import { request } from '@/utils/request';

// 用户注册
export const submitRegister = (params) => {
  return request.post('/open/api/v10/invite-register', params);
};
