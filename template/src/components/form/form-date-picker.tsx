import React, { useState } from 'react';
import { FieldProps } from 'rc-field-form/es/Field';
import DatePicker, { DatePickerProps } from '../date-picker';
import Form from 'rc-field-form';

type DatePickerChildProps = DatePickerProps & {
  children: (params: object) => React.ReactNode;
};

type FormDatePickerType = DatePickerChildProps & FieldProps;

const PickerChild = ({ value, onChange, children, ...rest }: DatePickerChildProps) => {
  const [visible, setVisible] = useState(false);

  const onValueChange = (value: any) => {
    onChange(value);
  };

  const childrenParams = {
    onOpen: (isVisible: boolean) => {
      setVisible(isVisible);
    },
    value: value,
  };

  return (
    <>
      {children(childrenParams)}
      <DatePicker
        visible={visible}
        value={value}
        onChange={onValueChange}
        onOk={() => setVisible(false)}
        onVisibleChange={(isVisible) => setVisible(isVisible)}
        {...rest}
      />
    </>
  );
};

const FormInput = (props: FormDatePickerType) => {
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
      <PickerChild {...rest} />
    </Form.Field>
  );
};

export default FormInput;
