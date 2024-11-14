### Button 按钮

```jsx
<Button onPress={onPress} type="primary" size="xl">
  按钮
</Button>
```

#### 属性说明

| **属性**      | **说明**                   | **类型**  | **可选值**                                     | **默认值** |
| ------------- | -------------------------- | --------- | ---------------------------------------------- | ---------- |
| type          | 按钮类型                   | String    | `default` \| `primary` \| `ghost` \| `warning` | -          |
| shape         | 按钮形状                   | String    | 方型`square` \| 圆形`round`                    | `square`   |
| size          | 图标大小，会自动转换为 rpx | String    | `lg` \| `xl` \| `sm` \| `xs`                   | `lg`       |
| textClassName | 文字样式类                 | ClassName | -                                              | -          |
| textStyle     | 文字样式                   | Style     | -                                              | -          |
| show          | 是否显示                   | Boolean   | `true`                                         | -          |
