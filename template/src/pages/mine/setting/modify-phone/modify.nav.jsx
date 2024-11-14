import React, { useMemo, useState } from 'react';
import { View, ScrollView, Text, Form, Button, TouchableOpacity, Toast } from '@/components';
import { modifyPhoneNoUrl, loginSendCode } from '@/services/login';
import { useCountDown } from 'ahooks';
import { navigation as nav } from '@/navigation';
import { isMobile, removeSpaces } from '@/utils/tools';
const { Input } = Form;

function ModifyPhoneView({ navigation, route }) {
  const [countSeconds, setCountSeconds] = useState(0);
  const [form] = Form.useForm();
  const phoneNo = Form.useWatch('phoneNo', form);
  const verifyCode = Form.useWatch('verifyCode', form);

  const { identityNo = '' } = route?.params || {};
  const [countdown] = useCountDown({
    leftTime: countSeconds * 1000,
    onEnd: () => {
      setCountSeconds(0);
    },
  });
  /**
   * 提交按钮是否能点击
   */
  const isCodeDisabled = useMemo(() => {
    if (countSeconds <= 0) {
      return false;
    } else {
      return true;
    }
  }, [countSeconds]);

  /**
   * 提交按钮是否能点击
   */
  const isSubmitDisabled = useMemo(() => {
    if (phoneNo && verifyCode && phoneNo?.length === 11 && verifyCode?.length === 6) {
      return false;
    } else {
      return true;
    }
  }, [phoneNo, verifyCode]);

  const handleSendCode = async () => {
    const { phoneNo: mobile } = form.getFieldsValue();
    if (!isMobile(mobile)) {
      Toast.info('请输入正确的手机号');
      return;
    }
    loginSendCode({
      phoneNo: mobile,
      type: 'MODIFY_PHONE_NO',
    }).then((res) => {
      const { errorType, message } = res;
      if (!errorType) {
        Toast.info('发送验证码成功');
        setCountSeconds(60);
      } else {
        Toast.info(message);
      }
    });
  };

  const onSubmit = async () => {
    const formValue = form.getFieldsValue();
    const params = {
      identityNo: identityNo,
      smsType: 'MODIFY_PHONE_NO',
      ...formValue,
    };
    const res = await modifyPhoneNoUrl(params);
    console.log(res);
    if (!res?.errorType) {
      Toast.success('手机号修改成功');
      // navigation.goBack();
      setTimeout(() => {
        nav.logout({ confirm: false });
      }, 2000);
    } else {
      Toast.error(res?.message);
    }
  };

  return (
    <View className="flex-1 bg-[#fff]" useSafeArea>
      <ScrollView className="flex-1 px-[36rpx]">
        <Form
          onValuesChange={(values = {}) => {
            if (values?.phoneNo) {
              form.setFieldsValue({ phoneNo: removeSpaces(values?.phoneNo) });
            }
          }}
          form={form}
          className=" flex-col justify-center items-center"
        >
          <View className="pt-[38rpx]  pb-[16rpx] ">
            <Text className="font-w6 text-[#333333] text-[26rpx]">填写新手机号</Text>
          </View>
          <View className="h-[96rpx] bg-[#f5f5f5] rounded-[8rpx] flex-row items-center px-[24rpx]">
            <Input
              name="phoneNo"
              className="flex-1 p-0 text-c-n8 "
              placeholder="输入新手机号"
              clearButtonMode="while-editing"
              maxLength={11}
            />
          </View>
          <View className="h-[96rpx] bg-[#f5f5f5] rounded-[8rpx] flex-row items-center mt-[36rpx]">
            <Input
              name="verifyCode"
              className="rounded-8 p-30 border-c-0  flex-1 px-[24rpx]"
              placeholder="请输入验证码"
              maxLength={6}
              keyboardType="numeric"
              placeholderTextColor="#ABAEB3"
              clearButtonMode="while-editing"
            />
            <View className="mr-30 w-[2rpx] h-[56rpx] bg-[#DEDEDE]" />
            <TouchableOpacity onPress={() => !isCodeDisabled && handleSendCode()}>
              <Text
                className={[
                  'a-center mr-30',
                  {
                    'text-[#787B80]': !Math.round(countdown / 1000) === 0,
                    'text-c-primary': Math.round(countdown / 1000) === 0,
                  },
                ]}
              >
                {Math.round(countdown / 1000) === 0
                  ? '获取验证码'
                  : `已发送${Math.round(countdown / 1000)}s`}
              </Text>
            </TouchableOpacity>
          </View>
          <Button className="mt-[140rpx]" disabled={isSubmitDisabled} onPress={onSubmit}>
            确认修改
          </Button>
        </Form>
      </ScrollView>
    </View>
  );
}

export default {
  name: 'ModifyPhoneView',
  component: ModifyPhoneView,
  options: { title: '修改登录手机号' },
};
