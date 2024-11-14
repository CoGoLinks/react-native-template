import { request } from '@/utils/request';

// 查询代理待结算金额
export const getAgentFindWaitSettleForMonthUrl = (params) => {
  return request({
    url: '/app/finAgentSettle/findWaitSettleForMonth',
    method: 'get',
    params,
  });
};
// 查询机构待结算账单-月维度
export const getOrganFindWaitSettleForMonthUrl = (params) => {
  return request({
    url: '/app/finOrganSettle/findWaitSettleForMonth',
    method: 'get',
    params,
  });
};

// 结算
export const getAgentSettleUrl = (data) => {
  return request({
    url: '/app/finAgentSettle/settle',
    method: 'post',
    data,
  });
};

// 查询机构账户余额
export const findOrganAccountBalancehUrl = (params) => {
  return request({
    url: '/app/agent/findOrganAccountBalance',
    method: 'get',
    params,
  });
};

// 查询代理商提现列表
export const findAgentTakeCashRecordByPage = (params) => {
  return request({
    url: '/app/finAgentSettle/findAgentTakeCashRecordByPage',
    method: 'get',
    params,
  });
};

// 查询代理商提现详情
export const findAgentTakeCashRecordDetail = (params) => {
  return request({
    url: '/app/finAgentSettle/findAgentTakeCashRecordDetail',
    method: 'get',
    params,
  });
};

// 查询代理结算账单-交易类型维度
export const findSettleForTypeTran = (params) => {
  return request({
    url: '/app/finAgentSettle/findSettleForTypeTran',
    method: 'get',
    params,
  });
};

// 查询代理结算账单-激活/达标类型维度
export const findSettleForTypeActivate = (params) => {
  return request({
    url: '/app/finAgentSettle/findSettleForTypeActivate',
    method: 'get',
    params,
  });
};
