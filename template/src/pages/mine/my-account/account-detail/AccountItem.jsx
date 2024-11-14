import React, { useMemo } from 'react';
import { ImageBackground } from 'react-native';
import { Text, View, Button } from '@/components';
import { toFixedString } from '@/utils/tools';
import { AccountTypeEnum } from '../../common/Config';

export default function AccountItem(props) {
  const { onPress = () => {}, item = {} } = props || {};

  /**
   * 按钮背景颜色
   */
  const btnColor = useMemo(() => {
    if (item?.accountType === AccountTypeEnum.Withdraw) {
      return '#1E2B4F';
    } else if (item?.accountType === AccountTypeEnum.Change) {
      return '#C13C1E';
    }
  }, [item]);
  // 按钮标题
  const btnTitle = useMemo(() => {
    if (item?.accountType === AccountTypeEnum.Withdraw) {
      return '提现';
    } else if (item?.accountType === AccountTypeEnum.Change) {
      return '充值';
    }
  }, [item]);
  return (
    <ImageBackground
      source={require('@/assets/images/mine/bg_account_detail.png')}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
      }}
    >
      <View className={'row pl-[40rpx] pr-[40rpx] min-h-[256rpx] '}>
        <View className={'flex-1 flex-row justify-between items-center'}>
          <View>
            <Text className="text-sm text-c-n8 ">余额(元）</Text>
            <Text className="text-c-n8  text-[52rpx] font-w6 ">{toFixedString(item?.amount)}</Text>
          </View>
          <View>
            <Button
              className={`bg-[${btnColor}] w-[180rpx] h-[68rpx] text-[28rpx] font-w5`}
              shape="round"
              onPress={() => onPress(item)}
            >
              {btnTitle}
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
