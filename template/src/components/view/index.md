## View 视图

#### 普通方法

```jsx
import { View } from '@/components';

<View className="h-20 m-20">
  {...}
</View>
```

#### 使用渐变背景

##### linearGradient 属性

```jsx
<View
  className="h-10 center"
  linearGradient={{
    start: { x: 0.0, y: 0.25 },
    end: { x: 0.9, y: 1 },
    locations: [0, 0.9],
    colors: ['#ED6A0C', '#07C160'],
  }}
>
  <Text className="text-2xl text-c-w font-w5">渐变</Text>
</View>
```

#### 属性说明

| **属性**       | **说明** | **类型**  | **可选值** | **默认值** |
| -------------- | -------- | --------- | ---------- | ---------- |
| className      | 样式类   | ClassName | -          | -          |
| show           | 是否显示 | Boolean   | `true`     | -          |
| linearGradient | 渐变属性 | Object    | -          | -          |

- 传入`linearGradient`属性，可以设置渐变背景，详细参数请参考 [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient?tab=readme-ov-file#props) 文档。

- 其他属性请参考 [View](https://rn.nodejs.cn/docs/view) 文档。
