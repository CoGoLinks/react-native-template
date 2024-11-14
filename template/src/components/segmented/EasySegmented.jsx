import React from 'react';
import { View, TouchableOpacity, Text, Toast, Icon } from '@/components';

const EasySegmented = ({ items = [], value = '', onChange = () => {}, showIcon = false }) => {
  console.log('EasySegmented mate', items);
  return (
    <View className="h-[88rpx] flex-row justify-around">
      {items?.map((item) => {
        if (item?.value === value) {
          return (
            <TouchableOpacity
              key={item?.value}
              activeOpacity={0.7}
              disabled={!(item?.value === value && item?.mate?.iconName && showIcon)}
              onPress={() => {
                if (item?.value === value && item?.mate?.iconName && showIcon) {
                  item?.mate?.iconClick();
                  return;
                }
                onChange(item);
              }}
              className="justify-center rounded-[3rpx] border-b-[6rpx] border-c-primary"
            >
              <View className="flex flex-row items-center">
                <Text className="font-w5 text-[30rpx] text-c-primary">{item?.label || ''}</Text>
                {item?.mate?.iconName && showIcon && (
                  <Icon
                    name={item?.mate?.iconName}
                    size={item?.mate?.iconSize}
                    color={item?.mate?.iconColor}
                    className="absolute right-[-40rpx]"
                    onPress={item?.mate?.iconClick}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={item?.value}
              activeOpacity={0.7}
              onPress={() => onChange(item)}
              className="justify-center rounded-[3rpx] border-b-[6rpx] border-c-w"
            >
              <View className="flex flex-row items-center">
                <Text className="font-w5 text-[30rpx] text-c-n6">{item?.label || ''}</Text>
                {item?.mate?.iconName && showIcon && (
                  <Icon
                    name={item?.mate?.iconName}
                    size={item?.mate?.iconSize}
                    color={item?.mate?.iconColor}
                    className="absolute right-[-40rpx]"
                    onPress={item?.mate?.iconClick}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

export default EasySegmented;
