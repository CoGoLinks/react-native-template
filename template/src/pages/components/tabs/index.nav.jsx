import React from 'react';
import { View, Text } from '@/components';
import Tabs from '@/components/tabs/index.js';

const TabsPage = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tabs style={{ flex: 1 }} initialPage={0}>
        <View key="1" label="全部">
          <Text>Second page</Text>
        </View>
        <View key="2" label="已发货">
          <Text>Second page</Text>
        </View>
        <View key="3" label="未发货">
          <Text>Second page</Text>
        </View>
        <View key="4" label="待支付">
          <Text>Second page</Text>
        </View>
        <View key="5" label="待确认">
          <Text>Second page</Text>
        </View>
        <View key="6" label="已失效">
          <Text>Second page</Text>
        </View>
      </Tabs>
    </View>
  );
};

export default {
  name: 'TabsPage',
  component: TabsPage,
};
