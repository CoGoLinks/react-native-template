import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Icon, Message } from '@/components';
import Device from '@/config/device';
import { useStore } from '@/store';

/**
 * 首页头部
 */
export default (props) => {
  const { identity } = useStore('identity');
  const [showInfo, setShowInfo] = useState({});

  useEffect(() => {
    setShowInfo({
      name: identity.org ? identity.organName : identity.agentName,
    });
  }, [identity]);

  const statusBarHeight = useMemo(() => {
    return Device.getStatusBarHeight();
  }, []);

  return (
    <View className="bg-c-primary">
      <View className={`h-[${statusBarHeight}px]`} />
      <View className="h-[112rpx] row a-center px-[31rpx]">
        <Icon name="policy_avatar" size={70} className="mr-[14rpx]" />
        <Text className="font-w5 text-4xl text-c-w flex-1" numberOfLines={1}>
          Hi, {showInfo.name}
        </Text>
        <Message />
      </View>
    </View>
  );
};
