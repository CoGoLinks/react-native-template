import React from 'react';
import { Linking } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import { View, Text, Modal, ScanCodeView } from '@/components';

/**
 * 扫描SN页面
 * navigation.push('ScanSnCode', {
 *  onCodeScanned: (codeValue) => {},
 * })
 */
const ScanSnCodeViewPage = ({ route, navigation }) => {
  const bgc = 'rgba(0,0,0,0.4)';
  const onCodeScanned = (codeValue) => {
    navigation.goBack();
    route.params?.onCodeScanned(codeValue);
  };

  return (
    <View className="absolute-fill overflow-hidden">
      <ScanCodeView codeTypes={['ean-13', 'code-128', 'code-39']} onCodeScanned={onCodeScanned} />
      <View className="absolute-fill center">
        <View
          className={`absolute bg-c-0 w-[2300rpx] h-[2000rpx] border-[800rpx] border-[${bgc}]`}
        />
      </View>
      <View className="absolute-fill center">
        <View className="h-[2000rpx]">
          <View className="h-[800rpx] justify-end">
            <Text className="text-c-w font-w5 mb-20">将机具条码放入框内，即可自动扫描</Text>
          </View>
          <View className="h-[400rpx]" />
        </View>
      </View>
    </View>
  );
};

export default {
  name: 'ScanSnCode',
  component: ScanSnCodeViewPage,
  options: {
    title: '',
  },
  intercept: async ({ next }) => {
    const cameraPermission = Camera.getCameraPermissionStatus();
    if (cameraPermission === 'not-determined') {
      Modal.alert({
        title: '访问相机，可让你无需手输设备编码即可自动识别',
        okText: '接受并继续',
        singleButton: true,
        onOk: async () => {
          const res = await Camera.requestCameraPermission();
          if (res === 'granted') {
            next();
          }
        },
      });
    } else if (cameraPermission === 'denied') {
      Modal.alert({
        title:
          '访问相机，可让你无需手输设备编码即可自动识别，请在手机的“设置-隐私-相机”中，允许结赢伙伴访问你的相机',
        okText: '去设置',
        onOk: () => Linking.openSettings(),
      });
    } else {
      next();
    }
  },
};
