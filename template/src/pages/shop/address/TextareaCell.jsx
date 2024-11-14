import React from 'react';
import { View, Text, Input } from '@/components';

const TextareaCell = ({ item = {}, onChangeText = () => {} }) => {
  return (
    <View className="flex-1 pl-[32rpx] pr-[32rpx]" style={styles.cellItem}>
      <View className="flex-row pt-[24rpx] pb-[24rpx] a-center">
        <Text style={styles.nameText}>{item?.label || ''}</Text>
        <Input
          className="flex-1 p-0 text-c-n8"
          multiline={true}
          numberOfLines={4}
          clearButtonMode="while-editing"
          textAlignVertical="top"
          returnKeyType="done"
          underlineColorAndroid="transparent"
          placeholder={item?.placeholder || ''}
          onChangeText={onChangeText}
          value={item?.value || undefined}
          maxLength={50}
        />
      </View>
    </View>
  );
};

const styles = {
  cellItem: {
    height: '176rpx',
    backgroundColor: '#fff',
  },
  nameText: {
    fontWeight: 400,
    fontSize: '28rpx',
    color: '#323233',
    minWidth: '112rpx',
    marginRight: '32rpx',
  },
  input: {
    flex: 1,
    paddingTop: 0,
  },
};

export default TextareaCell;
