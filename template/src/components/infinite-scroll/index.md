# InfiniteScroll 无限滚动

列表滚动到底部自动加载更多数据。

## 代码示例

```jsx
import { InfiniteScroll, View, Text } from '@/components';

function Example() {
  const loadMore = async ({ pageNum }) => {
    console.log('当前查询页数', pageNum);
    const { data, total } = await fetch('/api/list', { pageNum });
    return { data, total };
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return <InfiniteScroll loadMore={loadMore} renderItem={renderItem} />;
}
```

## 属性说明

| **属性**              | **说明**                                                                                                                                                                                                         | **类型**                                                                     | **可选值** | **默认值** |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ---------- | ---------- |
| loadMore              | 加载数据的异步方法，返回数据对象                                                                                                                                                                                 | async (pageNum: Number, sourceData: Array) => ({data: Array, total: Number}) | -          | -          |
| renderItem            | 渲染列表项                                                                                                                                                                                                       | (item: any, sourceData: Array) => React.ReactNode                            | -          | -          |
| onViewableItemChanged | 列表项显示或隐藏时的回调，返回值为 `item`: 列表项数据，`isViewable`: 该项是否显示，可见范围和变化频率等参数的配置请设置[viewabilityConfig](https://www.react-native.cn/docs/0.66/flatlist#viewabilityconfig)属性 | ({item: any, isViewable: Boolean}) => void(0)                                | -          | -          |
| 其他属性              | 支持其他 FlatList 属性                                                                                                                                                                                           | -                                                                            | -          | -          |

## 方法

`ref`可调用的方法

### refresh：刷新列表

刷新列表，pageNum 会重置为 1；

### cleanData：清空列表

清空列表
