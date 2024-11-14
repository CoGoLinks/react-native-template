import { request } from '@/utils/request';

// 获取app版本信息
export const getAppVersion = () => {
  return request.get('/appVersion/findAppNewVersion');
};
// 查询我的协议
export async function queryMyAgreementUrl(token) {
  const params = {
    url: '/app/agent/queryMyAgreement',
    method: 'get',
  };
  if (token) {
    params.headers = {
      'SYT-AUTH-TOKEN': token,
    };
  }
  return request(params);
}
export async function signAgreement(token = '', params = {}) {
  const requestParams = {
    url: '/app/sign/signAgreement',
    method: 'get',
    params: params,
  };
  if (token) {
    requestParams.headers = {
      'SYT-AUTH-TOKEN': token,
    };
  }
  return request(requestParams);
}
