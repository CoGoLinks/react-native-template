import React, { forwardRef } from 'react';
import { Keyboard } from 'react-native';
import {
  TouchableOpacity as ULTouchableOpacity,
  TouchableOpacityProps as ULTouchableOpacityProps,
} from 'react-native-ui-lib';
import { useCommonProps, CommonProps } from '../common';

export type TouchableOpacityProps = ULTouchableOpacityProps & CommonProps;

/**
 * 触摸组件
 */
const TouchableOpacity = forwardRef((props: TouchableOpacityProps, ref: any) => {
  const { onPress, ...rest } = props;
  const restProps = useCommonProps(rest);
  if (!restProps.show) {
    return null;
  }

  const handleOnPress = () => {
    onPress?.();
    Keyboard.dismiss();
  };

  return (
    <ULTouchableOpacity
      ref={ref}
      activeOpacity={0.7}
      onPress={onPress && handleOnPress}
      {...restProps}
    />
  );
});

export default TouchableOpacity;
