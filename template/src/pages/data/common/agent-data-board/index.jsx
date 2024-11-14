import React, { useCallback, useState } from 'react';
import { View, Text, Icon, ScrollView, TouchableOpacity, Image } from '@/components';
import Device from '@/config/device';
import { getProfitList } from '@/services/data';
import { DataPageConfig } from '../enums';
import { toFixedString } from '@/utils/tools';
import { useStore } from '@/store';
import { RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * 代理数据看板
 * @param {*} param
 * @returns
 */
function AgentDataBoard({ navigation }) {
  const { identity, appSwitch } = useStore('identity', 'appSwitch');
  const isOrg = identity?.org;
  const statusBarHeight = Device.getStatusBarHeight();
  const [detail, setDetail] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [isEye, setIsEye] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // 使用效果函数时，它不能返回除了用于清理的函数之外的任何东西。
      getData();
    }, []),
  );
  const handleEye = useCallback(() => {
    setIsEye(!isEye);
  }, [isEye]);

  const getData = async () => {
    const { data = {} } = await getProfitList();
    console.log('data ===', data);
    setDetail(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const { data = {} } = await getProfitList();
      setDetail(data);
    } finally {
      setRefreshing(false);
    }
  };

  const handleData = (key, name) => {
    const value = toFixedString(detail.profitListData?.[key]?.[name]);
    return value ? '￥' + value : '';
  };

  const renderItem = (item, index, key) => {
    const { label, name, routeName, params, icon } = item;
    const money = handleData(key, name);
    const disabled = key === 1 && !isOrg;
    return (
      <TouchableOpacity
        onPress={() => navigation.push(routeName, params)}
        className={[
          'row py-[38rpx] pl-[38rpx] pr-[44rpx]',
          { 'border-t-1 border-c-n4 ': index > 0 },
        ]}
        key={index}
        disabled={disabled}
      >
        <View className="flex-1 row a-center">
          <Icon name={icon} size={52} />
          <Text className="ml-[14rpx] text-base font-w5">{label}</Text>
        </View>
        <View className="row a-center">
          <Text className="mr-[18rpx] text-base font-w6">{isEye ? money : '*****'}</Text>
          <Icon name="right" size={20} show={!disabled} />
          <View className="w-2" show={disabled} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <View
        className={`h-[368rpx] pt-[${statusBarHeight}px]`}
        linearGradient={{
          start: { x: 0.5, y: 0.5 },
          locations: [0, 1],
          colors: ['#FFEFD3', '#FEF5F5'],
        }}
      >
        <Image
          assetName="data.data_bg"
          className="w-[164rpx] h-22 absolute bottom-[40rpx] right-0"
        />
      </View>
      {/* 头部信息 */}
      <View className={`flex-1 mt-[-368rpx] pt-[${statusBarHeight}px]`}>
        <View show={!appSwitch?.appAuditSwitch} className="pl-[54rpx] pt-40 h-[160rpx]">
          <View className=" flex-row a-center">
            <Text className="text-base text-[#5F410A] mb-[6rpx] pr-[8rpx]">累计收益</Text>
            <TouchableOpacity onPress={handleEye}>
              <Icon name={isEye ? 'eye' : 'eye_close'} size={35} color="#5F410A" />
            </TouchableOpacity>
          </View>
          <Text className="text-[56rpx] font-w6 text-[#5F410A] mb-[26rpx]">
            {isEye && <Text className="text-6xl font-w6 text-[#5F410A]">￥</Text>}
            {isEye ? toFixedString(detail.totalProfit) : '*****'}
          </Text>
        </View>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View show={!appSwitch?.appAuditSwitch} className="flex-1 px-[22rpx] mb-[24rpx]">
            <View className="flex-1 bg-c-w px-[20rpx] pt-[22rpx] pb-[30rpx] rounded-8">
              <View className="flex-1 flex-row a-center pb-[20rpx]">
                <Text className="font-w5 text-[28rpx] text-c-n8 pl-[14rpx]">业绩</Text>
              </View>
              <View className="rounded-8 px-20 pt-10">
                <View className="flex-1 flex-row pb-[20rpx] ">
                  <View className="flex-1">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">T队累计交易(元)</Text>
                    <Text className="font-w6 text-[32rpx] text-c-n8 pt-[8rpx]">
                      {isEye ? toFixedString(detail?.teamTran) : '*****'}
                    </Text>
                  </View>
                  <View className="flex-1 border-l-2 border-[#EBEDF0] pl-[28rpx]">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">T队累计激活(户)</Text>
                    <Text className="font-w6 text-[28rpx] text-c-n8 pt-[8rpx]">
                      {isEye ? detail?.teamActive || '0' : '*****'}
                    </Text>
                  </View>
                </View>
                <View className="flex-1 flex-row pt-[20rpx] border-t-2 border-[#EBEDF0] ">
                  <View className="flex-1">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">直营累计交易</Text>
                    <Text className="font-w6 text-[32rpx] text-c-n8 pt-[8rpx]">
                      {isEye ? `${toFixedString(detail?.directTran)}` : '*****'}
                    </Text>
                  </View>
                  <View className="flex-1 border-l-2 border-[#EBEDF0] pl-[28rpx]">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">直营累计激活</Text>
                    <Text className="font-w6 text-[32rpx] text-c-n8 pt-[8rpx]">
                      {isEye ? detail?.directActive || '0' : '*****'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {!appSwitch.appAuditSwitch
            ? DataPageConfig.map((item, index) => (
                <View key={index} className="bg-c-w mb-[24rpx] rounded-8 mx-[22rpx] pt-[44rpx]">
                  <View className="mb-10 pl-[38rpx]">
                    <Text className="text-[28rpx] font-w5 text-c-n8 ">{item.title}</Text>
                    {/* <View className="border-[9rpx] w-[138rpx] border-[#E4B36B] opacity-40 mt-[-18rpx] -z-20" /> */}
                  </View>
                  {item?.list?.map((e, i) => renderItem(e, i, index))}
                </View>
              ))
            : null}
          <View show={appSwitch.appAuditSwitch} className="center mt-[380rpx]">
            <Image assetName="common.empty_merchant" className="w-20" />
            <Text className="text-c-n6">暂无数据</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default AgentDataBoard;
