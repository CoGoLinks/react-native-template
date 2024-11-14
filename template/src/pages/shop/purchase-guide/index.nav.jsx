import React from 'react';
import { ScrollView, Image } from '@/components';

const PurchaseGuideView = () => {
  return (
    <ScrollView>
      <Image
        assetName="invoice.PurchaseGuideBg"
        resizeMode="contain"
        className="w-full h-[2636rpx]"
      />
    </ScrollView>
  );
};

export default {
  name: 'PurchaseGuideView',
  component: PurchaseGuideView,
  options: { title: '购券攻略' },
};
