import React, { useCallback, useEffect, useState } from 'react';
import { View, Toast, Button, ScrollView, Modal } from '@/components';
import { orderToPayUrl } from '@/services/order';
import OrderInfo from './OrderInfo';
import BankInfo from './BankInfo';
import CreditInfo from './CreditInfo';
import { isEmptyObject } from '@/utils/tools';
import { KeyboardAvoidingView, Platform, BackHandler } from 'react-native';

/**
 * 支付订单页面
 */
function PayOrderView(props) {
  const { route, navigation } = props;
  const { order = {} } = route?.params || {};

  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    navigation.setParams({
      backCallback: backCallback,
    });
    BackHandler.addEventListener('hardwareBackPress', onBackButtonPressAndroid);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackButtonPressAndroid);
  }, []);
  const backCallback = () => {
    const alert = Modal.alert({
      title: '提示',
      message: '您的订单还未完成支付，请在订单取消前完成支付',
      okText: '再想想',
      cancelText: '确定',
      onOk: () => {
        alert.close();
      },
      onCancel: () => {
        navigation.goBack();
        alert.close();
      },
    });
  };
  const onBackButtonPressAndroid = () => {
    if (navigation.isFocused()) {
      backCallback();
      return true;
    }
  };

  /**
   * 信息是否填写完整
   */
  const isDisabled = React.useMemo(() => {
    if (isEmptyObject(formValues)) {
      return true;
    }
    return Object.values(formValues).some((value) => {
      return !value;
    });
  }, [formValues]);
  console.log('isDisabled ===', isDisabled);
  /**
   * 组织付款凭证
   */
  const onFormValueChange = useCallback((elements) => {
    const _formValues = {};
    elements?.forEach((item) => {
      _formValues[item.name] = item.value;
    });
    setFormValues(_formValues);
    console.log('_formValues ==', _formValues);
  }, []);

  /**
   * 去看订单详情
   */
  const gotoOrderDetail = useCallback(() => {
    props.navigation.replace('OrderDetailView', {
      goodsOrderId: order?.goodsOrderId || '',
    });
  }, [order, props.navigation]);

  /**
   * 提交表单
   */
  const onSubmit = useCallback(async () => {
    // {
    //   "goodsOrderId": "226106",
    //   "payAmount": "400.00",
    //   "createTime": 1711441158829,
    //   "payeeCardNo": "6214838712894635",
    //   "payeeName": "XXM机构",
    //   "payeeBank": "招商银行"
    // }
    const params = {
      goodsOrderId: order?.goodsOrderId || '',
      mallPayExtDocForm: formValues,
      payAmount: order?.payAmount || '',
      payType: 0,
    };
    try {
      Toast.loading('正在处理中...');
      const res = await orderToPayUrl(params);
      console.log('res ===', res);
      if (!res?.errorType) {
        Toast.hide();
        props.navigation.replace('PayResultView', { order: order });
      }
    } catch (error) {
      console.log('error ==', error);
    }
  }, [formValues, order, props.navigation]);

  return (
    <View useSafeArea className="flex-1">
      <ScrollView className="flex-1">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <OrderInfo data={order} onTimeEnd={gotoOrderDetail} />
          <View className="h-[24rpx]" />
          <BankInfo data={order} />
          <View className="h-[24rpx]" />
          <CreditInfo onChange={onFormValueChange} />
        </KeyboardAvoidingView>
      </ScrollView>
      <View className="bg-c-w pt-10 pl-[32rpx] pr-[32rpx] pb-[12rpx]">
        <Button disabled={isDisabled} onPress={onSubmit} size="xl">
          确认完成汇款
        </Button>
      </View>
    </View>
  );
}

export default {
  name: 'PayOrderView',
  component: PayOrderView,
  options: {
    title: '支付订单',
    backOnPress({ route }) {
      const { backCallback = () => {} } = route.params || {};
      backCallback && backCallback();
    },
    gestureEnabled: false,
  },
};
