# Modal 弹框

## 代码示例

```jsx
import { Modal, View, Text } from '@/components';

function Example() {
  const [visible, setVisible] = React.useState(false);

  return (
    <Modal
      visible={visible}
      position="bottom"
      animationType="fadeIn"
      maskClosable
      onClose={() => setVisible(false)}
    >
      <View>
        <Text>内容</Text>
      </View>
    </Modal>
  );
}
```

## 属性说明

| **属性**      | **说明**                     | **类型** | **可选值**                                           | **默认值** |
| ------------- | ---------------------------- | -------- | ---------------------------------------------------- | ---------- |
| visible       | 是否显示弹框                 | Boolean  | `true` `false`                                       | false      |
| position      | 弹出位置                     | String   | `top` `center` `bottom` `fill`                       | `fill`     |
| animationType | `position`为`center`时的动画 | String   | `fadeIn` `zoomIn` `bounceIn` `fadeInDown` `fadeInUp` | `zoomIn`   |
| maskClosable  | 点击遮罩是否关闭弹框         | Boolean  | `true` `false`                                       | false      |
| maskStyle     | 遮罩样式                     | Object   | -                                                    | -          |
| onClose       | 触发关闭时的回调函数         | Function | -                                                    | -          |

### Modal.alert(options);

#### 示例

```jsx
const alert = Modal.alert({
  title: '标题',
  message: '为了更好地保障您的合法权益，请您阅读并同意：《鑫联盟用户注册协议》',
  okText: '确定',
  cancelText: '确定',
  onOk: () => {
    alert.close();
  },
  // onCancel: () => {},
});
```

#### 打开弹框

`const alert = Modal.alert({});`

#### 关闭弹框

`alert.close();`
或
`Modal.alert.close();`

#### 参数说明

| **属性**    | **说明**                                            | **类型**            | **可选值**      | **默认值** |
| ----------- | --------------------------------------------------- | ------------------- | --------------- | ---------- |
| title       | 标题                                                | String              | -               | -          |
| message     | 字符串文字信息或元素                                | String \| ReactNode | -               | -          |
| onOk        | 确认点击事件                                        | Function            | -               | -          |
| onCancel    | 取消点击事件                                        | Function            | -               | -          |
| okText      | 确认按钮显示文字                                    | String              | -               | -          |
| cancelText  | 取消按钮显示文字，传`null`或`false`则不显示取消按钮 | String              | -               | -          |
| closeWhenOk | 点击确定时是否自动关闭弹框                          | Boolean             | `true`\|`false` | `true`     |
