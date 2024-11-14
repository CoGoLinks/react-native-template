## react-native-template-alboped

> 这是一个 [**React Native**](https://reactnative.dev) 项目模版, 基于 react-native 官方模版.

### 主要功能点

- react-native 版本为 0.72.11
- [路由 📖](./src/navigation/index.md)：页面路由使用 [`react-navigation`](https://reactnavigation.org/)；
- [组件库 📖](./src/components/index.md)：基础组件库使用 [`react-native-ui-lib`](https://wix.github.io/react-native-ui-lib)、[`@ant-design/react-native`](https://rn.mobile.ant.design/)封装；
- [状态管理 📖](src/store/index.md)： 状态管理使用 [`zustand`](https://github.com/pmndrs/zustand)；
- [样式 📖](./src/style/index.md)：样式管理使用 [`tailwind`](https://tailwind.nodejs.cn/)；
- [表单 📖](src/components/form/index.md) [`rc-field-form`](https://github.com/react-component/field-form)，使用方式与`ant-design`中的`Form`组件相同；
- [网络请求 📖](src/utils/request/index.md)，使用`axios`封装；
- [埋点 📖](src/utils/analytics/index.md)

## 开始

### 💡 初始化项目

```bash
npx react-native init myApp --template react-native-template-alboped
```

### 🛠️ 安装依赖

安装 npm 依赖

```bash
# npm
npm install

# Yarn
yarn
```

安装 pod 依赖

```bash
# npm
npm run pod-install

# Yarn
yarn pod-install
```

### 🚀 启动项目

#### 启动 RN 服务

```bash
# npm
npm run start

# Yarn
yarn start
```

#### 启动 Android 应用

```bash
# npm
npm run android

# Yarn
yarn android
```

#### 启动 iOS 应用

```bash
# npm
npm run ios

# Yarn
yarn ios
```

如果顺利，会自动启动 android 模拟器或者 iOS 模拟器并运行 App

### 🎉 开始开发

- **Android** 点击 <kbd>Ctrl</kbd> + <kbd>M</kbd> (Window、Linux) 或 <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS)

- **iOS** 点击 <kbd>D</kbd> 或 <kbd>Ctrl</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>Z</kbd> 打开**开发者菜单**

- **Android** 和 **iOS** 点击 <kbd>R</kbd> 刷新应用

### 🔧 调试

- 命令行中点击 <kbd>J</kbd> 打开 react-native 调试工具、或使用 `Flipper` 进行调试

- 详细调试方法请查看官方文档 [中文](https://rn.nodejs.cn/docs/debugging) [英文](https://reactnative.dev/docs/debugging)

### 故障排除

- m1 版 mac 高德集成问题 [https://github.com/qiuxiang/react-native-amap-geolocation/issues/158](https://github.com/qiuxiang/react-native-amap-geolocation/issues/158)
- 其他故障排除，查看官方文档 [中文](https://rn.nodejs.cn/docs/troubleshooting) [英文](https://reactnative.dev/docs/troubleshooting)
  https://github.com/facebook/react-native/issues/43335
- xcode 15.3 react-native 0.72 以及之前，启动出现以下信息

```shell
No template named 'function' in namespace 'std'
```

[https://github.com/facebook/react-native/issues/43335](https://github.com/facebook/react-native/issues/43335)

### 其他

- 了解更多 react-native 相关信息，查看官方文档 [中文](https://rn.nodejs.cn/) [英文](https://reactnative.dev/)

### 项目目录结构

```
syt-app
├── App.tsx
├── README.md
├── app.json
├── assets                       // 原生静态资源
│   └── fonts                    // 字体文件
├── babel.config.js
├── index.js                     // 入口文件
├── metro.config.js
├── package.json
├── react-native.config.js
├── src
│   ├── App.jsx                  // 根组件
│   ├── assets                   // 资源文件
│   │   ├── icons                // 图标
│   │   ├── images               // 图片
│   │   └── index.js
│   ├── components               // 公共组件
│   ├── config                    // 公共配置
│   ├── pages                    // 页面
│   │   ├── tabs                 // 首页Tab路由
│   │   └── ...
│   ├── services                 // 接口请求
│   ├── store                    // 状态管理目录
│   ├── style
│   │   └── index.js
│   └── utils                    // 工具
├── tailwind.config.js            // tailwind配置
├── theme                        // 公共样式属性配置
├── tsconfig.json                 // ts配置
├── update.json                  // pushy 热更新配置
└── yarn.lock
```

### 完善内容

- ✅ 页面路由
- ✅ 状态管理
- ✅ 状态持久化
- ✅ 网络请求
- ✅ 样式
- ✅ 组件
  - ✅ [View](./src/components/view/index.md)
  - ✅ Text
  - ✅ TouchableOpacity
  - ✅ Image
  - ✅ [Icon](./src/components/icon/index.md)
  - ✅ [Button](./src/components/button/index.md)
  - ✅ [Toast](./src/components/toast/index.md)
  - ✅ [Modal](./src/components/modal/index.md)
  - ❎ Switch
  - ❎ List
  - ✅ [InfiniteScroll](./src/components/infinite-scroll/index.md)
- ✅ [表单](./src/components/form/index.md)
  - ✅ Input
  - ✅ Picker
  - ✅ DatePicker
- ✅ WebView
- ✅ 手机权限
- ❎ 多环境配置
- ✅ 热更新
- ❎ 自动打包
- ❎ 生成keystore
- ❎ 自动改名脚本
