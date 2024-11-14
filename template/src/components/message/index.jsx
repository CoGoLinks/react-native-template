import React, { useEffect } from 'react';
import { View, Text, Icon, TouchableOpacity } from '@/components';
import { useStore } from '@/store';
import { navigation } from '@/navigation';

export default function MessageTip(props) {
  const { onPress, iconName = 'notice', size = 60 } = props;
  const { unReadCount, setUnReadCount } = useStore('unReadCount', 'setUnReadCount');

  useEffect(() => {
    setUnReadCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickMessage = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.push('MessageCenter');
    }
  };

  return (
    <TouchableOpacity onPress={onClickMessage}>
      <Icon name={iconName} size={size} />
      <View
        className="absolute min-w-[65rpx] a-center rounded-16 bg-c-mr border-[2rpx] border-c-w left-[26rpx] bottom-[36rpx] px-[8rpx]"
        show={!!unReadCount.sumUnreadCount}
      >
        <Text className="text-center text-24 leading-[28rpx] text-c-w">
          {unReadCount.sumUnreadCount > 99 ? '99+' : unReadCount.sumUnreadCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
