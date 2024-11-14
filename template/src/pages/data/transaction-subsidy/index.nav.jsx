import React from 'react';
import { EarningList } from '../common';
import { View, Icon } from '@/components';
import { getSubsidyDetail, getTranInfo } from '@/services/data';
import { useStore } from '@/store';
import { toFixedString } from '@/utils/tools';
import dayjs from 'dayjs';

function TransactionSubsidy({ navigation, route }) {
  const { profitType, range } = route?.params || {};
  const { identity } = useStore('identity');
  const agentId = identity?.agentId;
  const loadMore = async ({ pageNum }) => {
    return await getSubsidyDetail({
      pageNum,
      pageSize: 20,
      profitType,
      range,
    });
  };
  const onPressItem = (item) => {
    getTranInfo({
      profitType,
      tranId: item.tranId,
    }).then((res) => {
      const { errorType, data = {} } = res;
      if (!errorType) {
        const otherParams = (m) => {
          if (data.agentId !== agentId) {
            return {
              extra: <Icon name="arrow" direction="right" size={15} className="ml-10" />,
              onPress: () => {
                navigation.push('AgentDetail', { agentId: data?.agentId });
              },
            };
          }
          return {};
        };
        const tranData = [
          {
            label: '商户姓名',
            value: data?.merName,
          },
          {
            label: '费率',
            value: toFixedString(data?.rate),
          },
          {
            label: '便捷到账费',
            value: data?.mdFee === '+' ? `￥${toFixedString(3)}` : toFixedString(0),
          },
          {
            label: '交易金额',
            value: `￥${toFixedString(item?.tranAmt)}`,
          },
          {
            label: '支付时间',
            value: dayjs(data?.tranTime).format('YYYY-MM-DD HH:mm'),
          },
          {
            label: '归属代理',
            value: data?.agentName,
            ...otherParams(item),
          },
        ];
        navigation.push('TransactionSubsidyDetail', {
          settlementData: [],
          tranData,
          title: '商户交易详情',
          amt: item?.profitAmt,
        });
      }
    });
  };
  return (
    <View className="flex-1">
      <EarningList
        route="TransactionSubsidy"
        loadMore={loadMore}
        onPressItem={onPressItem}
        noDataText="暂无交易补贴收益"
      />
    </View>
  );
}
export default {
  name: 'TransactionSubsidy',
  component: TransactionSubsidy,
  options: {
    title: '交易补贴收益',
  },
};
