import React, { forwardRef } from 'react';
import RCForm, { FormProps } from 'rc-field-form';
import Input from './form-input';
import Picker from './form-picker';
import DatePicker from './form-date-picker';

/**
 * 封装表单组件，类似于antd Form组件的用法
 * 使用rc-field-form封装
 * 详细文档： https://github.com/react-component/field-form
 */
const Provider = RCForm.FormProvider;
const Item = RCForm.Field;
const List = RCForm.List;
const useForm = RCForm.useForm;
const useWatch = RCForm.useWatch;

const MyForm = forwardRef((props: FormProps, ref: any) => {
  const { component = false, ...otherProps } = props;
  return <RCForm ref={ref} component={component} {...otherProps} />;
});

export type FormType = typeof MyForm & {
  Provider: typeof Provider;
  Item: typeof Item;
  List: typeof List;
  useForm: typeof useForm;
  useWatch: typeof useWatch;
  Input: typeof Input;
  Picker: typeof Picker;
  DatePicker: typeof DatePicker;
};

const Form = MyForm as FormType;

Form.Provider = Provider;
Form.Item = Item;
Form.List = List;
Form.useForm = useForm;
Form.useWatch = useWatch;

Form.Input = Input;
Form.Picker = Picker;
Form.DatePicker = DatePicker;

export default Form;
