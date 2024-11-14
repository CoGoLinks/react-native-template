import React, { useState } from 'react';
import { View, Text, Modal, Button, Toast } from '@/components';

function ModalPage() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(true);
  };

  const handleAlert = () => {
    const alert = Modal.alert({
      title: '标题',
      message: (
        <Text>
          为了更好地保障您的合法权益，请您阅读并同意：
          <Text className="text-c-primary">《鑫联盟用户注册协议》</Text>
        </Text>
      ),
      okText: '确定',
      onOk: () => {
        alert.close();
        Toast.loading('请求中...', 3);
      },
    });
  };

  return (
    <View className="flex-1 center p-30">
      <Button className="my-30" onPress={handleAlert}>
        弹框提示
      </Button>
      <Button onPress={handleClick}>自定义弹框</Button>
      <Modal
        visible={isVisible}
        position="bottom"
        animationType="fadeIn"
        maskClosable
        onClose={() => setIsVisible(false)}
      >
        <View className="h-[200rpx] bg-c-w">
          <Text>内容</Text>
        </View>
      </Modal>
    </View>
  );
}

export default {
  name: 'Modal',
  options: { title: '弹框' },
  component: ModalPage,
};
