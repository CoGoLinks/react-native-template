import React from 'react';
import { View } from '@/components';
import { RewardList } from '../common';
import { prizeList } from '@/services/data';

function StandardsReward() {
  const loadMore = async ({ pageNum }) => {
    return await prizeList({ pageSize: 10, pageNum, returnEnum: 'PHASE' });
  };
  return (
    <View className="flex-1">
      <RewardList route="StandardsReward" loadMore={loadMore} />
    </View>
  );
}

export default {
  name: 'StandardsReward',
  component: StandardsReward,
  options: {
    title: '达标奖励',
  },
};
