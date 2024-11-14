import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Toast, PdfView, Text, View, TouchableOpacity, Button, Form } from '@/components';
import { StyleSheet, Platform, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { tw } from '@/style';
import { useCountDown } from 'ahooks';
import { maskPhoneNumber } from '@/utils/tools';
import { getSendSmsCode, getFaceUrl } from '@/services/login';
import { signAgreement } from '@/services/setting';
import { appInvoiceManageGetOCRResult } from '@/services/invoice';
import { AgreementTypeEnum, AgreementStatusEnum } from '@/enums';
import { orderSignAgreement } from '@/services/order';
const { Input } = Form;
/**
 * PDF查看公共页面 公共页面
 */
function ProtocolSignView({ navigation, route }) {
  const [targetDate, setTargetDate] = useState(0);
  const [totalPage, setTotalPage] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm();
  const code = Form.useWatch('code', form);

  const [countdown] = useCountDown({
    leftTime: targetDate * 1000,
    onEnd: () => {
      setTargetDate(0);
    },
  });

  /**
   * 判断是否阅读完成
   */
  const isReadComplete = useMemo(() => {
    return totalPage === currentPage;
  }, [currentPage, totalPage]);

  /**
   * 判断是否可以提交
   */
  const isCanSubmit = useMemo(() => {
    return code && isReadComplete;
  }, [code, isReadComplete]);

  useEffect(() => {
    if (route.params.title) {
      navigation.setOptions({ title: '协议签署' });
    }
  }, [navigation]);
  /**
   * 发送短信验证码
   */
  const handleSendCode = async () => {
    Toast.info('发送验证码成功');
    setTargetDate(60);
  };

  const handleSubmiit = useCallback(async () => {
    try {
      Toast.loading('正在签署协议...');
      setTimeout;
    } catch (error) {
      console.log('error', error);
    }
  }, [code, data?.token, querySignStatusAction, pageType]);

  const querySignStatusAction = useCallback(
    async (requestId = '') => {
      let count = 60;
      const timer = setInterval(async () => {
        Toast.loading(`协议签署中...(${count})`);
        const result = await appInvoiceManageGetOCRResult(
          {
            requestId: requestId,
          },
          data?.token,
        );
        if (result?.data?.progress === AgreementStatusEnum.ProgressError) {
          Toast.error(result?.data?.errorMsg);
        } else if (result?.data?.progress === AgreementStatusEnum.ProgressCoplete) {
          Toast.hide();
          clearInterval(timer);
          Toast.success('签署成功', 2);
          // 采购合作协议
          if (pageType === AgreementTypeEnum.ProcureCooperate) {
            navigation.replace('GoodsListView');
          } else {
            // TODO 这里需要调用接口， 拿到网络支付的url
            const res = await getFaceUrl(data?.token);
            const url = res?.data || '';
            const weburl = `${url}&app=xyf`;
            console.log('weburl ===', weburl);
            navigation.push('WebView', {
              url: weburl,
              data,
              // 这个方法是h5页面发送dispatchAction消息执行
              callback: () => {
                navigation.replace('Login');
              },
            });
          }
        } else {
          count--;
          if (count <= 0) {
            Toast.info('协议签署超时，请稍后重试！');
            clearInterval(timer);
          }
        }
      }, 1000);
    },
    [data, navigation, pageType],
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={styles.container}>
          {!isReadComplete ? (
            <View style={styles.tipsView}>
              <Text className="text-[26rpx] text-center text-[#ffffff] font-w5">
                请先阅读至协议底部
              </Text>
            </View>
          ) : null}
          <PdfView
            style={styles.pdf}
            source={{ uri: route.params.url }}
            trustAllCerts={false}
            onPageChanged={(page, numberOfPages) => {
              console.log(numberOfPages, `Current page: ${page}`);
              setTotalPage(numberOfPages);
              setCurrentPage(currentPage > page ? currentPage : page);
            }}
            onError={(error) => {
              console.log(error);
              Toast.info('文件加载失败', 1);
            }}
          />
          <Form form={form}>
            <View className="bg-c-w flex-col pl-[48rpx] pt-[18rpx] pr-[48rpx] pb-[24rpx]">
              <View className="mb-[12rpx]">
                <Text className="text-[26rpx] text-[#000000] font-w5">
                  请输入 {maskPhoneNumber(data?.tel)} 短信验证码并签署协议
                </Text>
              </View>
              <View className="flex-row items-center bg-[#F5F5F5]">
                <Input
                  name="code"
                  className="rounded-8 p-30 flex-1 text-c-n8 text-[30rpx]"
                  placeholder="填写短信验证码"
                  rules={[{ required: true, message: '请输入验证码' }]}
                  maxLength={6}
                  keyboardType="numeric"
                  placeholderTextColor={tw.color('c-n6')}
                  clearButtonMode="while-editing"
                />
                <View style={styles.borderLine} className="mr-30" />
                <TouchableOpacity onPress={handleSendCode} className="mr-30">
                  <Text
                    style={
                      Math.round(countdown / 1000) === 0 ? styles.codeText : styles.normalCodeText
                    }
                  >
                    {Math.round(countdown / 1000) === 0
                      ? '获取验证码'
                      : `已发送${Math.round(countdown / 1000)}s`}
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="mt-[24rpx]">
                <Button onPress={handleSubmiit} disabled={!isCanSubmit}>
                  同意以上协议并签署
                </Button>
              </View>
            </View>
          </Form>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tw.color('c-w'),
  },
  pdf: {
    flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  borderLine: {
    width: '2rpx',
    height: '56rpx',
    backgroundColor: '#DEDEDE',
  },
  codeText: {
    color: tw.color('c-primary'),
    fontSize: '26rpx',
  },
  normalCodeText: {
    fontSize: '26rpx',
    color: '#787B80',
  },
  tipsView: {
    position: 'absolute',
    bottom: 74,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 8080,
    marginHorizontal: 25,
    paddingVertical: 28,
    borderRadius: 7,
  },
});

export default {
  name: 'ProtocolSignView',
  component: ProtocolSignView,
  options: { title: '协议签署' },
};
