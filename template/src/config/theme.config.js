/**
 * UI主题配置
 */
import { Colors, Typography } from '@/components/ui-lib';
import { create } from '@alboped/react-native-style';
import colors from '../../theme/colors';

const color = Object.entries(colors.colors).reduce((acc, [key, value]) => {
  acc[key.replace('c-', '')] = value;
  return acc;
}, {});

Colors.loadColors(color);

Typography.loadTypographies({
  h1: create({ fontSize: '62rpx', fontWeight: '500', lineHeight: '88rpx' }),
  h2: create({ fontSize: '54rpx', fontWeight: '500', lineHeight: '74rpx' }),
  h3: create({ fontSize: '46rpx', fontWeight: '500', lineHeight: '62rpx' }),
  h4: create({ fontSize: '38rpx', fontWeight: '500', lineHeight: '54rpx' }),
  h5: create({ fontSize: '32rpx', fontWeight: '500', lineHeight: '48rpx' }),
});
