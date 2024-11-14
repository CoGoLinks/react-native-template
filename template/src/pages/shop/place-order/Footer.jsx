import React from 'react';
import { View, Text, Button } from '@/components';
import { toFixedString } from '@/utils/tools';
// 注释掉的是同意模块 如果注释打开高度要改为216
const FooterView = ({ disabled = false, totalAmount = 0, onSubmit = () => {} }) => {
  return (
    <View style={styles.container}>
      {/* <View
        style={styles.agreementView}
        className="flex-row items-center pt-[18rpx] pb-[18rpx]"
      >
        <Checkbox
          color={'1' ? '#1677FF' : '#D8D8D8'}
          value={true}
          // onValueChange={() => onChecked(item)}
          borderRadius={50}
          size={20}
        />
        <Text style={styles.agreementText} className="pl-[6rpx]">
          请阅读并同意
          <Text style={styles.agreementLink}>《服务费规则说明》</Text>
        </Text>
      </View> */}
      <View className="flex-1 flex-row justify-between items-center">
        <View>
          <Text style={styles.totalText}>合计：</Text>
          <Text style={styles.priceUnitText}>
            ¥<Text style={styles.priceText}>{toFixedString(totalAmount)}</Text>
          </Text>
        </View>
        <View style={styles.actionView}>
          <Button disabled={disabled} onPress={onSubmit} size="xl" shape="round">
            提交订单
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: '144rpx',
    backgroundColor: '#ffffff',
    paddingHorizontal: '34rpx',
  },

  agreementView: {
    borderBottomWidth: '1rpx',
    borderBottomColor: '#E8E9EB',
  },

  agreementText: {
    color: '#333333',
    fontSize: '26rpx',
    fontWeight: '400',
  },
  agreementLink: {
    color: '#1677FF',
    fontSize: '26rpx',
    fontWeight: '400',
  },
  totalText: {
    color: '#323233',
    fontSize: '26rpx',
  },

  actionView: {
    width: '332rpx',
    maxWidth: '332rpx',
    marginLeft: '20rpx',
  },

  priceText: {
    color: '#D84038',
    fontSize: '48rpx',
    fontWeight: '600',
  },
  priceUnitText: {
    color: '#D84038',
    fontSize: '26rpx',
    fontWeight: '400',
  },
};
export default FooterView;
