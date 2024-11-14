import React from 'react';
import { View, Text, Icon, TouchableOpacity } from '@/components';
import { isEmptyObject } from '@/utils/tools';

const Addess = ({ addressInfo = {}, onModify = () => {} }) => {
  if (isEmptyObject(addressInfo)) {
    return (
      <View
        key={'address' + Math.random()}
        className="h-[189rpx] flex-1 ml-20 mr-20 pl-[14rpx] pr-[14rpx] pb-[26rpx] bg-c-w"
      >
        <View style={styles.noAddressView} className="flex-1 flex-row items-center justify-center">
          <TouchableOpacity
            className="flex-1 flex-row justify-center"
            onPress={() => onModify('add')}
          >
            <Icon name="add" size={33} direction="add" color="#1677FF" />
            <Text style={styles.addAddressText} className="pl-[8rpx]">
              点击添加收货地址
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View
        key={'address' + Math.random()}
        className="flex-1 flex-row  bg-c-w ml-20 mr-20 pl-[14rpx] pr-[14rpx] pb-[26rpx] "
      >
        <View className="flex-1 flex-row pl-[4rpx] pr-10">
          <View className="flex-1">
            <View className="flex-row">
              <Icon name="location" size={28} direction="location" />
              <Text style={styles.areaText} className="ml-[4rpx]">
                {`${addressInfo?.province || ''} ${addressInfo?.city || ''} ${
                  addressInfo?.region || ''
                }`}
              </Text>
            </View>
            <Text
              style={styles.addressText}
              numberOfLines={2}
              className="pt-10 pb-[16rpx] ml-30 leading-[40rpx] mr-[52rpx]"
            >
              {addressInfo?.addressDetail || ''}
            </Text>
            <Text style={styles.nameText} className="ml-30">
              收货人：{`${addressInfo?.name || ''} ${addressInfo?.phone || ''}`}
            </Text>
          </View>
          <TouchableOpacity style={styles.modifyView} onPress={() => onModify('modify')}>
            <Text style={styles.modifyText}>修改</Text>
            <Icon name="right" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = {
  areaText: {
    fontWeight: 400,
    fontSize: '26rpx',
    color: '#646566',
  },
  addressText: {
    fontWeight: 500,
    fontSize: '28rpx',
    color: '#323233',
  },
  nameText: {
    fontWeight: 400,
    fontSize: '28rpx',
    color: '#323233',
  },

  modifyView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modifyText: {
    fontWeight: 400,
    fontSize: '26rpx',
    color: '#787B80',
  },
  addAddressText: {
    fontWeight: 400,
    fontSize: '26rpx',
    color: '#1677FF',
  },

  noAddressContainer: {
    height: '189rpx',
  },
  noAddressView: {
    backgroundColor: '#EDF5FF',
    borderRadius: '5rpx',
    borderWidth: '2rpx',
    borderColor: '#108EE8',
    borderStyle: 'dashed',
    borderDash: [2, 20],
  },
};

export default Addess;
