import React from 'react';
import { View, Image } from '@/components';

const ImagePage = () => {
  return (
    <View center>
      <Image
        assetName="home.test"
        resizeMode="contain"
        className="h-20 my-40"
      />
      <Image
        assetName="home.phone"
        resizeMode="contain"
        className="h-20 my-40"
      />
    </View>
  );
};

export default {
  name: 'Image',
  component: ImagePage,
};
