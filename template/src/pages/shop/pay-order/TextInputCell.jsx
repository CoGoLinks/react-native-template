import React from 'react';
import { View, Text, Input } from '@/components';
import { tw } from '@/style';

const TextInputCell = ({ item = {}, onChangeText = () => {}, maxLength, ...other }) => {
  return (
    <View className="flex-1 justify-center h-[88rpx] pl-[16rpx] pr-[16rpx] border-b-[1rpx] border-b-[#EBEDF0]">
      <View className="flex-row a-center">
        <Text style={styles.nameText}>{item?.label || ''}</Text>
        <Input
          style={styles.input}
          clearButtonMode="while-editing"
          returnKeyType="done"
          underlineColorAndroid="transparent"
          placeholder={item?.placeholder || ''}
          onChangeText={onChangeText}
          value={item?.value || undefined}
          placeholderTextColor={tw.color('c-n5')}
          className="p-0 text-c-n8"
          maxLength={!!maxLength && maxLength}
          {...other}
        />
      </View>
    </View>
  );
};

const styles = {
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
