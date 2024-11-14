import { Platform } from 'react-native';
import {
  check,
  checkMultiple,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

import { Modal, Toast } from '@/components';
// https://github.com/zoontek/react-native-permissions#readme
// 公共权限提示语
export const msgs = {
  location: '需要您的同意，以便获取您展业成功时的位置信息',
  camera: '为了拍摄照片，需要获取您的摄像头权限',
  photo: '需要您的相册权限，用于提交实名审核材料',
  storage: '需要您的本地存储、相册权限，保存产品资料、产品图片等',
};
// Android permissions
// PERMISSIONS.ANDROID.ACCEPT_HANDOVER;
// PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
// PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
// PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
// PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION;
// PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION;
// PERMISSIONS.ANDROID.ADD_VOICEMAIL;
// PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS;
// PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE;
// PERMISSIONS.ANDROID.BLUETOOTH_CONNECT;
// PERMISSIONS.ANDROID.BLUETOOTH_SCAN;
// PERMISSIONS.ANDROID.BODY_SENSORS;
// PERMISSIONS.ANDROID.BODY_SENSORS_BACKGROUND;
// PERMISSIONS.ANDROID.CALL_PHONE;
// PERMISSIONS.ANDROID.CAMERA;
// PERMISSIONS.ANDROID.GET_ACCOUNTS;
// PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES;
// PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
// PERMISSIONS.ANDROID.PROCESS_OUTGOING_CALLS;
// PERMISSIONS.ANDROID.READ_CALENDAR;
// PERMISSIONS.ANDROID.READ_CALL_LOG;
// PERMISSIONS.ANDROID.READ_CONTACTS;
// PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
// PERMISSIONS.ANDROID.READ_MEDIA_AUDIO;
// PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
// PERMISSIONS.ANDROID.READ_MEDIA_VIDEO;
// PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED;
// PERMISSIONS.ANDROID.READ_PHONE_NUMBERS;
// PERMISSIONS.ANDROID.READ_PHONE_STATE;
// PERMISSIONS.ANDROID.READ_SMS;
// PERMISSIONS.ANDROID.RECEIVE_MMS;
// PERMISSIONS.ANDROID.RECEIVE_SMS;
// PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH;
// PERMISSIONS.ANDROID.RECORD_AUDIO;
// PERMISSIONS.ANDROID.SEND_SMS;
// PERMISSIONS.ANDROID.USE_SIP;
// PERMISSIONS.ANDROID.UWB_RANGING;
// PERMISSIONS.ANDROID.WRITE_CALENDAR;
// PERMISSIONS.ANDROID.WRITE_CALL_LOG;
// PERMISSIONS.ANDROID.WRITE_CONTACTS;
// PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

// iOS permissions
// PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY;
// PERMISSIONS.IOS.BLUETOOTH;
// PERMISSIONS.IOS.CALENDARS;
// PERMISSIONS.IOS.CALENDARS_WRITE_ONLY;
// PERMISSIONS.IOS.CAMERA;
// PERMISSIONS.IOS.CONTACTS;
// PERMISSIONS.IOS.FACE_ID;
// PERMISSIONS.IOS.LOCATION_ALWAYS;
// PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
// PERMISSIONS.IOS.MEDIA_LIBRARY;
// PERMISSIONS.IOS.MICROPHONE;
// PERMISSIONS.IOS.MOTION;
// PERMISSIONS.IOS.PHOTO_LIBRARY;
// PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY;
// PERMISSIONS.IOS.REMINDERS;
// PERMISSIONS.IOS.SIRI;
// PERMISSIONS.IOS.SPEECH_RECOGNITION;
// PERMISSIONS.IOS.STOREKIT;

/**
 * 权限类型 单个
 */
const PermissionTypes = {
  location: Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  }),
  camera: Platform.select({
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  }),
  photo: Platform.select({
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  }),
  storage: Platform.select({
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  }),
};

/**
 * 单个请求权限
 */
