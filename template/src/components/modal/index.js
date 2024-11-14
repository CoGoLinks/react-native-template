/**
 * 弹框组件
 */
import React, { useEffect, useRef, useContext } from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import Style from '@alboped/react-native-style';

import { guid } from '@/utils/tools';
import { UIContext } from '../ui-provider/context';
import { View } from '../';
import Alert from './alert';

function Modal({
  visible = false,
  position = 'fill',
  animationType = 'zoomIn',
  animated = true,
  maskClosable = true,
  maskStyle = {},
  onClose = () => {},
  children,
}) {
  const bodyHandleRef = useRef();
  const handleRef = useRef();
  const thisRef = useRef({ guid: guid() });
  const { setModalValue } = useContext(UIContext);

  /**
   * 添加弹框
   * @param {*} el 弹框元素
   */
  const addModal = (el) => {
    setModalValue((value) => ({ ...value, [thisRef.current.guid]: el }));
  };

  /**
   * 删除弹框
   */
  const removeModal = () => {
    setModalValue((value) => {
      delete value[thisRef.current.guid];
      return { ...value };
    });
  };

  useEffect(() => {
    return () => closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 关闭窗口
   * @return {undefined}
   */
  const closeModal = (disAnimation = false) => {
    const { current } = bodyHandleRef;
    if (disAnimation) {
      removeModal();
      return;
    }

    if (position === 'center') {
      const centerAmination = {
        zoomIn: 'zoomOut',
        bounceIn: 'fadeOut',
        fadeInDown: 'fadeOutUp',
        fadeInUp: 'fadeOutDown',
      };

      current && current[centerAmination[animationType]](animated ? 300 : 1);
    } else {
      current &&
        current.transitionTo(
          {
            height: 0,
          },
          animated ? 300 : 1,
        );
    }

    handleRef.current &&
      handleRef.current.fadeOut(animated ? 300 : 1).then(() => {
        removeModal();
      });
  };

  /**
   * 遮罩层元素样式
   * @return {Array} 样式
   */
  const _getBodyStyle = () => {
    const positionMap = {
      top: 'flex-start',
      center: 'center',
      bottom: 'flex-end',
    };

    return [
      StyleSheet.absoluteFill,
      {
        backgroundColor: 'transparent',
        justifyContent: positionMap[position],
        alignItems: position === 'center' ? 'center' : undefined,
      },
    ];
  };

  /**
   * 动画容器元素样式
   * @return {Element} 样式对象
   */
  const _getContentStyle = () => {
    const justifyMap = {
      top: 'flex-end',
      bottom: 'flex-start',
    };

    const resStyle = {
      justifyContent: justifyMap[position],
      overflow: 'hidden',
    };

    if (position === 'fill') {
      resStyle.flex = 1;
    }
    return resStyle;
  };

  /**
   * 动画效果类型
   * @return {String} 动画类型字符串
   */
  const _bodyAnimation = () => {
    const animationMap = {
      top: 'fadeInDownBig',
      bottom: 'fadeInUpBig',
      center: animationType,
      fill: animationType,
    };

    return animationMap[position];
  };

  const render = () => (
    <View key={thisRef.current.guid} className="absolute-fill">
      <Animatable.View
        ref={handleRef}
        style={[styles.container, maskStyle]}
        animation="fadeIn"
        duration={animated ? 260 : 1}
        onStartShouldSetResponder={() => true}
        onResponderRelease={maskClosable ? onClose : undefined}
      />
      <View style={_getBodyStyle()} pointerEvents="box-none">
        <Animatable.View
          ref={bodyHandleRef}
          style={_getContentStyle()}
          animation={_bodyAnimation()}
          duration={animated ? 260 : 1}
        >
          {children}
        </Animatable.View>
      </View>
    </View>
  );

  useEffect(() => {
    if (visible) {
      showModal();
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, children]);

  /**
   * 显示弹框
   * @return {undefined}
   */
  const showModal = () => {
    addModal(render(), thisRef.current.guid);
  };

  return null;
}

Modal.propTypes = {
  /* 是否显示弹框 */
  visible: PropTypes.bool,
  /* 弹框位置 */
  position: PropTypes.oneOf(['top', 'center', 'bottom', 'fill']),
  /* 中间弹框的动画效果 */
  animationType: PropTypes.oneOf(['fadeIn', 'zoomIn', 'bounceIn', 'fadeInDown', 'fadeInUp']),
  /* 点击蒙曾是否关闭 */
  maskClosable: PropTypes.bool,
  /* 关闭时的回调函数 */
  onClose: PropTypes.func,
  /* 蒙层样式 */
  maskStyle: PropTypes.any,
};

Modal.alert = Alert.alert;

const styles = Style.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalBody: {
    backgroundColor: '#fff',
  },
});

export default Modal;
