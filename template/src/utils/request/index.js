import { Linking } from 'react-native';
import { create } from './create';
import { envConf } from '@/config';
import Device from '@/config/device';
import { useStore } from '@/store';
import { Toast, Modal } from '@/components';
import { navigation } from '@/navigation';
import WebConf from '@/config/web';
import { convertVersion } from '@/utils/tools';

const request = create({
  baseURL: envConf.baseURL,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const { loading = false, url } = config;
    if (url?.startsWith('/ossData')) {
      config.baseURL = envConf.ossData;
      config.url = url.replace('/ossData', '');
      return config;
    }
    const { token = '' } = useStore.getState().userInfo;
    config.headers.Connection = 'keep-Alive';
    // 上传的不要替换
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }

    config.headers['PHONE-IMEI'] = Device.getUniqueId();
    config.headers['PHONE-PLATFORM'] = Device.platform;
    config.headers['PHONE-MODEL'] = Device.modal;
    config.headers['PHONE-VERSION'] = Device.systemVersion;
    config.headers['PHONE-MAC'] = Device.getMacAddress();
    config.headers['APP-VERSION'] = convertVersion(Device.appVersion);
    config.headers['JS-VERSION'] = '1';
    // 人脸认证会在未存储全局token时，手动设置header内的token
    if (!config.headers['SYT-AUTH-TOKEN']) {
      config.headers['SYT-AUTH-TOKEN'] = token;
    }
    if (loading) {
      Toast.loading(typeof loading === 'string' ? loading : '');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const {
      data,
      config: {
        loading = false, // 是否显示loading
        errorToast = true, // 是否弹出错误信息
        errorTypeToCatch = true, // 是否将errorType作为异常处理
      },
    } = response;
    if (loading) {
      Toast.hide();
    }
    if (data && data.errorType && errorTypeToCatch) {
      // errorType不为空，作为异常处理
      errorToast && Toast.info(data.message || '系统异常，请稍后重试！');
      return Promise.reject(data);
    }
    return data;
  },
  (error) => {
    const { response: { status, data } = {} } = error;
    let message = '系统异常，请稍后重试！';

    if (typeof data === 'string' && !!data) {
      message = data;
    } else if (data?.message) {
      message = data.message;
    }
    if (status === 403) {
      Toast.hide();
      Modal.alert({
        title: '系统提示',
        message: '请升级App版本！',
        onOk: () => {
          Linking.openURL(WebConf.download);
        },
      });
    } else {
      if ([401, 403].includes(status)) {
        navigation.logout({ confirm: false });
      } else {
        if (!error?.config?.errorToast) {
          return Promise.reject(error);
        }
        Toast.info(message || '系统异常，请稍后重试！');
      }
    }
    return Promise.reject(error);
  },
);

export { request };
