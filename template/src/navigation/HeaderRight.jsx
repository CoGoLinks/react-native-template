import React from 'react';
import { TouchableOpacity, Text } from '@/components';

const HeaderRight = ({ navigation, route, headerRightButton, args }) => {
  if (!headerRightButton) {
    return null;
  }
  const { label, onPress, color = '#333' } = headerRightButton;

  const handlePress = () => {
    onPress({ navigation, route });
  };

  return (
    <TouchableOpacity onPress={handlePress} className="py-10">
      <Text className="text-base font-w5" color={color}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default HeaderRight;
