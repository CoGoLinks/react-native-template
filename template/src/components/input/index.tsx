import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { tw } from '@/style';
import { useCommonProps, CommonProps } from '../common';

export type InputProps = TextInputProps & CommonProps;

/**
 * 包装Input组件
 */
export const Input = forwardRef((props: InputProps, ref: any) => {
  const restProps = useCommonProps(props);
  if (!restProps.show) {
    return null;
  }
  return (
    <TextInput
      ref={ref}
      allowFontScaling={false}
      placeholderTextColor={tw.color('c-n5')}
      {...restProps}
    />
  );
});

export default Input;
