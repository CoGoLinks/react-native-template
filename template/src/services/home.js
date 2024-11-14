import { request } from '@/utils/request';
/**
 * 首页相关接口
 */

// 获取用户信息
export const getUserInfo = (token = '') => {
  const reuqestParams = {
    url: '/app/user/findIdentity',
    method: 'get',
  };
  if (token) {
    reuqestParams.headers = {
      'SYT-AUTH-TOKEN': token,
    };
  }
  return request(reuqestParams);
};

// 获取用户信息
export const getHomeProfit = () => {
  return request.get('/tranProfit/getHomeProfit');
};
// 校验手机号是否存在
export const getCheckPhoneNumberIsExist = (params) => {
  return request({
    url: '/app/user/checkPhoneNumberIsExist',
    method: 'get',
    params,
  });
};

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
