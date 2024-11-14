## 样式

#### 公共样式

公共样式使用`className`属性；
安装 vscode 提示插件[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)，`className`属性会自动提示；
示例

```jsx
/**
 * w-full: { width: 100% }
 * h-8: { height: 80rpx }
 * border: { borderWidth: 1px }
 * rounded-8: { borderRadius: 8rpx }
 * p-20: { padding: 20rpx }
 * center: { justifyContent: 'center', alignItems: 'center' }
 */
<View className="w-full h-8 border rounded-8 p-20 my-20 j-center"></View>

// 支持传入任意值，传入rpx值可自动转换单位
<View className="rounded-[10] h-[20rpx]"></View>

// 支持以下classnames写法
// 数组
<View className={['w-full h-8', 'border']}>
  {...}
</View>

// 对象
<View className={{ 'p-20': true, 'm-[20rpx]': false }}>
  {...}
</View>

// 数组加对象
<View className={['w-full h-8', { 'p-20': true, 'm-[20rpx]': false }]}>
  {...}
</View>
```

#### 其他样式

直接将样式对象传入`style`属性，可使用`@alboped/react-native-style`样式写法，会自动转换；

```jsx
const styles = {
  view: {
    height: '100rpx',
    padding: '20rpx 10rpx',
  }
}

<View style={styles.view}></View>
```

`className` 和 `style`可同时使用，`style`优先级更高；
