import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Icon,
  List,
  Message,
  ScrollView,
  Toast,
} from '@/components';
import { useStore } from '@/store';
import { copyString } from '@/utils/copy';
import {
  getAgentFindWaitSettleForMonthUrl,
  findOrganAccountBalancehUrl,
} from '@/services/withdraw';
import { useFocusEffect } from '@react-navigation/native';
import { toFixedString } from '@/utils/tools';
import { AccountTypeEnum } from './common/Config';

function MinePage({ navigation }) {
  const insets = useSafeAreaInsets();
  const { identity, appSwitch } = useStore('identity', 'appSwitch');
  const [showInfo, setShowInfo] = useState({});
  const [accountInfo, setAccountInfo] = useState({});
  const [accountList, setAccountList] = useState([]);
  const [isEye, setIsEye] = useState(false);
  // 判断是否是机构
  const isOrg = identity.org;
  // 自有户
  const selfBalance = useMemo(() => {
    const accountItem = accountList?.find((item) => item.accountType === AccountTypeEnum.Withdraw);
    return accountItem?.amount;
  }, [accountList]);
  // 营销户
  const saleBalance = useMemo(() => {
    const accountItem = accountList?.find((item) => item.accountType === AccountTypeEnum.Change);
    return accountItem?.amount;
  }, [accountList]);

  useEffect(() => {
    setShowInfo({
      name: isOrg ? identity.organName : identity.agentName,
      code: isOrg ? identity.organId : identity.agentId,
    });
  }, [identity, isOrg]);

  useFocusEffect(
    useCallback(() => {
      if (isOrg) {
        findOrganAccountBalance();
      } else {
        getAgentFindWaitSettleForMonth();
      }
    }, [isOrg]),
  );

  /**
   * 获取代理商账户余额
   */
  const getAgentFindWaitSettleForMonth = async () => {
    try {
      const res = await getAgentFindWaitSettleForMonthUrl();
      const { errorType, message, data = {} } = res || {};
      if (!errorType) {
        setAccountInfo(data);
        console.log('data1 ===', data);
      } else {
        Toast.info(message);
      }
    } catch (error) {
      console.warn('error = ', error);
    }
  };

  /**
   * 获取机构账户余额
   */
  const findOrganAccountBalance = async () => {
    try {
      const res = await findOrganAccountBalancehUrl();
      const { errorType, message, data = [] } = res || {};
      if (!errorType) {
        setAccountList(data?.map((item) => ({ ...item, accountType: `${item.accountType}` })));
        console.log('data2 ===', data);
      } else {
        Toast.info(message);
      }
    } catch (error) {
      console.warn('error = ', error);
    }
  };

  const handleEye = useCallback(() => {
    setIsEye(!isEye);
  }, [isEye]);

  const onOrgAccountAction = useCallback(() => {
    navigation.push('MyAccountList', { data: accountList });
  }, [accountList, navigation]);

  const mineFunList = [
    { label: '我的代理', icon: 'agent', route: 'AgentList', show: !appSwitch.appAuditSwitch },
    { label: '我的商户', icon: 'merchant', route: 'MerchantManage' },
    { label: '设备', icon: 'device', route: 'DeviceStoreView' },
  ];

  const menuListData = useMemo(() => {
    return [
      !isOrg &&
        !appSwitch.appAuditSwitch && {
          label: '我的账户',
          extra: toFixedString(accountInfo.amt),
          extraClassName: 'text-c-n8 font-w6 text-[36rpx]',
          icon: <Icon name="my_account" size={60} className="mr-10" />,
          onPress: () => navigation.push('WithdrawAccount'),
        },
      {
        label: '我的结算卡',
        // extra: '已绑定',
        icon: <Image assetName="mine.list_card" className="h-6 w-6 mr-10" />,
        onPress: () => navigation.push('SettlementCard'),
      },
      {
        label: '我的政策',
        icon: <Image assetName="mine.list_policy" className="h-6 w-6 mr-10" />,
        onPress: () => navigation.push('MyPolicy'),
      },
    ].filter(Boolean);
  }, [accountInfo.amt, appSwitch.appAuditSwitch, isOrg, navigation]);

  const settingListData = [
    {
      label: '设置',
      icon: <Image assetName="mine.list_setting" className="h-6 w-6 mr-10" />,
      onPress: () => {
        navigation.push('Setting');
      },
    },
  ];

  return (
    <View className="flex-1">
      <Image
        assetName="mine.top_view_bg"
        resizeMode="contain"
        className="absolute top-0 left-0 -z-1 w-full h-[368rpx]"
      />
      <ScrollView>
        <View className={`flex-1 pt-[${insets.top}] px-[22rpx]`}>
          <View className="items-end mt-3 mr-[14rpx]">
            <Message iconName="notice2" />
          </View>
          <View className="flex-row items-center h-[148rpx] px-1">
            <Icon name="policy_avatar" size={108} className="mr-[18rpx]" />
            <View>
              <Text className="font-w5 text-4xl text-c-n8" numberOfLines={1}>
                {showInfo.name}
              </Text>
              <TouchableOpacity
                className="row items-center"
                onPress={() => copyString(showInfo.code)}
              >
                <Text className="font-w4 text-base text-c-n6 mr-10">{showInfo.code}</Text>
                <Icon name="copy" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="row justify-between mt-[38rpx] mx-[-10rpx]">
            {mineFunList.map((item, index) => (
              <TouchableOpacity
                key={index}
                show={item.show}
                className="center flex-1 mx-10 h-17 bg-c-w rounded-12"
                onPress={() => navigation.push(item.route)}
              >
                <Icon name={item.icon} size={68} />
                <Text className="mt-[14rpx] text-c-n8 font-w4 text-sm">{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={onOrgAccountAction}>
            <View show={!appSwitch.appAuditSwitch && isOrg} className="pt-[22rpx] ">
              <View className="bg-[rgba(255,255,255,0.95)] rounded-8 pt-[28rpx] pb-[5rpx] pl-[32rpx] pr-[36rpx]">
                <View className="row a-center ">
                  <View className="flex-1 flex-row ">
                    <Icon name="my_account" size={60} />
                    <View className="row items-center pl-[8rpx]">
                      <Text className="text-c-n8 text-[30rpx] pr-[8rpx]">我的账户(元)</Text>
                      <TouchableOpacity onPress={handleEye}>
                        <Icon name={isEye ? 'eye' : 'eye_close'} size={30} color="#333333" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Icon name="right" color="c-n6" size={30} />
                </View>
                <View className="row a-center justify-between bg-[#F5F5F5] mt-[16rpx] rounded-8 p-[18rpx] pl-[68rpx]">
                  <View className="flex-1">
                    <Text className="text-[#787B80] text-xs pr-[8rpx]">自有户余额</Text>
                    <Text className="text-2xl text-c-n8 font-w6 leading-[60rpx]">
                      {isEye ? toFixedString(selfBalance) || 0 : '*****'}
                    </Text>
                  </View>
                  <View className="flex-1 pl-[68rpx] border-l-1 border-[#EEEEEE]">
                    <Text className="text-[#787B80] text-xs pr-[8rpx]">营销户余额</Text>
                    <Text className="text-2xl text-c-n8 font-w6 leading-[60rpx]">
                      {isEye ? toFixedString(saleBalance) : '*****'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <List
            data={menuListData}
            itemClassName="h-11"
            labelClassName="text-xl"
            className={isOrg ? 'bg-c-w ' : 'bg-c-w mt-[28rpx]'}
          />
          <List
            data={settingListData}
            itemClassName="h-11"
            labelClassName="text-xl"
            className="bg-c-w mt-[28rpx]"
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default {
  name: 'Mine',
  component: MinePage,
  options: {
    pageName: 'mine_page',
    tabBarLabel: '我的',
  },
};
