import React, { useMemo } from 'react';
import { ImageBackground } from 'react-native';
import { Image, Text, View, Icon, Button, TouchableOpacity } from '@/components';
import { toFixedString } from '@/utils/tools';
import { AccountTypeEnum } from '../../common/Config';

export default function AccountItem(props) {
  const { onDetailPress = () => {}, onButtonPress = () => {}, item = {} } = props || {};

  // 按钮标题
  const icon = useMemo(() => {
    if (item?.accountType === AccountTypeEnum.Withdraw) {
      return 'mine.account2';
    } else if (item?.accountType === AccountTypeEnum.Change) {
      return 'mine.account1';
    }
  }, [item]);
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
    <TouchableOpacity activeOpacity={1} onPress={() => onDetailPress(item)}>
      <ImageBackground
        source={require('@/assets/images/mine/bg_account.png')}
        resizeMode="cover"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          marginBottom: 30,
        }}
      >
        <View className={'pt-[52rpx] pl-[40rpx] pr-[40rpx] h-[366rpx] pb-[74rpx]'}>
          <View className="flex-row items-center">
            <Image assetName={icon} className="w-[36rpx] h-[30rpx] mr-[12rpx]" />
            <Text className="text-[#845E1B] text-2xl font-w5 mr-[4rpx]">
              {AccountTypeEnum.getLabel(item?.accountType)}
            </Text>
            <Icon name="right2" color="#845E1B" size={30} />
          </View>
          <View className={'flex-1 flex-row justify-between items-end'}>
            <View>
              <Text className="text-sm text-c-n8 ">余额(元）</Text>
              <Text className="text-c-n8  text-[52rpx] font-w6 ">
                {toFixedString(item?.amount)}
              </Text>
            </View>
            <View>
              <Button
                className={`bg-[${btnColor}] w-[180rpx] h-[68rpx] text-[28rpx] font-w5`}
                shape="round"
                onPress={() => onButtonPress(item)}
              >
                {btnTitle}
              </Button>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