export const onRequest = (permission) => {
  return new Promise((resolve, reject) => {
    request(permission)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 检查权限单个
export const onCheck = (type) => {
  return new Promise((resolve, reject) => {
    const permission = PermissionTypes[type];
    check(permission)
      .then((result) => {
        if (result === RESULTS.UNAVAILABLE) {
          // This feature is not available (on this device / in this context)
          Toast.info('此功能不可用', 1);
        } else if (result === RESULTS.DENIED) {
          // The permission has not been requested / is denied but requestable
          const alert = Modal.alert({
            title: '提示',
            message: msgs[type],
            okText: '允许',
            cancelText: '拒绝',
            onOk: async () => {
              try {
                const res = await onRequest(permission);
                if (res === RESULTS.GRANTED || res === RESULTS.LIMITED) {
                  /**
                   * RESULTS.GRANTED The permission is granted
                   * RESULTS.LIMITED The permission is granted but with limitations Only for iOS PhotoLibrary, PhotoLibraryAddOnly and Notifications
                   */
                  resolve(res);
                } else {
                  setTimeout(() => {
                    openSetting('权限被拒绝，请打开设置管理权限');
                  }, 300);
                  reject(new Error('权限被拒绝'));
                }
              } catch (error) {
                reject(error);
              } finally {
                alert.close();
              }
            },
            onCancel: () => {
              reject(new Error('用户取消了权限请求'));
              alert.close();
            },
          });
        } else if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          /**
           * RESULTS.GRANTED The permission is granted
           * RESULTS.LIMITED The permission is granted but with limitations Only for iOS PhotoLibrary, PhotoLibraryAddOnly and Notifications
           */
          resolve(result);
        } else if (result === RESULTS.BLOCKED) {
          // The permission is denied and not requestable anymore
          setTimeout(() => {
            openSetting('权限被拒绝，请打开设置管理权限');
          }, 300);
          reject(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// 校验权限 多个
export const onCheckMultiple = (types = []) => {
  return new Promise((resolve, reject) => {
    // 获取需要检查的权限类型
    const permissions = types.map((type) => PermissionTypes[type]);

    // 构建权限对应的消息信息
    const msgInfo = types.reduce((acc, type) => {
      acc[PermissionTypes[type]] = msgs[type];
      return acc;
    }, {});

    console.log('msgInfo ===', msgInfo);

    // 检查多个权限
    checkMultiple(permissions)
      .then(async (results) => {
        console.log('results ===', results);

        const deniedPermissions = [];
        const blockedPermissions = [];
        const unavailablePermissions = [];

        // 处理不同状态的权限
        for (const [permission, result] of Object.entries(results)) {
          console.log('result -----', result, permission);
          switch (result) {
            case RESULTS.UNAVAILABLE:
              unavailablePermissions.push(permission);
              break;
            case RESULTS.DENIED:
              deniedPermissions.push(permission);
              break;
            case RESULTS.BLOCKED:
              blockedPermissions.push(permission);
              break;
          }
        }

        // 处理不可用的权限
        if (unavailablePermissions.length > 0) {
          Toast.info('此功能不可用', 1);
        }

        // 处理被阻止的权限
        if (blockedPermissions.length > 0) {
          setTimeout(() => {
            openSetting('权限被拒绝，请打开设置管理权限');
          }, 300);
          return reject(new Error('权限被拒绝'));
        }

        console.log('deniedPermissions ===', deniedPermissions);

        // 逐个请求被拒绝的权限
        for (const permission of deniedPermissions) {
          const alert = Modal.alert({
            title: '提示',
            message: msgInfo[permission],
            okText: '允许',
            cancelText: '拒绝',
            onOk: async () => {
              try {
                const res = await onRequest(permission);
                if (res !== RESULTS.GRANTED && res !== RESULTS.LIMITED) {
                  setTimeout(() => {
                    openSetting('权限被拒绝，请打开设置管理权限');
                  }, 300);
                  return reject(new Error('权限被拒绝'));
                }
              } catch (error) {
                console.log('error ===', error);
                return reject(error);
              }
              alert.close();
            },
            onCancel: () => {
              reject(new Error('用户取消了权限请求'));
              alert.close();
            },
          });

          // 等待用户处理完当前权限请求再处理下一个
          await new Promise((res, rej) => {
            alert.onOk = res;
            alert.onCancel = rej;
          });
        }

        // 所有权限处理完成
        resolve(RESULTS.GRANTED);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * 打开系统设置
 * @param  {String} message 提示语
 * @return {undefined}
 */
export const openSetting = (message) => {
  const alert = Modal.alert({
    title: '提示',
    message: message,
    okText: '去设置',
    cancelText: null,
    onOk: () => {
      openSettings().catch(() => {
        const alertMsg = Modal.alert({
          title: null,
          message: '无法打开设置，请手动前往设置',
          okText: '我知道了',
          cancelText: null,
          onOk: () => {
            alertMsg.close();
          },
        });
      });
    },
    onCancel: () => {
      alert.close();
    },
  });
};

export default {
  request: onRequest,
  check: onCheck,
  checkMultiple: onCheckMultiple,
  openSetting,
};
