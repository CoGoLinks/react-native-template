import { Toast } from '@/components';
import Clipboard from '@react-native-community/clipboard';

export const copyString = (text = '') => {
  Clipboard.setString(text ?? '');
  Toast.info('复制成功');
};

export const getString = async () => {
  const text = await Clipboard.getString();
  return text ?? '';
};
