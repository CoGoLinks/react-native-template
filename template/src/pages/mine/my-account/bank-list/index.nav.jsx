import React from 'react';
import { View, ScrollView, Text, Image } from '@/components';

function BankList({ navigation, route }) {
  const list = [
    { bank: '兴业银行', public: '00', private: '01' },
    { bank: '邮储银行', public: '01', private: '01' },
    { bank: '北京银行', public: '01', private: '01' },
    { bank: '华夏银行', public: '01', private: '01' },
    { bank: '上海银行', public: '01', private: '00' },
    { bank: '浦发银行', public: '01', private: '00' },
    { bank: '光大银行', public: '01', private: '01' },
    { bank: '建设银行', public: '01', private: '01' },
    { bank: '中国银行', public: '01', private: '00' },
    { bank: '招商银行', public: '01', private: '01' },
    { bank: '平安银行', public: '01', private: '01' },
    { bank: '广发银行', public: '01', private: '01' },
    { bank: '民生银行', public: '01', private: '01' },
    { bank: '中信银行', public: '01', private: '01' },
    { bank: '交通银行', public: '01', private: '01' },
    { bank: '农业银行', public: '01', private: '01' },
    { bank: '工商银行', public: '01', private: '01' },
  ];

  return (
    <View className="bg-[#FFFFFF] h-full">
      <View className="flex flex-row w-full bg-[#F5F5F5] h-[62rpx] items-center justify-between pl-[28rpx] pr-[80rpx]">
        <Text>银行</Text>
        <Text className="ml-[80rpx]">对公</Text>
        <Text>对私</Text>
      </View>
      <ScrollView>
        {list.map((item, index) => {
          return (
            <>
              <View
                key={index}
                className="flex flex-row mt-[20rpx] w-full items-center justify-between pl-[28rpx] pr-[90rpx]"
              >
                <Text className="text-[28rpx]">{item.bank}</Text>
                {item.public === '01' ? (
                  <>
                    <Image
                      assetName="mine.check"
                      resizeMode="contain"
                      className="w-[32rpx] h-[32rpx]"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      assetName="mine.noCheck"
                      resizeMode="contain"
                      className="w-[32rpx] h-[32rpx]"
                    />
                  </>
                )}
                {item.private === '01' ? (
                  <>
                    <Image
                      assetName="mine.check"
                      resizeMode="contain"
                      className="w-[32rpx] h-[32rpx]"
                    />
                  </>
                ) : (
                  <>
                    <Image
                      assetName="mine.noCheck"
                      resizeMode="contain"
                      className="w-[32rpx] h-[32rpx]"
                    />
                  </>
                )}
              </View>
              <View className="w-full h-[2rpx] border-[2rpx] border-solid border-[#E8E9EB] mt-[20rpx]" />
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default {
  name: 'BankList',
  component: BankList,
  options: {
    title: '支持银行列表',
    pageName: false,
  },
};
