import React from 'react';
import { InfiniteScroll, View, Text } from '@/components';

function InfiniteScrollPage() {
  const loadMore = async ({ pageNum }) => {
    console.log('当前查询页数', pageNum);
    return {
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      total: 100,
    };
  };

  const renderItem = ({ item }) => {
    return (
      <View className="h-16 m-20 border border-c-primary">
        <Text>{item}</Text>
      </View>
    );
  };

  return <InfiniteScroll loadMore={loadMore} renderItem={renderItem} />;
}

export default {
  name: 'InfiniteScroll',
  options: { title: '弹框' },
  component: InfiniteScrollPage,
};
