import React, { useMemo } from 'react';
import { create } from '@alboped/react-native-style';
import createNativeStackNavigator from './createNativeStackNavigator';
import { Colors } from '@/components';
import { tw } from '@/style';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

const Stack = createNativeStackNavigator();

/**
 * navigation 页面默认配置
 */
export const defaultScreenOptions = {
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerTintColor: tw.color('c-text'),
  contentStyle: { backgroundColor: Colors.n2 },
  orientation: 'portrait', // 只允许竖屏
  animation: 'slide_from_right',
  headerShadowVisible: false,
  headerTitleStyle: create({
    fontSize: '36rpx',
    fontWeight: '500',
  }),
};

export const handleScreenOptions = (pageOptions = {}) => {
  const { options, ...otherPageOptions } = pageOptions;

  if (typeof options === 'function') {
    return {
      options,
      ...otherPageOptions,
    };
  }

  const { headerRightButton, backOnPress, headerTitleInfo, ...otherOptions } = options || {};

  return {
    options: ({ navigation, route }) => {
      const options = {
        headerBackVisible: false,
        headerLeft: (option) => (
          <HeaderLeft
            navigation={navigation}
            route={route}
            option={option}
            backOnPress={backOnPress}
          />
        ),
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            route={route}
            headerRightButton={headerRightButton}
          />
        ),
        ...otherOptions,
      };
      // 自定义标题
      if (headerTitleInfo && typeof headerTitleInfo === 'function') {
        options.headerTitle = () => headerTitleInfo({ navigation, route });
      }
      return options;
    },
    ...otherPageOptions,
  };
};

const Navigator = ({ screens, screenOptions = {}, ...other }) => {
  const renderScreens = useMemo(() => {
    return screens.map((page) => {
      const { name, component, ...rest } = page || {};
      return (
        name && (
          <Stack.Screen
            key={name}
            name={name}
            getComponent={() => component}
            {...handleScreenOptions(rest)}
          />
        )
      );
    });
  }, [screens]);

  return (
    <Stack.Navigator screenOptions={{ ...defaultScreenOptions, ...screenOptions }} {...other}>
      {renderScreens}
    </Stack.Navigator>
  );
};

export default Navigator;
