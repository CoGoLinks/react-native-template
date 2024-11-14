import { Linking } from 'react-native';
import { analyticsInit } from '@/utils/analytics';
import { getAppVersion } from '@/services/setting';
import { Modal } from '@/components';
import Device from '@/config/device';
import { convertVersion } from '@/utils/tools';

/**
 * 初始化SDK
 */
export const appInit = () => {
  analyticsInit();
};

/**
 * 检测App版本
 */
export const checkAppVersion = (isShowTips = false, tips = '') => {
  getAppVersion().then((res) => {
    const versions = res.data?.version || '';
    const fun_desc = res.data?.fun_desc || '';
    if (versions) {
      // 找出versionNumbers数组中的最大元素
      const newVersion = versions.replace(/\./g, '');
      // 获取App当前版本号
      const appVersion = convertVersion(Device.appVersion).replace(/\./g, '');
      console.log('appVersion:', appVersion, 'newVersion:', newVersion);
      // 判断是否需要提示升级
      if (appVersion < newVersion) {
        Modal.alert({
          title: '系统提示',
          message: `${fun_desc}${tips ? `${tips}` : ''}！`,
          okText: '去升级',
          onOk: () => {
            Linking.openURL(res?.data?.download_url || '');
          },
        });
      } else {
        if (isShowTips) {
          Modal.alert({
            title: '系统提示',
            message: `当前版本已是最新版本${tips ? `${tips}` : ''}！`,
            cancelText: null,
          });
        }
      }
    } else {
      if (isShowTips) {
        Modal.alert({
          title: '系统提示',
          message: `当前版本已是最新版本${tips ? `${tips}` : ''}！`,
          cancelText: null,
        });
      }
    }
  });
};
