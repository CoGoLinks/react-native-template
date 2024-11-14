import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { View, Text, Toast, TouchableOpacity, Icon, Modal, Image } from '@/components';
import { copyString } from '@/utils/copy';
import { useStore } from '@/store';
import WebConf from '@/config/web';

function AccountRecharge({ navigation, route }) {
  const { identity } = useStore('identity');
  const isOrg = identity.org;
  const [visible, setVisible] = useState(false);
  const [showInfo, setShowInfo] = useState({});

  useEffect(() => {
    setShowInfo({
      name: isOrg ? identity.organName : identity.agentName,
      code: isOrg ? identity.organId : identity.agentId,
    });
  }, [identity, isOrg]);

  const handleClick = () => {
    if (Linking.canOpenURL(WebConf.ICTSUrl)) {
      Linking.openURL(WebConf.ICTSUrl);
    } else {
      Toast.info('无法打开链接');
    }
  };

  return (
    <View className="flex flex-col bg-[#F5F5F5] items-center">
      <View className="w-[90%] bg-[#fff] mt-[20rpx] mx-[11rpx] rounded-8">
        <View className="flex flex-row justify-between text-[28rpx] mt-[38rpx] mx-[30rpx]">
          <Text>充值账户</Text>
          <Text className="font-w5">营销户</Text>
        </View>
        <View className="flex flex-row justify-between text-[28rpx] mt-[28rpx] mx-[30rpx]">
          <Text>充值方式</Text>
          <Text className="font-w5">银行转账</Text>
        </View>
        <Text className="text-[26rpx] mt-[28rpx] mx-[30rpx]">充值账户信息</Text>
        <View className="bg-[rgba(245,245,245,0.55)] mt-[16rpx] mx-[24rpx] px-[20rpx] pt-[32rpx] text-[24rpx] rounded-8">
          <View className="flex flex-row justify-between">
            <Text className="text-[#969799]">账户名称</Text>
            <View className="flex flex-row items-center">
              <Text className="text-[#323233]">{showInfo?.name || ''}</Text>
              <TouchableOpacity
                className="opacity-50"
                onPress={() => {
                  copyString(showInfo?.name || '');
                }}
              >
                <Text className="border-[2rpx] border-solid border-[#576B95] ml-[12rpx] text-[#576B95] text-[22rpx] rounded-4">
                  复制
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-[24rpx]">
            <Text className="text-[#969799]">账户号码</Text>
            <View className="flex flex-row justify-between">
              <Text className="text-[#323233]">{route?.params?.data?.chargeAccount || ''}</Text>
              <TouchableOpacity
                className="opacity-50"
                onPress={() => {
                  copyString(route?.params?.data?.chargeAccount || '');
                }}
              >
                <Text className="border-[2rpx] border-solid border-[#576B95] ml-[12rpx] text-[#576B95] text-[22rpx] rounded-4">
                  复制
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-[24rpx]">
            <Text className="text-[#969799]">收款银行</Text>
            <View className="flex flex-row justify-between">
              <Text className="text-[#323233]">支付机构备付金集中存管账户</Text>
              <TouchableOpacity
                className="opacity-50"
                onPress={() => {
                  copyString('支付机构备付金集中存管账户');
                }}
              >
                <Text className="border-[2rpx] border-solid border-[#576B95] ml-[12rpx] text-[#576B95] text-[22rpx] rounded-4">
                  复制
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-[24rpx]">
            <Text className="text-[#969799]">收款银行网点</Text>
            <View className="flex flex-row">
              <Text className="text-[#323233]">随行付-备用金账户</Text>
              <TouchableOpacity
                className="opacity-50"
                onPress={() => {
                  copyString('随行付-备用金账户');
                }}
              >
                <Text className="border-[2rpx] border-solid border-[#576B95] ml-[12rpx] text-[#576B95] text-[22rpx] rounded-4">
                  复制
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-[24rpx]">
            <Text className="text-[#969799]">收款银行地区</Text>
            <View className="flex flex-row">
              <Text className="text-[#323233]">北京</Text>
              <TouchableOpacity
                className="opacity-50"
                onPress={() => {
                  copyString('北京');
                }}
              >
                <Text className="border-[2rpx] border-solid border-[#576B95] ml-[12rpx] text-[#576B95] text-[22rpx] rounded-4">
                  复制
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row justify-between mt-[24rpx]">
            <Text className="text-[#969799]">联行账号</Text>
            <View className="flex flex-row">
              <Text className="text-[#323233]">9911 0000 1171</Text>
              <TouchableOpacity
                className="opacity-50"
                onPress={() => {
                  copyString('9911 0000 1171');
                }}
              >
                <Text className="border-[2rpx] border-solid border-[#576B95] ml-[12rpx] text-[#576B95] text-[22rpx] rounded-4">
                  复制
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              copyString(
                `${showInfo?.name || ''}\r\n${
                  route?.params?.data?.chargeAccount || ''
                }\r\n支付机构备付金集中存管账户\r\n随行付-备用金账户\r\n北京\r\n9911 0000 1171`,
              );
            }}
          >
            <Text
              className="
                text-center
                w-[160rpx]
                h-[40rpx]
                bg-[#F5F5F5]
                rounded-[20rpx]
                border-[2rpx]
                border-solid
                border-[#E8E9EB]
                mx-[auto]
                text-[26rpx]
                text-[#576B95]
                overflow-hidden
                leading-[40rpx]
                my-[20rpx]
                "
            >
              复制全部
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-[rgba(245,245,245,0.55)] text-[26px] flex my-[20rpx] flex-row justify-around items-center border-[2rpx] border-solid border-[#E8E9EB] mx-[24rpx] px-[20rpx] h-[66rpx] rounded-4">
          <TouchableOpacity
            className="flex flex-row items-center"
            onPress={() => {
              navigation.push('BankList');
            }}
          >
            <Text className="text-[#646566]">转账支持银行</Text>
            <Icon name="right" size={20} />
          </TouchableOpacity>
          <Text>|</Text>
          <TouchableOpacity className="flex flex-row items-center" onPress={() => setVisible(true)}>
            <Text className="text-[#646566]">填写示例</Text>
            <Icon name="right" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-[60rpx] mx-[46rpx]">
        <View className="flex flex-row items-center">
          <Icon size={36} name="tips" color="#323233" className="mr-[10rpx]" />
          <Text className="font-w5 text-[#323233] text-[26rpx]">温馨提示</Text>
        </View>
        <Text className="text-[#787B80] mt-[18rpx]">1、请使用同名银行账户完成转账充值;</Text>
        <Text className="text-[#787B80] mt-[10rpx]">
          2、在以下时间段转账会被银行侧拒绝或延迟到账;
        </Text>
        <Text className="text-[#787B80] mt-[10rpx]">
          （1）工作日：<Text className="underline text-[#787B80]">17:15-20:30</Text>
        </Text>
        <Text className="text-[#787B80] mt-[10rpx]">
          （2）非工作日：假期开始
          <Text className="underline text-[#787B80]">前一天的17:15</Text>
          至假期
          <Text className="underline text-[#787B80]">最后一天的20:30</Text>;
        </Text>
        <Text className="text-[#787B80] mt-[10rpx]">3、更多充值相关可登录：</Text>
        <Text onPress={handleClick} className="text-[#576B95] mt-[10rpx]">
          {WebConf.ICTSUrl}
        </Text>
        <Text className="text-[#787B80] mt-[10rpx]">（登录信息请参考开户时设置的账号密码）</Text>
      </View>
      <Modal
        visible={visible}
        position="center"
        // maskClosable={true}
        onClose={() => setVisible(false)}
      >
        <View className="bg-c-w">
          <Image
            assetName="mine.exampleImg"
            resizeMode="contain"
            className="w-[538rpx] h-[1178rpx]"
          />
        </View>
      </Modal>
    </View>
  );
}

export default {
  name: 'AccountRecharge',
  component: AccountRecharge,
  options: {
    title: '银行转账充值',
    pageName: false,
  },
};
