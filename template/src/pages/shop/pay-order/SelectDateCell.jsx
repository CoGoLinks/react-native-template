import React, { useState } from 'react';
import { View, Text, Icon, TouchableOpacity, DatePicker } from '@/components';
import dayjs from 'dayjs';

const SelectDateCell = ({ item = {}, onPress = () => {} }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View className="flex-1 justify-center h-[88rpx] pl-[16rpx] pr-[16rpx] border-b-[1rpx] border-b-[#EBEDF0]">
      <View className="flex-row">
        <Text style={styles.nameText}>{item?.label || ''}</Text>
        <TouchableOpacity className="flex-1 flex-row" onPress={() => setVisible(true)}>
          {item?.value ? (
            <Text className="flex-1" style={styles.nameText}>
              {item?.value || ''}
            </Text>
          ) : (
            <Text className="flex-1 font-w4 text-c-n5 text-[28rpx]">{item?.placeholder || ''}</Text>
          )}
          <Icon name="right" size={28} />
        </TouchableOpacity>
      </View>
      <DatePicker
        visible={visible}
        value={dayjs(item?.value) || undefined}
        onChange={(value) => onPress(value)}
        placeholder="请选择日期"
        onOk={() => setVisible(false)}
        onVisibleChange={(isVisible) => setVisible(isVisible)}
      />
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
};

export default SelectDateCell;
