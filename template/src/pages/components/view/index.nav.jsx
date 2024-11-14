import React from 'react';
import { View, Text, Button, ScrollView } from '@/components';

function ViewPage() {
  return (
    <ScrollView>
      <View flex padding-20>
        <Text h6>视图</Text>
        <View className="flex-row border-1 border-c-n7 p-2 mb-20 rounded-3">
          <View className="flex-1 p-10 bg-c-n5 rounded-3">
            <Text className="text-c-w">Left: flex-1</Text>
          </View>
          <View className="p-10 bg-c-n5 rounded-3">
            <Text className="text-c-w">Right</Text>
          </View>
        </View>
        <View className="flex-row border-1 border-c-n7 p-2 mb-20 rounded-3">
          <View className="p-10 bg-c-n5 rounded-3">
            <Text className="text-c-w">Left</Text>
          </View>
          <View className="flex-1 p-10 bg-c-n5 rounded-3">
            <Text className="text-c-w">Right: flex-1</Text>
          </View>
        </View>
        <View className="flex-row border-1 border-c-n7 p-2 mb-20 rounded-3">
          <View className="flex-1 p-10 bg-c-n5 rounded-3">
            <Text className="text-c-w">Left: flex-1</Text>
          </View>
          <View className="flex-1 p-10 bg-c-n5 rounded-3">
            <Text className="text-c-w">Right: flex-1</Text>
          </View>
        </View>
        <View className="border-c-n7 border-1 mb-20 items-start h-10">
          <Button size="xs">上</Button>
        </View>
        <View className="border-c-n7 border-1 mb-20 justify-end h-10">
          <Button size="xs">下</Button>
        </View>
        <View className="border-c-n7 border-1 mb-20 justify-start h-10">
          <Button size="xs" className="w-1/2">
            左
          </Button>
        </View>
        <View className="border-c-n7 border-1 mb-20 items-end h-10">
          <Button size="xs" className="w-1/2">
            右
          </Button>
        </View>
        <View className="border-c-n7 border-1 mb-20 center h-10">
          <Button size="xs" className="w-1/2">
            中
          </Button>
        </View>
        <View
          className="h-10 center"
          linearGradient={{
            start: { x: 0.0, y: 0.25 },
            end: { x: 0.9, y: 1 },
            locations: [0, 0.9],
            colors: ['#ED6A0C', '#07C160'],
          }}
        >
          <Text className="text-2xl text-c-w font-w5">渐变</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default {
  name: 'View',
  component: ViewPage,
  options: { title: '视图' },
};
