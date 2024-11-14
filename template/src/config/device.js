import { Platform, NativeModules, StatusBar } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const { StatusBarManager } = NativeModules;

// 状态栏高度
let statusBarHeight = 0;
// 设别唯一ID
let uniqueId = null;
// 设备mac地址
let macAddress = null;

/*
 * 获取状态栏高度
 */
if (Platform.OS === 'ios') {
  StatusBarManager.getHeight(({ height }) => {
    statusBarHeight = height;
  });
} else {
  statusBarHeight = StatusBar.currentHeight;
}

export default {
  platform: Platform.OS, // 平台
  platFormSelect: Platform.select, // 平台选择
  appVersion: DeviceInfo.getVersion(), // App版本 1.0.0格式
  modal: DeviceInfo.getModel(), // 设备型号
  systemVersion: DeviceInfo.getSystemVersion(), // 系统版本
  getStatusBarHeight: () => statusBarHeight, // 获取状态栏高度
  // 设备唯一标识
  getUniqueId: () => {
    uniqueId = uniqueId || DeviceInfo.getUniqueIdSync();
    return uniqueId;
  },
  // MAC地址
  getMacAddress: () => {
    macAddress = macAddress || DeviceInfo.getMacAddressSync();
    return macAddress;
  },
};
