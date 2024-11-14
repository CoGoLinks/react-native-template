import React, { forwardRef } from 'react';
import { ScrollView as RNScrollView, ScrollViewProps as RNScrollViewProps } from 'react-native';

import { useCommonProps, CommonProps } from '../common';

export type ScrollViewProps = RNScrollViewProps & CommonProps;

/**
 * 包装Scroll组件
 */
export const ScrollView = forwardRef((props: ScrollViewProps, ref: any) => {
  const restProps = useCommonProps(props);
  if (!restProps.show) {
    return null;
  }
  return <RNScrollView ref={ref} keyboardShouldPersistTaps="handled" {...restProps} />;
});

export default ScrollView;
