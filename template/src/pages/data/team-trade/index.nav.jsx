import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Icon, DatePicker, Image, ScrollView } from '@/components';
import dayjs from 'dayjs';
import { RefreshControl } from 'react-native';
import { toFixedString } from '@/utils/tools';
import { organDashboardTeamTranDetailUrl } from '@/services/data';
/**
 * T队交易明细
 * @param {*} param0
 * @returns
 */
const TeamTradeData = ({ navigation }) => {
  const [selectMonth, setSelectMonth] = useState(dayjs().format('YYYY-MM'));

  const [refreshing, setRefreshing] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [activtList, setActivtList] = useState([]);

  const totalAmount = useMemo(() => {
    const total = activtList.reduce((amount, item) => {
      return amount + item.tranAmt;
    }, 0);
    return '￥' + toFixedString(total);
  }, [activtList]);

  // 修改筛选象刷新列表 刷新激活数量
  useEffect(() => {
    requestDataAction();
  }, [requestDataAction, selectMonth]);
  // 刷新列表
  const requestDataAction = useCallback(async () => {
    setRefreshing(true);
    const { data } = await organDashboardTeamTranDetailUrl({
      month: dayjs(selectMonth).format('YYYYMM'),
    });
    setActivtList(data || []);
    setRefreshing(false);
  }, [selectMonth]);
  /**
   * 日期选择
   */
  const handleMonthChange = useCallback((value) => {
    setSelectMonth(dayjs(value).format('YYYY-MM'));
  }, []);

  const onPressItem = (item) => {
    navigation.push('TeamTradeDetail', {
      data: item,
    });
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)} className="bg-c-w">
        <View className="row justify-between bg-c-w py-[40rpx] px-[22rpx] border-b-1 border-[#EBEDF0]">
          <View className="flex-1">
            <Text className="text-[26rpx] text-c-n8">{item?.inMnoName || ''}</Text>
          </View>
          <View className="flex-2 flex-row justify-center">
            <Text className="flex-1 text-right text-[26rpx] text-[#787B80] pr-[14rpx]">
              {(item?.tranDate && dayjs(item.tranDate).format('MM-DD HH:MM')) || ''}
            </Text>
            <Text className="flex-1 font-w6 text-[26rpx] text-c-n8">
              {toFixedString(item.tranAmt)}
            </Text>
          </View>
          <View className="flex-1 flex-row justify-end items-center ">
            <Text className="text-xs text-c-n8 pl-[10rpx]">{item?.belongAgentName || ''}</Text>
            <Icon name="right2" color="#969799" size={26} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <View className="flex-row px-[22rpx] items-center bg-c-w">
        <TouchableOpacity
          onPress={() => {
            setPickerVisible(true);
          }}
          className="flex-1 px-[22rpx]"
        >
          <View className="flex-row items-center pt-[12rpx] pb-[10rpx]">
            <Text className="text-[26rpx] font-w4 text-c-n8 ">
              {dayjs(selectMonth).format('YYYY年MM月')}
            </Text>
            <Icon name="arrow" direction="bottom" size={20} className="ml-10 mt-[4rpx]" />
          </View>
          <View className="pb-[18rpx]">
            <Text className="text-[26rpx] font-w4 text-[#646566] ">T队总交易额 {totalAmount}</Text>
          </View>
          <DatePicker
            visible={pickerVisible}
            precision="month"
            value={dayjs(selectMonth) || undefined}
            onChange={(value) => handleMonthChange(value)}
            placeholder="请选择日期"
            onOk={() => setPickerVisible(false)}
            onVisibleChange={(visible) => setPickerVisible(visible)}
          />
        </TouchableOpacity>
      </View>
      <View className="bg-c-w">
        <View className="row justify-between bg-c-n2 py-[12rpx] px-[44rpx]">
          <View className="flex-1">
            <Text className="text-xs text-c-n9">商户</Text>
          </View>
          <View className="flex-2 flex-row justify-center">
            <Text className="text-xs text-c-n9">交易时间</Text>
            <Text className="text-xs text-c-n9"> | </Text>
            <Text className="text-xs text-c-n9">交易金额</Text>
          </View>
          <View className="flex-1 justify-end items-end">
            <Text className="text-xs text-c-n9">归属代理</Text>
          </View>
        </View>
      </View>
      <View className="flex-1 mx-[22rpx] rounded-8 overflow-hidden">
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={requestDataAction} />}
        >
          {activtList && activtList.length > 0 ? (
            activtList.map((item, index) => {
              return renderItem(item, index);
            })
          ) : (
            <DataEmptyRender />
          )}
        </ScrollView>
      </View>
    </View>
  );
};
const DataEmptyRender = () => {
  return (
    <View className="items-center">
      <Image
        assetName="common.empty_merchant"
        resizeMode="contain"
        className="w-[400rpx] h-[400rpx] mt-[180rpx]"
      />
      <Text className="text-c-n7 text-xl">暂无数据</Text>
    </View>
  );
};
export default {
  name: 'TeamTradeData',
  component: TeamTradeData,
  options: {
    title: 'T队交易明细',
  },
};
