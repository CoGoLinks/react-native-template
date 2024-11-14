import React, { useMemo, useRef, Children } from 'react';
import { Animated, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import Style from '@alboped/react-native-style';
import { TouchableOpacity, View, Text } from '@/components';

const deviceWidth = Dimensions.get('window').width;
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const Tabs = ({
  initialPage = 0,
  activeLineColor = '#1677FF',
  children,
  ...rest
}) => {
  const tabRef = useRef();
  const viewRef = useRef();
  const dotWidth = 80; // 激活下划线宽度

  const initLeft = useMemo(() => {
    const itemWidth = deviceWidth / children?.length;
    const dotOffset = (itemWidth - Style.rpx(dotWidth)) / 2;
    return itemWidth * initialPage + dotOffset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage]);

  const onPageScroll = (e) => {
    const { offset, position } = e.nativeEvent;
    const itemWidth = deviceWidth / children.length;
    const dotOffset = (itemWidth - Style.rpx(dotWidth)) / 2;
    console.log('2', (offset + position) * itemWidth + dotOffset);
    viewRef.current?.setNativeProps({
      style: { left: (offset + position) * itemWidth + dotOffset },
    });
  };

  const handleTabPress = (index) => {
    tabRef.current.setPage(index);
  };

  const tabBarList = useMemo(() => {
    return Children.map(children, (child, index) => {
      return (
        <TouchableOpacity
          className="flex-1 center h-8"
          onPress={() => handleTabPress(index)}
        >
          <Text>{child.props?.label}</Text>
        </TouchableOpacity>
      );
    });
  }, [children]);

  console.log('1', initLeft);

  return (
    <>
      <View className="row">
        {tabBarList}
        <View
          ref={viewRef}
          className={`w-[${dotWidth}rpx] h-[6rpx] bg-[${activeLineColor}] rounded-3 absolute bottom-0 left-[${initLeft}]`}
        />
      </View>
      <AnimatedPagerView
        ref={tabRef}
        onPageScroll={onPageScroll}
        {...rest}
        children={children}
      />
    </>
  );
};

export default Tabs;
