import React, { useMemo } from 'react';
import { useNavigationBuilder, createNavigatorFactory } from '@react-navigation/native';
import { NativeStackView } from '@react-navigation/native-stack';
import StackRouter from './StackRouter';

function StachNavigator({ initialRouteName, backBehavior, children, screenOptions, ...rest }) {
  // 拦截器函数集合
  const intercepts = {};

  // 页面options集合
  const pageOptions = {};

  for (const child of children) {
    const { name, options, intercept } = child.props;
    if (intercept) {
      intercepts[name] = intercept;
    }
    pageOptions[name] = options;
  }

  const { state, descriptors, navigation, NavigationContent } = useNavigationBuilder(StackRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
    intercepts,
    pageOptions,
  });

  return (
    <NavigationContent>
      <NativeStackView {...rest} state={state} navigation={navigation} descriptors={descriptors} />
    </NavigationContent>
  );
}

export default createNavigatorFactory(StachNavigator);
