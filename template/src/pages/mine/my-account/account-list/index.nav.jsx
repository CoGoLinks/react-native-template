import { View, ScrollView } from '@/components';
import React, { useEffect, useState } from 'react';
import AccountItem from './AccountItem';
import { useAnalytics } from '@/utils/analytics';
import { useStore } from '@/store';

function MyAccountList({ navigation, route }) {
  const [accountList, setAccountList] = useState([]);
  const { track } = useAnalytics();
  const { identity } = useStore('identity');
  const isOrg = identity.org;

  useEffect(() => {
    setAccountList(route?.params.data || []);
    track.pageShow({
      page_name: '我的账户页',
      page_type: isOrg ? '机构' : '代理商',
    });
  }, [route?.params.data, track, isOrg]);
  /**
   * 账户详情
   * @param {*} item
   */
  const onGotoAccountDetail = (item = {}) => {
    navigation.push('MyAccountDetail', { data: item });
  };
  /**
   * 充值提现
   */
  const onButtonAction = (item = {}) => {
    if (item.accountType === '2') {
      navigation.push('AccountRecharge', { data: item });
      return;
    }
    navigation.push('AccountExplain', { data: item });
  };

  const renderItem = ({ item, index }) => {
    return (
      <AccountItem
        key={index}
        item={item}
        onDetailPress={onGotoAccountDetail}
        onButtonPress={onButtonAction}
      />
    );
  };

  return (
    <View className="flex-1">
      <View className="flex-1">
        <ScrollView className="px-[22rpx] pt-[24rpx] bg-c-w">
          {accountList.map((item, index) => renderItem({ item, index }))}
        </ScrollView>
      </View>
    </View>
  );
}

export default {
  name: 'MyAccountList',
  component: MyAccountList,
  options: {
    title: '我的账户',
    pageName: false,
  },
};
