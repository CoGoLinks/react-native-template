/**
 * 枚举定义工具
 * 示例：
 * const Status = createEnum({
 *     Success: { value: '1', label: '成功'},
 *     Fail: { value: '2', label: '失败' },
 * })
 * 获取枚举值：Status.Success-->value: 1
 * 获取枚举描述：Status.getLabel(Status.Success || 'Success')-->成功
 * 通过枚举值获取选择项：Status.getOption(true) true:带全部选项 -->[{value:'1', label:'成功'},value:'2', label:'失败']
 *
 */

export const createEnum = (optionParams = {}) => {
  // 参数的key值
  const paramsKeys = Object.keys(optionParams);

  // 所有的数据选项
  const paramsValues = Object.values(optionParams);

  const keysValues = {};

  paramsKeys.forEach((key) => {
    const option = optionParams[key];
    const { value = '' } = option || '';
    keysValues[key] = value;
  });

  return {
    ...keysValues,
    getLabel(keyOrValue = '') {
      const labelKey = Number.isInteger(keyOrValue) ? keyOrValue.toString() : keyOrValue;
      // key的情况
      const option = optionParams[labelKey] || {};
      const { label = '' } = option;
      if (label) {
        return label;
      }
      // value的情况
      const otherOption = paramsValues.find((item) => {
        return item.value === labelKey;
      });
      const { label: otherLabel = '' } = otherOption || {};
      if (otherLabel) {
        return otherLabel;
      }
      return labelKey;
    },
    getOptions(params = {}) {
      const { all = false, value = 'value', label = 'label' } = params;
      const options = paramsKeys.map((key) => {
        const option = optionParams[key];

        return generateOption({ option, value, label });
      });
      if (all) {
        options.unshift(generateAllOption({ value, label }));
      }
      return options;
    },
  };
};

/** 生成全部option */
const generateAllOption = ({ value = 'value', label = 'label' }) => {
  return {
    key: '',
    name: '全部',
    [value]: '',
    [label]: '全部',
  };
};
/** 生成option */
const generateOption = ({ option = {}, value = 'value', label = 'label' }) => {
  return {
    key: option.value,
    name: option.label,
    mate: option,
    [value]: option.value,
    [label]: option.label,
  };
};

/**
 * 将枚举对象转换成options
 * value=key名称 label=value的名称
 */
export const objectToOptions = (enumObject = {}, all = true, value = 'value', label = 'label') => {
  const keys = Object.keys(enumObject);

  const options = keys.map((key) => {
    return {
      key: key,
      name: enumObject[key],
      [value]: key,
      [label]: enumObject[key],
    };
  });
  if (all) {
    options.unshift(generateAllOption({ value, label }));
  }
  return options;
};
/**
 * 将枚举对象转换成options
 * value=key名称 label=value的名称
 */
export const arrayToOptions = (
  enumArray = [],
  all = true, // 是否需要空选项'全部'
  value = 'value',
  label = 'label',
) => {
  const options =
    enumArray.length > 0 &&
    enumArray?.map((item) => {
      return { key: item, name: item, [value]: item, [label]: item };
    });
  if (all) {
    options.unshift(generateAllOption({ value, label }));
  }
  return options;
};

/**
 * 转换其他对象数组To {value,label}
 */
export const transformObjectToOptions = (
  objectArray = [], // 需要转换的对象数组
  oldValue = '',
  oldLabel = '',
  newValue = 'value',
  newLabel = 'label',
) => {
  const options = objectArray?.map((item) => {
    return {
      key: item[oldValue],
      name: item[oldLabel],
      [newValue]: item[oldValue],
      [newLabel]: item[oldLabel],
    };
  });
  return options;
};
/**
 * 给一个option增加全部选项
 */
export const pushAllToOptions = (options = [], value = 'value', label = 'label') => {
  const localOptions = [...options];
  localOptions.unshift(generateAllOption({ value, label }));

  return localOptions;
};

/**
 * 从网络返回的option中获取label
 * @param {*} options
 * @param {*} value
 */
export const getOptionLabel = (options = [], value = '') => {
  const option = options?.find((item) => item.value === value);
  const { label = '' } = option || {};
  return label ? label : value;
};
