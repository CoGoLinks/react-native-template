import React, { forwardRef } from 'react';
import AntPicker, { PickerProps as AntPickerProps } from '@ant-design/react-native/lib/picker';
import {
  PickerColumn,
  PickerColumnItem,
  PickerValue,
  PickerValueExtend,
} from '@ant-design/react-native/lib/picker-view/PropsType';
import { View, Text } from '../';

type PickerProps = AntPickerProps & {
  /**
   * 是否单列模式
   */
  single: boolean;
  onChange: (value: PickerValue | PickerValue[], extend?: PickerValueExtend) => void;
};

/**
 * 包装Picker组件
 */
export const Picker = forwardRef((props: PickerProps, ref: any) => {
  const { onChange, value, single, ...rest } = props;
  const valType = typeof value === 'number' || typeof value === 'string';
  const val = valType && single ? [value] : value;

  const onValueChange = (val: PickerValue[], extend?: PickerValueExtend) => {
    onChange(single ? val[0] : val, extend);
  };

  return (
    <AntPicker
      ref={ref}
      value={val}
      onChange={onValueChange}
      title={<View className="absolute-fill bg-c-w mr-[-100rpx]" />}
      dismissText={
        <View className="absolute-fill center bg-c-w">
          <Text className="text-c-blue text-xl">取消</Text>
        </View>
      }
      okText={
        <View className="absolute-fill center bg-c-w">
          <Text className="text-c-blue text-xl">确定</Text>
        </View>
      }
      {...rest}
    />
  );
});

Picker.displayName = 'Picker';

export type { PickerColumn, PickerColumnItem, PickerProps };
export default Picker;
