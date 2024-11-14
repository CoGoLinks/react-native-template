export * from './StringUtil';
export * from './DateUtil';
export * from './EnumUtil';
export * from './FileUtil';
export * from './RegExpUtil';
/**
 * 获取数据类型
 */
export const getType = (e) => Object.prototype.toString.call(e).match(/\b(object\s+)(\w+)/)[2];

/**
 * 类型判断
 */
export const isString = (e) => getType(e) === 'String';
export const isNumber = (e) => getType(e) === 'Number';
export const isObject = (e) => getType(e) === 'Object';
export const isArray = (e) => getType(e) === 'Array';
export const isFunction = (e) => getType(e) === 'Function';
export const isDate = (e) => getType(e) === 'Date';
export const isMap = (e) => getType(e) === 'Map';
export const isSet = (e) => getType(e) === 'Set';
export const isPromise = (e) => getType(e) === 'Promise';
export const isBlob = (e) => getType(e) === 'Blob';
export const isArrayBuffer = (e) => getType(e) === 'ArrayBuffer';

/**
 * 判断对象是否为空对象
 */
export const isEmptyObject = (value) => {
  // 检查值是否为null或undefined
  if (value == null) {
    return true;
  }

  // 检查值是否为对象
  if (typeof value === 'object') {
    // 对象的情况下，检查是否有自己的可枚举属性
    return Object.keys(value).length === 0;
  }
  // 非对象类型不视为"空"
  return false;
};

/**
 * 管道方法
 * 用法：pipeline(fun1, fun2, fun3)(args);
 */
export const pipeline = (...args) => args.reduce((acc, el) => el(acc));

/**
 * 休眠
 * @param time 时间，毫秒
 * 用法：await sleep(2000);
 */
export const sleep = (time) => {
  return new Promise((res) => {
    setTimeout(() => res(), time);
  });
};

/* 生成唯一id */
export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    var r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
