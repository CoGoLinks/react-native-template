import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { tw } from '@/style';
import { ClassInput } from 'twrnc/dist/esm/types';
import Style from '@alboped/react-native-style';
import { isArray, isObject, isString } from '@/utils/tools';

export type ClassNameInput = ClassInput | ClassInput[];

export type CommonProps = {
  /**
   * tailwind 类名
   */
  className?: ClassNameInput;
  /**
   * 是否显示
   */
  show?: boolean;
};

/**
 * rpx转px
 */
const classNameRpx2Px = (classNameItem: ClassInput) => {
  const regex = /\[(-?\d+)rpx\]/g;
  if (typeof classNameItem === 'string' && classNameItem.includes('rpx')) {
    return classNameItem?.replace(regex, function (match) {
      const num = match.match(/-?\d+/g);
      return `[${Style.rpx(num)}px]`;
    });
  }
  return classNameItem;
};

const parseObject = (item: { [k: string]: any }) => {
  return Object.entries(item).reduce(
    (acc: { [k: string]: any }, [key, value]) => {
      acc[classNameRpx2Px(key) as string] = value;
      return acc;
    },
    {},
  );
};

const parseClassName = (className: ClassNameInput) => {
  if (isArray(className)) {
    return (className as ClassInput[]).map((item: ClassInput) => {
      if (isObject(item)) {
        return parseObject(item as { [k: string]: any });
      }
      return classNameRpx2Px(item);
    });
  } else if (isObject(className)) {
    return parseObject(className as { [k: string]: any });
  } else if (isString(className)) {
    return classNameRpx2Px(className as string);
  }
  throw new Error('className 类型错误');
};

/**
 * 处理样式，获取tailwind样式并与style合并
 */
export const useCommonProps = (props: any) => {
  const { className = '', show = true, style, ...otherProps } = props;

  const styleProps = useMemo(() => {
    const parsed = parseClassName(className);
    const classStyle = isArray(parsed)
      ? tw.style(...(parsed as []))
      : tw.style(parsed as string | {});
    const styled = StyleSheet.compose(classStyle, Style.create(style || {}));

    return { style: styled, show, ...otherProps };
  }, [className, style, show, otherProps]);

  return styleProps;
};
