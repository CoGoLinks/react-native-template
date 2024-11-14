import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useCountDown } from 'ahooks';
import { View } from '@/components';
import { useStore } from '@/store';

function LaunchScreen({ navigation }) {
  const { userInfo } = useStore('userInfo');

  useCountDown({
    leftTime: 10,
    onEnd: () => {
      navigation.replace(userInfo.token ? 'Tabs' : 'Login');
    },
  });

  return (
    <View flex center>
      <ActivityIndicator animating />
    </View>
  );
}

export default {
  name: 'LaunchScreen',
  component: LaunchScreen,
  options: { headerShown: false },
};
