## 状态管理

### 定义模块

文件名以`.modal.js`结尾，会自动加载到 store 中；

#### 示例：

user.modal.js

```js
export default {
  persistWhiteList: ['user'], // 需要持久化的属性
  create: (set) => ({
    count: 0,
    user: {},
    setUser: (user) => set(() => ({ user })),
  }),
};
```

#### persistWhiteList：需要持久化的属性名列表；

#### create：初始化方法；

### 组件中使用

#### useState(stateKey1, stateKey2, ...)

```js
function Demo() {
  const { user, setUser, setState } = useStore('user', 'setUser');
  const onPress = () => {
    setUser({ name: 'test' });
    // setState({ user: { name: 'test1' } });
  };

  return (
    <View>
      <Text onPress={onPress}>登录</Text>
      <Text>user: {user}</Text>
    </View>
  );
}
```
