/**
 * toast 组件
 */
import React, { useState, useRef, useMemo } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon, View } from '../';

import Style, { rpx } from '@alboped/react-native-style';
import event, { useEvent } from '../common/event';

/* 定义toast淡入淡出动画 */
Animatable.initializeRegistryWithDefinitions({
  toastZoomIn: {
    0: { opacity: 0, scale: 0.86 },
    1: { opacity: 1, scale: 1 },
  },
  toastZoomOut: {
    0: { opacity: 1, scale: 1 },
    1: { opacity: 0, scale: 0.86 },
  },
});

/* toat淡入淡出动画时间 */
const toastZoomTime = 160;

function Toast() {
  /* 动画容器 */
  const viewRef = useRef();
  /* 定时器 */
  const timerRef = useRef();
  /* 弹框信息 */
  const [toastInfo, setInfo] = useState({
    visible: false, // 是否显示
    message: '', // 信息内容
    type: '', // toast类型
    mask: false, // 是否遮罩
  });

  /**
   * 关闭弹框
   */
  const hide = () => {
    if (viewRef.current) {
      viewRef.current.toastZoomOut(toastZoomTime).then(() => {
        setInfo({ visible: false, message: '', type: '' });
      });
      clearTimeout(timerRef.current);
    }
  };

  /**
   * 监听toast打开关闭事件
   */
  useEvent('toastEvent', (params) => {
    if (params === 'hide') {
      hide();
    } else {
      viewRef.current?.stopAnimation();
      clearTimeout(timerRef.current);
      setTimeout(() => {
        setInfo({
          visible: true,
          message: params.message,
          type: params.type,
          mask: params.mask,
        });
        timerRef.current = setTimeout(hide, params.duration * 1000);
      });
    }
  });

  /**
   * 根据toast类型展示图标
   */
  const renderIcon = useMemo(() => {
    const { type } = toastInfo;

    const iconTypes = {
      success: 'checked',
      warn: 'warn2',
      error: 'result_error',
      info: 'tips',
    };

    if (type === 'loading') {
      return (
        <View style={styles.iconView}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      );
    }

    if (!iconTypes[type]) {
      return null;
    }

    return (
      <Icon
        // type="EvilIcons"
        name={iconTypes[type]}
        size={rpx(90)}
        color="rgba(255, 255, 255, .7)"
        containerStyle={styles.iconView}
      />
    );
  }, [toastInfo]);

  if (!toastInfo.visible) {
    return null;
  }

  /* 根据容器宽度动态计算样式 */
  const viewStyle = [styles.toastView];

  /* 添加loading样式 */
  if (toastInfo.type === 'loading') {
    viewStyle.push(styles.loadingView);
  }

  return (
    <View
      className="absolute-fill center"
      style={styles.maskView}
      pointerEvents={toastInfo.mask ? 'auto' : 'box-none'}
    >
      <Animatable.View
        ref={viewRef}
        useNativeDriver
        animation="toastZoomIn"
        duration={toastZoomTime}
        style={viewStyle}
      >
        {renderIcon}
        {!!toastInfo.message && <Text style={styles.toastText}>{toastInfo.message}</Text>}
      </Animatable.View>
    </View>
  );
}

/**
 * 向toast组件发送事件消息
 * @param {String} type toast类型
 * @param {String} message toast消息内容
 * @param {Number} duration 关闭定时时间，单位：秒
 */
const toastEmit = (type, message, duration, mask) => {
  let addDuration = duration || (type === 'loading' ? 20 : 2);

  event.emit('toastEvent', {
    type,
    message,
    duration: addDuration,
    mask,
  });
};

/* 普通提示信息 */
Toast.info = (...args) => toastEmit('info', ...args);

/* 成功消息 */
Toast.success = (...args) => toastEmit('success', ...args);

/* 警告消息 */
Toast.warn = (...args) => toastEmit('warn', ...args);

/* 错误消息 */
Toast.error = (...args) => toastEmit('error', ...args);

/* loading */
Toast.loading = (...args) => toastEmit('loading', args[0], args[1], true);

/* 关闭消息窗口 */
Toast.hide = () => event.emit('toastEvent', 'hide');

// TODO 默认参数配置
Toast.config = () => {};

export default Toast;

const styles = Style.create({
  maskView: {
    zIndex: 999999,
  },
  toastView: {
    alignItems: 'center',
    minWidth: '200rpx',
    maxWidth: '600rpx',
    padding: '20rpx 36rpx',
    borderRadius: '16rpx',
    backgroundColor: 'rgba(0, 0, 0, 0.76)',
  },
  iconView: {
    margin: '18rpx',
  },
  loadingView: {
    minWidth: '180rpx',
    minHeight: '180rpx',
    borderRadius: '22rpx',
  },
  toastText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: '36rpx',
    marginTop: '18rpx',
  },
});
