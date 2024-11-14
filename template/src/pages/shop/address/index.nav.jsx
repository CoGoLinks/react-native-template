import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Button, Toast } from '@/components';
import { SectionList } from 'react-native';
import { isMobile } from '@/utils/tools';
import TextInputCell from './TextInputCell';
import SelectAddressCell from './SelectAddressCell';
import TextareaCell from './TextareaCell';

const AddressView = (props) => {
  const [elements, setElements] = React.useState([]);
  const { route } = props;

  const { address = {}, onChangeAddress = () => {} } = route?.params || {};

  useEffect(() => {
    const elementList = [
      {
        name: 'name',
        label: '收货人',
        placeholder: '收货人姓名',
        type: 'input',
        value: address?.name || undefined,
        maxLength: 10,
      },
      {
        name: 'phone',
        label: '联系电话',
        placeholder: '收货人联系电话',
        type: 'input',
        value: address?.phone || undefined,
        maxLength: 11,
      },
      {
        name: 'region',
        label: '所在地区',
        placeholder: '请选择所在地区',
        type: 'select',
        value: {
          provinceCode: address?.provinceCode || undefined,
          province: address?.province || undefined,
          cityCode: address?.cityCode || undefined,
          city: address?.city || undefined,
          regionCode: address?.regionCode || undefined,
          region: address?.region || undefined,
        },
      },
      {
        name: 'addressDetail',
        label: '详细地址',
        placeholder: '如街道、门牌号、小区、乡镇、村等',
        type: 'textarea',
        value: address?.addressDetail || undefined,
      },
    ];
    setElements(elementList);
  }, [address]);

  const isFinish = useMemo(() => {
    const _elements = elements.filter((item) => !!item?.value);
    return _elements.length !== elements.length;
  }, [elements]);

  /**
   * value 改变
   */
  const onValueChange = useCallback(
    (value, name = '') => {
      const _elements = elements.map((item) => {
        if (item.name === name) {
          if (name === 'region') {
            const [province = {}, city = {}, region = {}] = value || [];
            const info = {
              provinceCode: province?.value || '',
              province: province?.label || '',
              cityCode: city?.value || '',
              city: city?.label || '',
              regionCode: region?.value || '',
              region: region?.label || '',
            };
            return { ...item, value: info };
          }
          return { ...item, value };
        } else {
          return item;
        }
      });
      setElements(_elements);
    },
    [elements],
  );
  /**
   * 提交
   */
  const onSubmit = useCallback(() => {
    console.log('elements ===', elements);

    const addressInfo = {};

    elements?.forEach((item) => {
      if (item?.name === 'region') {
        Object.keys(item?.value || {}).forEach((key) => {
          addressInfo[key] = item?.value?.[key] || '';
        });
      } else {
        addressInfo[item?.name || ''] = item?.value || '';
      }
    });

    if (addressInfo?.name?.length > 12) {
      return Toast.info('收货人不能超过12个字符');
    }
    if (!isMobile(addressInfo?.phone)) {
      return Toast.info('手机号码格式不正确');
    }
    if (addressInfo?.addressDetail?.length > 50) {
      return Toast.info('详细地址不能超过50个字符');
    }
    onChangeAddress(addressInfo);
    props.navigation.pop();
  }, [elements, onChangeAddress, props.navigation]);
  return (
    <View useSafeArea className="flex-1">
      <SectionList
        className="flex-1"
        inverted={false} //翻转滚动方向
        initialNumToRender={10} //始渲染的元素数量
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => 'address' + index + item} //每行不重复的key
        sections={[{ data: elements }]} //数据源
        renderItem={({ item = {} }) => {
          //渲染每一个section中的每一个列表项的默认渲染器
          if (item.type === 'input') {
            return (
              <TextInputCell
                item={item}
                onChangeText={(value) => onValueChange(value, item?.name)}
                {...item}
              />
            );
          } else if (item.type === 'select') {
            return (
              <SelectAddressCell
                onPress={(value) => onValueChange(value, item?.name)}
                item={item}
              />
            );
          } else if (item.type === 'textarea') {
            return (
              <TextareaCell
                item={item}
                onChangeText={(value) => onValueChange(value, item?.name)}
              />
            );
          }
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={(info) => {
          //行与行之间的分隔线组件
          return <View className="h-[2rpx]" />;
        }}
        ListHeaderComponent={() => {
          <View className="h-[10rpx]" />;
        }}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListFooterComponent={() => {
          //尾部组件。
          return (
            <View className="mt-[128rpx] ml-[32rpx] mr-[32rpx]">
              <Button disabled={isFinish} size="xl" onPress={onSubmit}>
                确定
              </Button>
            </View>
          );
        }}
      />
    </View>
  );
};

export default {
  name: 'AddressView',
  component: AddressView,
  options: { title: '填写收货地址' },
};
