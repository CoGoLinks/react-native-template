import React, { useMemo, forwardRef } from 'react';
import { TouchableOpacity, Text } from '../';
import { TouchableOpacityProps } from '../ui-lib';
import { ClassNameInput } from '../common';
import { ClassInput } from 'twrnc/dist/esm/types';
import { isArray } from '@/utils/tools';

export type ButtonProps = TouchableOpacityProps & {
  /**
   * 按钮类型，默认为'primary'
   */
  type?: 'default' | 'primary' | 'ghost' | 'warning' | 'dark';
  /**
   * 按钮形状
   */
  shape?: 'square' | 'round';
  /**
   * 按钮大小
   */
  size?: 'lg' | 'xl' | 'sm' | 'xs';
  /**
   * 文字样式类名
   */
  textClassName?: ClassNameInput;
  /**
   * 文字样式
   */
  textStyle?: any;
};

const types = {
  default: 'bg-c-0 border border-c-n5',
  primary: 'bg-c-primary',
  dark: 'bg-c-dark',
  ghost: 'bg-c-0 border border-c-primary',
  warning: 'bg-c-0 text-c-mr',
};

const textColors = {
  default: 'text-c-n8',
  primary: 'text-c-w',
  dark: 'text-c-w',
  ghost: 'text-c-primary',
  warning: 'text-c-n8',
};

const rounded = {
  lg: 'rounded-48',
  xl: 'rounded-44',
  sm: 'rounded-32',
  xs: 'rounded-28',
};

const textSize = {
  lg: 'text-2xl',
  xl: 'text-xl',
  sm: 'text-base',
  xs: 'text-base',
};

const Button = forwardRef((props: ButtonProps, ref: any) => {
  const {
    children,
    className = '',
    textStyle = {},
    textClassName = '',
    activeOpacity = 0.5,
    type = 'primary',
    size = 'lg',
    shape = 'square',
    disabled = false,
    ...rest
  } = props;

  const child = useMemo(() => {
    if (typeof children === 'string') {
      return (
        <Text
          className={[
            textColors[type],
            textSize[size],
            'font-w5',
            textClassName as ClassInput,
          ]}
          style={textStyle}
        >
          {children}
        </Text>
      );
    }
    return children;
  }, [children, textClassName, textStyle, type, size]);

  const btnClassName = useMemo(() => {
    const defClassName = [
      'center',
      'w-full',
      types[type],
      'h-btn-' + size,
      shape === 'square' ? 'rounded-16' : rounded[size],
      disabled ? 'opacity-50' : '',
    ].join(' ');

    if (isArray(className)) {
      return [defClassName, ...(className as ClassInput[])];
    } else {
      return [defClassName, className as ClassInput];
    }
  }, [type, size, shape, disabled, className]);

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      className={btnClassName}
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {child}
    </TouchableOpacity>
  );
});

export default Button;
