import React, { forwardRef } from 'react';
import { FieldProps } from 'rc-field-form/es/Field';
import { Input, InputProps } from '../input';
import Form from 'rc-field-form';

type FormInputType = InputProps & FieldProps;

const InputChild = forwardRef(({ value = '', onChange = () => {}, ...other }: InputProps, ref) => {
  const onChangeText = (e: any) => onChange(e);

  return <Input ref={ref} value={value} onChangeText={onChangeText} {...other} />;
});

const FormInput = forwardRef((props: FormInputType, ref) => {
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
      <InputChild ref={ref} {...rest} />
    </Form.Field>
  );
});

export default FormInput;
