import React, { useEffect } from 'react';
import { View, Text } from '@/components';
import { toFixedString, formatMilliseconds } from '@/utils/tools';
import { useCountDown } from 'ahooks';

const OrderInfo = (props) => {
  const { data = {}, onTimeEnd = () => {} } = props;

  // 获取当前时间的时间戳（毫秒）
  const currentTime = new Date().getTime();
  const leftTime = data?.createTime + 60 * 1000 * 20 - currentTime;
  const [countdown] = useCountDown({
    leftTime: leftTime,
    onEnd: () => {
      onTimeEnd();
    },
  });

  useEffect(() => {
    if (leftTime <= 0) {
      onTimeEnd();
    }
  }, [leftTime, onTimeEnd]);

  return (
    <View key={'order' + Math.random()} className="flex-1 bg-c-w flex-col p-30 ">
      <View className="flex-1 items-center">
        <View className="flex-1 items-center">
          <Text className="font-w6 text-c-primary text-[40rpx]">
            ¥
            <Text className="font-w6 text-c-primary text-[60rpx]">
              {toFixedString(data?.payAmount)}
            </Text>
          </Text>
          <Text className="font-w4 text-c-n7 text-[26rpx] pt-[6rpx]">
            订单号：{data?.goodsOrderId || ''}
          </Text>
          <Text className="font-w4 text-c-n7 text-[26rpx] pt-[28rpx]">
            <Text>• </Text>
            <Text className="font-w4 text-c-mr text-[26rpx]">{formatMilliseconds(countdown)}</Text>
            内未完成支付，订单将自动取消
            <Text> •</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
export default OrderInfo;
