import React from 'react';
import { View, Text, ScrollView } from '@/components';
import styles from './style';

function TextPage() {
  return (
    <ScrollView>
      <View padding-20>
        <Text>文本</Text>
        <Text h1>这是一个标题</Text>
        <Text h2>这是一个标题</Text>
        <Text h3>这是一个标题</Text>
        <Text h4>这是一个标题</Text>
        <Text h5>这是一个标题</Text>
        <Text h5 className="mt-30 mb-30 center bg-n7">
          字体大小：text-sm
        </Text>
        <Text className="text-sm">
          你还可以使用对象语法指定默认行高，这样你还可以提供默认的 letter-spacing 和 font-weight
          值。你可以使用 fontSize, lineHeight?, letterSpacing?, fontWeight? 形式的元组来执行此操作。
        </Text>
        <Text h5 className="mt-30">
          字体大小：text-base
        </Text>
        <Text className="text-base">
          你还可以使用对象语法指定默认行高，这样你还可以提供默认的 letter-spacing 和 font-weight
          值。你可以使用 fontSize, lineHeight?, letterSpacing?, fontWeight? 形式的元组来执行此操作。
        </Text>
        <Text h5 className="mt-30">
          字体大小：text-xl
        </Text>
        <Text className="text-xl font-w5">
          你还可以使用对象语法指定默认行高，这样你还可以提供默认的 letter-spacing 和 font-weight
          值。你可以使用 fontSize, lineHeight?, letterSpacing?, fontWeight? 形式的元组来执行此操作。
        </Text>
        <Text h5 className="mt-30">
          字体大小：text-2xl
        </Text>
        <Text className="text-2xl">
          你还可以使用对象语法指定默认行高，这样你还可以提供默认的 letter-spacing 和 font-weight
          值。你可以使用 fontSize, lineHeight?, letterSpacing?, fontWeight? 形式的元组来执行此操作。
        </Text>
        <Text h5 className="mt-30">
          字体大小：text-3xl
        </Text>
        <Text className="text-3xl">
          你还可以使用对象语法指定默认行高，这样你还可以提供默认的 letter-spacing 和 font-weight
          值。你可以使用 fontSize, lineHeight?, letterSpacing?, fontWeight? 形式的元组来执行此操作。
        </Text>
        <Text h5 className="mt-30">
          字体大小：text-4xl
        </Text>
        <Text className="text-4xl">
          你还可以使用对象语法指定默认行高，这样你还可以提供默认的 letter-spacing 和 font-weight
          值。你可以使用 fontSize, lineHeight?, letterSpacing?, fontWeight? 形式的元组来执行此操作。
        </Text>
        <Text h5 className={['mt-30']}>
          字体大小：text-5xl
        </Text>
        <Text className="text-5xl">
          你还可以使用对象语法指定默认行高，这样你还可以提供默认的 letter-spacing 和 font-weight
          值。你可以使用 fontSize, lineHeight?, letterSpacing?, fontWeight? 形式的元组来执行此操作。
        </Text>
      </View>
    </ScrollView>
  );
}

export default {
  name: 'Text',
  component: TextPage,
  options: { title: '文本' },
};
