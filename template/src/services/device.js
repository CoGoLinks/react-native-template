import { request } from '@/utils/request';
/**
 * 查询设备列表
 */
export const findDeviceListUrl = (params = {}) => {
  return request.get('/deviceManager/findDeviceList', params);
};
// 设备活动/费率修改接口
export const updateDeviceActivity = (data) => {
  return request({
    url: '/deviceManager/updateDeviceActivity',
    method: 'post',
    data,
    loading: true,
  });
};
