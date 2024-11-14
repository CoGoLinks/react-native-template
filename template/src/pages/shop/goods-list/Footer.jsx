import React from 'react';
import { View, Text, Button } from '@/components';
import { toFixedString } from '@/utils/tools';

const Footer = ({ loading = false, disabled = false, totalAmount = 0, onSubmit = () => {} }) => {
  return (
    <View useSafeArea style={styles.cellView}>
      <View className="flex-1 flex-row justify-between items-center px-[30rpx] py-[20rpx]">
        <View className="flex-1">
          <Text className="text-c-n8 text-[26rpx] font-w4">合计：</Text>
          <Text className="text-c-my text-[26rpx] font-w4">
            ¥<Text className="text-c-my text-[48rpx] font-w6">{toFixedString(totalAmount)}</Text>
          </Text>
        </View>
        <View style={styles.actionView}>
          <Button disabled={disabled} loading={loading} onPress={onSubmit} size="xl" shape="round">
            确认
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = {
  cellView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: '20rpx',
  },

  actionView: {
    width: '332rpx',
    maxWidth: '332rpx',
    marginLeft: '20rpx',
  },
};
export default Footer;
