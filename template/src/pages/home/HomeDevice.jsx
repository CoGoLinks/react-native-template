import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Icon, ScrollView } from '@/components';
import { Animated } from 'react-native';
import { tw } from '@/style';
import Style from '@alboped/react-native-style';
import { useStore } from '@/store';
import { canSignAgreement } from '@/services/order';
import { AgreementTypeEnum } from '@/enums';

/**
 * 首页头部
 */
export default ({ push, isOrg, navigation }) => {
  const { userInfo, identity } = useStore('userInfo', 'identity');
  const isSign = identity?.sign; // 直签
  const toolFunList = [
    (isOrg || isSign) && {
      label: '物料申请',
      icon: 'shopping_cart',
      route: 'GoodsListView',
      callback: () => {
        const { tel } = userInfo;
        canSignAgreement().then((res) => {
          const { errorType, data } = res;
          if (!errorType) {
            if (data) {
              navigation.push('ProtocolSignView', {
                url: data,
                title: '采购合作协议',
                data: { tel, pageType: AgreementTypeEnum.ProcureCooperate },
              });
            } else {
              navigation.push('GoodsListView');
            }
          }
        });
      },
    },
    (isOrg || isSign) && {
      label: '我的订单',
      icon: 'order2',
      route: 'OrderListView',
    },
    {
      label: '设备划拨',
      icon: 'device_transfer',
      route: 'EquipmentTransfer',
    },
    {
      label: '设备回拨',
      icon: 'device_back',
      route: 'DeviceCallback',
    },
    {
      label: '设备活动',
      icon: 'device_active',
      route: 'DeviceActivityView',
    },
    {
      label: '设备费率',
      icon: 'device_rate',
      route: 'DeviceRateView',
    },
  ];

  const list = toolFunList.filter(Boolean);
  const renderToolList = useMemo(() => {
    return list.map((item, index) => {
      let classz = 'flex-1 center mr-[28rpx] ';
      if (index === 0) {
        classz += 'ml-[16rpx]';
      } else if (index === list?.length - 1) {
        classz += 'mr-[16rpx]';
      }
      return (
        <View key={index} className={classz}>
          <TouchableOpacity
            onPress={() => {
              if (item.callback) {
                item.callback && item.callback();
              } else {
                push(item.route, item?.data ?? {});
              }
            }}
          >
            <Icon name={item.icon} className="mb-[14rpx]" size={60} />
          </TouchableOpacity>
          <Text className="text-c-text text-xs font-w4">{item.label}</Text>
        </View>
      );
    });
  }, [list, push]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [width, setWidth] = useState('');
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dots = Math.ceil(list.length / 6);
  useEffect(() => {
    const count = list ? list.length || 1 : 0;
    const index = count > 1 ? Math.min(selectedIndex, count - 1) : 0;
    setSelectedIndex(index);
  }, [list, selectedIndex]);
  const handleScroll = (event) => {
    let x = event?.nativeEvent?.contentOffset?.x;
    console.log('x', x, 'pw', Style.rpx(pw), 'x / Style.rpx(pw)', (x / Style.rpx(pw)) * 100);
    if (x <= 0) {
      x = 0;
    } else if (Style.rpx(pw) < x) {
      x = 100;
    } else {
      x = (Style.rpx(pw) / x) * 100;
    }
    console.log('end---x', x);

    setMargin(x);
    // Animated.timing(margin, {
    //   toValue: x,
    //   duration: 300,
    //   easing: Easing.linear,
    //   useNativeDriver: true,
    // }).start();
  };
  const [margin, setMargin] = useState(0);
  const pw = 50;
  const renderDotsView = () => {
    return (
      <View className="row a-center j-center">
        <View className={['mb-[14rpx] bg-[#ededed]', `w-[${pw}rpx]`]}>
          <Animated.View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              backgroundColor: tw.color('c-primary'),
              // transform: [{ translateX: `${margin}%` }],
              marginLeft: `${margin}%`,
              width: Style.rpx(16),
              height: Style.rpx(10),
              borderRadius: Style.rpx(6),
            }}
          />
        </View>
      </View>
    );
  };
  const onLayout = (e) => {
    const width_ = e.nativeEvent.layout.width;
    setWidth(width_);
  };
  const onScrollEnd = (e) => {
    if (!e.nativeEvent.contentOffset) {
      const position = e.nativeEvent.position;
      e.nativeEvent.contentOffset = {
        x: position * width,
      };
    }
    updateIndex(e.nativeEvent.contentOffset);
  };
  const updateIndex = (offset_) => {
    let selectedIndex_ = selectedIndex;
    let diff = offset_.x - offset.x;
    let step = width;
    let count_ = list ? list.length || 1 : 0;

    // Do nothing if offset no change.
    if (!diff) {
      return;
    }

    selectedIndex_ = parseInt(selectedIndex_ + Math.round(diff / step), 10);
    if (selectedIndex_ <= -1) {
      selectedIndex_ = count_ - 1;
      offset_.x = step * count_;
    } else if (selectedIndex_ >= count_) {
      selectedIndex_ = 0;
      offset_.x = step;
    }
    setSelectedIndex(selectedIndex_);
    setOffset(offset_);
  };
  useEffect(() => {
    // const marginLeft = Animated.timing(margin, {
    //   toValue: 20,
    //   duration: 1000,
    //   easing: Easing.in,
    //   useNativeDriver: true,
    // }).start();
  }, []);
  return (
    <View
      className={['p-[14rpx] pt-0 rounded-8 flex-1']}
      linearGradient={{
        start: { x: 0.5, y: 0.5 },
        locations: [0, 1],
        colors: ['#F7E5E5', '#FEF5F5'],
      }}
    >
      <View className="row h-[142rpx] pl-[14rpx] pt-[34rpx] pr-[6px] relative">
        <View className="flex-1">
          <Text className="text-xl text-[#5D090A] font-w5">设备管理</Text>
          <Text className="text-sm text-[rgba(137,24,25,0.7)]">查看设备数量、调整设备属性</Text>
        </View>
        <TouchableOpacity
          className="row center w-15 h-[36rpx] bg-c-w rounded-18 pl-1 absolute top-[32rpx] right-[20rpx]"
          onPress={() => push('DeviceStoreView')}
        >
          <Text className="text-[#A95657] text-xs">设备仓库</Text>
          <Icon name="right2" color="#891819" size={22} />
        </TouchableOpacity>
      </View>
      <View className="pt-[22rpx] bg-[rgba(255,255,255,0.7)]">
        <ScrollView
          // pagingEnabled
          horizontal
          // removeClippedSubviews={false}
          // automaticallyAdjustContentInsets={false}
          // directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          // showsVerticalScrollIndicator={false}
          className="row h-[104rpx] rounded-4 mb-30"
          // onMomentumScrollEnd={onScrollEnd}
          // contentOffset={offset}
          onScroll={handleScroll}
          scrollEventThrottle={16} // 控制事件触发频率
        >
          {renderToolList}
        </ScrollView>
        {/* {renderDotsView()} */}
      </View>
    </View>
  );
};
const styles = {
  oh: {
    backgroundColor: 'red',
    // w-[16rpx] h-1 mr-10 rounded-6 bg-c-primary
    width: '16rpx',
    height: '10rpx',
    marginRight: '10rpx',
    borderRadius: '6rpx',
    // transform: [{ translateX: 50 }],
    transform: [{ rotate: '45deg' }],
  },
};
