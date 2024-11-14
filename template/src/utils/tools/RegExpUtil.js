// 大陆身份证号码
export const isCNCardId = (value) => {
  const regExp = new RegExp(
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    'g',
  );
  return regExp.test(value);
};
// 香港身份证号码
export const isHKCardId = (value) => {
  const regExp = new RegExp(/^([a-z]|[A-Z]|[0-9]){8}$/, 'g');
  return regExp.test(value);
};
// 护照
export const isPassport = (value) => {
  const regExp = new RegExp(/^([a-z]|[A-Z]|[0-9]){9}$/, 'g');
  return regExp.test(value);
};
/**
 * 是否为数字
 */
export const isNumber = (value) => {
  const regExp = new RegExp(/^-?[0-9]+(?:\.[0-9]+)?$/, 'g');
  return regExp.test(value);
};
/**
 * 是否为整数
 */
export const isTotalNumber = (value) => {
  const regExp = new RegExp(/(^-?[1-9]([0-9]*)$|^-?[0-9]$)/, 'g');
  return regExp.test(value);
};

/**
 * 数字、保存两位小数
 */
export const isNumberDecimal = (value) => {
  const regExp = new RegExp(/^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/, 'g');
  return regExp.test(value);
};

/**
 * 手机号码
 */
export const isMobile = (value) => {
  const regExp = new RegExp(/^1[0-9]{10}$/, 'g');
  return regExp.test(value);
};
/**
 * 电子邮箱
 */
export const isEMail = (value) => {
  const regExp = new RegExp(
    /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
    'g',
  );
  return regExp.test(value);
};

/**
 * 英文字母
 */
export const isEnglish = (value) => {
  const regExp = new RegExp(/^[a-zA-Z0-9&., _()#*^$@'/\-s]*$/, 'g');
  return regExp.test(value);
};
/**
 * 英文字母数字
 */
export const isEnglishNumber = (value) => {
  const regExp = new RegExp(/^[A-Za-z0-9]+$/, 'g');
  return regExp.test(value);
};
/**
 * 正整数数字
 */
export const isPositiveNumber = (value) => {
  const regExp = new RegExp(/^[0-9]\d*$/, 'g');
  return regExp.test(value);
};
/**
 * 非零的正整数
 */
export const isPositiveInt = (value) => {
  const regExp = new RegExp(/^[0-9]\d*$/, 'g');
  return regExp.test(value);
};

/**
 * 有两位小数的正实数
 */
export const isPositiveDecimals = (value) => {
  const regExp = new RegExp(/^[0-9]+(\.[0-9]{1,2})?$/, 'g');
  return regExp.test(value);
};

// 检查验证码格式
export function validateSmsCode(str, length = 6) {
  return new RegExp(`^\\d{${length}}$`).test(str);
}
