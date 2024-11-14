import React from 'react';
import { View } from '@/components';
import { RewardList } from '../common';
import { prizeList } from '@/services/data';

function ActivateReward() {
  const loadMore = async ({ pageNum }) => {
    return await prizeList({ pageSize: 10, pageNum, returnEnum: 'ONCE' });
  };
  return (
    <View className="flex-1">
      <RewardList route="ActivateReward" loadMore={loadMore} />
    </View>
  );
}

export default {
  name: 'ActivateReward',
  component: ActivateReward,
  options: {
    title: '激活奖励',
  },
};
