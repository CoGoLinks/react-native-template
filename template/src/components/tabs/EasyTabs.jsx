import React, { useMemo, useRef } from 'react';
import { View, TouchableOpacity, Text, ScrollView, Image } from '@/components';

const Tabs = ({
  items = [],
  type = 'default',
  value = '',
  onChange = () => {},
  className = '',
  bgColor = 'bg-c-w',
  style = {},
}) => {
  const activeClazz = useMemo(() => {
    if (type === 'default') {
      return {
        box: 'mr-[44rpx] border-b-[6rpx] rounded-[3rpx] border-c-primary',
        text: 'pb-[20rpx] pt-[30rpx] font-w5 text-[28rpx] text-c-n8',
      };
    } else if (type === 'round') {
      return {
        box: 'bg-[rgba(193,60,30,0.1)]  pt-[12rpx] pb-[12rpx] pl-[46rpx] pr-[46rpx] rounded-[28rpx] mr-[24rpx]"',
        text: 'font-w5 text-[26rpx] text-c-n8',
      };
    }
  }, [type]);

  const unActiveClazz = useMemo(() => {
    if (type === 'default') {
      return {
        box: 'mr-[44rpx] rounded-[3rpx] border-b-[6rpx] border-c-w',
        text: 'pb-[20rpx] pt-[30rpx] font-w4 text-[28rpx] text-c-n6',
      };
    } else if (type === 'round') {
      return {
        box: 'bg-[#EFEFEF] pt-[12rpx] pb-[12rpx] pl-[46rpx] pr-[46rpx] rounded-[28rpx]  mr-[24rpx]',
        text: 'font-w5 text-[26rpx] text-c-n8',
      };
    }
  }, [type]);
  const scrollRef = useRef();
  const offseWidthList = React.useRef([0]);
  const offseHeightList = React.useRef([0]);
  const onContentSizeChange = async () => {
    const currentIndex = items.findIndex((item) => item.value === value);
    setTimeout(() => scrollToTab(currentIndex), 1);
  };
  const scrollToTab = (tabId) => {
    scrollRef?.current?.scrollTo({
      x: offseWidthList?.current[tabId],
      y: 0,
      animated: false,
    });
  };
  const setOffsetInfo = (e, index) => {
    const { layout } = e.nativeEvent;
    offseWidthList.current[index] = layout.x - 12;
    offseHeightList.current = layout.height;
  };
  return (
    <View style={{ ...style }} className={`relative ${className}`}>
      <ScrollView
        style={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        endFillColor="#ffffff"
        ref={scrollRef}
        onContentSizeChange={onContentSizeChange}
      >
        <View className={`flex-row  items-end pl-[22rpx] pt-[12rpx] pb-[12rpx] ${bgColor}`}>
          {items?.map((item, index) => {
            if (item?.value === value) {
              return (
                <TouchableOpacity
                  key={item?.value}
                  disabled={true}
                  activeOpacity={0.7}
                  onPress={() => onChange(item)}
                  className={activeClazz?.box}
                  onLayout={(e) => setOffsetInfo(e, index)}
                >
                  <Text className={activeClazz?.text}>
                    {item?.label || ''}
                    {item?.extra ? ` ${item?.extra}` : ''}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={item?.value}
                  activeOpacity={0.7}
                  onPress={() => onChange(item)}
                  className={unActiveClazz?.box}
                >
                  <Text className={unActiveClazz?.text}>
                    {item?.label || ''}
                    {item?.extra ? ` ${item?.extra}` : ''}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </ScrollView>
      {items.length >= 5 && bgColor === 'bg-c-w' && (
        <View
          pointerEvents="none"
          className={`absolute w-9 right-0 z-10 h-[${offseHeightList.current}px]`}
        >
          <Image assetName="common.occlusion" resizeMode="contain" className="h-full w-full" />
        </View>
      )}
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: '#fff',
  },
};
export default Tabs;
