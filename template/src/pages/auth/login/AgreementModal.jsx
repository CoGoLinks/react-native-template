import React, { useEffect } from 'react';
import ExitApp from 'react-native-exit-app';
import { View, Text, Modal, TouchableOpacity, WebView } from '@/components';
import WebConf from '@/config/web';
import { useStore } from '@/store';
import { appInit } from '@/utils/app';

/**
 * 隐私政策提示框
 */
const AgreementModal = () => {
  const { agreePrivacy, setAgreePrivacy, setAppSwitch } = useStore(
    'agreePrivacy',
    'setAgreePrivacy',
    'setAppSwitch',
  );

  // 各种初始化方法
  const handleInit = () => {
    appInit();
    setAppSwitch();
  };

  useEffect(() => {
    if (agreePrivacy) {
      handleInit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 不同意并退出App
  const handleCancel = () => {
    ExitApp.exitApp();
  };

  // 同意隐私政策
  const handleAgreePrivacy = () => {
    setAgreePrivacy(true);
    handleInit();
  };

  return (
    <Modal visible={!agreePrivacy} position="center">
      <View className="h-[1050rpx] w-[622rpx] rounded-20 overflow-hidden bg-c-w">
        <WebView originWhitelist={['*']} source={{ uri: WebConf.privacy }} />
        <View className="a-center border-t-1 border-[#EBEDF0] mt-[16rpx]">
          <TouchableOpacity
            className="center w-[526rpx] h-[72rpx] bg-c-primary rounded-16"
            onPress={handleAgreePrivacy}
          >
            <Text className="text-base font-w5 text-c-w">同意</Text>
          </TouchableOpacity>
          <View className="center h-12 border-r-1 border-[#EBEDF0]">
            <Text className="text-sm  text-[#787B80] font-w4" onPress={handleCancel}>
              不同意并退出
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AgreementModal;
