import React, { useState } from 'react';
import { FieldProps } from 'rc-field-form/es/Field';
import Picker, { PickerProps } from '../picker';
import Form from 'rc-field-form';

type FieldChildProps = PickerProps & {
  children: (params: object) => React.ReactNode;
};

type FormPickerType = FieldChildProps & FieldProps;

type PickerChildProps = {
  child: (params: object) => React.ReactNode;
  onOpen: () => void;
};

const PickerChild = ({ child, onOpen, ...rest }: PickerChildProps) => {
  return child({ ...rest, onOpen });
};

const FieldChild = ({
  data,
  value,
  onChange,
  children,
  ...rest
}: FieldChildProps) => {
  const [visible, setVisible] = useState(false);

  const onValueChange = (value: any) => {
    onChange(value);
  };

  return (
    <Picker
      data={data}
      visible={visible}
      value={value}
      onChange={onValueChange}
      onDismiss={() => setVisible(false)}
      onOk={() => setVisible(false)}
      {...rest}
    >
      <PickerChild child={children} onOpen={() => setVisible(true)} />
    </Picker>
  );
};

const FormPicker = (props: FormPickerType) => {
  const {
    name,
    initialValue,
    rules,
    dependencies,
    getValueFromEvent,
    getValueProps,
    normalize,
    preserve = false,
    shouldUpdate,
    trigger = 'onChange',
    validateTrigger = 'onChange',
    valuePropName = 'value',
    ...rest
  } = props;

  return (
    <Form.Field
      name={name}
      initialValue={initialValue}
      rules={rules}
      dependencies={dependencies}
      getValueFromEvent={getValueFromEvent}
      getValueProps={getValueProps}
      normalize={normalize}
      preserve={preserve}
      shouldUpdate={shouldUpdate}
      trigger={trigger}
      validateTrigger={validateTrigger}
      valuePropName={valuePropName}
    >
      <FieldChild {...rest} />
    </Form.Field>
  );
};

export default FormPicker;
