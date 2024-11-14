import React, { useCallback, useEffect } from 'react';
import { View, Toast, Text, ScrollView } from '@/components';
import { createOrderUrl } from '@/services/order';
// import DialogView from '@/pages/components/dialog';
import Address from './Address';
import GoodsItem from './GoodsItem';
import Footer from './Footer';

/**
 * 下订单页面
 * @param {} props
 * @returns
 */
function PlaceOrderView(props) {
  const [dataSource, setDataSource] = React.useState([]);
  const [addressInfo, setAddressInfo] = React.useState({});
  // 协议是否勾选上了
  // const [isAgreePprotocol, setIsAgreePprotocol] = React.useState(false);

  const { route } = props;

  const { data = {}, address = {} } = route?.params || {};

  /**
   * 是否可以下一步
   */
  const isDisabled = React.useMemo(() => {
    return Object.keys(addressInfo || {}).length === 0;
  }, [addressInfo]);
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

  useEffect(() => {
    setAddressInfo(address);
  }, [address]);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  /**
   * 改变地址
   */
  const onChangeAddress = useCallback((addressItem = {}) => {
    setAddressInfo(addressItem);
  }, []);

  /**
   * 修改地址
   */
  const onModifyAddress = useCallback(() => {
    props.navigation.push('AddressView', {
      address: addressInfo,
      onChangeAddress: onChangeAddress,
    });
  }, [addressInfo, props.navigation, onChangeAddress]);

  /**
   * 提交表单
   */
  const onSubmit = useCallback(async () => {
    // {
    //   "subModelId": "7136",
    //   "subModelName": "1.0+Epos-华智融NEW6220(4G)",
    //   "modelName": "1.0+Epos-华智融NEW6220(4G)",
    //   "minQuantity": 5,
    //   "unitQuantity": 1,
    //   "unitPrice": 40,
    //   "unit": "台",
    //   "imageUrl": "https://sms-admin-test.suixingpay.com/img/logo_3.png"
    //   "amount"
    // }

    const buySubModelFormList = dataSource?.map((item) => {
      return {
        buyNum: item?.amount || 0,
        modelName: item?.subModelName || '',
        shelvesId: item?.shelvesId || '',
        shelvesName: item?.shelvesName || '',
        price: item?.unitPrice || '',
        subModelId: item?.subModelId || '',
      };
    });

    const params = {
      buySubModelFormList: buySubModelFormList,
      mallOrderShippingForm: addressInfo,
      payAmount: totalAmount,
      remark: '',
      totalAmount: totalAmount,
    };
    try {
      Toast.loading('正在处理中...');
      const res = await createOrderUrl(params);
      console.log('res ===', res);
      if (!res?.errorType) {
        Toast.hide();
        props.navigation.replace('PayOrderView', { order: res?.data ?? {} });
      }
    } catch (error) {
      console.log('error ==', error);
    }
  }, [addressInfo, dataSource, props.navigation, totalAmount]);
  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="h-[24rpx]" />
        <View className="bg-c-w rounded-l-8 rounded-r-8 mx-20 pt-[18rpx] pb-[16rpx]">
          <Text className="font-w5 text-[28rpx] text-c-n8 pl-[16rpx] pr-[14rpx]">收货地址</Text>
        </View>
        <Address onModify={onModifyAddress} addressInfo={addressInfo} />
        <View className="h-[24rpx]" />
        <View className="bg-c-w rounded-l-8 rounded-r-8 mx-20 pt-[18rpx] pb-[18rpx]">
          <Text className="font-w5 text-[28rpx] text-c-n8 pl-[16rpx] pr-[14rpx]">已选商品</Text>
        </View>
        {dataSource?.map((item, index) => {
          return <GoodsItem key={item?.subModelId + 'index' + index} item={item} />;
        })}
        {dataSource.length > 0 && <View className="h-2 bg-c-w  mx-20" />}
      </ScrollView>

      <Footer disabled={isDisabled} totalAmount={totalAmount} onSubmit={onSubmit} />

      {/* <DialogView
        visible={isAgreePprotocol}
        title="服务协议与隐私保护"
        content={
          <Text style={styles.contentText} className="flex-row">
            为了更好地保障您的合法权益，请您阅读并同意以下协议：
            <Text
              style={styles.linkText}
              onPress={() => {
                console.log('点击了《鑫联盟用户注册协议》');
              }}
            >
              《鑫联盟用户注册协议》
            </Text>
          </Text>
        }
        onCancel={() => setIsAgreePprotocol(false)}
        onConfirm={() => setIsAgreePprotocol(false)}
      /> */}
    </View>
  );
}
export default {
  name: 'PlaceOrderView',
  component: PlaceOrderView,
  options: { title: '提交申请订单' },
};
