import React from 'react';
import { View, Text, Button, Colors, Toast } from '@/components';

function ButtonPage() {
  const onPress = () => {
    Toast.info('点击');
  };

  return (
    <View padding-20>
      <Text>按钮</Text>
      <Button onPress={onPress} className="mt-30" type="dark">
        按钮
      </Button>
      <Button onPress={onPress} className="mt-30">
        按钮
      </Button>
      <Button onPress={onPress} className="mt-30" size="xl">
        按钮 size: xl
      </Button>
      <Button onPress={onPress} className="mt-30" size="sm">
        按钮 size: sm
      </Button>
      <Button onPress={onPress} className="mt-30" size="xs">
        按钮 size: xs
      </Button>
      <View row>
        <View className="flex-1 p-10">
          <Button onPress={onPress} className="mt-30" size="xl" disabled>
            按钮禁用
          </Button>
        </View>
        <View className="flex-1 p-10">
          <Button onPress={onPress} className="mt-30" size="xl" type="ghost">
            按钮
          </Button>
        </View>
      </View>
      <View row>
        <View className="flex-1 p-10">
          <Button onPress={onPress} className="mt-30" size="xl" type="ghost" shape="round">
            按钮
          </Button>
        </View>
        <View className="flex-1 p-10">
          <Button onPress={onPress} className="mt-30" size="xl" type="default">
            按钮
          </Button>
        </View>
      </View>
    </View>
  );
}

export default {
  name: 'Button',
  component: ButtonPage,
};
