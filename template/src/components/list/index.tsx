import React, { useMemo, isValidElement } from 'react';
import { Text, TouchableOpacity } from '../';
import Icon, { IconProps } from '../icon';
import View from '../view';
import { isString, isObject } from '@/utils/tools';

type ListItemType = {
  label: string | React.ReactNode;
  extra?: string | React.ReactNode;
  icon?: string | IconProps | React.ReactNode;
  arrow?: 'up' | 'down' | 'left' | 'right' | 'none';
  onPress?: () => void;
  style?: any;
  className?: any;
  labelClassName?: any;
  extraClassName?: any;
};

type ListProps = {
  data: ListItemType[];
  style?: any;
  className?: any;
  itemClassName?: any;
  labelClassName?: any;
  extraClassName?: any;
};

const List = (props: ListProps) => {
  const { data, className, itemClassName, labelClassName, extraClassName, style } = props;

  const renderList = useMemo(() => {
    return data.map((item, index) => {
      const { arrow = 'right' } = item;
      let icon = null,
        label = null,
        extra = null;
      if (isValidElement(item.icon)) {
        icon = item.icon;
      } else if (isString(item.icon)) {
        icon = <Icon name={item.icon as unknown as string} size={40} />;
      } else if (isObject(item.icon)) {
        icon = <Icon {...(item.icon as unknown as object)} />;
      }
      if (typeof item.label === 'function') {
        label = (
          <View className={['flex-1', labelClassName, item.labelClassName]}>{item.label()}</View>
        );
      } else if (typeof item.label === 'string') {
        label = (
          <Text className={['flex-1 text-base font-w4', labelClassName, item.labelClassName]}>
            {item.label}
          </Text>
        );
      } else {
        label = (
          <View className={['flex-1', labelClassName, item.labelClassName]}>{item.label}</View>
        );
      }
      if (typeof item.extra === 'function') {
        extra = item.extra();
      } else if (typeof item.extra === 'string') {
        extra = (
          <Text className={['text-c-n6 text-base', extraClassName, item.extraClassName]}>
            {item.extra}
          </Text>
        );
      } else {
        extra = item.extra;
      }
      return (
        <TouchableOpacity
          key={index}
          className={[
            'row items-center px-30 h-[88rpx] border-[#eee]',
            {
              'border-b-1': index !== data.length - 1,
            },
            itemClassName,
            item.className,
          ]}
          onPress={item.onPress}
        >
          {icon}
          {label}
          {extra}
          <View className="justify-center items-end h-40 w-[35rpx]">
            {arrow !== 'none' ? <Icon name="right" color="c-n6" size={30} /> : null}
          </View>
        </TouchableOpacity>
      );
    });
  }, [data, itemClassName, labelClassName, extraClassName]);

  return (
    <View className={['rounded-8', className]} style={style}>
      {renderList}
    </View>
  );
};

export default List;
