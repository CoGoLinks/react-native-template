import { request } from '@/utils/request';

// 结算前置校验
export const settlementCheckBeforeSettle = (params) => {
  return request.get('/app/finOrganSettle/checkBeforeSettle', params);
};

// /app/finOrganSettle/findOrganStatus
// 查询机构状态
// GET

export const settlementFindOrganStatus = (params) => {
  return request.get('/app/finOrganSettle/findOrganStatus', params);
};

// /app/finOrganSettle/findSettled
// 查询机构已结算账单列表
// GET

export const settlementFindSettled = (params) => {
  return request.get('/app/finOrganSettle/findSettled', params);
};

// /app/finOrganSettle/findSettledDetail
// 查询机构已结算账单账户明细
// GET

export const settlementFindSettledDetail = (params) => {
  return request.get('/app/finOrganSettle/findSettledDetail', params);
};

// /app/finOrganSettle/findSettleForDay
// 查询机构待结算账单-日维度
// GET

export const settlementFindSettleForDay = (params) => {
  return request.get('/app/finOrganSettle/findSettleForDay', params);
};

// /app/finOrganSettle/findSettleForTypeActivate
// 查询机构结算账单-激活类型维度
// GET

export const settlementFindSettleForTypeActivate = (params) => {
  return request.get('/app/finOrganSettle/findSettleForTypeActivate', params);
};
// /app/finOrganSettle/findSettleForTypeTran
// 查询机构待结算账单-交易类型维度
// GET

export const settlementFindSettleForTypeTran = (params) => {
  return request.get('/app/finOrganSettle/findSettleForTypeTran', params);
};
// /app/finOrganSettle/findWaitSettleForMonth
// 查询机构待结算账单-月维度
// POST

export const settlementFindWaitSettleForMonth = (params) => {
  return request({
    url: '/app/finOrganSettle/findWaitSettleForMonth',
    method: 'get',
    data: params,
  });
};

// /app/finOrganSettle/settle
// 结算
// POST

export const settlementSettle = (params) => {
  return request.post('/app/finOrganSettle/settle', params);
};

// /app/finOrganSettle/findOrganSettleTipInfo
// 查询机构结算时提示信息
// GET

export const settlementFindOrganSettleTipInfo = (params) => {
  return request.get('/app/finOrganSettle/findOrganSettleTipInfo', params);
};
