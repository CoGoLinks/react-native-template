import React from 'react';
import { View, Text, TouchableOpacity } from '@/components';
import { copyString } from '@/utils/copy';
import { tw } from '@/style';

const BankInfo = (props) => {
  const { data = {} } = props;

  return (
    <View
      key={'bank' + Math.random()}
      className="flex-1 bg-c-w ml-[22rpx] mr-[22rpx] rounded-8 pl-[24rpx] pr-[24rpx] pb-[24rpx]"
    >
      <View
        className={`items-center bg-[${tw.color(
          'c-q4',
        )}18] ml-[60rpx] mr-[60rpx] pt-[12rpx] pb-[12rpx] rounded-b-[10rpx]`}
      >
        <Text className="font-w4 text-c-q4 text-[26rpx]">官方收款账户，请向以下账户转账</Text>
      </View>
      <View className="mt-[18rpx] bg-[rgba(245,245,245,0.55)] pt-[32rpx] pb-[32rpx] pl-[24rpx] pr-[24rpx] rounded-4">
        <View className="flex-1 flex-row justify-between">
          <View className="flex-1 flex-row">
            <Text className="font-w4 text-c-n6 text-[24rpx] pr-[20rpx] w-10">户 名</Text>
            <Text className="flex-1 font-w4 text-c-n8 text-[24rpx]">{data?.payeeName || ''}</Text>
          </View>
          <TouchableOpacity
            className={`border-[1rpx] border-[${tw.color('c-mw')}50] items-center justify-center`}
          >
            <Text
              onPress={() => {
                copyString(data?.payeeName);
              }}
              className="font-w4 text-c-mw text-[22rpx] pl-[8rpx] pr-[8rpx] pt-[2rpx] pb-[2rpx] rounded-8"
            >
              复制
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 flex-row justify-between mt-[24rpx]">
          <View className="flex-1 flex-row">
            <Text className="font-w4 text-c-n6 text-[24rpx] pr-[20rpx] w-10">账 号</Text>
            <Text className="flex-1 font-w4 text-c-n8 text-[24rpx]">{data?.payeeCardNo || ''}</Text>
          </View>
          <TouchableOpacity
            className={`border-[1rpx] border-[${tw.color('c-mw')}50] items-center justify-center`}
          >
            <Text
              onPress={() => {
                copyString(data?.payeeCardNo);
              }}
              className="font-w4 text-c-mw text-[22rpx] pl-[8rpx] pr-[8rpx] pt-[2rpx] pb-[2rpx] rounded-8"
            >
              复制
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 flex-row justify-between mt-[24rpx]">
          <View className="flex-1 flex-row">
            <Text className="font-w4 text-c-n6 text-[24rpx] pr-[20rpx] w-10">开户行</Text>
            <Text className="flex-1 font-w4 text-c-n8 text-[24rpx]">{data?.payeeBank || ''}</Text>
          </View>
          <TouchableOpacity
            className={`border-[1rpx] border-[${tw.color('c-mw')}50] items-center justify-center`}
          >
            <Text
              onPress={() => {
                copyString(data?.payeeBank);
              }}
              className="font-w4 text-c-mw text-[22rpx] pl-[8rpx] pr-[8rpx] pt-[2rpx] pb-[2rpx] rounded-8"
            >
              复制
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 pt-[14rpx]">
        <Text className="font-w4 text-[#ABAEB3] text-[22rpx]">注意事项：</Text>
        <Text className="font-w4 text-[#ABAEB3] text-[22rpx] pt-[10rpx]">
          1.必须汇款到此账号，否则不能正常发货;
        </Text>
        <Text className="font-w4 text-[#ABAEB3] text-[22rpx]  pt-[10rpx]">
          2.务必在付款后点击“确认汇款”按钮.
        </Text>
      </View>
    </View>
  );
};
export default BankInfo;
