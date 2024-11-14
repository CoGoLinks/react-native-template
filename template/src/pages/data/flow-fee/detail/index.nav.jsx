import React from 'react';
import { Colors, View, Text, Image } from '@/components';
import { toFixedString } from '@/utils/tools';

function FlowFeeEarningDetail({ route }) {
  const { settlementData, tranData, amt, title: newTitle } = route?.params || {};
  const onPress = (m) => {
    if (m?.onPress) {
      return {
        onPress: () => m.onPress(m),
      };
    }
    return {};
  };
  return (
    <View classNamel="flex-1">
      <View className="bg-c-dark h-18" />
      <View className="mx-[22rpx] mt-[-164rpx] rounded-8 overflow-hidden bg-c-w ">
        <View className="px-[36rpx] pt-[56rpx] pb-[20rpx] flex justify-center items-center">
          <Text className="text-sm text-[#787B80] mb-[10rpx]">总收益金额</Text>
          <Text className="text-[48rpx] text-c-q4 leading-[58rpx] font-w6">
            ￥{toFixedString(amt)}
          </Text>
        </View>
        {settlementData && settlementData.length > 0 && (
          <View className="px-[20rpx] pt-[48rpx] pb-[32rpx]">
            <View className="px-[34rpx] py-[34rpx] bg-c-n2 rounded-8">
              <Text className="text-base text-c-n8 font-w5">结算到账户</Text>
              <View className="rounded-8 mt-[26rpx]">
                {[
                  {
                    value: '结算至账户',
                    title: '结算金额',
                  },
                  ...settlementData,
                ]?.map((item, index) => {
                  const { title, label, value } = item;
                  if (title) {
                    return (
                      <View className="row mb-[24rpx]" key={index}>
                        <Text className="text-base text-c-n9 w-[244rpx]">{title}</Text>
                        <Text className="text-sm text-c-n9 font-w5">{value}</Text>
                      </View>
                    );
                  }
                  if (!label) {
                    return null;
                  }
                  return (
                    <View className="row mb-[24rpx]" key={index}>
                      <Text className="text-base text-c-n8 w-[244rpx] font-w6">{label}</Text>
                      <Text className="text-sm text-c-n8 font-w5">{value}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        <Image assetName="data.middle_bar" className="w-[100%] h-[36rpx]" />
        <View className="px-[20rpx]">
          <View className="px-[34rpx] py-[34rpx] bg-c-w rounded-8">
            <Text className="text-base text-c-n8 font-w5">{newTitle}</Text>
            <View className="rounded-8 mt-[26rpx]">
              {tranData?.map((item, index) => {
                const { title, label, value } = item;
                if (title) {
                  return (
                    <Text className="text-sm text-c-n8 font-w5 mb-[22rpx]" key={index}>
                      {title}
                    </Text>
                  );
                }
                if (!label) {
                  return null;
                }
                return (
                  <View className="row mb-[24rpx] a-center" key={index}>
                    <Text className="text-sm text-c-n7 w-[144rpx]">{label}</Text>
                    <Text className="text-sm text-c-n8 font-w5" {...onPress(item)}>
                      {value}
                    </Text>
                    {typeof item.extra === 'function' ? (
                      item.extra()
                    ) : typeof item.extra === 'string' ? (
                      <View>{item.extra}</View>
                    ) : (
                      item.extra
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
export default {
  name: 'FlowFeeEarningDetail',
  component: FlowFeeEarningDetail,
  options: {
    title: '收益详情',
    headerTintColor: '#fff',
    headerStyle: { backgroundColor: Colors.dark },
  },
};
