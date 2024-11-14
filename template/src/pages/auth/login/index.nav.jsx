import React, { useEffect, useState, useCallback } from 'react';
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
  Picker,
} from '@/components';
import { useStore } from '@/store';
import { useCountDown } from 'ahooks';
import { getUserInfo } from '@/services/home';
import { loginSendCode, loginSmsCode, loginPassword, getFaceUrl } from '@/services/login';
import { validateSmsCode, isMobile } from '@/utils/tools/RegExpUtil';
import styles from './style';
import Device from '@/config/device';
import { appName } from '@/config';
import { tw } from '@/style';
import { isProd } from '@/config/env';
import AgreementModal from './AgreementModal';
import WebConf from '@/config/web';
import { ContractTypeStatusEnum, IdentityTypeEnum } from '@/enums';
const { Input } = Form;
const TYPE = 'USER_LOGIN';
/**
 * 登录页面
 */
function Login({ navigation }) {
  const [current, setCurrent] = useState(0);
  const [targetDate, setTargetDate] = useState();
  const [checkAgree, setCheckAgree] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [testAccountOption, setTestAccountOption] = useState([]);
  const { setUserInfo, appSwitch } = useStore('setUserInfo', 'appSwitch');

  const [form] = Form.useForm();
  const telNum = Form.useWatch('tel', form);
  const codeNum = Form.useWatch('code', form);
  const pwdNum = Form.useWatch('pwd', form);
  const [isEye, setIsEye] = useState(false);

  // 白名单options
  const getLoginWhiteList = () => {
    const options = [
      {
        value: '18168896116+123456',
        label: '测试账号=18168896116',
      },
    ];
    setTestAccountOption(options);
  };

  useEffect(() => {
    getLoginWhiteList();
  }, []);
  const buttonStyle = () => {
    if (current === 0) {
      if (!isMobile(telNum) || !codeNum) {
        return false;
      }
      return true;
    } else if (current === 1) {
      if (!isMobile(telNum) || !pwdNum) {
        return false;
      }
      return true;
    }
  };

  const [countdown] = useCountDown({
    leftTime: targetDate * 1000,
    onEnd: () => {
      setTargetDate(undefined);
    },
  });
  const toggleTab = (v) => {
    setCurrent(v);
  };
  /**
   * 发送短信验证码
   */
  const handleSendCode = async () => {
    const { tel } = form.getFieldsValue();
    if (!isMobile(tel)) {
      Toast.info('请输入正确的手机号');
      return;
    }
    const res = await loginSendCode({ phoneNo: tel, type: TYPE });
    if (res.data) {
      Toast.info('发送验证码成功');
      setTargetDate(60);
    }
  };

  const onTestLogin = (v) => {
    const value = v[0] || '';

    console.log('选择测试账号', v[0]);
    setCurrent(1);
    setCheckAgree(true);
    form.setFieldsValue({
      tel: value.split('+')[0],
      pwd: value.split('+')[1],
    });
    setAccountVisible(false);
    setTimeout(() => {
      loginPwd();
    });
  };

  const login = async () => {
    const { tel = '', code = '', pwd = '' } = form.getFieldsValue();
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
          // 验证码登录
          if (current === 0) {
            if (!validateSmsCode(code)) {
              Toast.info('请输入的验证码');
              return;
            }
            loginCode();
          } else if (current === 1) {
            if (!pwd) {
              Toast.info('请输入的密码');
              return;
            }
            loginPwd();
          }
        },
      });
      return;
    }
    // 验证码登录
    if (current === 0) {
      if (!validateSmsCode(code)) {
        Toast.info('请输入的验证码');
        return;
      }
      loginCode();
    } else if (current === 1) {
      if (!pwd) {
        Toast.info('请输入的密码');
        return;
      }
      loginPwd();
    }
  };
  const loginCode = async () => {
    const { tel = '', code = '' } = form.getFieldsValue();
    const res = await loginSmsCode({
      telephone: tel,
      code,
      type: TYPE,
    });
    const { errorType = null, message = null } = res || {};
    if (!errorType) {
      const { data = {} } = res || {};
      // 判断下一步进入主页还是人脸识别
      loginNextStep({ tel: tel, ...data });
    } else {
      if (message.includes('未配置')) {
        const alert = Modal.alert({
          title: '温馨提示',
          message: message,
          cancelText: null,
          okText: '好的',
          onOk: () => {
            alert.close();
          },
        });
        return;
      }
      Toast.info(message);
    }
  };
  const loginPwd = async () => {
    navigation.replace('Tabs');

    const { tel = '', pwd = '' } = form.getFieldsValue();
    const res = await loginPassword({
      loginNo: tel,
      passWord: pwd,
    });
    const { errorType = null, message = null } = res || {};
    if (!errorType) {
      const { data = {} } = res || {};
      // 判断下一步进入主页还是人脸识别

      loginNextStep({ tel: tel, ...data });
    } else {
      if (message.includes('未配置')) {
        const alert = Modal.alert({
          title: '温馨提示',
          message: message,
          cancelText: null,
          okText: '好的',
          onOk: () => {
            alert.close();
          },
        });
        return;
      }
      Toast.info(message);
    }
  };

  /**
   * 登录下一步
   * @param {*} type
   */
  const loginNextStep = async (loginInfo = {}) => {
    const userRes = await getUserInfo(loginInfo?.token);
    const [userInfo = {}] = userRes.data || [];
    console.log('userInfo ===', userInfo);
    const isSign =
      userInfo.identityType === IdentityTypeEnum.Agent &&
      userInfo.contractType === ContractTypeStatusEnum.DirectSign; // 直签

    const { needFace = false, needAgreement = false, faceResult = '' } = loginInfo || {};
    // 需要签署协议
    if (needAgreement) {
      navigation.push('ProtocolSignView', {
        url: `${WebConf.directSignAgreement}?v=${Math.floor(Math.random() * 101)}`,
        title: '合作协议',
        data: loginInfo,
      });
    } else if (needFace && faceResult !== 'SUCCESS') {
      // 需要认证 faceResult SUCCESS  FAIL
      const res = await getFaceUrl(loginInfo?.token);

      if (isSign) {
        const url = res?.data || '';
        const weburl = `${url}&app=xyf`;
        console.log('weburl ===', weburl);
        navigation.push('WebView', {
          url: weburl,
          data: loginInfo,
          // 这个方法是h5页面发送dispatchAction消息执行
          callback: () => {
            navigation.replace('Login');
          },
        });
      } else {
        // 代理商 人脸认证
        navigation.push('FaceAuth', {
          data: { url: res?.data || '', ...loginInfo },
        });
      }
    } else {
      // 存储用户信息，进入主页
      setUserInfo(loginInfo);
      navigation.replace('Tabs');
      Toast.info('登录成功', 1);
    }
  };

  const handleAgreement = () => {
    navigation.push('WebView', { url: WebConf.privacy });
  };

  const handleUserAgreement = () => {
    navigation.push('WebView', {
      url: `${WebConf.userAgreement}?rm=${Math.floor(Math.random() * 101)}`,
    });
  };

  const handleEye = useCallback(() => {
    setIsEye(!isEye);
  }, [isEye]);

  const goRegisterPage = () => {
    navigation.push('Register');
  };

  const goProtocolSignView = () => {
    navigation.push('ProtocolSignView');
  };

  
  return (
    <View className="bg-c-w flex-1">
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{ flex: 1 }}
      >
        <View className="flex-1">
          <Image
            source={require('@/assets/images/login/login_bg.png')}
            className="w-full h-[376rpx]"
          />
          <View className={['flex-row a-center ml-[48rpx] mt-[-186rpx]']}>
            <Image assetName="common.logo" className="w-[92rpx] h-[92rpx] rounded-16" />
            <Text className="text-c-n8 text-6xl font-w5 ml-[16rpx]">欢迎使用{appName}</Text>
          </View>
          <View className="m-50 mt-100">
            <View className="flex-row justify-around" style={styles.headerView}>
              <TouchableOpacity className="items-center" onPress={() => toggleTab(0)}>
                <Text
                  className="font-w5 rounded-4"
                  style={current === 0 ? styles.currentText : styles.normalText}
                >
                  验证码登录
                </Text>
                <View
                  style={current === 0 ? styles.currentIcon : styles.normalIcon}
                  className="rounded-4"
                />
              </TouchableOpacity>
              <TouchableOpacity className="items-center" onPress={() => toggleTab(1)}>
                <Text
                  className="font-w5 rounded-4"
                  style={current === 1 ? styles.currentText : styles.normalText}
                >
                  密码登录
                </Text>
                <View style={current === 1 ? styles.currentIcon : styles.normalIcon} />
              </TouchableOpacity>
            </View>
            <View>
              <Form form={form}>
                <View style={styles.inputView} className="mb-30 h-10">
                  <Input
                    name="tel"
                    className="rounded-8 p-30 flex-1 text-c-n8 text-[30rpx]"
                    placeholder="请输入手机号"
                    rules={[{ required: true, message: '请输入手机号' }]}
                    style={styles.normalInput}
                    maxLength={11}
                    keyboardType="numeric"
                    placeholderTextColor={tw.color('c-n6')}
                    clearButtonMode="while-editing"
                  />
                </View>
                {current === 1 && (
                  <View style={styles.inputView} className="mb-30 flex-row items-center h-10">
                    <Input
                      secureTextEntry={!isEye}
                      name="pwd"
                      placeholder="请输入密码"
                      className="rounded-8 p-30 flex-1 text-c-n8 text-[30rpx]"
                      rules={[{ required: true, message: '请输入密码' }]}
                      style={styles.normalInput}
                      placeholderTextColor={tw.color('c-n6')}
                      clearButtonMode="while-editing"
                    />
                    <TouchableOpacity onPress={handleEye} className="mr-[32rpx]">
                      <Icon name={isEye ? 'eye' : 'eye_close'} size={40} color="#5F410A" />
                    </TouchableOpacity>
                  </View>
                )}
                {current === 0 && (
                  <View style={styles.inputView} className="mb-30 flex-row items-center pr-30 h-10">
                    <Input
                      name="code"
                      className="rounded-8 p-30 flex-1 text-c-n8 text-[30rpx]"
                      placeholder="请输入验证码"
                      rules={[{ required: true, message: '请输入验证码' }]}
                      maxLength={6}
                      keyboardType="numeric"
                      placeholderTextColor={tw.color('c-n6')}
                      clearButtonMode="while-editing"
                    />
                    <View style={styles.borderLine} className="mr-30" />
                    <TouchableOpacity onPress={handleSendCode}>
                      <Text
                        style={
                          Math.round(countdown / 1000) === 0
                            ? styles.codeText
                            : styles.normalCodeText
                        }
                      >
                        {Math.round(countdown / 1000) === 0
                          ? '获取验证码'
                          : `已发送${Math.round(countdown / 1000)}s`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
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
                    登录
                  </Button>
                </View>
                <View show={appSwitch?.appAuditSwitch} className="center mt-20">
                  <Text className="text-c-text font-w5 text-base" onPress={goRegisterPage}>
                    去注册
                  </Text>
                </View>
                <View show={appSwitch?.appAuditSwitch} className="center mt-20">
                  <Text className="text-c-text font-w5 text-base" onPress={goProtocolSignView}>
                    协议签署
                  </Text>
                </View>
              </Form>
            </View>
          </View>
        </View>
        <View>
          {!isProd && (
            <View>
              <Text
                className="text-26 ml-10 py-10 text-center text-c-mw font-w5"
                onPress={() => setAccountVisible(true)}
              >
                选择测试账号
              </Text>
            </View>
          )}
          <Picker
            visible={accountVisible}
            data={testAccountOption}
            onChange={onTestLogin}
            onClose={() => setAccountVisible(false)}
          />
        </View>
        {!!Device.appVersion && (
          <View className="pb-7">
            <Text className="text-center text-c-n7 text-base">V{Device.appVersion}</Text>
          </View>
        )}
      </ScrollView>
      <AgreementModal />
    </View>
  );
}

export default {
  name: 'Login',
  component: Login,
  options: { headerShown: false, title: '登录' },
};
