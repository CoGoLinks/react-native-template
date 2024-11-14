## request 网络请求

#### 用法

```js
export const req = (params) => {
  return request.post('/app/getDemo', params, {
    loading: true,
  });
};
```

#### options 配置

##### `loading`：string | boolean

是否显示 loading。默认为 false，只显示 loading，没有文字信息。传字符串则在 loading 下显示字符串；

##### `errorToast`：boolean

异常时是否提示错误信息，默认为 true；

##### `errorTypeToCatch`：boolean

是否在`errorType`不为空时将使请求变为异常，此时将`errorType`、`message`传给`catch`，默认为 true；
