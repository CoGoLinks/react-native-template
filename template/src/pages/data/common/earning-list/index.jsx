import React from 'react';
import { InfiniteScroll, Text, View, Icon, TouchableOpacity, Image } from '@/components';
import { EarningListConfig, handleFormat } from '../enums';
import styles from './style';

function EarningList(props) {
  const { route, loadMore = () => {}, onPressItem = () => {}, noDataText = '暂无商户交易' } = props;
  const { title, list } = EarningListConfig[route] || {};

  const renderItem = ({ item, index }) => {
    const itemData = list.map(({ name, type }) => {
      return handleFormat({ value: item[name], type });
    });

    return (
      <TouchableOpacity
        className={[
          'row bg-c-w a-center py-[15rpx]  h-[118rpx] pr-[24rpx]',
          { 'border-t-1 border-c-n3': index !== 0 },
        ]}
        onPress={() => {
          onPressItem(item);
        }}
      >
        <Text className="text-sm w-[206rpx] pl-[18rpx] pr-[44rpx]" numberOfLines={1}>
          {itemData[0]}
        </Text>

        <View className="row flex-1 a-center">
          <Text className="text-sm text-[#787B80] mr-[12rpx] w-[150rpx]">{itemData[1]}</Text>

          <Text className="text-base text-c-n8 font-w6">{itemData[2]}</Text>
        </View>

        <View className="row a-center">
          <Text className="text-base text-c-q4 font-w6 mr-[12rpx]">{itemData[3]}</Text>
          <Icon name="right" size="20" />
        </View>
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
    <View className="flex-1">
      <View className="row bg-c-w h-7 a-center py-[15rpx] pr-[24rpx] mb-[24rpx] pl-[40rpx]">
        <Text className="text-sm text-[#787B80] w-[206rpx]">{title[0] || ''}</Text>
        <Text className="text-sm text-[#787B80] flex-1">{title[1] || ''}</Text>
        <Text className="text-sm text-[#787B80]">{title[2] || ''}</Text>
      </View>
      <View className="flex-1">
        <InfiniteScroll
          loadMore={loadMore}
          renderItem={renderItem}
          ListEmptyComponent={renderNoData()}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    </View>
  );
}

export default EarningList;
