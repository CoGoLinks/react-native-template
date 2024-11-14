import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Form,
  Toast,
  Icon,
  Image,
  Modal,
  ScrollView,
} from '@/components';
import { appName } from '@/config';
import { isMobile } from '@/utils/tools/RegExpUtil';
import styles from './style';
import { tw } from '@/style';
import WebConf from '@/config/web';
import { submitRegister } from '@/services/register';

const { Input } = Form;

/**
 * 注册页面
 */
function Register({ navigation }) {
  const [checkAgree, setCheckAgree] = useState(false);

  const [form] = Form.useForm();
  const telNum = Form.useWatch('tel', form);

  const buttonStyle = () => {
    if (!isMobile(telNum)) {
      return false;
    }
    return true;
  };

  const login = async () => {
    const { tel = '' } = form.getFieldsValue();
    if (!isMobile(tel)) {
      Toast.info('请输入正确的手机号');
      return;
    }
    // 展示协议
    if (!checkAgree) {
      const alert = Modal.alert({
        title: '服务协议与隐私保护',
        message: (
          <Text className="text-c-n6 text-base text-center">
            为了更好地保障您的合法权益，请您阅读并同意以下协议：
            <Text
              className="text-[#1677FF] text-base"
              onPress={() => {
                handleAgreement();
                alert.close();
              }}
            >
              《隐私政策》
            </Text>
          </Text>
        ),
        okText: '同意',
        onOk: () => {
          alert.close();
          setCheckAgree(!checkAgree);
          success();
        },
      });
      return;
    }
    success();
  };
  const success = async () => {
    const { tel = '', code = '' } = form.getFieldsValue();
    Toast.loading('注册中');
    await submitRegister({
      inviteCode: code || '0000',
      mobileNo: tel,
    });
    Toast.hide();
    navigation.replace('RegisterSuccess');
  };

  const handleAgreement = () => {
    navigation.push('WebView', { url: WebConf.privacy });
  };

  const handleUserAgreement = () => {
    navigation.push('WebView', {
      url: `${WebConf.userAgreement}?rm=${Math.floor(Math.random() * 101)}`,
    });
  };

  return (
    <View className="bg-c-w flex-1">
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View className="flex-1">
          <Image
            source={require('@/assets/images/login/login_bg.png')}
            className="w-full h-[376rpx]"
          />
          <View className={['flex-row a-center ml-[48rpx] mt-[-146rpx]']}>
            <Image assetName="common.logo" className="w-[92rpx] h-[92rpx]" />
            <Text className="text-c-n8 text-6xl font-w5 ml-[16rpx]">欢迎使用{appName}</Text>
          </View>
          <View className="m-50 mt-100">
            <View className="flex-row items-start" style={styles.headerView}>
              <Text className="font-w5 text-c-n8 text-2xl">欢迎注册</Text>
            </View>
            <View>
              <Form form={form}>
                <View style={styles.inputView} className="mb-30 h-10">
                  <Input
                    name="code"
                    className="rounded-8 p-30 flex-1 text-c-n8 text-[30rpx]"
                    placeholder="请输入邀请码(非必填)"
                    // rules={[{ required: true, message: '请输入邀请码' }]}
                    style={styles.normalInput}
                    maxLength={8}
                    keyboardType="numeric"
                    placeholderTextColor={tw.color('c-n6')}
                    clearButtonMode="while-editing"
                  />
                </View>
                <View style={styles.inputView} className="mb-30 flex-row items-center h-10">
                  <Input
                    name="tel"
                    placeholder="请输入手机号"
                    className="rounded-8 p-30 flex-1 text-c-n8 text-[30rpx]"
                    rules={[{ required: true, message: '请输入手机号' }]}
                    style={styles.normalInput}
                    keyboardType="numeric"
                    maxLength={11}
                    placeholderTextColor={tw.color('c-n6')}
                    clearButtonMode="while-editing"
                  />
                </View>
                <View className="flex-row ml-20 items-center">
                  <TouchableOpacity
                    onPress={() => setCheckAgree(!checkAgree)}
                    className="mr-[6rpx]"
                  >
                    {!checkAgree ? (
                      <Icon name="check" color={tw.color('c-w')} size={40} />
                    ) : (
                      <Icon name="checked" size={40} />
                    )}
                  </TouchableOpacity>
                  <Text className="text-base ml-[6rpx]">请阅读并同意</Text>
                  <Text
                    className="text-base ml-10"
                    style={styles.ruleText}
                    onPress={handleAgreement}
                  >
                    《隐私政策》
                  </Text>
                  <Text
                    className="text-base ml-10"
                    style={styles.ruleText}
                    onPress={handleUserAgreement}
                  >
                    《用户服务协议》
                  </Text>
                </View>
                <View className="mt-100">
                  <Button onPress={login} disabled={!buttonStyle()}>
                    注册
                  </Button>
                </View>
              </Form>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default {
  name: 'Register',
  component: Register,
  options: { title: '注册', headerTransparent: true },
};
