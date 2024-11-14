import sensors, { SAAutoTrackType } from 'sensorsdata-analytics-react-native';
export { default as track } from './track';
import { isProd } from '@/config/env';

export { default as useAnalytics } from './useAnalytics';

/**
 * 初始化埋点
 */
export const analyticsInit = () => {
  sensors.init({
    server_url: 'https://xlm-sc.xlmclub.com/sa?project=xlm_test',
    show_log: true,
    global_properties: {
      // 运行环境，1：生产；0：测试
      is_formal: isProd ? '1' : '0',
    },
    // eslint-disable-next-line no-bitwise
    auto_track: SAAutoTrackType.START | SAAutoTrackType.END, // 自动采集App启动、退出事件；
    encrypt: true,
  });
};
