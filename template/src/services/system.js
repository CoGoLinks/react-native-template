import { Platform } from 'react-native';
import { Toast } from '@/components';
import { request } from '@/utils/request';
import { getFileName } from '@/utils/tools';
import Device from '@/config/device';
/**
 * 上传
 * @param {*} params
 * @returns
 */
export const uploadFileUrl = (path = '') => {
  console.log('path -------', path);
  if (path) {
    const formData = new FormData();
    const fileName = getFileName(path);
    const fileExtension = path.split('.').pop();
    const imageTypes = ['jpeg', 'jpg', 'png'];
    if (!imageTypes.includes(fileExtension)) {
      return Toast.info('只能上传' + imageTypes.join('、') + '格式的照片');
    }

    formData.append('file', {
      uri: path,
      type: 'image/' + fileExtension,
      name: fileName,
    });

    return request({
      url: '/app/system/upload',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
      loading: '图片上传中',
    });
  }
  return Toast.info('请选择要上传的图片');
};

/**
 * 查询pushid
 */
export const findUserAgentRelIdUrl = (params = {}) => {
  return request.get('/app/user/findUserAgentRelId', params);
};

/**
 * 查询pushid
 */
export const saveJpushIdLogUrl = (params = {}) => {
  return request.get('app/message/saveJpushIdLog', params);
};

const extractVersion = (match) => {
  let extractedVersion = '1.0.0'; // 默认版本

  if (match) {
    // 提取主版本号
    let majorVersion = `${match[1] || '1'}`;
    const minorVersion = `${match[2] || '0'}`;
    const patchVersion = `${match[3] || '0'}`;
    // 测试版本号前缀一定要放在最前面判断
    if (majorVersion.startsWith('1000')) {
      majorVersion = majorVersion.replace('1000', '');
    } else if (majorVersion.startsWith('10')) {
      // RC版本号
      majorVersion = majorVersion.replace('10', '');
    }
    extractedVersion = `${majorVersion}.${minorVersion}.${patchVersion}`;
  }
  return extractedVersion;
};

/**
 * 功能开关
 */
export const getAppSwitch = (data) => {
  return request({
    url: '/open/appSwitch/getAppSwitches',
    method: 'post',
    data,
  });
};

// OCR 识别
export const idCardOcr = (data) => {
  return request({
    url: '/app/system/idCardOcr',
    method: 'post',
    data,
  });
};
