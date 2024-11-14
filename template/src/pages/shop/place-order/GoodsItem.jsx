import React from 'react';
import { View, Text, Image } from '@/components';
import { toFixedString } from '@/utils/tools';
// {
//   "subModelId": "7136",
//   "subModelName": "1.0+Epos-华智融NEW6220(4G)",
//   "modelName": "1.0+Epos-华智融NEW6220(4G)",
//   "minQuantity": 5,
//   "unitQuantity": 1,
//   "unitPrice": 40,
//   "unit": "台",
//   "imageUrl": "https://sms-admin-test.suixingpay.com/img/logo_3.png"
// }
const GoodsItem = ({ item = {} }) => {
  return (
    <View
      key={'goods' + Math.random()}
      className="ml-20 mr-20 pl-[16rpx] pr-[16rpx] pt-[8rpx] pb-[24rpx]"
      style={styles.container}
    >
      <View
        style={styles.contentView}
        className="flex-1 flex-row pt-[18rpx] pr-[18rpx] pb-[24rpx] pl-[8rpx]"
      >
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: item?.imageUrl,
          }}
        />
        <View className="flex-1 pt-[6rpx] pr-[20rpx] pl-[20rpx]">
          <Text style={styles.nameText} numberOfLines={3}>
            {item?.subModelName || ''}
          </Text>
        </View>
        <View>
          <View className="flex-row items-end">
            <Text style={styles.priceText}>¥{toFixedString(item?.unitPrice)}</Text>
            <Text style={styles.priceUnitText}>/{item?.unit}</Text>
          </View>
          <View className="flex-row">
            <View className="flex-1" />
            <View
              style={styles.numberView}
              className="mt-[34rpx] pt-[8rpx] pb-[8rpx]  pl-[16rpx] pr-[16rpx]"
            >
              <Text className="font-w4 text-[24rpx] text-c-n8">x {item?.amount}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffffff',
  },

  contentView: {
    backgroundColor: 'rgba(245, 245, 245, 0.55)',
    borderRadius: '4rpx',
    borderWidth: '1rpx',
    borderColor: '#E8E9EB',
  },

  image: {
    width: '116rpx',
    height: '116rpx',
    borderRadius: '8rpx',
    backgroundColor: '#F2F2F2',
  },

  priceText: {
    includeFontPadding: false,
    color: '#D84038',
    fontSize: '32rpx',
    fontWeight: '600',
    lineHeight: '40rpx',
  },
  priceUnitText: {
    includeFontPadding: false,
    color: '#D84038',
    fontSize: '22rpx',
    fontWeight: '400',
    lineHeight: '40rpx',
  },

  numberView: {
    // height: '47rpx',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: '4rpx',
    borderWidth: '1rpx',
    borderColor: '#E8E9EB',
  },

  nameText: {
    color: '#323233',
    fontSize: '28rpx',
    fontWeight: '500',
  },
};
export default GoodsItem;
