import React, { useEffect } from 'react';
import { View, Text, Image } from '@/components';

function AboutUs({ navigation }) {
  useEffect(() => {}, []);

  return (
    <View flex className="a-center justify-around">
      <View className="a-center">
        <Image
          assetName="common.logo_shadow"
          resizeMode="contain"
          className="w-[204rpx] h-[234rpx]"
        />
      </View>
      <View className="a-center">
        <Text className="text-base text-c-n6 mb-20">京ICP备17071247号-6A</Text>
        <Text className="text-base text-c-n6 ">北京银企融合技术开发有限公司所有</Text>
      </View>
    </View>
  );
}

export default {
  name: 'AboutUs',
  component: AboutUs,
  options: { title: '关于我们' },
};
