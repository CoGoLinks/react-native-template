import { request } from '@/utils/request';

/**
 * 查询收益明细
 */
export const getProfitDetail = (params) => {
  return request.post('/tranProfit/getProfitDetail', params);
};

/**
 * 查询交易详情
 */
export const getTranInfo = (params) => {
  return request.post('/tranProfit/getTranInfo', params);
};

/**
 * 查询直营、T队收益
 */
export const getProfitList = (params) => {
  return request.get('/tranProfit/getProfitList', params);
};

/**
 * 查询阶段奖励
 */
export const prizeList = (params) => {
  return request.get('/app/return/prizeList', params);
};

/**
 * 机构收益月列表
 */
export const organDashboardProfitMonthList = () => {
  return request.get('/app/organ-dashboard/profit-month-list');
};
/**
 * 机构支出月列表
 */
export const organDashboardExpenditureMonthList = () => {
  return request.get('/app/organ-dashboard/expenditure-month-list');
};
/*
 * 机构收益交易明细
 */
export const organDashboardProfitMonthTranDetail = (params) => {
  return request.get('/app/organ-dashboard/profit-month-tran-detail', params);
};
/**
 * 机构收益月激活返现明细
 */
export const organDashboardProfitMonthReturnDetail = (params) => {
  return request.get('/app/organ-dashboard/profit-month-return-detail', params);
};
/**
 * 机构支出交易明细
 */

export const organDashboardExpenditureMonthTranDetail = (params) => {
  return request.get('/app/organ-dashboard/expenditure-month-tran-detail', params);
};

/**
 * 机构支出月激活返现明细
 */
export const organDashboardExpenditureMonthReturnDetail = (params) => {
  return request.get('/app/organ-dashboard/expenditure-month-return-detail', params);
};

/**
 * 查询机构数据看板首页数据
 */
export const organDashboardHomeUrl = (params) => {
  return request.get('/app/organ-dashboard/home', params);
};

/**
 * 查询机构数据看板月激活明细
 */
export const organDashboardOrgMonthActiveDetailUrl = (params) => {
  return request.get('/app/organ-dashboard/org-month-activate-detail', params);
};

/**
 * 查询机构数据看板 T队交易
 */
export const organDashboardTeamTranDetailUrl = (params) => {
  return request.get('/app/organ-dashboard/team-tran-detail', params);
};

/**
 * 查询补贴明细
 */
export const getSubsidyDetail = (params) => {
  return request.post('/tranProfit/getSubsidyDetail', params);
};
