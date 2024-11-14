import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, Text, Modal, Icon, Image, TouchableOpacity } from '@/components';
import { RefreshControl } from 'react-native';
import Device from '@/config/device';
import { toFixedString } from '@/utils/tools';
import { useFocusEffect } from '@react-navigation/native';
import { RevenueExpenditureEnum } from '@/enums';
import { organDashboardHomeUrl } from '@/services/data';
/**
 * 机构数据看板
 */
function OrgDataBoard({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [detailInfo, setDetailInfo] = useState({});
  const statusBarHeight = useMemo(() => {
    return Device.getStatusBarHeight();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // 使用效果函数时，它不能返回除了用于清理的函数之外的任何东西。
      getData();
    }, []),
  );

  const getData = async () => {
    const { data = {} } = await organDashboardHomeUrl();
    console.log('data ===', data);
    setDetailInfo(data);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  /**
   * 提示
   */
  const onHelpModal = (msg = '', title = '') => {
    const alert = Modal.alert({
      singleButton: true,
      title: title,
      message: msg,
      okText: '我知道了',
      onCancel: () => {
        alert.close();
      },
    });
    console.log('dianji');
  };
  /**
   * T队交易明细
   */
  const onTeaTradeAction = useCallback(() => {
    navigation.push('TeamTradeData');
  }, [navigation]);

  /**
   * T队激活明细
   */
  const onTeamActiveAction = useCallback(() => {
    navigation.push('TeamActiveData');
  }, [navigation]);

  const onGoPage = (currentValue) => {
    navigation.push('RevenueExpenditure', {
      currentValue,
    });
  };
  return (
    <View className="flex-1 ">
      <View
        className={`h-[368rpx] pt-[${statusBarHeight}px]`}
        linearGradient={{
          start: { x: 0.5, y: 0.5 },
          locations: [0, 1],
          colors: ['#FFEFD3', '#FEF5F5'],
        }}
      />
      {/* 头部信息 */}
      <View className={`flex-1 mt-[-368rpx] pt-[${statusBarHeight}px]`}>
        <View className="pl-[44rpx] pt-40">
          <Text className="text-[28rpx] text-c-n8 mb-[14rpx] font-w5">收支账薄</Text>
        </View>
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <View className="flex-1 flex-row justify-between px-[22rpx]">
            {/* 累计收益(元) */}
            <View className="flex-1 bg-[#F8DAA4] rounded-4 mr-[7rpx] px-20 pt-[22rpx] pb-[30rpx] border-t-[6rpx] border-[#D8A64B]">
              <View className="flex-1 flex-row a-center justify-between">
                <TouchableOpacity
                  className="flex-row a-center"
                  onPress={() =>
                    onHelpModal(
                      '累计收益为北京结行共赢有限公司与机构的应结算收益金额，包含机构及T队内所有下级代理商；',
                      '累计收益说明',
                    )
                  }
                >
                  <Text className="text-[26rpx] font-w5 text-[#5F410A] mr-[6rpx]">
                    累计收益(元)
                  </Text>
                  <Icon size={26} name="round-question" color="#5F410A" className="mr-[10rpx]" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onGoPage(RevenueExpenditureEnum.Income)}
                  className="flex-row a-center"
                >
                  <Icon name="right2" color="#845E1B" size={25} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => onGoPage(RevenueExpenditureEnum.Income)}>
                <View className="flex-1 flex-row a-center">
                  <Text className="text-[32rpx] font-w5 text-[#5F410A] pt-[10rpx] ">
                    {toFixedString(detailInfo?.pftAmtAcc)}
                  </Text>
                </View>
                <View className="flex-1 flex-row a-center pt-[44rpx]">
                  <Text className="text-[26rpx] font-w4 text-[#86765d] pr-[16rpx]">本月</Text>
                  <Text className="text-[28rpx] font-w6 text-[#5F410A]">
                    {toFixedString(detailInfo?.pftAmtMonth)}
                  </Text>
                </View>
                <View className="flex-1 flex-row a-center pt-[12rpx]">
                  <Text className="text-[26rpx] font-w4 text-[#86765d] pr-[16rpx]">今日</Text>
                  <Text className="text-[28rpx] font-w6 text-[#5F410A]">
                    {toFixedString(detailInfo?.pftAmtToday)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* 累计支出(元)*/}
            <View className="flex-1 bg-[#F8DAA4] rounded-4 ml-[7rpx] px-20 pt-[22rpx] pb-[30rpx] border-t-[6rpx] border-[#D8A64B]">
              <View className="flex-1 flex-row a-center justify-between">
                <TouchableOpacity
                  className="flex-row a-center"
                  onPress={() =>
                    onHelpModal(
                      '累计支出为T队内所有下级代理商的收益金额，包含机构为下级代理商的补贴金额；',
                      '累计支出说明',
                    )
                  }
                >
                  <Text className="text-[26rpx] font-w5 text-[#5F410A] mr-[6rpx]">
                    累计支出(元)
                  </Text>
                  <Icon size={26} name="round-question" color="#5F410A" className="mr-[10rpx]" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onGoPage(RevenueExpenditureEnum.Expenditure)}
                  className="flex-row a-center"
                >
                  <Icon name="right2" color="#845E1B" size={25} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => onGoPage(RevenueExpenditureEnum.Expenditure)}>
                <View className="flex-1 flex-row a-center">
                  <Text className="text-[32rpx] font-w5 text-[#5F410A] pt-[10rpx] ">
                    {toFixedString(detailInfo?.expenditureAmtAcc)}
                  </Text>
                </View>
                <View className="flex-1 flex-row a-center pt-[44rpx]">
                  <Text className="text-[26rpx] font-w4 text-[#86765d] pr-[16rpx]">本月</Text>
                  <Text className="text-[28rpx] font-w6 text-[#5F410A]">
                    {toFixedString(detailInfo?.expenditureAmtMonth)}
                  </Text>
                </View>
                <View className="flex-1 flex-row a-center pt-[12rpx]">
                  <Text className="text-[26rpx] font-w4 text-[#86765d] pr-[16rpx]">今日</Text>
                  <Text className="text-[28rpx] font-w6 text-[#5F410A]">
                    {toFixedString(detailInfo?.expenditureAmtToday)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={onTeaTradeAction} className="flex-1 px-[22rpx] mt-[42rpx] ">
            <View className="flex-1 px-[20rpx] pb-[14rpx]">
              <Text className="font-w5 text-[28rpx] text-c-n8 ">T队业绩</Text>
            </View>
            <View className="flex-1 bg-c-w px-[20rpx] pt-[22rpx] pb-[30rpx] rounded-8">
              <View className="flex-1 flex-row a-center">
                <View className="flex-1 flex-row a-center">
                  <Image
                    assetName="data.td_trade"
                    resizeMode="contain"
                    className="w-[52rpx] h-[52rpx]"
                  />
                  <Text className="font-w5 text-[28rpx] text-c-n8 pl-[14rpx]">T队交易</Text>
                </View>
                <Icon name="right2" color="#969799" size={30} />
              </View>
              <View className="bg-[#F5F5F5] rounded-8 p-20 mt-[22rpx]">
                <View className="flex-1 flex-row">
                  <View className="flex-1">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">今日(元)</Text>
                    <Text className="font-w6 text-[32rpx] text-[#ED6A0C] pt-[10rpx]">
                      + {toFixedString(detailInfo?.teamAmtToday)}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">本月</Text>
                    <Text className="font-w6 text-[32rpx] text-c-n8 pt-[10rpx]">
                      {toFixedString(detailInfo?.teamAmtMonth)}
                    </Text>
                  </View>
                </View>
                <View className="flex-1 flex-row pt-[24rpx]">
                  <View className="flex-1">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">累计交易</Text>
                    <Text className="font-w6 text-[32rpx] text-c-n8 pt-[10rpx]">
                      {toFixedString(detailInfo?.teamAmtAcc)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onTeamActiveAction} className="flex-1 px-[22rpx] mt-[24rpx]">
            <View className="flex-1 bg-c-w px-[20rpx] pt-[22rpx] pb-[30rpx] rounded-8">
              <View className="flex-1 flex-row a-center">
                <View className="flex-1 flex-row a-center">
                  <Image
                    assetName="data.td_active"
                    resizeMode="contain"
                    className="w-[52rpx] h-[52rpx]"
                  />
                  <Text className="font-w5 text-[28rpx] text-c-n8 pl-[14rpx]">T队激活</Text>
                </View>
                <Icon name="right2" color="#969799" size={30} />
              </View>
              <View className="bg-[#F5F5F5] rounded-8 p-20 mt-[22rpx]">
                <View className="flex-1 flex-row">
                  <View className="flex-1">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">今日(户)</Text>
                    <Text className="font-w6 text-[32rpx] text-[#ED6A0C] pt-[10rpx]">
                      + {detailInfo?.teamActivateToday || '0'}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">本月</Text>
                    <Text className="font-w6 text-[32rpx] text-c-n8 pt-[10rpx]">
                      {detailInfo?.teamActivateMonth || '0'}
                    </Text>
                  </View>
                </View>
                <View className="flex-1 flex-row pt-[24rpx]">
                  <View className="flex-1">
                    <Text className="font-w4 text-[26rpx] text-[#787B80]">累计激活</Text>
                    <Text className="font-w6 text-[32rpx] text-c-n8 pt-[10rpx]">
                      {detailInfo?.teamActivateAcc || '0'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

export default OrgDataBoard;
