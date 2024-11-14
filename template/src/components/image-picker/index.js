import { Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

/**
 * 选择照片视频插件
 * 文档地址: https://github.com/ivpusic/react-native-image-crop-picker
 */
class ImagePicker {
  openPicker(params = {}) {
    return new Promise((resolve, reject) => {
      ImageCropPicker.openPicker({
        compressImageQuality: 0.5,
        compressImageMaxWidth: 1080,
        compressImageMaxHeight: 1080,
        cropping: false,
        forceJpg: true,
        mediaType: 'photo',
        ...params,
      })
        .then((image) => {
          console.log('image ===', image);
          if (Platform.OS === 'ios') {
            const { path = '' } = image || {};
            resolve(path);
          } else {
            const { path = '' } = image || {};
            resolve(path);
          }
        })
        .catch((err) => {
          console.log('catch :', err);
          // Error: User cancelled image selection 用户取消上传
          reject(err);
        });
    });
  }
  openCamera(params = {}) {
    return new Promise((resolve, reject) => {
      ImageCropPicker.openCamera({
        compressImageQuality: 0.5,
        compressImageMaxWidth: 1080,
        compressImageMaxHeight: 1080,
        cropping: false,
        forceJpg: true,
        mediaType: 'photo',
        ...params,
      })
        .then((image) => {
          console.log('image ===', image);
          if (Platform.OS === 'ios') {
            const { path = '' } = image || {};
            resolve(path);
          } else {
            const { path = '' } = image || {};
            resolve(path);
          }
        })
        .catch((err) => {
          console.log('catch :', err);
          // Error: User cancelled image selection 用户取消上传
          reject(err);
        });
    });
  }
}

const imagePicker = new ImagePicker();

export default imagePicker;
