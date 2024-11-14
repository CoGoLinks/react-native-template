import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { ImageBackground } from 'react-native';
import {
  View,
  Text,
  EasySegmented,
  Icon,
  ScrollView,
  TouchableOpacity,
  Image,
  Toast,
  DatePicker,
} from '@/components';
import { RevenueExpenditureEnum } from '@/enums';
import { IncomeConfig, ExpenditureConfig, TypePageEnum } from '@/pages/data/common/enums';
import { toFixedString } from '@/utils/tools';
import dayjs from 'dayjs';
import { organDashboardProfitMonthList, organDashboardExpenditureMonthList } from '@/services/data';
const RevenueExpenditure = ({ navigation, route }) => {
  const { currentValue = '' } = route.params || {};
  const [selectSegmented, setSelectedSegmented] = useState(
    currentValue || RevenueExpenditureEnum.Income,
  );
  const [data, setData] = useState([]);
  const [nowDateMap, setNowDateMap] = useState({ month: '', year: '', date: '' });
  const { month = '', year = '', date = '' } = nowDateMap;
  const [pickerVisible, setPickerVisible] = useState(false);
  const ymList = useMemo(() => {
    return data.map((m) => m.month);
  }, [data]);
  console.log('ymList', ymList);
  useEffect(() => {
    if (selectSegmented === RevenueExpenditureEnum.Income) {
      requestOrganDashboardProfitMonthList();
    } else if (selectSegmented === RevenueExpenditureEnum.Expenditure) {
      requestOrganDashboardExpenditureMonthList();
    }
  }, [
    selectSegmented,
    requestOrganDashboardProfitMonthList,
    requestOrganDashboardExpenditureMonthList,
  ]);

  const requestOrganDashboardProfitMonthList = useCallback(() => {
    Toast.loading('加载中...');
    organDashboardProfitMonthList()
      .then((res) => {
        const { data: _data = [], errorType } = res;
        if (!errorType) {
          const [first = {}] = _data;
          const { month: _month = '' } = first;
          setNowDateMapHandle(_month);
          setData(_data);
        }
      })
      .finally(() => {
        Toast.hide();
      });
  }, []);
  const requestOrganDashboardExpenditureMonthList = useCallback(() => {
    Toast.loading('加载中...');
    organDashboardExpenditureMonthList()
      .then((res) => {
        const { data: _data = [], errorType } = res;
        if (!errorType) {
          const [first = {}] = _data;
          const { month: _month = '' } = first;
          setNowDateMapHandle(_month);
          setData(_data);
        }
      })
      .finally(() => {
        Toast.hide();
      });
  }, []);
  const setNowDateMapHandle = (_month) => {
    const nowMonth = _month && dayjs(_month).format('M');
    const nowYear = _month && dayjs(_month).format('YYYY');
    setNowDateMap({
      month: nowMonth,
      year: nowYear,
      date: _month,
    });
  };
  const renderItem = (m, i, month) => {
    const item = IncomeConfig.find((_m) => _m.code === m.profitType);
    const { icon, label } = item || {};
    return (
      <TouchableOpacity
        className="flex-row justify-between h-[116rpx] pl-[38rpx] pr-[52rpx] border-b-1 border-c-n3 bg-c-w"
        onPress={() => {
          navigation.push('IncomeDetails', {
            typePage: TypePageEnum.Level,
            activeTab: m.profitType,
            month,
          });
        }}
        key={`i_${i}`}
      >
        <View className="flex-row items-center">
          <Icon name={icon} size={52} className="mr-[14rpx]" />
          <Text className="text-c-n8 text-[26rpx] mb-[8rpx]">{label}</Text>
        </View>
        <View className="flex-row a-center">
          <Text className="text-c-n8 text-[28rpx] font-w6">￥{toFixedString(m.amt)}</Text>
          <Icon name="right" size="22" className="ml-[12rpx]" />
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem2 = (m, i, month) => {
    const item = ExpenditureConfig.find((_m) => _m.code === m.profitType);
    const { icon, label } = item || {};
    return (
      <TouchableOpacity
        className="flex-row justify-between h-[116rpx] bg-c-w pl-[38rpx] pr-[52rpx] border-b-1 border-c-n3"
        onPress={() => {
          navigation.push('IncomeDetails', {
            typePage: TypePageEnum.LowerLevel,
            activeTab: m.profitType,
            month,
          });
        }}
        key={`i_${i}`}
      >
        <View className="flex-row items-center">
          <Icon name={icon} size={52} className="mr-[14rpx]" />
          <Text className="text-c-n8 text-[26rpx] mb-[8rpx]">{label}</Text>
        </View>
        <View className="flex-row a-center">
          <Text className="text-c-n8 text-[28rpx] font-w6">￥{toFixedString(m.amt)}</Text>
          <Icon name="right" size="22" className="ml-[12rpx]" />
        </View>
      </TouchableOpacity>
    );
  };
  const scrollRef = useRef();
  const offsetHeightList = useRef([0]);
  const setOffsetInfo = (e, index) => {
    const { layout } = e.nativeEvent;
    offsetHeightList.current[index] = layout.y;
  };
  const scrollToTab = (tabId) => {
    scrollRef.current.scrollTo({
      x: 0,
      y: offsetHeightList.current[tabId],
      animated: false,
    });
  };
  const onScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const { y } = contentOffset;
    const currentIndex = offsetHeightList.current.findIndex((height, index) => {
      if (index === 0) {
        return false;
      } // 跳过第一个元素
      return y < height;
    });
    setNowDateMapHandle(data[currentIndex - 1].month);
  };
  const handleMonthChange = (v) => {
    const m = dayjs(v).format('YYYYMM');
    const currentIndex = data.findIndex((_m) => _m.month === m);
    if (currentIndex !== -1) {
      scrollToTab(currentIndex);
      setNowDateMapHandle(m);
    }
  };
  return (
    <View className="flex-1">
      <View className="bg-c-w">
        <EasySegmented
          items={RevenueExpenditureEnum.getOptions()}
          value={selectSegmented}
          onChange={(item) => {
            setSelectedSegmented(item.value);
          }}
        />
      </View>
      {month && year && (
        <View className="h-[94rpx] bg-c-n2 pl-[28rpx] j-center">
          <View className="flex-row items-end">
            <TouchableOpacity className="flex-row items-end" onPress={() => setPickerVisible(true)}>
              <Text className="text-[40rpx] font-w5 text-c-n8">{month}月</Text>
              <Text className="text-xs font-w5 text-c-n8 ml-[8rpx]">/{year}年</Text>
              <Icon name="arrow" direction="bottom" size={24} className="ml-[10rpx] mb-[4rpx]" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View className="flex-1">
        <ScrollView ref={scrollRef} onScroll={onScroll} scrollEventThrottle={16}>
          {data.map((m, i) => (
            <View key={`m_${i}`} onLayout={(e) => setOffsetInfo(e, i)}>
              <View className="w-[706rpx] rounded-8 overflow-hidden ml-[22rpx]">
                <ImageBackground
                  source={require('@/assets/images/data/expenditure_bg.png')}
                  resizeMode="cover"
                >
                  <View className="px-[38rpx] py-[22rpx]">
                    <View className="row a-center">
                      <Text className="text-c-n8 text-[26rpx] mb-[8rpx] font-w5">
                        {dayjs(m.month).format('M')}月总
                        {selectSegmented === RevenueExpenditureEnum.Expenditure
                          ? '支出'
                          : selectSegmented === RevenueExpenditureEnum.Income
                          ? '收益'
                          : null}
                      </Text>
                      {selectSegmented === RevenueExpenditureEnum.Expenditure && i === 0 && (
                        <Text className="text-c-n7 text-[22rpx] mb-[8rpx] ml-10">
                          全部下级所获得的对应收益
                        </Text>
                      )}
                    </View>
                    <Text className="font-w6 text-c-n8 text-2xl">￥{toFixedString(m.pftAmt)}</Text>
                  </View>
                </ImageBackground>
                {selectSegmented === RevenueExpenditureEnum.Income
                  ? m.profitTypeList.map((_m, _i) => renderItem(_m, _i, m.month))
                  : m.profitTypeList.map((_m, _i) => renderItem2(_m, _i, m.month))}
              </View>
              <View className="h-[20rpx] w-[506]" />
            </View>
          ))}
          {data.length === 0 && <DataCatchRender currentValue={currentValue} />}
        </ScrollView>
        <DatePicker
          visible={pickerVisible}
          precision="month"
          value={new Date(dayjs(date))}
          placeholder="请选择日期"
          onOk={(v) => {
            setPickerVisible(false);
            const ym = dayjs(new Date(v)).format('YYYYMM');
            if (!ymList.includes(ym)) {
              if (selectSegmented === RevenueExpenditureEnum.Income) {
                Toast.info('该月无收益');
              } else if (selectSegmented === RevenueExpenditureEnum.Expenditure) {
                Toast.info('该月无支出');
              }
            }
            console.log('ok', ym);
          }}
          minDate={new Date(dayjs('2024-03').format('YYYY-MM'))}
          maxDate={new Date(dayjs().format('YYYY-MM'))}
          onChange={(value) => handleMonthChange(value)}
          onVisibleChange={(isVisible) => setPickerVisible(isVisible)}
        />
      </View>
    </View>
  );
};
export default {
  name: 'RevenueExpenditure',
  component: RevenueExpenditure,
  options: {
    title: '收支账簿',
  },
};
const DataCatchRender = (props) => {
  const { currentValue = '' } = props;
  const text = currentValue === RevenueExpenditureEnum.Income ? '收益' : '支出';
  return (
    <View className="a-center h-4/5">
      <Image assetName="common.empty_order" resizeMode="contain" className="mt-[180rpx]" />
      <Text className="text-xl text-c-n7 top-[-36rpx] pb-100">暂无{text}记录</Text>
    </View>
  );
};
