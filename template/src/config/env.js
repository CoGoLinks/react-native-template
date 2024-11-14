import Config from 'react-native-config';

// 环境：测试 test; 生产 prod;
export const env = Config.RN_ENV;

console.log('当前环境：', env);

// 是否为生产环境
export const isProd = env === 'prod';

const envConfigMap = {
  test: {
    baseURL: 'http://22.50.2.163:8080', // 接口地址
    // baseURL: 'http://172.16.44.62:8080', // 朝伟
  },
  prod: {
    baseURL: 'https://xyf-pro.xlmclub.com',
  },
};

const envConf = envConfigMap[env];
global.ossPath = envConf.ossPath;

export default envConf;
