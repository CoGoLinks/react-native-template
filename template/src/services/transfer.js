import { request } from '@/utils/request';

/* 设备划拨模块 */

// 查询可划拨的sn列表
export const getAssignableSnList = (params) => {
  return request.get('/deviceAssign/getAssignableSnList', params);
};

// 我的代理商查询
export const myTeamAgent = (params) => {
  return request.post('/app/agent/myTeamAgent', params);
};

// 查询可划拨台数
export const getAssignableNum = (params) => {
  return request.post('/deviceAssign/getAssignableNum', params);
};

// 划拨
export const doAssign = (params) => {
  return request.post('/deviceAssign/doAssign', params);
};

// 查询划拨单列表
export const getAssignOrderList = (params) => {
  return request.post('/deviceAssign/getAssignOrderList', params);
};

// 查询划拨单详情
export const getAssignOrderDetail = (params) => {
  return request.post('/deviceAssign/getAssignOrderDetail', params);
};

// 查询划拨单详情
export const getDeviceDetail = (params) => {
  return request.get('/deviceManager/getDeviceDetail', params);
};

// 截取snk
export const cutOutSnk = (params) => {
  return request.get('/deviceManager/cutOutSnk', params);
};

// 查询设备列表
export const findDeviceList = (params) => {
  return request({
    url: '/deviceManager/findDeviceList',
    method: 'get',
    params,
  });
};
