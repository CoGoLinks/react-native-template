/**
 * 包装react-native-ui-lib组件库
 */
import React, { forwardRef } from 'react';
import { TextField as ULTextField, TextFieldProps as ULTextFieldProps } from 'react-native-ui-lib';
import { useCommonProps, CommonProps } from '../common';

// 导出所有组件
export * from 'react-native-ui-lib';

/**
 * 定义新的类型，覆盖原有类型，方便代码提示
 */
export type TextFieldProps = ULTextFieldProps & CommonProps;

/**
 * 单独导出包装过的组件，覆盖原有组件
 */
export const TextField = forwardRef((props: TextFieldProps, ref: any) => {
  const restProps = useCommonProps(props);
  if (!restProps.show) {
    return null;
  }
  return <ULTextField ref={ref} {...restProps} />;
});
