import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Icon, ScrollView, TouchableOpacity, Image, Toast } from '@/components';
import { useStore } from '@/store';
import { toFixedString } from '@/utils/tools';
import HomeHeader from './HomeHeader';
import HomeToolView from './HomeToolView';
import HomeDevice from './HomeDevice';
import { getHomeProfit, getUserInfo } from '@/services/home';
import {
  getAgentFindWaitSettleForMonthUrl,
  getOrganFindWaitSettleForMonthUrl,
} from '@/services/withdraw';
import { ContractTypeStatusEnum, IdentityTypeEnum } from '@/enums';

import { RefreshControl } from 'react-native';
import { appInit, checkAppVersion } from '@/utils/app';
import { useFocusEffect } from '@react-navigation/native';
import { track } from '@/utils/analytics';
import { RoleAuthorityEnum } from '@/enums';

function HomePage({ navigation }) {
  const { push } = navigation;
  const { identity, setIdentity, userInfo, appSwitch, setAppSwitch, setRouteNames } = useStore(
    'identity',
    'setIdentity',
    'userInfo',
    'appSwitch',
    'setAppSwitch',
    'setRouteNames',
  );
  const [isEye, setIsEye] = useState(false);
  const [detail, setDetail] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [balanceAmt, setBalanceAmt] = useState('');

  // 判断是否是机构
  const isOrg = identity.org;
  const isSign = identity?.sign; // 直签
  // 代理商配置
  const agentConfig = identity?.authority === RoleAuthorityEnum.AgentConfig;

  useEffect(() => {
    if (userInfo.userId && identity.ur2AgentId) {
      track.setUserParams(userInfo.userId, {
        agent_identity: identity.identityType,
        agent_date: identity.registTime,
        agent_number: identity.org ? identity.organId : identity.agentId,
        user_state: identity.userSts,
      });
    }
  }, [userInfo, identity]);

  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect isOrg=', isOrg);
      /**
       * 所有页面路由
       */
      const pages = require.context('../../pages', true, /\.nav.jsx/);
      const screens = pages.keys().map((key) => pages(key)?.default || {});
      const routeNames = screens.map((page) => {
        return page.name;
      });
      getUserData();
      setAppSwitch();
      setRouteNames(routeNames);
      if (typeof isOrg === 'boolean') {
        if (isOrg) {
          getOrganFindWaitSettleForMonth();
        } else {
          getAgentFindWaitSettleForMonth();
        }
      }
    }, [getUserData, isOrg, setAppSwitch, setRouteNames]),
  );
  /**
   * 获取代理商账户余额
   */
  const getAgentFindWaitSettleForMonth = async () => {
    try {
      const res = await getAgentFindWaitSettleForMonthUrl();
      const { errorType, message, data = {} } = res || {};
      if (!errorType) {
        const { amt = '' } = data || {};
        setBalanceAmt(amt);
        console.log(amt);
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
  const getOrganFindWaitSettleForMonth = async () => {
    try {
      const res = await getOrganFindWaitSettleForMonthUrl();
      const { errorType, message, data = {} } = res || {};
      if (!errorType) {
        const { totalAmt = '' } = data || {};
        setBalanceAmt(totalAmt);
      } else {
        Toast.info(message);
      }
    } catch (error) {
      console.warn('error = ', error);
    }
  };

  const getUserData = useCallback(async () => {
    const res = await getUserInfo();
    const currentIdentity = res.data[0];
    setIdentity({
      ...currentIdentity,
      org: currentIdentity.identityType === IdentityTypeEnum.Org, // 机构
      agent:
        currentIdentity.identityType === IdentityTypeEnum.Agent &&
        currentIdentity.contractType === ContractTypeStatusEnum.Agent, // 代理商
      sign:
        currentIdentity.identityType === IdentityTypeEnum.Agent &&
        currentIdentity.contractType === ContractTypeStatusEnum.DirectSign, // 直签
    });
    const { data = {} } = await getHomeProfit();
    setDetail(data);
  }, [setIdentity]);

  useEffect(() => {
    appInit();
    checkAppVersion();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      setAppSwitch();
      checkAppVersion();
      await getUserData();
      if (isOrg) {
        getOrganFindWaitSettleForMonth();
      } else {
        getAgentFindWaitSettleForMonth();
      }
    } finally {
      setRefreshing(false);
    }
  };

  const incomeFunList = !appSwitch?.appAuditSwitch
    ? [
        {
          label: '拓展代理',
          icon: 'home.main_fun_expand',
          route: 'ExpandAgents',
          params: {
            source: 'home',
          },
        },
        { label: '我的代理', icon: 'home.main_fun_agent', route: 'AgentList' },
      ]
    : [];

  const mainFunList = [
    {
      label: '设备仓库',
      icon: 'home.main_fun_device',
      route: 'DeviceStoreView',
    },
    {
      label: '激活奖励',
      icon: 'home.main_fun_active',
      route: 'ActivateReward',
    },
    (isOrg || isSign) && {
      label: '发票管理',
      icon: 'home.invoice',
      route: 'InvoiceManager',
    },
    isOrg && {
      label: '代理提现审核',
      icon: 'home.main_fun_withdraw_audit',
      route: 'WithdrawalReview',
    },

    // {
    //   label: '开发票',
    //   icon: 'home.main_fun_invoice',
    //   route: 'InvoiceHelper',
    // },
  ].filter(Boolean);

  const handleEye = useCallback(() => {
    setIsEye(!isEye);
  }, [isEye]);

  const onWithdrawAction = () => {
    // 提现前判断是否可以进入提现
    if (isOrg) {
      // 去结算
      navigation.push('PendingMonthSettlement');
    } else {
      // 去提现
      navigation.push('WithdrawAccount');
    }
  };
  /**
   * 数据看病
   */
  const onNavigateDataAction = () => {
    navigation.navigate('Data');
  };

  return (
    <View className="flex-1 bg-c-n2">
      <HomeHeader navigation={navigation} />
      <View className="bg-c-primary h-[94rpx]" />
      <Image
        assetName="home.top_view_bg"
        className="w-[750rpx] h-[236rpx] mt-[-1] -z-1 left-0 right-0 bg-c-n2"
        resizeMode="cover"
      />
      <ScrollView
        className="mt-[-332rpx]"
        refreshControl={
          <RefreshControl refreshing={refreshing} color="#fff" onRefresh={onRefresh} />
        }
      >
        {/* 头部信息 */}
        <View show={!appSwitch.appAuditSwitch} className="px-[22rpx] pt-[8rpx] pb-[16rpx] mb-20">
          <View className="bg-[rgba(255,255,255,0.95)] rounded-8 p-[18rpx] pt-0">
            <View className="row a-center h-[160rpx] pl-[18rpx] pr-[26rpx]">
              <View className="flex-1 pt-10">
                <View className="row">
                  <Text className="text-c-n8 text-sm pr-[8rpx]">
                    {isOrg ? '待结金额' : '我的账户'}(元)
                  </Text>
                  <TouchableOpacity onPress={handleEye}>
                    <Icon name={isEye ? 'eye' : 'eye_close'} size={40} color="#5F410A" />
                  </TouchableOpacity>
                </View>
                <Text className="text-8xl text-c-n8 font-w6 mt-[4rpx]">
                  {isEye ? toFixedString(balanceAmt) : '*****'}
                </Text>
              </View>
              <TouchableOpacity onPress={onWithdrawAction}>
                <View
                  className="center w-[202rpx] h-[60rpx] rounded-[30rpx]"
                  linearGradient={{
                    start: { x: 0, y: 1 },
                    end: { x: 1, y: 0.5 },
                    locations: [0, 1],
                    colors: ['#EAC37C', '#F6E3B3'],
                  }}
                >
                  <Text className="text-[#5F410A] text-sm">
                    {isOrg ? '去结算' : '去提现'}
                    <Icon name="right" color="#A38349" size={22} />
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={onNavigateDataAction}
              className="row a-center h-[132rpx] p-[18rpx] bg-c-w rounded-4 justify-between"
            >
              <View className="row">
                <View className="w-[348rpx]">
                  <Text className="text-c-n8 text-sm pr-[8rpx]">T队激活</Text>
                  <Text className="text-6xl text-c-n8 font-w6 leading-[60rpx]">
                    {isEye ? detail.teamActive || 0 : '*****'}
                  </Text>
                </View>
                <View>
                  <Text className="text-c-n8 text-sm pr-[8rpx]">T队交易</Text>
                  <Text className="text-6xl text-c-n8 font-w6 leading-[60rpx]">
                    {isEye ? toFixedString(detail.teamTran) : '*****'}
                  </Text>
                </View>
              </View>
              <Icon name="right" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-c-n2">
          {/* 主功能区 */}
          <View className="row mb-20 items-center flex-wrap justify-start">
            {[...incomeFunList, ...mainFunList].map((item, index) => (
              <View key={index} className="center w-1/4 mb-[30rpx]">
                <TouchableOpacity onPress={() => push(item.route, item.params)}>
                  <Image
                    assetName={item.icon}
                    color="#fff"
                    className="w-[96rpx] h-[96rpx] mb-[14rpx]"
                  />
                </TouchableOpacity>
                <Text className="text-c-text text-sm font-w4">{item.label}</Text>
              </View>
            ))}
          </View>
          <View>
            <Text className="m-[20rpx] my-[12rpx] text-base font-w5 text-c-n8 leading-[48rpx]">
              管理工具
            </Text>
            <View className="px-[22rpx]">
              <View className="row justify-between h-[168rpx] mb-[20rpx]">
                {/* 客户管理 */}
                <HomeToolView
                  push={push}
                  title="商户管理"
                  titleColor="#5C2F04"
                  desc="查询商户"
                  descColor="rgba(131,69,9,0.7)"
                  iconColor="#824517"
                  bgColor="#F8ECE3"
                  bgImage={
                    <Image
                      assetName="home.org_merchant_bg"
                      className="w-[150rpx] h-[168rpx] absolute top-0 right-0 -z-1"
                    />
                  }
                  route="MerchantManage"
                  isOrg={isOrg}
                  className={'ml-0'}
                />
                {/* 政策管理 */}
                {(isOrg || agentConfig) && (
                  <HomeToolView
                    push={push}
                    title="政策管理"
                    titleColor="#1E2B4F"
                    desc="查询、配置政策"
                    descColor="rgba(30,43,79,0.7)"
                    iconColor="#1d2d4d"
                    bgColor="#E5E9F5"
                    bgImage={
                      <Image
                        assetName="home.org_policy_bg"
                        className="w-[126rpx] h-full absolute top-0 right-0 -z-1"
                      />
                    }
                    route="PolicyManage"
                  />
                )}
              </View>
              {/* 设备管理 */}
              <View className="row">
                <HomeDevice push={push} isOrg={isOrg} navigation={navigation} />
              </View>
            </View>
          </View>
          <View className="a-center">
            <Image assetName="home.bottom_bg" className="w-[206rpx] h-6 mt-[142rpx] mb-[160rpx]" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default {
  name: 'Home',
  component: HomePage,
  options: {
    pageName: 'first_page',
    tabBarLabel: '首页',
  },
};
