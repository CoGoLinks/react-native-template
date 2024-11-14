import React from 'react';
import { View, Text, Icon, ScrollView } from '@/components';
import { iconList } from '@/assets';

function IconPage() {
  return (
    <ScrollView>
      <View className="p-20 flex-row flex-wrap">
        {iconList.map((item, index) => (
          <View key={index} className="w-1/3 center my-30">
            <Icon name={item} size={60} color="red" />
            <Text margin-left-10>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default {
  name: 'Icon',
  options: { title: '图标' },
  component: IconPage,
};
