import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Colors } from '@/components';
import HomeScreen from '../home';
import ComponentsScreen from '../components';
import MineScreen from '../mine';

const Tab = createBottomTabNavigator();

const imgMap = {
  Home: ['data', 'data2'],
  Components: ['home', 'home2'],
  Mine: ['mine', 'mine2'],
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        sceneContainerStyle: { backgroundColor: Colors.grey10 },
        headerTitleAlign: 'center',
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: { marginTop: 0, top: -5 },
        headerShown: true,
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ focused }) => {
          return <Icon name={imgMap[route.name][focused ? 1 : 0]} size={46} />;
        },
      })}
    >
      <Tab.Screen {...HomeScreen} />
      <Tab.Screen {...ComponentsScreen} />
      <Tab.Screen {...MineScreen} />
    </Tab.Navigator>
  );
}

export default {
  name: 'Tabs',
  component: Tabs,
  options: { headerShown: false },
};
