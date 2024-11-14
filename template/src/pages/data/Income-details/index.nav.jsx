import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, EasyTabs, ScrollView, List, Image, Icon, Toast } from '@/components';
import { toFixedString } from '@/utils/tools';
import {
  organDashboardProfitMonthTranDetail,
  organDashboardProfitMonthReturnDetail,
  organDashboardExpenditureMonthTranDetail,
  organDashboardExpenditureMonthReturnDetail,
} from '@/services/data';
import { TransactionDetailsConfig, TypePageEnum } from '@/pages/data/common/enums';

import dayjs from 'dayjs';
import { useStore } from '@/store';

const IncomeDetails = ({ route, navigation }) => {
  const { typePage, activeTab = '', month } = route.params || {};
  const { identity } = useStore('identity');
  const agentId = identity?.agentId;
  const [list] = useState(
    (() => {
      if (typePage === TypePageEnum.Level) {
        const arr = TransactionDetailsConfig.getOptions().filter(
          (m) => m.value !== TransactionDetailsConfig.REACH_STD,
        );
        return arr.slice(0, -1);
      } else if (typePage === TypePageEnum.LowerLevel) {
        return TransactionDetailsConfig.getOptions().map((item) => {
          return {
            ...item,
            label: item?.mate?.lowerLevelLabel || item?.label,
          };
        });
      }
    })(),
  );
  const [current, setCurrent] = useState(activeTab || list[0].value);
  // 激活奖励 | 达标奖励
  const booleanFlag = [TransactionDetailsConfig.ACT, TransactionDetailsConfig.REACH_STD].includes(
    current,
  );
  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    if (typePage === TypePageEnum.Level) {
      navigation.setOptions({ title: '收益明细' });
    } else if (typePage === TypePageEnum.LowerLevel) {
      navigation.setOptions({ title: '支出明细' });
    }
  }, [typePage, navigation]);

  useEffect(() => {
    if (typePage === TypePageEnum.Level) {
      if (booleanFlag) {
        requestOrganDashboardProfitMonthReturnDetail();
        return;
      }
      requestOrganDashboardProfitMonthTranDetail();
    } else if (typePage === TypePageEnum.LowerLevel) {
      if (booleanFlag) {
        requestOrganDashboardExpenditureMonthReturnDetail();
        return;
      }
      requestOrganDashboardExpenditureMonthTranDetail();
    }
  }, [
    booleanFlag,
    current,
    typePage,
    requestOrganDashboardProfitMonthTranDetail,
    requestOrganDashboardProfitMonthReturnDetail,
    requestOrganDashboardExpenditureMonthTranDetail,
    requestOrganDashboardExpenditureMonthReturnDetail,
  ]);
  const requestOrganDashboardProfitMonthTranDetail = useCallback(() => {
    Toast.loading('加载中...');
    organDashboardProfitMonthTranDetail({
      profitType: current,
      month,
    })
      .then((res) => {
        const { data, errorType } = res;
        if (!errorType) {
          setCurrentList(data);
        }
      })
      .finally(() => {
        Toast.hide();
      });
  }, [month, current]);
  const requestOrganDashboardProfitMonthReturnDetail = useCallback(() => {
    Toast.loading('加载中...');
    organDashboardProfitMonthReturnDetail({
      month,
    })
      .then((res) => {
        const { data, errorType } = res;
        if (!errorType) {
          setCurrentList(data);
        }
      })
      .finally(() => {
        Toast.hide();
      });
  }, [month]);
  const requestOrganDashboardExpenditureMonthTranDetail = useCallback(() => {
    Toast.loading('加载中...');
    organDashboardExpenditureMonthTranDetail({
      profitType: current,
      month,
    })
      .then((res) => {
        const { data, errorType } = res;
        if (!errorType) {
          setCurrentList(data);
        }
      })
      .finally(() => {
        Toast.hide();
      });
  }, [current, month]);
  const requestOrganDashboardExpenditureMonthReturnDetail = useCallback(() => {
    Toast.loading('加载中...');
    organDashboardExpenditureMonthReturnDetail({
      month,
      actType: current,
    })
      .then((res) => {
        const { data, errorType } = res;
        if (!errorType) {
          setCurrentList(data);
        }
      })
      .finally(() => {
        Toast.hide();
      });
  }, [month, current]);
  const renderItem = (item, index) => {
    const { main = [], list: aList = [] } = RewardListConfig || {};
    const itemData = aList.map(({ label, name, type, other, ...or }) => {
      const value = handleFormat({ value: item?.[name], type });
      return { label, value, other, type, ...or };
    });
    return (
      <View
        key={index}
        className="bg-c-w pl-[36rpx] py-[24rpx] justify-center mt-[24rpx] rounded-8 mx-[22rpx]"
      >
        {main?.map(({ name, type }, index3) => {
          return (
            <View key={name + index3}>
              {type === 'sn' && (
                <View className="a-center row mb-[18rpx]">
                  <Icon name="sn" size="42" className="mr-[6rpx] -mt-[3rpx]" />
                  <Text className="text-base">{item.sn}</Text>
                </View>
              )}
              {type === 'logo' && (
                <View className="row a-center mb-[12rpx]">
                  <Icon name="shang" size="32" className="mr-[8rpx]" />
                  <Text className="text-base font-w5" numberOfLines={1}>
                    {item.inMnoName}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
        {itemData?.map(({ label, type, value, other, noDataRender }, index2) => {
          if (!!noDataRender && (value === null || value === '')) {
            return null;
          }
          return (
            <View row className="mb-[12rpx] a-center" key={label + index2}>
              <Text className="text-sm text-c-n6 w-13">{label}</Text>
              <Text className={['text-sm', { 'text-c-q4 font-w6 text-base': other === 'orange' }]}>
                {type === 'money_plus'
                  ? value > 0
                    ? `+${toFixedString(value)}`
                    : `${toFixedString(value)}`
                  : value}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  // 格式化时间
  const formatTime = (time) => {
    if (!time) {
      return '';
    }
    return dayjs(time).format('MM/DD HH:mm');
  };
  const renderList = () => {
    if (booleanFlag) {
      return (
        <View className="pb-[24rpx]">
          {currentList?.map((item, index) => renderItem(item, index))}
        </View>
      );
    }
    return (
      <View className="p-[24rpx] pt-0">
        <List
          data={currentList?.map((item) => {
            return {
              label: (
                <View className="row justify-start items-center">
                  <Text className="text-sm w-[160rpx] text-c-n8" numberOfLines={1}>
                    {item?.inMnoName}
                  </Text>
                  <Text className="text-sm ml-10">
                    <Text className="font-w4 text-c-n9">{formatTime(item?.tranDate)} </Text>
                    <Text className="font-w6 text-c-n8">{toFixedString(item?.tranAmt)}</Text>
                  </Text>
                </View>
              ),
              extra: (
                <Text className="font-w6 text-c-q4">
                  {item.pftAmt > 0
                    ? `+${toFixedString(item?.pftAmt)}`
                    : `${toFixedString(item?.pftAmt)}`}
                </Text>
              ),
              onPress: () => {
                const otherParams = (m) => {
                  if (m?.profitAgentId !== agentId) {
                    return {
                      extra: <Icon name="arrow" direction="right" size={15} className="ml-10" />,
                      onPress: () => {
                        navigation.push('AgentDetail', { agentId: m?.profitAgentId });
                      },
                    };
                  }
                  return {};
                };
                let pm = [];
                if (current !== TransactionDetailsConfig.LLF) {
                  pm = [
                    {
                      label: '费率',
                      value: toFixedString(item?.feeRate),
                    },
                    {
                      label: '便捷到账费',
                      value: item?.mdFee === '+' ? `￥${toFixedString(3)}` : toFixedString(0),
                    },
                  ];
                }
                const tranData = [
                  {
                    label: '商户姓名',
                    value: item?.inMnoName,
                  },
                  {
                    label: '归属代理',
                    value: item?.belongAgentName,
                  },
                  ...pm,
                  {
                    label: '交易金额',
                    value: `￥${toFixedString(item?.tranAmt)}`,
                  },
                  {
                    label: '支付时间',
                    value: dayjs(item?.tranDate).format('YYYY-MM-DD HH:mm'),
                  },
                  {
                    label: '收益代理',
                    value: item?.profitAgentName,
                    ...otherParams(item),
                  },
                ];
                navigation.push('ProfitDetail', {
                  settlementData: [],
                  tranData,
                  title: '商户交易详情',
                  amt: item?.pftAmt,
                  typePage,
                });
              },
            };
          })}
          itemClassName="h-[118rpx]"
          className="bg-c-w pb-0"
        />
      </View>
    );
  };
  const DataCatchRender = useCallback(() => {
    return (
      <View className="items-center">
        <Image
          assetName="common.empty_order"
          resizeMode="contain"
          className="w-[400rpx] h-[400rpx] mt-[180rpx]"
        />
        <Text className="text-c-n7 text-xl">暂无数据</Text>
      </View>
    );
  }, []);
  return (
    <View className="flex-1">
      <View className="bg-c-w">
        <EasyTabs
          items={list}
          value={current}
          onChange={(item) => {
            setCurrent(item.value);
          }}
        />
        {!booleanFlag && (
          <View className="row justify-between bg-c-n2 py-[12rpx] px-[40rpx]">
            <View className="row">
              <Text className="text-xs text-c-n9 w-[190rpx]">商户</Text>
              <Text className="text-xs text-c-n9">交易时间 | 交易金额</Text>
            </View>
            <Text className="text-xs text-c-n9">
              {typePage === TypePageEnum.Level
                ? '收益金额(元)'
                : typePage === TypePageEnum.LowerLevel
                ? '支出金额(元)'
                : null}
            </Text>
          </View>
        )}
      </View>
      <ScrollView>{currentList?.length > 0 ? renderList() : DataCatchRender()}</ScrollView>
    </View>
  );
};
export default {
  name: 'IncomeDetails',
  component: IncomeDetails,
  options: {
    title: '',
    pageName: false,
  },
};

const RewardListConfig = {
  main: [
    { label: '', name: 'factSn', type: 'sn' },
    { label: '', name: 'merchantName', type: 'logo' },
  ],
  list: [
    { label: '激活活动', name: 'activeName' },
    { label: '激活时间', type: 'time-hh-mm', name: 'activateDate' },
    {
      label: '奖励金额',
      name: 'amt',
      type: 'money_plus',
      other: 'orange',
    },
  ],
};
const handleFormat = ({ value, type, options }) => {
  let result = value;

  if (!value) {
    return result;
  }
  switch (type) {
    case 'time':
      result = dayjs(value).format('YYYY-MM-DD');
      break;
    case 'date':
      result = dayjs(value).format('YYY/MM/DD HH:mm');
      break;
    case 'month':
      result = dayjs(value).format('MM/DD HH:mm');
      break;
    case 'money_w':
      if (value >= 10000) {
        result = (value / 10000).toFixed(2) + '万';
      } else {
        result = toFixedString(value);
      }
      break;
    case 'money':
      result = toFixedString(value);
      break;
    case 'add':
      result = value === '+' ? '3' : value === '-' ? '0' : value;
      break;
    case 'plus':
      if (value > 0) {
        result = '+' + toFixedString(value);
      } else {
        result = toFixedString(value);
      }
      break;
    case 'select':
      result = value ? options[value] : '';
      break;
    case 'pct':
      result = value ? value + '%' : '';
      break;
    case 'time-hh-mm':
      result = dayjs(value).format('YYYY-MM-DD hh:mm');
      break;
    default:
      result = value;
  }
  return result;
};
