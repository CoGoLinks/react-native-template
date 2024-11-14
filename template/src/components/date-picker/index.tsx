import React, { forwardRef } from 'react';
import AntDatePicker, {
  DatePickerProps,
} from '@ant-design/react-native/lib/date-picker/date-picker';
import { View, Text } from '../';

/**
 * 包装DatePicker组件
 */
export const DatePicker = forwardRef((props: DatePickerProps, ref: any) => {
  return (
    <AntDatePicker
      ref={ref}
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
      {...props}
    />
  );
});

DatePicker.displayName = 'DatePicker';

export type { DatePickerProps };

export default DatePicker;
