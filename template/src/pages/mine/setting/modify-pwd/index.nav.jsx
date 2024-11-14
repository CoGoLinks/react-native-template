import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Form,
  Button,
  Icon,
  TouchableOpacity,
  Image,
  Modal,
  Toast,
} from '@/components';
import { updatePassword } from '@/services/login';
import { encode } from 'base-64';

const { Input } = Form;

function UpdatePassword({ navigation }) {
  const [form] = Form.useForm();
  const [eyeVisible, setEyeVisible] = useState(false);
  const [eyeVisible2, setEyeVisible2] = useState(false);
  const [visible, setVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const btnStatus = useMemo(() => {
    console.log(newPassword, confirmNewPassword, 'newPassword, confirmNewPassword');
    if (newPassword && confirmNewPassword) {
      return false;
    } else {
      return true;
    }
  }, [newPassword, confirmNewPassword]);

  const submit = async () => {
    // 正则表达式，要求密码包含数字、大写字母、小写字母、特殊字符中至少三种
    const regex =
      /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,20}$/;
    if (!regex.test(newPassword) || !regex.test(confirmNewPassword)) {
      setVisible(true);
      return;
    }

    const params = {
      newPassword: encode(newPassword),
      confirmNewPassword: encode(confirmNewPassword),
    };
    const res = await updatePassword(params);
    console.log(res);
    if (!res?.errorType) {
      Toast.success('修改成功');
      navigation.goBack();
    } else {
      Toast.error(res?.message);
    }
  };

  /**新密码验证*/
  const newPasswordChange = (value) => {
    var regex = /^[\w\S~.!@#$%^&*?]*$/;
    if (regex.test(value)) {
      setNewPassword(value);
    }
  };

  /**新密码确认*/
  const reNewPasswordChange = (value) => {
    var regex = /^[\w\S~.!@#$%^&*?]*$/;
    if (regex.test(value)) {
      setConfirmNewPassword(value);
    }
  };

  return (
    <View className="flex-1 bg-[#fff]" useSafeArea>
      <ScrollView className="flex-1  px-[38rpx]">
        <Form form={form} className=" flex-col justify-center items-center">
          <View className="w-[678rpx] h-[96rpx] bg-[#f5f5f5] rounded-[8rpx] flex-row items-center mt-[28rpx] ">
            <Text className="w-[202rpx] px-[24rpx] text-[28rpx] text-[#323233] leading-[40rpx]">
              新密码
            </Text>
            <Input
              name="newPassword"
              className="flex-1"
              style={{ color: '#333' }}
              placeholder="输入新密码"
              secureTextEntry={!eyeVisible}
              onChange={(e) => newPasswordChange(e)}
              maxLength={20}
            />
            {newPassword && (
              <TouchableOpacity onPress={() => setEyeVisible(!eyeVisible)}>
                <Image
                  assetName={eyeVisible ? 'agent.openEye' : 'agent.closeEye'}
                  className={`${
                    eyeVisible ? 'w-[45rpx] h-[30rpx] mr-[42rpx]' : 'w-[40rpx] h-[16rpx] mr-[42rpx]'
                  }`}
                />
              </TouchableOpacity>
            )}
          </View>
          <View className="w-[678rpx] h-[96rpx] bg-[#f5f5f5] rounded-[8rpx] flex-row items-center mt-[32rpx] ">
            <Text className="w-[202rpx] px-[24rpx] text-[28rpx] text-[#323233] leading-[40rpx]">
              确认新密码
            </Text>
            <Input
              name="confirmNewPassword"
              className="flex-1"
              style={{ color: '#333' }}
              placeholder="再次输入确认"
              secureTextEntry={!eyeVisible2}
              onChange={(e) => reNewPasswordChange(e)}
              maxLength={20}
            />
            {confirmNewPassword && (
              <TouchableOpacity onPress={() => setEyeVisible2(!eyeVisible2)}>
                <Image
                  assetName={eyeVisible2 ? 'agent.openEye' : 'agent.closeEye'}
                  className={`${
                    eyeVisible2
                      ? 'w-[45rpx] h-[30rpx] mr-[42rpx]'
                      : 'w-[40rpx] h-[16rpx] mr-[42rpx]'
                  }`}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-[26rpx] text-[#323233] leading-[40rpx] mt-[20rpx]">
            密码长度8-20位，至少包含数字、大写字母、小写字母或特殊字符中的其中三种组合
          </Text>
          <Button className="mt-[180rpx]" disabled={btnStatus} onPress={submit}>
            完成
          </Button>
        </Form>
        <View className="bg-[#f5f5f5] rounded-[8rpx] mt-[60rpx] pt-[32rpx] pr-[38rpx] pb-[22rpx] pl-[24rpx]">
          <View className="flex-row items-center">
            <Icon name="tips" size={30} color="#323233" />
            <Text className="text-[#323233] text-[26rpx] leading-[36rpx] font-bold ml-[4rpx]">
              温馨提醒
            </Text>
          </View>
          <Text className="text-[#787B80] text-[26rpx] leading-[36rpx] mt-[20rpx]">
            为了您的账户安全，请避免设置与常用软件(如社交软件、网站的社交平台、论坛等)相同或相似的用户名和密码组合
          </Text>
        </View>
      </ScrollView>
      <Modal visible={visible} position="center">
        <View className="bg-c-w py-[44rpx] px-[38rpx] rounded-20 w-[622rpx] ">
          <Text className="font-bold text-[#333333] text-2xl text-center">提示</Text>
          <Text className="text-[26rpx] text-[#323233] text-center mt-[24rpx]">
            密码长度8-20位，至少包含数字、大写字母、小写字母或特殊字符中的其中三种组合
          </Text>
          <Button
            className="h-[72rpx] rounded-[36rpx] mt-[80rpx]"
            onPress={() => setVisible(false)}
          >
            确定
          </Button>
        </View>
      </Modal>
    </View>
  );
}

export default {
  name: 'UpdatePassword',
  component: UpdatePassword,
  options: { title: '修改密码' },
};
