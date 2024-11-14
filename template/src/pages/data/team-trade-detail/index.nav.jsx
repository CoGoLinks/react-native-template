import { Colors, View, Text, Image, Icon } from '@/components';
import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { toFixedString } from '@/utils/tools';
import Device from '@/config/device';
import dayjs from 'dayjs';
import { useStore } from '@/store';
/**
 *  交易详情
 * @param {k} param0
 * @returns
 */
function TeamTradeDetail({ navigation, route }) {
  const { data = {} } = route?.params || {};
  const { identity } = useStore('identity');
  const agentId = identity?.agentId;
  const isAgentId = agentId !== data.belongAgentId;
  const statusBarHeight = useMemo(() => {
    return Device.getStatusBarHeight();
  }, []);

  return (
    <View className="flex-1">
      <StatusBar translucent={true} backgroundColor="transparent" barStyle="light-content" />
      <View className="flex-1">
        <View className={`h-[${statusBarHeight}px] bg-c-dark`} />
        <View className="bg-c-dark h-18" />
        <View className="mx-[22rpx] mt-[-171rpx] rounded-8 overflow-hidden bg-c-w">
          <View className="px-[36rpx] pt-[28rpx] pb-[20rpx]">
            <View className="row mb-[32rpx]">
              <Text className="text-2xl text-c-n7">商户：</Text>
              <Text className="text-2xl text-c-n8 font-w5">{data?.inMnoName || ''}</Text>
            </View>

            <Text className="text-sm text-[#787B80]">交易成功</Text>
            <Text className="text-[48rpx] text-c-my leading-[58rpx] font-w6">
              {'￥' + toFixedString(data?.tranAmt)}
            </Text>
          </View>
          <Image assetName="data.middle_bar" className="w-[100%] h-[36rpx]" />
          <View className="px-[36rpx] py-[24rpx] rounded-8">
            <Text className="text-sm text-c-n8 font-w5 mb-[22rpx]">交易信息</Text>
            <View className="row mb-[24rpx]">
              <Text className="text-sm text-c-n7 w-[144rpx]">费率</Text>
              <Text className="text-sm text-c-n8 font-w5">{toFixedString(data?.feeRate)}</Text>
            </View>
            <View className="row mb-[24rpx]">
              <Text className="text-sm text-c-n7 w-[144rpx]">便捷到账费</Text>
              <Text className="text-sm text-c-n8 font-w5">
                {data?.mdFee === '+' ? `￥${toFixedString(3)}` : toFixedString(0)}
              </Text>
            </View>
            <View className="row mb-[24rpx]">
              <Text className="text-sm text-c-n7 w-[144rpx]">支付时间</Text>
              <Text className="text-sm text-c-n8 font-w5">
                {(data?.tranDate && dayjs(data.tranDate).format('YYYY-MM-DD HH:MM')) || ''}
              </Text>
            </View>
            {/* <View className="row mb-[24rpx]">
              <Text className="text-sm text-c-n7 w-[144rpx]">交易类型</Text>
              <Text className="text-sm text-c-n8 font-w5">云闪付</Text>
            </View>
            <View className="row mb-[24rpx]">
              <Text className="text-sm text-c-n7 w-[144rpx]">流量费</Text>
              <Text className="text-sm text-c-n8 font-w5">¥3.00</Text>
            </View> */}
            <View className="row mb-[24rpx] a-center">
              <Text className="text-sm text-c-n7 w-[144rpx]">归属代理</Text>
              <Text
                className="text-sm text-c-n8 font-w5"
                onPress={() => {
                  if (isAgentId) {
                    navigation.push('AgentDetail', { agentId: data?.belongAgentId });
                  }
                }}
              >
                {data?.belongAgentName || ''}
              </Text>
              {isAgentId && <Icon name="arrow" direction="right" size={15} className="ml-10" />}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
export default {
  name: 'TeamTradeDetail',
  component: TeamTradeDetail,
  options: {
    title: '交易详情',
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.dark },
  },
};
