import React, { forwardRef } from 'react';
import { View as ULView, ViewProps as ULViewProps } from 'react-native-ui-lib';
import LinearGradient from 'react-native-linear-gradient';

import { useCommonProps, CommonProps } from '../common';

export type ViewProps = ULViewProps &
  CommonProps & {
    linearGradient?: {
      colors: (string | number)[];
      start?: { x: number; y: number };
      end?: { x: number; y: number };
      locations?: number[];
      useAngle?: boolean;
      angleCenter?: { x: number; y: number };
      angle?: number;
    };
  };

/**
 * 单独导出包装过的组件，覆盖原有组件
 */
const View = forwardRef((props: ViewProps, ref: any) => {
  const { linearGradient, ...restProps } = useCommonProps(props);

  if (!restProps.show) {
    return null;
  }

  if (linearGradient) {
    return <LinearGradient {...linearGradient} ref={ref} {...restProps} />;
  }

  return <ULView ref={ref} {...restProps} />;
});

export default View;
