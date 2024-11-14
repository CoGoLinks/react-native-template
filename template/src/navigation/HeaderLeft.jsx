import React from 'react';
import { TouchableOpacity, Icon } from '@/components';

const HeaderLeft = ({ navigation, route, option, backOnPress }) => {
  const { tintColor } = option;

  const onPress = () => {
    if (backOnPress) {
      backOnPress({ navigation, route });
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={onPress} className="py-10 pr-20">
      <Icon name="back" color={tintColor || 'c-text'} size={48} />
    </TouchableOpacity>
  );
};

export default HeaderLeft;
