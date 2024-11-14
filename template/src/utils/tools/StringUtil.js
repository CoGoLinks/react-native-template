/**
 * 保留小数
 * @param {*} value
 * roundMode 1 不四舍五入 2 四舍五入
 */
export const toFixedString = (value, fractionDigits = 2, roundMode = 2) => {
  if (value) {
    if (!isNaN(value)) {
      let stringValue = value.toString();
      let index = stringValue.indexOf('.');
      if (index !== -1) {
        stringValue = stringValue.substring(0, fractionDigits + index + roundMode);
      } else {
        stringValue = stringValue.substring(0);
      }
      return parseFloat(stringValue)
        .toFixed(fractionDigits)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  return parseFloat('0.00').toFixed(fractionDigits);
};
export const toAmount = (value, fractionDigits = 2, roundMode = 2) => {
  if (value) {
    if (!isNaN(value)) {
      let stringValue = value.toString();
      let index = stringValue.indexOf('.');
      if (index !== -1) {
        stringValue = stringValue.substring(0, fractionDigits + index + roundMode);
      } else {
        stringValue = stringValue.substring(0);
      }
      return parseFloat(stringValue).toFixed(fractionDigits).toString();
    }
  }
  return parseFloat('0.00').toFixed(fractionDigits);
};
/**
 * 判断是不是json字符串
 * @param {*} valString
 * @returns
 */
export function isJSONString(valString) {
  if (typeof valString === 'string') {
    try {
      const jsonObecjt = JSON.parse(valString);
      if (typeof jsonObecjt === 'object' && jsonObecjt) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}

/**
 * 解析json字符串
 * @param {*} valString
 * @returns
 */
export function parseJSONString(valString) {
  if (isJSONString(valString)) {
    const jsonObecjt = JSON.parse(valString);
    if (jsonObecjt) {
      return jsonObecjt;
    }
  }
  return {};
}

/**
 * 把对象转为get参数
 * @param {*} Object
 * @returns
 */
export const objectToUrlParams = (params) => {
  return Object.entries(params)
    .reduce((pre, cur) => {
      pre.push(cur.join('='));
      return pre;
    }, [])
    .join('&');
};

/**
 * 解析url地址和参数
 * @param {String} url
 * @returns {url, params}
 */
export function parseUrl(urlStr) {
  const urlParts = urlStr.split('?');

  let url = urlParts[0];

  const paramsStr = urlParts[1] || '';
  const paramsArr = paramsStr.split('&');
  const params = {};

  for (let param of paramsArr) {
    if (!param) {
      continue;
    }
    const [key, value] = param.split('=').map(decodeURIComponent);
    params[key] = value;
  }

  return {
    url,
    params,
  };
}
/**
 * 获取字符串的后四位
 * @param {*} value
 * @returns
 */
export const getLastFourChars = (value = '', len = 4) => {
  if (value?.length >= 4) {
    return value.substring(value.length - len);
  } else {
    return value;
  }
};

export const addSpaceToDigits = (value = '') => {
  return value
    ?.replace(/\d{4}/g, function (match) {
      return match + ' ';
    })
    .trim();
};
/**
 * 手机号码中间4位加*
 * @param {} phoneNumber
 * @returns
 */
export const maskPhoneNumber = (phoneNumber) => {
  // 检查手机号码是否为11位的数字字符串
  if (phoneNumber.length === 11 && /^\d+$/.test(phoneNumber)) {
    // 替换中间4位为星号
    return phoneNumber.slice(0, 3) + '****' + phoneNumber.slice(7);
  } else {
    return phoneNumber;
  }
};
/**
 * 转换版本号
 * @param {*} version
 * @returns
 */
export function convertVersion(version = '') {
  if (version) {
    if (version.includes('.')) {
      // 将版本号分割为数组
      const parts = version?.split('.');
      let versionNumber = '';
      if (parts?.length > 0) {
        const majorVersion = parseInt(parts[0], 10) % 10; // 取最后一位作为主版本号
        versionNumber = `${majorVersion}`;
      }
      // 提取主版本号，次版本号和补丁版本号
      for (let i = 1; i < parts?.length; i++) {
        if (parts[i]) {
          versionNumber += `.${parts[i]}`; // 次版本号和补丁版本号
        }
      }
      // 返回格式化的版本号
      return versionNumber;
    }
    return version;
  }
  return version || '';
}
/**
 * 去除字符串内所有空格
 * @param {*} value
 */
export const removeSpaces = (value = '') => {
  if (value) {
    // 去除首尾空格
    const trimmedString = value?.trim();
    // 去除中间空格
    const noSpacesString = trimmedString.replace(/\s+/g, '');

    return noSpacesString;
  }
  return '';
};
