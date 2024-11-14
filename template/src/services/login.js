import { request } from '@/utils/request';
export const demoRequest = () => {
  return request({
    url: '/app/demo/get-demo',
    method: 'get',
  });
};
// 发送短信验证码 登录前
export const loginSendCode = (data) => {
  return request({
    url: '/app/login/sendCode',
    method: 'post',
    data,
  });
};
// 发送短信验证码 登录后
export const getSendSmsCode = (token = '', params = {}) => {
  const requestParams = {
    url: '/app/login/sendSmsCode',
    method: 'get',
    params: params,
  };
  if (token) {
    requestParams.headers = {
      'SYT-AUTH-TOKEN': token,
    };
  }
  return request(requestParams);
};

// 手机号验证码登录
export const loginSmsCode = (data) => {
  return request({
    url: '/app/login/smsCode',
    method: 'post',
    data,
    loading: true,
    errorTypeToCatch: false,
  });
};
// 用户账号密码登录
export const loginPassword = (data) => {
  return request({
    url: '/app/login/password',
    method: 'post',
    data,
    loading: true,
    errorTypeToCatch: false,
  });
};

/**
 *
 * @returns 获取人脸识别URL
 */
export const getFaceUrl = (token) => {
  return request({
    url: '/app/login/getFaceUrl',
    method: 'get',
    headers: {
      'SYT-AUTH-TOKEN': token,
    },
  });
};

/**
 * 修改密码
 */
export const updatePassword = (data) => {
  return request({
    url: '/app/login/resetPassword',
    method: 'post',
    data,
    loading: true,
    errorTypeToCatch: false,
  });
};
/**
 * 修改手机号
 */
export const modifyPhoneNoUrl = (data) => {
  return request({
    url: '/app/login/modifyPhoneNo',
    method: 'post',
    data,
    loading: true,
    errorTypeToCatch: false,
  });
};
