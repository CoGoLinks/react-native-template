## Form 表单组件

#### 示例

```jsx
import { View, Text, Form, TouchableOpacity, Button } from '@/components';
import dayjs from 'dayjs';

const { Input, Picker, DatePicker } = Form;

function FormPage() {
  const [form] = Form.useForm();
  const sexData = [
    { label: '女', value: '0' },
    { label: '男', value: '1' },
  ];

  const submit = () => {
    const values = form.getFieldsValue();
    console.log(values);
  };

  return (
    <View className="p-30">
      <Form form={form}>
        <Input
          name="name"
          className="h-9 border border-c-n6 rounded-20 p-20 my-10 text-c-n8"
          placeholder="姓名"
        />
        <Input
          name="age"
          className="h-9 border border-c-n6 rounded-20 p-20 my-10 text-c-n8"
          placeholder="年龄"
        />
        <Picker name="sex" data={sexData}>
          {({ onOpen, extra }) => (
            <TouchableOpacity
              className="h-9 border border-c-n6 rounded-20 p-20 my-10 j-center"
              onPress={onOpen}
            >
              <Text>{extra || '请选择'}</Text>
            </TouchableOpacity>
          )}
        </Picker>
        <DatePicker name="date">
          {({ onOpen, value }) => (
            <TouchableOpacity
              className="h-9 border border-c-n6 rounded-20 p-20 my-10 j-center"
              onPress={onOpen}
            >
              <Text>
                {value ? dayjs(value).format('YYYY-MM-DD') : '请选择'}
              </Text>
            </TouchableOpacity>
          )}
        </DatePicker>
        <Button className="mt-30" onPress={submit}>
          提交
        </Button>
      </Form>
    </View>
  );
}
```

其他用法参考：[https://github.com/react-component/field-form](https://github.com/react-component/field-form)
