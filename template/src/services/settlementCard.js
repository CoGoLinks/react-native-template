import { request } from '@/utils/request';

// 查询我的结算卡
export const settlementMyCards = (params) => {
  return request.get('/app/bankcard/myCards', params);
};
