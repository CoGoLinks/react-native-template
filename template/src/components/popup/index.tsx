import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import {
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { View, Text, Icon, TouchableOpacity } from '@/components';

const { width, height } = Dimensions.get('window');

// 定义组件的 props 类型
interface PopUpProps {
  modalBoxHeight?: number; // 盒子高度
  modalBoxBg?: string; // 背景色
  hide: () => void; // 关闭时的回调函数
  transparentIsClick?: boolean; // 透明区域是否可以点击
  title?: string; // 弹出层标题
  titleColor?: string; // 标题颜色
  titleFontSize?: number; // 标题字体大小
  borderRadius?: number; // 圆角大小
  children: React.ReactNode; // 弹出层内的子组件
}

const PopUp = forwardRef(
  (
    {
      modalBoxHeight = 300,
      modalBoxBg = '#fff',
      hide,
      transparentIsClick = true,
      title,
      titleColor = '#000',
      titleFontSize = 18,
      borderRadius = 10,
      children,
    }: PopUpProps,
    ref,
  ) => {
    const [offset] = useState(new Animated.Value(modalBoxHeight));
    const [show, setShow] = useState(false);

    // 入场动画
    const inAnimation = useCallback(() => {
      Animated.timing(offset, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true, // 使用原生驱动
      }).start();
    }, [offset]);

    // 出场动画
    const outAnimation = useCallback(() => {
      Animated.timing(offset, {
        toValue: modalBoxHeight,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setShow(false);
      });
    }, [offset, modalBoxHeight]);

    // 显示弹出层
    const showPopup = () => {
      setShow(true);
      // 延迟执行动画以确保 setShow 已更新
      setTimeout(() => {
        inAnimation();
      }, 10);
    };

    // 隐藏弹出层
    const hidePopup = () => {
      outAnimation();
    };

    // 默认隐藏回调
    const defaultHide = () => {
      hide();
      hidePopup();
    };

    // 暴露给父组件的方法
    useImperativeHandle(ref, () => ({
      show: showPopup,
      hide: hidePopup,
    }));

    return (
      <>
        {show && (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}
            keyboardVerticalOffset={-30} // 根据需要调整
          >
            {/* 透明覆盖层 */}
            <TouchableWithoutFeedback onPress={transparentIsClick ? defaultHide : undefined}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            {/* 弹出层内容 */}
            <Animated.View
              style={[
                styles.modalBox,
                {
                  height: modalBoxHeight,
                  backgroundColor: modalBoxBg,
                  borderRadius: borderRadius,
                  transform: [{ translateY: offset }],
                },
              ]}
            >
              {/* 弹出层头部 */}
              <View style={styles.header}>
                {title && (
                  <View style={styles.titleContainer}>
                    <Text style={[styles.title, { color: titleColor, fontSize: titleFontSize }]}>
                      {title}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={defaultHide}
                  activeOpacity={0.7}
                  style={styles.closeButton}
                >
                  {/* @ts-ignore */}
                  <Icon name="close" size={30} color="#999" />
                </TouchableOpacity>
              </View>

              {/* 弹出层内容区域 */}
              <View style={styles.content}>{children}</View>
            </Animated.View>
          </KeyboardAvoidingView>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalBox: {
    width: width,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -10,
    padding: 10,
  },
  content: {
    flex: 1,
  },
});

export default PopUp;
