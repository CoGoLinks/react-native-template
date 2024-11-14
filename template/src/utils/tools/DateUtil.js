export const formatMilliseconds = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000); // 计算分钟数
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0); // 计算秒数
  return minutes + '分' + (seconds < 10 ? '0' : '') + seconds + '秒'; // 格式化输出
};
/**
 * @param no 接收的字符串（身份证号）
 * @param slipt 分割方式，默认：-
 * @param isDate 是否只显示月日，默认：false
 * @param isRreverse 是否为倒叙显示，如：日-月-年，默认：false
 * @returns string 脱敏后的字符串
 */
export const getBirth = (idCardNo = '', slipt = '-', isDate = false, isRreverse = false) => {
  if (!idCardNo) {
    return idCardNo;
  }
  const toStr = idCardNo.toString();
  const yearStr = toStr.substring(6, 10);
  const dateStr = `${toStr.substring(10, 12)}${slipt}${toStr.substring(12, 14)}`;
  const reulst = isDate ? dateStr : `${yearStr}${slipt}${dateStr}`;
  return isRreverse ? reulst.split(slipt).reverse().join(slipt) : reulst;
};

export const getAge = (idCardNo = '') => {
  if (!idCardNo) {
    return idCardNo;
  }
  const toStr = idCardNo.toString();
  const birth = new Date(getBirth(toStr));
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
  ) {
    age--;
  }
  return age;
};
