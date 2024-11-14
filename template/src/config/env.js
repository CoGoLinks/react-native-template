import Config from 'react-native-config';

// 环境：测试 test; 生产 prod;
export const env = Config.RN_ENV;

console.log('当前环境：', env);

// 是否为生产环境
export const isProd = env === 'prod';

const envConfigMap = {
  test: {
    baseURL: 'baseURL', // 接口地址
  },
  prod: {
    baseURL: 'baseURL', // 接口地址
  },
};

const envConf = envConfigMap[env];
global.ossPath = envConf.ossPath;

export default envConf;
