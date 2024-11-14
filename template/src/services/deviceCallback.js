import { request } from '@/utils/request';

/**
 * 查询可回拨划拨单列表
 * @returns
 */
export const getCallbackAssignList = async (params) => {
  const res = await request.get('/deviceAssign/getCallbackAssignList', params);
  return res;
};

/**
 * 查询可回拨sn列表
 * @returns
 */
export const getCallbackSnList = async (params) => {
  const res = await request.get('/deviceAssign/getCallbackSnList', params);
  return res;
};

/**
 * 根据划拨单号查询可回拨详情
 */
export const getCallbackAssignDetail = async (params) => {
  const res = await request.get('/deviceAssign/getCallbackAssignDetail', params);
  return res;
};

/**
 * 回拨
 */
export const doCallBack = async (data) => {
  const res = await request.post('/deviceAssign/doCallBack', data);
  return res;
};

/**
 * 被回拨人查询已回拨sn列表
 */
export const getCallBackedDetailSnList = async (params) => {
  const res = await request.get('/deviceAssign/getCallBackedDetailSnList', params);
  return res;
};

/**
 * 根据划拨单号查询可回拨数量
 */
export const getCallbackNumByAssignNo = async (params) => {
  const res = await request.post('/deviceAssign/getCallbackNumByAssignNo', params);
  return res;
};
