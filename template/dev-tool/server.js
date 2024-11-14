const express = require('express');
const path = require('path');
const fs = require('fs');
const colors = require('../theme/colors');

const app = express();
const port = 3001;

const assetsPath = path.resolve(__dirname, '../src/assets/');

// 获取svg文件列表
const getIconsFiles = () => {
  const iconPath = path.resolve(assetsPath, 'icons/');
  const files = fs.readdirSync(iconPath);
  return files.filter((file) => /\.(svg|png)$/i.test(file));
};

// 获取image文件列表
const getImageFiles = () => {
  const imagePath = path.resolve(assetsPath, 'images/');
  const dirs = fs.readdirSync(imagePath);
  const dirMap = {};
  dirs.forEach((dir) => {
    const stat = fs.statSync(path.join(imagePath, dir));
    if (stat.isDirectory()) {
      const itemPath = path.resolve(imagePath, dir);
      const files = fs.readdirSync(itemPath);
      dirMap[dir] = files.filter((file) => /\.(svg|png)$/i.test(file));
    }
  });
  return dirMap;
};

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(
  '/static/images',
  express.static(path.join(__dirname, '../src/assets')),
);

app.use('/api/icons', (_, res) => {
  const svgs = getIconsFiles();
  res.send(svgs);
});

app.use('/api/images', (_, res) => {
  const svgs = getImageFiles();
  res.send(svgs);
});

app.use('/api/colors', (_, res) => {
  res.send({
    data: colors,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
