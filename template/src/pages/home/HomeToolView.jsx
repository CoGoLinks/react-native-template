import React from 'react';
import { View, Text, TouchableOpacity, Icon, Image } from '@/components';

export default ({
  push,
  title,
  titleColor,
  desc,
  descColor,
  iconColor,
  bgColor,
  bgImage,
  route,
  isOrg,
  className,
}) => {
  return (
    <TouchableOpacity
      className={[
        `row rounded-8 pt-[32rpx] pl-[28rpx] pr-[20rpx] relative h-full bg-[${bgColor}]`,
        {
          'w-[342rpx]': isOrg,
          'flex-1': !isOrg,
          'ml-20': !isOrg,
        },
        className,
      ]}
      onPress={() => push(route)}
    >
      <View className="flex-1">
        <Text className={`text-xl text-[${titleColor}] font-w5`}>{title}</Text>
        <Text className={`text-sm text-[${descColor}] font-w4 mt-[6rpx]`}>{desc}</Text>
      </View>
      <View className="w-4 h-4 rounded-20 center bg-[rgba(255,255,255,0.5)]">
        <Icon name="right2" color={iconColor} size={22} />
      </View>
      {bgImage && bgImage}
    </TouchableOpacity>
  );
};
