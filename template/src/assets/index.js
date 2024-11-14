import { Assets } from 'react-native-ui-lib';

const svgFiles = require.context('./icons', true, /\.svg|png/);
const imgFiles = require.context('./images', true, /\.(svg|png|jpg|jpeg|gif)/);
const icons = {};

svgFiles.keys().forEach((item) => {
  const name = item.replace(/(.*\/)*([^.]+).*/gi, '$2');
  const [, fileType] = item.split(/\.(?=[^\.]+$)/);
  icons[name] = fileType === 'svg' ? svgFiles(item).default : svgFiles(item);
});

Assets.loadAssetsGroup('icons', icons);

// 遍历加载所有图片
imgFiles.keys().forEach((item) => {
  const [, group, fileNameFull] = item.split('/');
  const [fileName, fileType] = fileNameFull.split(/\.(?=[^\.]+$)/);

  Assets.loadAssetsGroup(`images.${group}`, {
    [fileName]: fileType === 'svg' ? imgFiles(item).default : imgFiles(item),
  });
});

// 加载远程图片
Assets.loadAssetsGroup('icons', {
  smiling: { uri: 'https://cdn-icons-png.flaticon.com/512/4562/4562332.png' }, // 笑脸
  puzzle: { uri: 'https://cdn-icons-png.flaticon.com/512/786/786285.png' }, // 拼图
  grid: { uri: 'https://cdn-icons-png.flaticon.com/512/3817/3817538.png' }, // 格子
  user: { uri: 'https://cdn-icons-png.flaticon.com/512/4210/4210226.png' }, // 用户
  code: { uri: 'https://cdn-icons-png.flaticon.com/512/8750/8750730.png' }, // 代码
  phone: { uri: 'https://cdn-icons-png.flaticon.com/512/2920/2920329.png' }, // 手机
  view: { uri: 'https://cdn-icons-png.flaticon.com/512/3405/3405258.png' }, // 布局
  text: { uri: 'https://cdn-icons-png.flaticon.com/512/8249/8249633.png' }, // 文本
  color: { uri: 'https://cdn-icons-png.flaticon.com/512/2071/2071669.png' }, // 文本
  block: { uri: 'https://cdn-icons-png.flaticon.com/512/10914/10914728.png' }, // 方块
  image: { uri: 'https://cdn-icons-png.flaticon.com/512/11258/11258577.png' }, // 图片
  message: { uri: 'https://cdn-icons-png.flaticon.com/512/10765/10765684.png' }, // 消息
  list: { uri: 'https://cdn-icons-png.flaticon.com/512/2874/2874790.png' }, // 列表
  carousel: {
    uri: 'https://cdn-icons-png.flaticon.com/512/10075/10075275.png',
  }, // 轮播
  modal: { uri: 'https://cdn-icons-png.flaticon.com/512/3178/3178431.png' }, // 弹框
  input: { uri: 'https://cdn-icons-png.flaticon.com/512/9671/9671337.png' }, // 输入
  select: { uri: 'https://cdn-icons-png.flaticon.com/512/570/570170.png' }, // 选择器
  switch: { uri: 'https://cdn-icons-png.flaticon.com/512/2099/2099172.png' }, // 开关
  checkbox: { uri: 'https://cdn-icons-png.flaticon.com/512/7046/7046053.png' }, // 多选框
});

export const iconList = Object.keys(icons);
