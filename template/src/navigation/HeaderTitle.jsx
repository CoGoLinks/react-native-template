import React, { Children } from 'react';
import { TouchableOpacity, View, Text } from '@/components';

const HeaderTitle = ({ navigation, route, headerTitleInfo, args, children }) => {
  if (headerTitleInfo) {
    return null;
  }
  console.log('headerTitleInfo', headerTitleInfo);
  return <View>{headerTitleInfo}</View>;
};

export default HeaderTitle;
