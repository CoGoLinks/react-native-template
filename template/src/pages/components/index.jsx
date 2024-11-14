import React from 'react';
import { View, Text, TouchableOpacity, Assets, Icon, ScrollView } from '@/components';
import style from './style';

const { icons } = Assets;

const componentData = [
  {
    title: '基础组件',
    components: [
      {
        name: 'View',
        label: '视图',
        routeName: 'View',
        icon: icons.view,
      },
      { name: 'Text', label: '文本', routeName: 'Text', icon: icons.text },
      { name: 'Color', label: '颜色', routeName: 'Color', icon: icons.color },
      { name: 'Button', label: '按钮', routeName: 'Button', icon: icons.block },
      { name: 'Toast', label: '提示', routeName: 'Toast', icon: icons.message },
      { name: 'Image', label: '图片', routeName: 'Image', icon: icons.image },
      { name: 'Icon', label: '图标', routeName: 'Icon', icon: icons.grid },
      {
        name: 'ImagePicker',
        label: '图片选择',
        routeName: 'Image',
        icon: icons.image,
      },
      { name: 'List', label: '列表', routeName: 'List', icon: icons.list },
      { name: 'Modal', label: '窗口', routeName: 'Modal', icon: icons.modal },
      {
        name: 'Tabs',
        label: '标签切换',
        routeName: 'TabsPage',
        icon: icons.carousel,
      },
      {
        name: 'Carousel',
        label: '轮播',
        routeName: 'Carousel',
        icon: icons.carousel,
      },
    ],
  },
  {
    title: '表单组件',
    components: [
      { name: 'Form', label: '表单', routeName: 'Form', icon: icons.view },
      { name: 'Input', label: '输入框', routeName: 'Input', icon: icons.input },
      {
        name: 'Picker',
        label: '选择器弹框',
        routeName: 'Picker',
        icon: icons.select,
      },
      {
        name: 'PickerView',
        label: '选择器',
        routeName: 'PickerView',
        icon: icons.select,
      },
      {
        name: 'DatePicker',
        label: '时间选择器弹框',
        routeName: 'DatePicker',
        icon: icons.select,
      },
      {
        name: 'DatePickerView',
        label: '时间选择器',
        routeName: 'DatePickerView',
        icon: icons.select,
      },
      {
        name: 'Switch',
        label: '开关',
        routeName: 'Switch',
        icon: icons.switch,
      },
      {
        name: 'Checkbox',
        label: '复选框',
        routeName: 'Checkbox',
        icon: icons.checkbox,
      },
    ],
  },
  {
    title: '业务组件',
    components: [
      { name: 'InfiniteScroll', label: '长列表', routeName: 'InfiniteScroll' },
      { name: 'ScanCodeView', label: '扫码', routeName: 'ScanSnCode' },
      { name: 'TemplatesView', label: '开发模板', routeName: 'TemplatesView' },
    ],
  },
];
function ComponentsPage({ navigation }) {
  const renderItem = (item, index) => (
    <View key={index} className={['p-1', { width: '50%' }]}>
      <TouchableOpacity
        onPress={() => navigation.push(item.routeName)}
        className={'flex-row items-center p-[20rpx] rounded-2 border-1 border-c-primary'}
      >
        <View flex>
          <Text style={style.itemTitle}>{item.label}</Text>
          <Text>{item.name}</Text>
        </View>
        {!!item.icon && <Icon source={item.icon} size={36} color={'red'} />}
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView>
      {componentData.map((item, index) => (
        <View key={index}>
          <Text className="m-30 mb-10">{item.title}</Text>
          <View className="row flex-wrap p-20">{item.components.map(renderItem)}</View>
        </View>
      ))}
    </ScrollView>
  );
}

export default {
  name: 'Components',
  component: ComponentsPage,
  options: {
    pageName: 'first_page',
    tabBarLabel: '组件',
    title: '组件',
    headerShown: true,
  },
};
