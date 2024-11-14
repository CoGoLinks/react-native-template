import React, { useMemo } from 'react';
import { View, ScrollView, Text, Form, Button, Icon, Toast } from '@/components';
import { isCNCardId, removeSpaces } from '@/utils/tools';

const { Input } = Form;

function InputIdCardView({ navigation }) {
  const [form] = Form.useForm();

  const identityNo = Form.useWatch('identityNo', form);

  const isDisabled = useMemo(() => {
    if (identityNo && identityNo?.length >= 18) {
      return false;
    } else {
      return true;
    }
  }, [identityNo]);

  const onSubmit = async () => {
    const formValue = form.getFieldsValue();
    if (!isCNCardId(formValue?.identityNo || '')) {
      Toast.info('请输入正确的身份证号');
      return;
    }
    navigation.push('ModifyPhoneView', {
      identityNo: formValue?.identityNo,
    });
  };

  return (
    <View className="flex-1 bg-[#fff]" useSafeArea>
      <View className="flex-row bg-[#FFFBE8] a-center py-[8rpx] px-[36rpx]">
        <Icon size={32} name="tips" color="#ED6A0C" className="mr-[10rpx]" />
        <Text className="text-[24rpx] text-[#323233]">
          对私代理填写实名身份证号，对公填写法人身份证号
        </Text>
      </View>
      <ScrollView className="flex-1 px-[36rpx]">
        <Form
          form={form}
          onValuesChange={(values = {}) => {
            if (values?.identityNo) {
              form.setFieldsValue({ identityNo: removeSpaces(values?.identityNo) });
            }
          }}
          className=" flex-col justify-center items-center"
        >
          <View className="pt-[38rpx]  pb-[16rpx] ">
            <Text className="font-w6 text-[#333333] text-[26rpx]">验证身份</Text>
          </View>
          <View className="h-[96rpx] bg-[#f5f5f5] rounded-[8rpx] flex-row items-center">
            <Text className="w-[202rpx] px-[24rpx] text-[28rpx] text-[#323233] leading-[40rpx]">
              身份证号
            </Text>
            <Input
              name="identityNo"
              className="flex-1 p-0 text-c-n8"
              clearButtonMode="while-editing"
              placeholder="输入身份证号"
              maxLength={18}
            />
          </View>
          <Button className="mt-[140rpx]" disabled={isDisabled} onPress={onSubmit}>
            确认
          </Button>
        </Form>
      </ScrollView>
    </View>
  );
}

export default {
  name: 'InputIdCardView',
  component: InputIdCardView,
  options: { title: '修改登录手机号' },
};
