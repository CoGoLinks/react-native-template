import { request } from '@/utils/request';

// 验证短信验证码
export const agentConfirmCode = (params) => {
  return request({
    url: '/app/agent/confirmCode',
    method: 'get',
    params,
  });
};
// 扩展代理商接口
export const agentExpand = (data) => {
  return request({
    url: '/app/agent/expand',
    method: 'post',
    data,
    loading: true,
  });
};
// 代理商列表
export const agentAgentList = (params) => {
  return request({
    url: '/app/agent/agentList',
    method: 'get',
    params,
  });
};
// 校验是否可以扩展代理商
export const agentCheckIsExpand = (data) => {
  return request({
    url: '/app/agent/checkIsExpand',
    method: 'post',
    data,
  });
};
// 代理商详情
export const agentAgentInfo = (params) => {
  return request({
    url: '/app/agent/agentInfo',
    method: 'get',
    params,
  });
};
// 代理商详情
export const teamAgent = (params) => {
  return request.post('/app/agent/teamAgent', params);
};
// 获取卡号归属
export const cardAscription = (params) => {
  return request({
    url: '/app/system/cardAscription',
    method: 'get',
    params,
  });
};
// 校验是否为机构
export const agentIsOrgan = (params) => {
  return request({
    url: '/app/agent/isOrgan',
    method: 'get',
    params,
  });
};
// 查询机构审核提现单列表
export const findWithdrawalReviewList = (params) => {
  return request({
    url: '/app/finAgentSettle/findOrganAuditTakeCashRecordByPage',
    method: 'get',
    params,
  });
};
// 查询几口审核提现单详情
export const findWithDrawalReviewDetails = (params) => {
  return request({
    url: '/app/finAgentSettle/findOrganAuditTakeCashRecordDetail',
    method: 'get',
    params,
  });
};
// 提现单审核驳回
export const withDrawalReviewReject = (data) => {
  return request({
    url: '/app/finAgentSettle/organRefuse',
    method: 'post',
    data,
  });
};
// 提现单审核通过
export const withDrawalReviewPass = (data) => {
  return request({
    url: '/app/finAgentSettle/organApprove',
    method: 'post',
    data,
  });
};
// 提现单审核机构付款
export const withDrawalReviewPay = (data) => {
  return request({
    url: '/app/finAgentSettle/organPay',
    method: 'post',
    data,
  });
};
// 个人-鉴权
export const checkAuth = (data) => {
  return request({
    url: '/app/agent/checkAuth',
    method: 'post',
    data,
  });
};
// 企业鉴权(四要素)
export const checkAuthEnt = (data) => {
  return request({
    url: '/app/agent/checkAuthEnt',
    method: 'post',
    data,
  });
};
// 通用拦截接口
export const checkUserByType = (data) => {
  return request({
    url: '/app/user/checkUserByType?type=01',
    method: 'get',
    data,
  });
};
