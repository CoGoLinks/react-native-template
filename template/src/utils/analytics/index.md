# 埋点

### 页面曝光

设置了 `options.title` 的页面会自动获取 `title` 上报页面曝光事件，page_name中的“页”字会自动加上；

示例：

```jsx
export default {
  name: 'Demo',
  options: {
    title: '页面名称'
  }
  ...
};
```

#### `pageName`

如果需要单独设置 `page_name`，比如没有title或者动态title的页面，可以使用`pageName`属性设置page_name；

示例：

```jsx
export default {
  name: 'Demo',
  options: {
    pageName: '页面名称'
  }
  ...
};
```

* 注意：自动页面曝光只在页面初始化时上报，初始未设置页面名称不会自动上报；

#### 手动页面曝光

`title` 和 `pageName` 都为空，或者将 `pageName` 设为 `false`，则不会自动上报页面曝光，使用一下 hooks 方式手动页面曝光；

### 其他买点

#### `useAnalytics`

在页面中的其他买点hooks的方式

示例：

```jsx
import { useFocusEffect } from '@react-navigation/native';
import { useAnalytics } from '@/utils/analytics';

function Page() {
  const { track } = useAnalytics();

  useFocusEffect(
    React.useCallback(() => {
      track.pageShow('页面名称');
    }, [])
  );

  const onPress = () => {
    track.buttonClick({
      page_name: '页面名称',
      button_name: '按钮',
    });
  }
}
```

暂时需要手动传 `page_name`，后期会自动获取该页面 `page_name`，敬请期待；

#### 埋点方法

##### track.pageShow

```js
// 只有page_name
track.pageShow('页面名称');

// 有其他参数
track.pageShow({
  page_name: '页面名称',
  other_params: '其他参数'
});
```

##### track.buttonClick

##### track.buttonShow

##### track.modClick

##### track.modShow
