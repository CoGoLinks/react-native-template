/**
 * 获取文件名
 * @param {*} path
 * @returns
 */
export const getFileName = (path) => {
  if (path) {
    const pos1 = path.lastIndexOf('/');
    const pos2 = path.lastIndexOf('\\');
    const pos = Math.max(pos1, pos2);
    if (pos < 0) {
      return path;
    } else {
      return path.substring(pos + 1);
    }
  }
  return path ?? '';
};

/**
 * 货物文件后缀
 * @param {*} filePath
 * @returns
 */
export const getFileExtension = (filePath = '') => {
  const regex = /\.([0-9a-z]+)$/i; // 匹配最后一个点号后的字母或数字作为文件后缀
  const match = filePath.match(regex);

  if (match) {
    return match[0].slice(1); // 去掉文件后缀中的点号
  } else {
    return ''; // 文件路径中未找到符合格式的文件后缀
  }
};
