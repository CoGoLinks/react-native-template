import { request } from '@/utils/request';

/**
 * 查询机构购券订单信息
 */
export const couponQueryOrder = (params) => {
  return request.get('/coupon/queryOrder', params);
};

// 赠送记录
export const couponQueryOrgGiftRecord = (params) => {
  return request.get('/coupon/queryOrgGiftRecord', params);
};

// 查询机构赠券信息
export const couponOrgGiftRequest = (params) => {
  return request.post('/coupon/orgGiftRequest', params);
};
