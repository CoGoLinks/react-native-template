import { View, ScrollView } from '@/components';
import React, { useCallback, useEffect, useState } from 'react';
import AccountItem from './AccountItem';
import { AccountTypeEnum } from '../../common/Config';
/**
 * 账户详情
 */
function MyAccountDetail({ navigation, route }) {
  const [accountInfo, setAccountInfo] = useState({});

  useEffect(() => {
    setAccountInfo(route.params?.data || {});
    navigation.setOptions({
      title: `${AccountTypeEnum.getLabel(route.params?.data?.accountType)}详情`,
    });
  }, [navigation, route.params?.data]);

  const onAccountDetail = useCallback(() => {
    if (accountInfo?.accountType === '2') {
      navigation.push('AccountRecharge', { data: accountInfo });
      return;
    }
    navigation.push('AccountExplain', {
      data: accountInfo,
    });
  }, [accountInfo, navigation]);

  return (
    <View className="flex-1">
      <View className="flex-1">
        <ScrollView className=" bg-c-w">
          <View className="bg-[#FBF3E5] px-[22rpx] pt-[24rpx]">
            <AccountItem item={accountInfo} onPress={onAccountDetail} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
export default {
  name: 'MyAccountDetail',
  component: MyAccountDetail,
  options: {
    title: '',
    pageName: '账户余额查询详情',
    headerStyle: {
      backgroundColor: '#FBF3E5',
    },
  },
};
