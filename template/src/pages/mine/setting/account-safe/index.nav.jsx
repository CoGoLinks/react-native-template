import React, { useEffect } from 'react';
import { View, ScrollView, List } from '@/components';

function AccountSafe({ navigation }) {
  useEffect(() => {}, []);

  const accountData = [
    {
      label: '修改密码',
      onPress: () => navigation.push('UpdatePassword'),
    },
  ];

  const cellItemList = [
    {
      label: '修改登录手机号',
      onPress: () => navigation.push('InputIdCardView'),
    },
  ];

  return (
    <View className="flex-1" useSafeArea>
      <ScrollView className="flex-1">
        <View className="mt-[24rpx]" />
        <List data={accountData} labelClassName="text-xl" className="bg-c-w" />
        <List data={cellItemList} labelClassName="text-xl" className="bg-c-w mt-[24rpx]" />
      </ScrollView>
    </View>
  );
}

export default {
  name: 'AccountSafe',
  component: AccountSafe,
  options: { title: '账号与安全' },
};
