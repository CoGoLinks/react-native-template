import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from '../';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { CodeType } from 'react-native-vision-camera/src/CodeScanner';

type ScanCodeViewProps = {
  /**
   * 扫码回调
   */
  onCodeScanned: (code: string) => void;
  /**
   * 码类型
   * 条码： codeTypes: ['ean-13', 'code-128', 'code-39'],
   * 二维码： codeTypes: ['qr'],
   */
  codeTypes?: CodeType[];
};

/**
 * 扫码组件
 */
const ScanCodeView = ({ onCodeScanned, codeTypes = [] }: ScanCodeViewProps) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const dataRef = useRef({
    isEnd: false,
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes,
    onCodeScanned: (codes) => {
      if (dataRef.current.isEnd) {
        return;
      }
      if (codes?.[0].value) {
        dataRef.current.isEnd = true;
        onCodeScanned(codes?.[0].value);
      }
    },
  });

  if (device == null) {
    return (
      <View className="center flex-1">
        <Text>请设置相机权限</Text>
      </View>
    );
  }

  return (
    <View flex>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    </View>
  );
};

export default ScanCodeView;
