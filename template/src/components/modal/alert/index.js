/**
 * alert 组件
 */
import React, { useState, useRef, useMemo } from 'react';
import * as Animatable from 'react-native-animatable';

import { Text, View, TouchableOpacity, Image } from '../../';

import Style from '@alboped/react-native-style';
import event, { useEvent } from '../../common/event';

/* 定义alert淡入淡出动画 */
Animatable.initializeRegistryWithDefinitions({
  alertZoomIn: {
    0: { opacity: 0, scale: 0.95 },
    1: { opacity: 1, scale: 1 },
  },
  alertZoomOut: {
    0: { opacity: 1, scale: 1 },
    1: { opacity: 0, scale: 0.95 },
  },
});

/* toat淡入淡出动画时间 */
const alertZoomTime = 160;

function Alert() {
  /* 动画容器 */
  const viewRef = useRef();
  /* 事件 */
  const actionsRef = useRef({});
  /* 弹框信息 */
  const [toastInfo, setInfo] = useState({
    visible: false, // 是否显示
    message: '', // 信息内容
    okText: '确定', // 确定按钮文字
    cancelText: '取消', // 取消按钮文字
    footer: null, // 自定义底部
    closeIcon: false, // 是否显示关闭按钮
    singleButton: false, // 是否展示单按钮
  });

  /**
   * 关闭弹框
   */
  const hide = () => {
    if (viewRef.current) {
      viewRef.current.alertZoomOut(alertZoomTime).then(() => {
        setInfo({ visible: false, message: '' });
      });
    }
  };

  const renderMessage = useMemo(() => {
    if (typeof toastInfo.message === 'function') {
      return toastInfo.message();
    } else if (typeof toastInfo.message === 'string') {
      return <Text className="text-base text-center text-c-n7">{toastInfo.message}</Text>;
    } else {
      return toastInfo.message;
    }
  }, [toastInfo]);

  /**
   * 监听toast打开关闭事件
   */
  useEvent('alertEvent', ({ options = {}, type }) => {
    const {
      onOk = () => {
        hide();
      },
      onCancel = () => {
        hide();
      },

      okText = '确定',
      cancelText = '取消',
      closeWhenOk = true, // 点击确定时是否关闭
      singleButton = false, // 是否展示单独按钮
    } = options;
    if (type === 'close') {
      hide();
    } else {
      setInfo({
        visible: true,
        title: options.title,
        message: options.message,
        okText: okText,
        footer: options.footer || null,
        cancelText: cancelText,
        closeIcon: options.closeIcon || false,
        singleButton: options.singleButton,
      });

      actionsRef.current.onOk = onOk;
      actionsRef.current.onCancel = onCancel;
      actionsRef.current.closeWhenOk = closeWhenOk;
    }
  });

  if (!toastInfo.visible) {
    return null;
  }

  const handleOk = () => {
    actionsRef.current?.onOk();
    if (actionsRef.current?.closeWhenOk) {
      hide();
    }
  };

  const handleCancel = () => {
    actionsRef.current?.onCancel();
  };

  return (
    <View className="absolute-fill center bg-[rgba(0,0,0,0.5)]" style={styles.maskView}>
      <Animatable.View
        ref={viewRef}
        useNativeDriver
        animation="alertZoomIn"
        duration={alertZoomTime}
        style={styles.alertView}
      >
        {toastInfo.closeIcon && (
          <TouchableOpacity
            className="absolute top-[0] z-10 right-[0] text-sm text-c-n8 px-[30rpx] py-[30rpx]"
            onPress={handleCancel}
          >
            <Image assetName="agent.close" className="w-[26rpx] h-[26rpx]" />
          </TouchableOpacity>
        )}
        <View className="px-[28rpx] py-[48rpx]">
          <Text
            show={!!toastInfo.title}
            className={{
              'text-2xl font-w5 text-center text-c-n8': true,
              'mb-[16rpx]': !!toastInfo.message,
            }}
          >
            {toastInfo.title}
          </Text>
          {renderMessage}
        </View>
        {toastInfo.footer ? (
          toastInfo.footer
        ) : !toastInfo.singleButton ? (
          <View className="row h-[96rpx] border-t-1 border-[#EBEDF0]">
            <TouchableOpacity
              show={!!toastInfo.cancelText}
              className="flex-1 center h-full border-r-1 border-[#EBEDF0]"
              onPress={handleCancel}
            >
              <Text className="text-2xl text-c-n8 font-w4">{toastInfo.cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 center h-full" onPress={handleOk}>
              <Text className="text-2xl text-c-primary font-w4">{toastInfo.okText}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="row h-[96rpx] border-t-1 border-[#EBEDF0]">
            <TouchableOpacity className="flex-1 center h-full" onPress={handleOk}>
              <Text className="text-2xl text-c-primary font-w4">{toastInfo.okText}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animatable.View>
    </View>
  );
}

const openAlert = (options) => event.emit('alertEvent', { type: 'open', options });

const closeAlert = () => event.emit('alertEvent', { type: 'close' });

/* 打开弹框 */
Alert.alert = (options) => {
  openAlert(options);
  return { close: closeAlert };
};

/* 关闭弹框 */
Alert.alert.close = closeAlert;

export default Alert;

const styles = Style.create({
  maskView: {
    zIndex: 999998,
  },
  alertView: {
    width: '622rpx',
    borderRadius: '20rpx',
    backgroundColor: '#fff',
  },
});
