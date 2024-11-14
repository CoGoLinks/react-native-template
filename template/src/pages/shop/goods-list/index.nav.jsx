import React, { useCallback, useEffect } from 'react';
import {
  View,
  Toast,
  EasyTabs,
  EasySegmented,
  Icon,
  Text,
  TouchableOpacity,
  Image,
} from '@/components';
import {
  findLastOrderShippingUrl,
  deviceListUrl,
  isCanBuyCoupon,
  couponList,
} from '@/services/order';
import { SectionList } from 'react-native';
import { MaterialStatusEnum } from '@/enums';
import GoodsItem from './GoodsItem';
import Footer from './Footer';

/**
 * 机具列表
 */
function GoodsListView(props) {
  const [loading, setLoading] = React.useState(false);
  const [dataSource, setDataSource] = React.useState([]);
  const [activeStatus, setActiveStatus] = React.useState('');
  const [selectSegmented, setSelectedSegmented] = React.useState(MaterialStatusEnum.Device);
  const [canShowCoupon, setCanShowCoupon] = React.useState(false);

  /**
   * 使用有一个商品选中
   */
  const isDisabled = React.useMemo(() => {
    const flattenData = [].concat(...dataSource);
    // 过滤出选中项
    const checkedGoodsList = flattenData.filter((goodsItem) => goodsItem.checked);
    return checkedGoodsList.length === 0;
  }, [dataSource]);
  /**
   * 总金额
   */
  const totalAmount = React.useMemo(() => {
    const flattenData = [].concat(...dataSource);
    // 过滤出选中项
    const checkedGoodsList = flattenData.filter((goodsItem) => goodsItem.checked);
    let total = 0;
    checkedGoodsList.forEach((goodsItem) => {
      total += goodsItem.unitPrice * goodsItem.amount;
    });
    return total;
  }, [dataSource]);

  /**
   * 请求机具
   */
  const isCanBuyCouponAction = useCallback(async () => {
    setLoading(true);
    try {
      const res = await isCanBuyCoupon();
      const { data = [], errorType } = res || {};
      if (!errorType && data) {
        setCanShowCoupon(true);
      } else {
        setCanShowCoupon(false);
      }
    } catch (error) {}
  }, []);

  // 获取优惠券列表
  const couponListAction = useCallback(async () => {
    const res = await couponList();
    const { data = [], errorType } = res || {};
    if (!errorType) {
      const _dataSource = data?.map((item) => {
        // {
        //   "subModelId": "7136",
        //   "subModelName": "1.0+Epos-华智融NEW6220(4G)",
        //   "modelName": "1.0+Epos-华智融NEW6220(4G)",
        //   "minQuantity": 5,
        //   "unitQuantity": 1,
        //   "unitPrice": 40,
        //   "unit": "台",
        //   "imageUrl": "https://sms-admin-test.suixingpay.com/img/logo_3.png"
        // }
        return { amount: item.minQuantity, ...item };
      });
      setDataSource(_dataSource);
    } else {
      setDataSource([]);
    }
  }, []);

  const fetchList = useCallback(() => {
    setDataSource([]);
    if (selectSegmented === MaterialStatusEnum.Coupon) {
      couponListAction();
    } else {
      requestDataAction();
    }
  }, [couponListAction, requestDataAction, selectSegmented]);

  useEffect(() => {
    isCanBuyCouponAction();
    fetchList();
  }, [fetchList, isCanBuyCouponAction]);
  /**
   * 请求机具
   */
  const requestDataAction = useCallback(async () => {
    setLoading(true);
    try {
      const res = await deviceListUrl();
      const { data = [], errorType } = res || {};
      if (!errorType) {
        const _dataSource = data?.map((item) => {
          // {
          //   "subModelId": "7136",
          //   "subModelName": "1.0+Epos-华智融NEW6220(4G)",
          //   "modelName": "1.0+Epos-华智融NEW6220(4G)",
          //   "minQuantity": 5,
          //   "unitQuantity": 1,
          //   "unitPrice": 40,
          //   "unit": "台",
          //   "imageUrl": "https://sms-admin-test.suixingpay.com/img/logo_3.png"
          // }
          return { amount: item.minQuantity, ...item };
        });
        setDataSource(_dataSource);
      } else {
        setDataSource([]);
      }
    } catch (error) {
      console.warn('error =', error);
      setLoading(false);
      setDataSource([]);
    }
    setLoading(false);
  }, []);

  /**
   * 点击列表项
   */
  const onGoodsItemChecked = useCallback(
    (goodsItem = {}) => {
      const _dataSource = dataSource.map((_goodsItem) => {
        if (_goodsItem.subModelId === goodsItem.subModelId) {
          _goodsItem.checked = !_goodsItem.checked;
        }
        return _goodsItem;
      });
      setDataSource(_dataSource);
    },
    [dataSource],
  );
  /**
   * 商品数量改变
   */
  const onAmountChange = useCallback(
    (goodsItem = {}, action = '') => {
      const _dataSource = dataSource.map((_goodsItem) => {
        if (_goodsItem.subModelId === goodsItem.subModelId) {
          if (action === 'add') {
            _goodsItem.amount = _goodsItem.amount + _goodsItem.unitQuantity;
          } else if (action === 'minus') {
            if (_goodsItem.amount <= _goodsItem.unitQuantity) {
              Toast.info('购买数量不可小于' + _goodsItem.minQuantity);
              return;
            }
            _goodsItem.amount = _goodsItem.amount - _goodsItem.unitQuantity;
          }
        }
        return _goodsItem;
      });
      setDataSource(_dataSource);
    },
    [dataSource],
  );
  /**
   * 提交表单
   */
  const onSubmit = useCallback(async () => {
    Toast.loading('处理中...');
    const _dataSource = dataSource.filter((item) => {
      return item?.checked || false;
    });
    try {
      const res = await findLastOrderShippingUrl({});
      if (!res?.errorType) {
        const { data = {} } = res || {};
        props.navigation.push('PlaceOrderView', {
          data: _dataSource, // 选中的商品
          address: data, // 地址信息
        });
      }
    } catch (error) {
      Toast.hide();
      console.log('error=', error);
      props.navigation.push('PlaceOrderView', {
        data: _dataSource, // 选中的商品
        address: {}, // 地址信息
      });
    }
    Toast.hide();
  }, [dataSource, props.navigation]);

  const tabItems = [
    {
      value: '',
      label: '全部',
    },
    {
      value: '0.59',
      label: '券后0.59',
    },
    {
      value: '0.58',
      label: '券后0.58',
    },
    {
      value: '0.57',
      label: '券后0.57',
    },
    {
      value: '0.56',
      label: '券后0.56',
    },
    {
      value: '0.55',
      label: '券后0.55',
    },
  ];

  // 无数据展示组件
  const DataCatchRender = useCallback(() => {
    return (
      <View className="a-center flex-1">
        <Image assetName="common.empty_order" resizeMode="contain" className="mt-[180rpx]" />
        <Text className="text-xl text-c-n7 top-[-36rpx] pb-100">暂无记录</Text>
      </View>
    );
  }, []);

  return (
    <View className="flex-1 ">
      {canShowCoupon && (
        <View className="bg-c-w">
          <EasySegmented
            items={MaterialStatusEnum.getOptions()}
            showIcon
            value={selectSegmented}
            onChange={(item) => {
              setSelectedSegmented(item.value);
            }}
          />
        </View>
      )}

      {selectSegmented === MaterialStatusEnum.Coupon && canShowCoupon ? (
        <>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('PurchaseGuideView');
            }}
            className="flex-row items-center bg-[#FFFBE8] pl-[22rpx] pr-[22rpx] pt-[14rpx] pb-[14rpx]"
          >
            <Icon name="PurchaseGuide" size="20" className="text-c-n5" />
            <Text className="font-w4 text-[#ED6A0C] text-[24rpx] ml-[10rpx]">
              购券攻略，立即查看 {'>>>'}
            </Text>
          </TouchableOpacity>
          <EasyTabs
            bgColor="bg-[#F5F5F5]"
            items={tabItems}
            type="round"
            value={activeStatus}
            onChange={(item) => {
              setActiveStatus(item.value);
            }}
          />
        </>
      ) : null}
      {dataSource.filter((item) => item?.subModelName.includes(activeStatus) || false).length ===
      0 ? (
        <DataCatchRender />
      ) : (
        <SectionList
          style={styles.container}
          initialNumToRender={10} //始渲染的元素数量
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => item + index} //每行不重复的key
          sections={[
            {
              data: dataSource.filter((item) => item?.subModelName.includes(activeStatus) || false),
            },
          ]} //数据源
          renderItem={({ item }) => {
            //渲染每一个section中的每一个列表项的默认渲染器
            return (
              <GoodsItem item={item} onChecked={onGoodsItemChecked} onChange={onAmountChange} />
            );
          }}
          // eslint-disable-next-line react/no-unstable-nested-components
          ItemSeparatorComponent={() => {
            return <View className="h-[22rpx]" />;
          }}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListHeaderComponent={() => {
            return <View className="h-[22rpx]" />;
          }}
          // eslint-disable-next-line react/no-unstable-nested-components
          ListFooterComponent={() => {
            return <View className="h-[22rpx] bg-c-n2" />;
          }}
        />
      )}

      <Footer
        loading={loading}
        disabled={isDisabled}
        totalAmount={totalAmount}
        onSubmit={onSubmit}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  line: {
    height: '22rpx',
  },
};

export default {
  name: 'GoodsListView',
  component: GoodsListView,
  options: { title: '物料申请' },
};
