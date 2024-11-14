import { request } from '@/utils/request';
import { objectToUrlParams } from '@/utils/tools';

/**
 * 设备列表
 */
export const deviceListUrl = () => {
  return request({
    url: '/purchase/deviceList',
    method: 'get',
  });
};
// 是否能购买优惠券
// /purchase/isCanBuyCoupon
export const isCanBuyCoupon = (params = {}) => {
  return request.get('/purchase/isCanBuyCoupon', params);
};

// 可采购优惠券选择列表
export const couponList = (params = {}) => {
  return request.get('/purchase/couponList', params);
};
/**
 * 创建订单
 */
export const createOrderUrl = (params) => {
  return request.post('/app/order/createOrderNew', params);
};

/**
 * 查询上一次下单收货地址
 */
export const findLastOrderShippingUrl = (params = {}, config = {}) => {
  return request.post('/app/order/findLastOrderShipping', params, config);
};

/**
 * 订单列表
 */
export const orderListUrl = (params = {}, config = {}) => {
  return request.post('/app/order/orderList', params, config);
};

/**
 * 去支付
 */
export const orderToPayUrl = (params = {}, config = {}) => {
  return request.post('/app/order/toPay', params, config);
};

/**
 * 订单详情
 */
export const orderDetailUrl = (params = {}) => {
  return request.get('/app/order/orderDetail', params);
};

// 是否有优惠券订单
export const isHaveCouponOrder = (params = {}) => {
  return request.post('/app/order/isHaveCouponOrder', params);
};

/**
 * 取消订单
 */
export const cancelOrderUrl = (params = {}) => {
  return request.post(`/app/order/cancelOrder?${objectToUrlParams(params)}`);
};

/**
 * 查看购买机具协议
 */
export const getPurchaseAgreement = (params = {}) => {
  return request.get('/app/order/getPurchaseAgreement', params);
};

/**
 * 是否需要签署协议 true:需要
 */
export const canSignAgreement = (params = {}) => {
  return request.get('/app/order/canSignAgreement', params);
};

/**
 * 签署购买机具协议
 */
export const orderSignAgreement = (params = {}) => {
  return request.get('/app/order/signAgreement', params);
};
