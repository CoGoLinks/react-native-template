import React from 'react';
import { View, Text, Input } from '@/components';

const TextInputCell = ({ item = {}, onChangeText = () => {}, maxLength = 50 }) => {
  return (
    <View className="flex-1 justify-center pl-[32rpx] pr-[32rpx]" style={styles.cellItem}>
      <View className="flex-row a-center">
        <Text style={styles.nameText}>{item?.label || ''}</Text>
        <Input
          className="flex-1 p-0 text-c-n8"
          clearButtonMode="while-editing"
          returnKeyType="done"
          underlineColorAndroid="transparent"
          placeholder={item?.placeholder || ''}
          onChangeText={onChangeText}
          value={item?.value || undefined}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

const styles = {
  cellItem: {
    height: '88rpx',
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
  },
};

export default TextInputCell;
