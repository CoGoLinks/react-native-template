import { request } from '@/utils/request';

/**
 * 省
 */
export const getProvinceListUrl = () => {
  return request({
    url: '/app/system/getProvinceList',
    method: 'get',
  });
};

/**
 * 市/app/system/getCityList/{provinceCode}
 */
export const getCityListUrl = (provinceCode = '') => {
  return request({
    url: `/app/system/getCityList/${provinceCode}`,
    method: 'get',
  });
};

/**
 * 区
 */
export const getDistrictListUrl = (cityCode = '') => {
  return request({
    url: `/app/system/getDistrictList/${cityCode}`,
    method: 'get',
  });
};
