import React, { forwardRef } from 'react';
import { Keyboard } from 'react-native';
import { Text as ULText, TextProps as ULTextProps } from 'react-native-ui-lib';
import { useCommonProps, CommonProps } from '../common';

export type TextProps = ULTextProps & CommonProps;

/**
 * 文本组件
 */
const Text = forwardRef((props: TextProps, ref: any) => {
  const { onPress, ...rest } = props;
  const restProps = useCommonProps(rest);
  if (!restProps.show) {
    return null;
  }

  const handleOnPress = (e: any) => {
    onPress?.(e);
    Keyboard.dismiss();
  };

  return (
    <ULText ref={ref} allowFontScaling={false} onPress={onPress && handleOnPress} {...restProps} />
  );
});

export default Text;
