import React from 'react';
import { View, Text } from '@/components';

export default function Unbound(props) {
  const { isUnbound = false, size = 'default' } = props;
  return (
    <View
      className={[
        ' bg-c-n2 center rounded-8',
        { ['w-[102rpx] h-[102rpx]']: size === 'default' },
        { ['w-[102rpx] h-[60rpx]']: size === 'small' },
      ]}
      show={isUnbound}
    >
      <Text className="text-c-n7 text-24">已解绑</Text>
    </View>
  );
}
