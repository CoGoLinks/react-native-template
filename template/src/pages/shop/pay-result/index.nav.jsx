import React, { useCallback } from 'react';
import { View, Text, Button, ScrollView, Icon } from '@/components';

/**
 * Pay支付结果
 */
function PayResultView(props) {
  const { route } = props;
  const { order = {} } = route?.params || {};

  const onSubmit = useCallback(() => {
    props.navigation.replace('OrderDetailView', {
      goodsOrderId: order?.goodsOrderId || '',
    });
  }, [order?.goodsOrderId, props.navigation]);
  return (
    <View useSafeArea className="flex-1 ">
      <ScrollView className="flex-1 bg-c-w mt-[16rpx]">
        <View className="flex-1 items-center  pt-[64rpx] pr-[24rpx] pb-[24rpx] pl-[24rpx]">
          <Icon name="checked" size={130} color="rgba(21, 92, 255, 1)" />
          <Text className="font-w5 text-[36rpx] text-c-n8 pt-[40rpx]">提交成功</Text>
          <Text className="font-w4 text-[26rpx] text-c-n7 pt-[6rpx]">
            订单号：{order?.goodsOrderId || ''}
          </Text>
          <Text className="font-w4 text-[26rpx] text-c-n8 pt-[38rpx]">
            1-2个工作日内完成订单审核，请耐心等待
          </Text>
        </View>
        <View className="bg-c-w  pt-[94rpx] pl-[32rpx] pr-[32rpx] pb-[12rpx]">
          <Button onPress={onSubmit} size="xl" className="bg-c-dark">
            查看订单
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

export default {
  name: 'PayResultView',
  component: PayResultView,
  options: {
    title: '',
    pageName: '订单支付成功页',
  },
};
