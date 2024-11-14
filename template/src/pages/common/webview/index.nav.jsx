import React, { useRef } from 'react';
import { useStore } from '@/store';
import { WebView, Toast } from '@/components';
import Device from '@/config/device';
import { convertVersion } from '@/utils/tools';
/**
 * WebView 公共页面
 */
function WebPage({ navigation, route }) {
  const { callback = () => {} } = route?.params || {};
  const { setUserInfo, userInfo } = useStore('userInfo', 'setUserInfo');

  const webRef = useRef();
  /**
   * 接收从html5发来的消息
   * @param {*} data
   * @param {*} postMessage
   */
  const onInvokeMessage = (data, postMessage) => {
    console.log('WebPage onInvokeMessage data ===', data);

    if (data.type === 'userInfo') {
      // 获取用户信息
      const appInfo = {
        tel: userInfo?.tel || '',
        userId: userInfo?.userId || '',
        token: userInfo?.token || '',
        'PHONE-IMEI': Device.getUniqueId(),
        'PHONE-PLATFORM': Device.platform,
        'PHONE-MODEL': Device.modal,
        'PHONE-VERSION': Device.systemVersion,
        'PHONE-MAC': Device.getMacAddress(),
        'APP-VERSION': convertVersion(Device.appVersion),
        'JS-VERSION': '1',
      };
      postMessage(appInfo);
    } else if (data.type === 'titleChange') {
      // 改变标题
      navigation.setOptions({
        title: data.data || '',
      });
    } else if (data.type === 'faceAuthSuccessful') {
      // 人脸sdk认证成功
      setUserInfo(route.params?.data || {});
      navigation.replace('Tabs');
      Toast.info('登录成功', 1);
    } else if (data.type === 'goBack') {
      // 返回
      callback && callback(data);
      navigation.goBack();
    } else if (data.type === 'pdfViewer') {
      // 浏览PDF文件
      navigation.push('PdfPage', {
        url: data?.url || '',
        title: data?.title || '',
      });
    } else if (data.type === 'dispatchAction') {
      // h5 页面发来的执行callback方法
      callback && callback(data);
    }
  };

  const onLoadEnd = () => {
    const onLoadEndParams = {
      type: 'sytWebViewOnLoadEnd',
    };
    webRef.current && webRef.current.postMessage(JSON.stringify(onLoadEndParams));
  };

  return (
    <WebView
      ref={webRef}
      originWhitelist={['*']}
      source={{ uri: route.params.url }}
      onInvokeMessage={onInvokeMessage}
      onLoadEnd={onLoadEnd}
    />
  );
}

export default {
  name: 'WebView',
  component: WebPage,
  options: { title: '' },
};
