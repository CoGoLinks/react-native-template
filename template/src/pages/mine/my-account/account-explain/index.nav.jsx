import { View, ScrollView, Text, Toast } from '@/components';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import WebConf from '@/config/web';
import { AccountTypeEnum } from '../../common/Config';
import { useAnalytics } from '@/utils/analytics';
/**
 * 提现充值方式说明
 */
function AccountExplain({ navigation, route }) {
  const [accountInfo, setAccountInfo] = useState({});
  const { track } = useAnalytics();

  useEffect(() => {
    const info = route.params?.data || {};
    setAccountInfo(info);
    navigation.setOptions({
      title: info.accountType === AccountTypeEnum.Withdraw ? '提现方式' : '充值方式',
    });
    track.pageShow({
      page_name: info.accountType === AccountTypeEnum.Withdraw ? '提现方式页' : '充值方式页',
    });
  }, [navigation, route.params?.data, track]);

  const handleClick = () => {
    if (Linking.canOpenURL(WebConf.ICTSUrl)) {
      Linking.openURL(WebConf.ICTSUrl);
    } else {
      Toast.info('无法打开链接');
    }
  };

  return (
    <View useSafeArea className="flex-1 ">
      <ScrollView className="flex-1 bg-c-w ">
        <View className="bg-c-w px-[46rpx] py-[32rpx]">
          <View className="flex-row pb-[20rpx]">
            <Text className="font-w5 text-[26rpx] text-[#787B80] min-w-[32rpx]">1、</Text>
            {accountInfo?.accountType === AccountTypeEnum.Withdraw && (
              <Text className="font-w5 text-[26rpx] text-[#787B80] ">请前往商户管理平台提现；</Text>
            )}
            {accountInfo?.accountType === AccountTypeEnum.Change && (
              <Text className="font-w5 text-[26rpx] text-[#787B80] ">请前往商户管理平台充值；</Text>
            )}
          </View>
          <View className="flex-row pb-[8rpx]">
            <Text className="font-w5 text-[26rpx] text-[#787B80] min-w-[32rpx]">2、</Text>
            <Text className="font-w5 text-[26rpx] text-[#787B80] ">
              商户管理平台地址（建议电脑登录）：
            </Text>
          </View>
          <View className="flex-row pb-[20rpx]">
            <Text className="font-w5 text-[26rpx] text-[#787B80] min-w-[32rpx]" />
            <Text onPress={handleClick} className="font-w5 text-[26rpx] text-[#576B95] ">
              {WebConf.ICTSUrl}
            </Text>
          </View>
          <View className="flex-row pb-[20rpx]">
            <Text className="font-w5 text-[26rpx] text-[#787B80] min-w-[32rpx]">3、</Text>
            <Text className="font-w5 text-[26rpx] text-[#787B80] ">
              登陆信息请参考开户时设置的账号密码；
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default {
  name: 'AccountExplain',
  component: AccountExplain,
  options: {
    title: '',
    pageName: false,
  },
};
