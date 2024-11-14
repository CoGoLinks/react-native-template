import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import { List, View, Button, ScrollView, Modal, Toast } from '@/components';
import Device from '@/config/device';
import WebConf from '@/config/web';
import { navigation as nav } from '@/navigation';
import { queryMyAgreementUrl } from '@/services/setting';
import { useStore } from '@/store';
import { isProd } from '@/config/env';
import { checkAppVersion } from '@/utils/app';
import { usePushy } from 'react-native-update';
import { getPurchaseAgreement } from '@/services/order';
function SettingPage({ navigation, route }) {
  const [agreementInfo, setAgreementInfo] = useState({});
  const [hotVersion, setHotVersion] = useState('');
  const [procureCooperate, setProcureCooperate] = useState('');
  const { identity, appSwitch, setIdentity } = useStore('identity', 'appSwitch', 'setIdentity');

  const { getCurrentVersionInfo } = usePushy();

  useEffect(() => {
    queryMyAgreement();
    requestGetPurchaseAgreement();
  }, []);

  useEffect(() => {
    getHotPackageInfo();
  }, [getHotPackageInfo]);

  const getHotPackageInfo = useCallback(async () => {
    try {
      const res = await getCurrentVersionInfo();
      setHotVersion(res?.name);
    } catch (error) {
      console.log('error', error);
    }
  }, [getCurrentVersionInfo]);

  const queryMyAgreement = async () => {
    try {
      const res = await queryMyAgreementUrl();
      console.log('resres', res);
      const { errorType, message: msg, data = {} } = res || {};
      if (!errorType) {
        setAgreementInfo(data);
      } else {
        Toast.info(msg);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const requestGetPurchaseAgreement = () => {
    getPurchaseAgreement().then((res) => {
      console.log('res', res);
      const { errorType, data } = res;
      if (!errorType) {
        setProcureCooperate(data);
      }
    });
  };
  /**
   * 账号与安全
   */
  const accSafeList = useMemo(() => {
    return [
      {
        label: '账号与安全',
        onPress: () => navigation.push('AccountSafe'),
      },
    ].filter(Boolean);
  }, [navigation]);

  /**
   * 协议
   */
  const protocolList = useMemo(() => {
    return [
      {
        label: '隐私协议',
        onPress: () => navigation.push('WebView', { url: WebConf.privacy }),
      },
      {
        label: '用户服务协议',
        onPress: () => navigation.push('WebView', { url: WebConf.userAgreement }),
      },
      procureCooperate && {
        label: '采购合作协议',
        onPress: () =>
          navigation.push('PdfPage', {
            url: procureCooperate,
            title: '采购合作协议',
          }),
      },
      identity.sign &&
        agreementInfo?.taxPartnerAgreementUrl && {
          label: '合作协议',
          onPress: () =>
            navigation.push('PdfPage', {
              url: agreementInfo?.taxPartnerAgreementUrl || '',
              title: '合作协议',
            }),
        },

      identity.agent &&
        agreementInfo?.taxPartnerAgreementUrl && {
          label: '共享经济合作伙伴协议',
          onPress: () =>
            navigation.push('PdfPage', {
              url: agreementInfo?.taxPartnerAgreementUrl || '',
              title: '共享经济合作伙伴协议',
            }),
        },
    ].filter(Boolean);
  }, [
    agreementInfo?.taxPartnerAgreementUrl,
    identity.agent,
    identity.sign,
    navigation,
    procureCooperate,
  ]);
  /**
   * 测试功能
   */
  const testFunList = useMemo(() => {
    return [
      !isProd && {
        label: '结赢伙伴H5 DEV',
        onPress: () =>
          navigation.push('WebView', {
            url: 'http://172.16.40.178:4000/?token=1&id=10086&name=zs' + Math.random(),
          }),
      },
      !isProd && {
        label: '结赢伙伴H5 TEST',
        onPress: () =>
          navigation.push('WebView', {
            url: 'http://172.16.40.178:4000/?token=1&id=10086&name=zs' + Math.random(),
          }),
      },
    ].filter(Boolean);
  }, [navigation]);

  /**
   * 协议
   */
  const settingList = [
    {
      label: '关于我们',
      onPress: () => navigation.push('AboutUs'),
    },
    {
      label: '联系我们',
      onPress: () => {
        Modal.alert({
          title: '联系我们',
          message: 'jxgytech.service@suixingpay.com',
          okText: '确定',
          onOk: () => {
            Linking.openURL('mailto:jxgytech.service@suixingpay.com');
          },
        });
      },
    },
    {
      label: '版本更新',
      extra: `${isProd ? 'V' : '版本'}${Device.appVersion}`,
      onPress: () => checkAppVersion(true, hotVersion),
    },
  ];

  const actionList = [
    {
      label: '注销',
      onPress: () => {
        const alert = Modal.alert({
          title: '提示',
          message: '确定要注销吗?',
          okText: '确定',
          cancelText: '取消',
          onOk: () => {
            alert.close();
            navigation.push('WebView', { url: WebConf.logOff });
          },
          onCancel: () => {
            alert.close();
          },
        });
      },
    },
  ];

  const logout = () => {
    nav.logout();
  };

  return (
    <View className="flex-1" useSafeArea>
      <ScrollView className="flex-1">
        <View className="mt-[24rpx]" />
        <List data={accSafeList} labelClassName="text-xl" className="bg-c-w" />
        <View className="mt-[24rpx]" />
        <List data={protocolList} labelClassName="text-xl" className="bg-c-w" />
        <View className="mt-[24rpx]" />
        <List data={settingList} labelClassName="text-xl" className="bg-c-w" />

        {appSwitch?.appAuditSwitch && (
          <>
            <View className="mt-[24rpx]" />
            <List data={actionList} labelClassName="text-xl" className="bg-c-w" />
          </>
        )}
        <View className="mt-[24rpx]" />
        <List data={testFunList} labelClassName="text-xl" className="bg-c-w" />
      </ScrollView>
      <View className="mb-80 px-[32rpx]">
        <Button className="bg-c-w" textClassName="text-c-primary" onPress={logout}>
          退出登录
        </Button>
      </View>
    </View>
  );
}

export default {
  name: 'Setting',
  component: SettingPage,
  options: {
    title: '设置',
  },
};
