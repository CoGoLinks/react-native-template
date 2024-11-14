import React, { forwardRef, useMemo } from 'react';
import { rpx } from '@alboped/react-native-style';
import tinycolor2 from 'tinycolor2';
import { getColor } from '@/style';
import { Assets } from '../';
import Image, { ImageProps } from '../image';

export type IconProps = ImageProps & {
  /**
   * 图标名称
   */
  name: string;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 图标大小，自动转换为rpx
   */
  size?: number;
  /**
   * 方向
   */
  direction?: 'top' | 'left' | 'bottom' | 'right';
};

/**
 * 图标组件
 */
export const Icon = forwardRef((props: IconProps, ref: any) => {
  const { name, color, size = 40, direction = 'top', className, ...otherProps } = props;
  const sizeRpx = size && rpx(size);

  const newClassName = useMemo(() => {
    const rotates = {
      top: 'rotate-0',
      right: 'rotate-90',
      bottom: 'rotate-180',
      left: 'rotate-270',
    };

    const defClass = rotates[direction];
    if (Array.isArray(className)) {
      return [defClass, ...className];
    } else if (className) {
      return [defClass, className];
    }
    return defClass;
  }, [className, direction]);

  const iconColor = useMemo(() => {
    if (!color) {
      return color;
    }
    if (tinycolor2(color).isValid()) {
      return color;
    }
    return getColor(color);
  }, [color]);

  return (
    <Image
      source={Assets.icons[name]}
      fill={iconColor}
      width={sizeRpx}
      height={sizeRpx}
      className={newClassName}
      ref={ref}
      {...otherProps}
    />
  );
});

export default Icon;
