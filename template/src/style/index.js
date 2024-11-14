import { create } from 'twrnc';
import Style from '@alboped/react-native-style';
const twconf = require('../../tailwind.config');

/**
 * 转换单位: rpx -> px
 * @param {*} conf 配置信息
 */
function parseUnit(conf) {
  const {
    theme: { extend, ...otherTheme },
    plugins,
    ...otherConf
  } = conf;

  const newTheme = parseTheme(otherTheme);
  const newExtend = parseTheme(extend);

  return {
    theme: { extend: newExtend, ...newTheme },
    plugins,
    ...otherConf,
  };
}

function parseTheme(theme) {
  return Object.entries(theme).reduce((acc, [themeKey, items]) => {
    acc[themeKey] = parseItem(items);
    return acc;
  }, {});
}

function parseItem(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] =
      typeof value === 'string' && value.endsWith('rpx') ? `${Style.unitFmt(value)}px` : value;

    if (typeof value === 'string') {
      acc[key] = value.endsWith('rpx') ? `${Style.unitFmt(value)}px` : value;
    } else if (Array.isArray(value)) {
      acc[key] = value.map((item) => {
        if (typeof item === 'string' && item.endsWith('rpx')) {
          return `${Style.unitFmt(item)}px`;
        }
        return item;
      });
    }
    return acc;
  }, {});
}

const newConf = parseUnit(twconf);

const tw = create(newConf);

export const getColor = (color) => {
  try {
    return tw.color(color);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export { tw };
