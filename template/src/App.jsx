import React, { useEffect, useRef } from 'react';
import { StatusBar, AppState, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from '@ant-design/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PushyProvider, Pushy } from 'react-native-update';
import { isProd } from '@/config/env';
import '@/assets';
import '@/config';
import '@/store';
import { UIProvider } from '@/components';
import { Navigator, navigationRef } from '@/navigation';
import { track } from '@/utils/analytics';
import codepushConfig from '../update.json';

const pages = require.context('./pages', true, /\.nav.jsx/);
const screens = pages.keys().map((key) => pages(key)?.default || {});

const { appKey } = codepushConfig[Platform.OS];

// 唯一必填参数是appKey，其他选项请参阅 api 文档
const pushyClient = new Pushy({
  appKey,
  // 注意，默认情况下，在开发环境中不会检查更新
  // 如需在开发环境中调试更新，请设置debug为true
  // 但即便打开此选项，也仅能检查、下载热更，并不能实际应用热更。实际应用热更必须在release包中进行。
  debug: false,
  updateStrategy: isProd ? 'silentAndNow' : 'alwaysAlert',
  logger: ({ type, data }) => {
    console.log('pushyClient type = ', type);
    console.log('pushyClient data = ', data);
  },
});

console.log('__DEV__ =', __DEV__);

function App() {
  useEffect(() => {
    AppState.addEventListener('change', (state) => {
      console.log('App状态改变 = ', state);
      if (state === 'active') {
      }
    });
  }, []);

  const routeRef = useRef({});
  const optionsRef = useRef({});

  return (
    <PushyProvider client={pushyClient}>
      <GestureHandlerRootView style={styles.container}>
        <Provider>
          <UIProvider>
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
            <NavigationContainer
              ref={navigationRef}
              onReady={() => {
                routeRef.current = navigationRef.getCurrentOptions();
              }}
              onStateChange={async () => {
                // 页面曝光埋点
                const { name: preName } = routeRef.current;
                const { name = '' } = navigationRef.getCurrentRoute() || {};

                // 页面相同不做操作
                if (preName === name) {
                  return;
                }

                const options = navigationRef.getCurrentOptions();
                const { title, pageName } = options || {}; // 本页面名称
                const { title: pre_title, pageName: pre_pageName } = optionsRef.current || {}; // 上个页面名称

                let prepage_name = '';
                let page_name = '';

                if (pageName) {
                  page_name = pageName;
                } else if (title) {
                  page_name = `${title}页`;
                }

                if (pre_pageName) {
                  prepage_name = pre_pageName;
                } else if (pre_title) {
                  prepage_name = `${pre_title}页`;
                }

                if (pageName !== false && page_name) {
                  track.pageShow({
                    page_name,
                    prepage_name,
                  });
                }

                navigationRef.current.setParams({
                  pageInfo: {
                    pageName: page_name,
                    prePageName: prepage_name,
                  },
                });

                optionsRef.current = navigationRef.getCurrentOptions();
                routeRef.current = navigationRef.getCurrentRoute();
              }}
            >
              <Navigator initialRouteName="LaunchScreen" screens={screens} />
            </NavigationContainer>
          </UIProvider>
        </Provider>
      </GestureHandlerRootView>
    </PushyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
