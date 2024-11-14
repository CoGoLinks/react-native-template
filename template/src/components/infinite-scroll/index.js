/**
 * 无线滚动组件
 */
import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from 'react';
import { FlatList } from 'react-native';
import { Text } from '../';
import Style from '@alboped/react-native-style';

// 转换数据格式
const defFormatData = ({ data }) => {
  const { records, total } = data;
  return {
    data: records,
    total,
  };
};

const InfiniteScroll = forwardRef((props, ref) => {
  const {
    renderItem = () => {},
    keyExtractor = (_, index) => `${index}`,
    onEndReachedThreshold = 0.08,
    progressViewOffset = 2,
    initialNumToRender = 20,
    showLoading = true,
    onEndReached = () => {},
    onRefresh = () => {},
    ListEmptyComponent = null,
    loadMore = () => {}, // 加载更多数据
    autoLoad = true, // 是否自动加载数据
    viewabilityConfig = {}, // 可见监听配置
    onViewableItemsChanged = () => {}, // 元素可见监听事件
    onViewableItemChanged = () => {}, // 元素可见监听事件（每一条触发一次）
    beforeData = [],
    formatData = defFormatData, // 格式化loadMore返回的数据
    keyboardShouldPersistTaps = 'handled',
    setTotalCount = () => {},
    ...other
  } = props;

  const listRef = useRef();
  const dataRef = useRef({
    pageNum: 1, // 当前页数
    allowLoad: autoLoad, // 是否允许加载数据
    loadTimeStamp: 0,
  });

  const [sourceData, setSourceData] = useState([]); // 数据列表
  const [sourceDataTotal, setSourceDataTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false); // 是否加载中
  const [hasMore, setHasMore] = useState(true); // 是否还有数据
  const [hasError, setHasError] = useState(false); // 是否加载失败
  dataRef.current.hasMore = hasMore;

  useEffect(() => {
    if (autoLoad) {
      loadData();
    }
  }, []);

  // 获取列表
  const loadData = async () => {
    if (refreshing || !dataRef.current.hasMore || hasError) {
      return;
    }
    setRefreshing(true);
    setHasError(false);
    try {
      const result = await loadMore({
        pageNum: dataRef.current.pageNum,
        sourceData,
      });

      const { data, total } = formatData(result);

      let nextSourceData = data;

      if (dataRef.current.pageNum > 1) {
        nextSourceData = [...sourceData, ...data];
      }

      dataRef.current.loadTimeStamp = Date.now();
      setSourceData(nextSourceData);
      setSourceDataTotal(total);
      setTotalCount(total);

      // 未获取到数据 或 获取到数据已达到总条数
      if (data.length === 0 || nextSourceData.length >= total) {
        setHasMore(false);
      } else {
        dataRef.current.pageNum++;
      }
    } catch (_) {
      setHasError(true);
    } finally {
      setRefreshing(false);
    }
  };

  const handlOnEndReached = (e) => {
    const interval = Date.now() - dataRef.current.loadTimeStamp;
    if (dataRef.current.allowLoad && interval > 400) {
      loadData();
      onEndReached(e);
    }
  };

  // 刷新
  const handleOnRefresh = (e) => {
    dataRef.current.pageNum = 1;
    dataRef.current.allowLoad = true;
    setHasMore(true);
    setTimeout(() => {
      loadData();
      onRefresh(e);
    });
  };

  // 清空数据
  const cleanData = () => {
    dataRef.current.pageNum = 1;
    setHasMore(true);
    setHasError(false);
    setSourceData([]);
  };

  useImperativeHandle(ref, () => {
    listRef.current.refresh = handleOnRefresh;
    listRef.current.cleanData = cleanData;
    listRef.current.currentData = () => sourceData;
    listRef.current.currentDataTotal = () => sourceDataTotal;
    return listRef.current;
  });

  // 包装renderItem函数
  const renderDataItem = (option) => renderItem({ ...option, sourceData });

  // 渲染列表底部元素
  const renderFooter = useMemo(() => {
    if (refreshing) {
      return (
        <Text center style={styles.footText}>
          正在加载...
        </Text>
      );
    }

    if (!refreshing && sourceData.length === 0) {
      if (!ListEmptyComponent) {
        return (
          <Text center style={styles.footText}>
            -暂无更多数据-
          </Text>
        );
      } else if (React.isValidElement(ListEmptyComponent)) {
        return ListEmptyComponent;
      } else if (typeof ListEmptyComponent === 'function') {
        return ListEmptyComponent();
      }
      return <ListEmptyComponent />;
    }

    if (hasError) {
      return (
        <Text center style={styles.footText}>
          加载失败！
        </Text>
      );
    }

    if (!hasMore) {
      return (
        <Text center style={styles.footText}>
          -暂无更多数据-
        </Text>
      );
    }

    return (
      <Text center style={styles.footText}>
        加载更多
      </Text>
    );
  }, [refreshing, sourceData, hasError, hasMore, ListEmptyComponent]);

  // 元素可见监听事件
  const handleOnViewableItemsChanged = useCallback((itemsChanged) => {
    onViewableItemsChanged(itemsChanged);
    const { changed = [] } = itemsChanged || {};
    changed.forEach && changed.forEach(onViewableItemChanged);
  }, []);

  const sourceDataList = useMemo(() => {
    return [...beforeData, ...sourceData];
  }, [beforeData, sourceData]);

  return (
    <FlatList
      ref={listRef}
      data={sourceDataList}
      renderItem={renderDataItem}
      keyExtractor={keyExtractor}
      onRefresh={handleOnRefresh}
      onEndReachedThreshold={onEndReachedThreshold}
      onEndReached={handlOnEndReached}
      progressViewOffset={progressViewOffset}
      initialNumToRender={initialNumToRender}
      refreshing={showLoading && refreshing}
      ListFooterComponent={renderFooter}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 100,
        ...viewabilityConfig,
      }}
      onViewableItemsChanged={handleOnViewableItemsChanged}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      {...other}
    />
  );
});

const styles = Style.create({
  footText: {
    marginVertical: '40rpx',
    color: '#ABAEB3',
    fontSize: '28rpx',
  },
});

export default InfiniteScroll;
