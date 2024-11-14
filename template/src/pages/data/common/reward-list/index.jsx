import React from 'react';
import { View, Text, TouchableOpacity, Icon, Image, InfiniteScroll } from '@/components';
import { RewardListConfig, handleFormat } from '../enums';

function TransferRecord(props) {
  const { goPageDetail, route, loadMore = () => {}, noDataText = '暂无奖励数据' } = props;
  const { main = [], list = [] } = RewardListConfig[route] || {};

  const renderItem = ({ item }) => {
    const itemData = list.map(({ label, name, type, other }) => {
      const value = handleFormat({ value: item[name], type });
      return { label, value, other };
    });
    return (
      <TouchableOpacity
        className="bg-c-w pl-[36rpx] py-[24rpx] justify-center mb-[24rpx] rounded-8 mx-[22rpx]"
        onPress={() => goPageDetail(item)}
        disabled={!goPageDetail}
      >
        {main.map(({ name, type }, index) => {
          return (
            <View key={name + index}>
              {type === 'sn' && (
                <View className="a-center row mb-[18rpx]">
                  <Icon name="sn" size="42" className="mr-[6rpx]" />
                  <Text className="text-base">{item[name]}</Text>
                </View>
              )}
              {type === 'logo' && (
                <View className="row a-center mb-[12rpx]">
                  <Icon name="shang" size="32" className="mr-[8rpx]" />
                  <Text className="text-base font-w5" numberOfLines={1}>
                    {item[name]}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
        {itemData.map(({ label, value, other }, index) => {
          return (
            <View row className="mb-[12rpx] a-center" key={label + index}>
              <Text className="text-sm text-c-n6 w-13">{label}</Text>
              <Text className={['text-base', { 'text-c-q4 font-w6': other === 'orange' }]}>
                {value}
              </Text>
            </View>
          );
        })}
      </TouchableOpacity>
    );
  };

  /**
   * 渲染无列表数据区域
   * @returns {JSX.Element}
   */
  const renderNoData = () => (
    <View className="a-center">
      <Image
        assetName="common.empty_merchant"
        resizeMode="contain"
        className="w-[400rpx] h-[400rpx] mt-[180rpx]"
      />
      <Text className="text-xl text-c-n7 top-[-36rpx]">{noDataText}</Text>
    </View>
  );

  return (
    <View className="flex-1 pb-70 pt-[22rpx]">
      <InfiniteScroll
        loadMore={loadMore}
        renderItem={renderItem}
        ListEmptyComponent={renderNoData()}
      />
    </View>
  );
}

export default TransferRecord;
