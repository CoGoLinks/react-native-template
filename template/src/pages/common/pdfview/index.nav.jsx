import React, { useEffect } from 'react';
import { Toast, PdfView } from '@/components';
import { StyleSheet, Dimensions, View, SafeAreaView } from 'react-native';
/**
 * PDF查看公共页面 公共页面
 */
function PdfPage({ navigation, route }) {
  useEffect(() => {
    navigation.setOptions({ title: route.params.title });
  }, [navigation, route.params.title]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <PdfView
          style={styles.pdf}
          source={{ uri: route.params.url }}
          trustAllCerts={false}
          onError={(error) => {
            console.log(error);
            Toast.info('文件加载失败', 1);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default {
  name: 'PdfPage',
  component: PdfPage,
  options: { title: 'PDF' },
};
