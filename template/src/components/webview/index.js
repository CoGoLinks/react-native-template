import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { WebView } from 'react-native-webview';

// 注入初始化代码
const injectJavaScriptInit = `
(function(){
  window.ReactNativeJsBridge = {
    callbackSeq: 1,
    send: function(data) {
      return new Promise(function(resolve, reject) {
        const callbackName = 'ReactNativeWebViewCallback_' + ReactNativeJsBridge.callbackSeq++;
  
        window[callbackName] = function(result) {
          resolve(result);
          delete window[callbackName];
        };
  
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            callbackId: callbackName,
            data,
          }),
        );
      });
    },
  };

  window.ReactNativeJsBridge.send({
    type: 'titleChange',
    data: document.title,
  });

  new MutationObserver(function(mutations) {
    window.ReactNativeJsBridge.send({
      type: 'titleChange',
      data: mutations[0].target.nodeValue,
    });
  }).observe(
    document.querySelector('title'),
    { subtree: true, characterData: true, childList: true }
  );
})();
`;

export default forwardRef((props, ref) => {
  const {
    source = {},
    onLoad = () => {},
    onLoadEnd = () => {},
    onMessage = () => {},
    onShouldStartLoadWithRequest = null,
    onInvokeMessage = () => {},
    injectJavaScript = '',
    dataDetectorTypes = 'none',
    ...other
  } = props;

  const webRef = useRef();

  useImperativeHandle(ref, () => webRef.current);

  const handleOnLoad = (e) => {
    onLoad(e);
  };

  const handleOnLoadEnd = (e) => {
    onLoadEnd(e);
  };

  const handleOnMessage = (e) => {
    const { data } = e.nativeEvent;

    onMessage(e);

    let json = {};

    try {
      json = JSON.parse(data);
      onInvokeMessage(json.data, (params) => {
        if (json.callbackId) {
          //  对外提供的postMessage方法
          webRef.current.injectJavaScript(`window.${json.callbackId}(${JSON.stringify(params)})`);
        }
      });
    } catch (error) {}
  };

  const hanldeShouldStartLoadWithRequest = (e) => {
    if (onShouldStartLoadWithRequest) {
      return onShouldStartLoadWithRequest(e);
    }
    return true;
  };

  return (
    <WebView
      ref={webRef}
      source={source}
      webviewDebuggingEnabled
      onLoad={handleOnLoad}
      onMessage={handleOnMessage}
      onLoadEnd={handleOnLoadEnd}
      onShouldStartLoadWithRequest={hanldeShouldStartLoadWithRequest}
      injectedJavaScript={`${injectJavaScriptInit}${injectJavaScript}`}
      dataDetectorTypes={dataDetectorTypes}
      allowsInlineMediaPlayback={true}
      {...other}
    />
  );
});
