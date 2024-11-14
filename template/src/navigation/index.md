# 页面路由

### 新增页面

在 pages 目录中以`.nav.jsx`结尾的文件会被自动引入到路由中；

示例：

```js
// 文件名 demo.nav.jsx
function DemoPage = () => {
  return ...;
}

export default {
  name: 'Demo',
  components: DemoPage,
};
```

###### 页面文件必须导出一个对象，导出的对象会被传入`Stack.Screen`组件，具体属性说明参考 `react-navigation Stack.Screen` [options 参数说明](https://reactnavigation.org/docs/native-stack-navigator#options)

### options 自定义配置

#### `headerRightButton`: 导航栏右侧按钮

##### 基本用法

```js
export default {
  name: 'Demo',
  component: Demo,
  options: {
    title: '页面',
    headerRightButton: {
      label: '按钮',
      onPress: ({ navigation }) => {
        navigation.push('Page1');
      },
    },
  },
};
```

##### 图标按钮

```js
export default {
  name: 'Demo',
  component: Demo,
  options: {
    title: '页面',
    headerRightButton: {
      label: <Icon color="#333" name="home" size={46} />,
      onPress: ({ navigation }) => {
        navigation.push('Page1');
      },
    },
  },
};
```

#### `backOnPress`：自定义返回按钮点击事件

##### 用法

```js
export default {
  name: 'Demo',
  component: Demo,
  options: {
    title: '页面',
    backOnPress: ({ navigation, route }) => {
      console.log(route);
      navigation.goBack();
    },
  },
};
```

### intercept 页面跳转拦截器

跳转页面前先执行拦截器函数，函数内可判断是否跳转

```jsx
export default {
  name: 'Demo',
  component: Demo,
  intercept: ({ next, navigation }) => { // 拦截器函数
    if (isJump) {
      next(); // 继续跳转，保持原有跳转方式：push/replace/navigate
      // navigation.push(...); // 可自行跳转其他页面
    } else {
      Toast.info('不可跳转');
    }
  },
};
```

#### `intercept({ next, navigation, route }) => void()` 拦截器函数

##### next：继续跳转

- 不传参数时，将保持原有跳转方式（push/replace/navigate）进行跳转，且不会再经过拦截器函数
- 也可以传参 `next(routeName, params)`，修改跳转页面和参数
- 注意，通过传参跳转时，不能传当前页面，否则会继续经过拦截器函数，导致死循环

##### route：路由参数信息

##### navigation：跳转导航器

navigation 对象，可自行跳转其他页面
