# WebView 组件

### 示例

#### H5 调用 RN

##### RN 端
```jsx
function WebPage() {
  const onInvokeMessage = (data, callback) => {
    if (data.type === 'userInfo') {
      callback({
        userId: '0000',
        userName: '秦始皇',
      });
    } else if (data.type === '***') {
      // ...
    }
  };

  return <WebView source={{ uri: 'http://***.com' }} onInvokeMessage={onInvokeMessage} />;
}
```

##### H5 调用 RN

```js
if (window.ReactNativeJsBridge) {
  const res = await window.ReactNativeJsBridge.send({
    type: 'userInfo',
  });
  console.log(res); // { userId: '0000', userName: '秦始皇' }
}

if (window.ReactNativeJsBridge) {
		// 给 app发送执行方法action
		await window.ReactNativeJsBridge.send({
				  type: 'dispatchAction',
		  });
}

```

#### RN 调用 H5

##### H5 端
```js
/**
 * RN调用H5 
 * data: 发送对象类型的json字符串
 */
useEffect(() => {
  // document和window注册了两遍事件，这其实因为document.addEventListener在iOS平台无效
  document.addEventListener('message', (message) => {
    const { data = {} } = message || {};
    console.log('document.data ==', data);
  });
  window.addEventListener('message', (message) => {
    const { data = {} } = message || {};
    console.log('window.data ==', data);
  });
}, []);
```
##### RN 调用H5
```js
<WebView
  ref={webRef}
  originWhitelist={['*']}
  source={{ uri: route.params.url }}
  onInvokeMessage={onInvokeMessage}
 />

webRef.current && webRef.current.postMessage(JSON.stringify(data));
```