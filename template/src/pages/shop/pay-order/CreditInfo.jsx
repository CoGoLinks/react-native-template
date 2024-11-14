import React, { useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Icon, ImagePicker } from '@/components';
import { ImageBackground } from 'react-native';
import { ActionSheet } from 'react-native-ui-lib';
import { uploadFileUrl } from '@/services/system';
import dayjs from 'dayjs';
import TextInputCell from './TextInputCell';
import SelectDateCell from './SelectDateCell';

const CreditInfo = (props) => {
  const { onChange = () => {} } = props;
  const [elements, setElements] = React.useState([]);
  const [visibleActionSheet, setVisibleActionSheet] = React.useState(false);

  useEffect(() => {
    const elementList = [
      {
        name: 'remitNo',
        label: '汇款账号',
        placeholder: '请输入汇款账号',
        type: 'input',
        maxLength: 20,
        keyboardType: 'numeric',
      },
      {
        name: 'remitName',
        label: '汇款户名',
        placeholder: '请输入汇款户名',
        type: 'input',
        maxLength: 30,
        keyboardType: 'default',
      },
      {
        name: 'remitDate',
        label: '汇款时间',
        placeholder: '选择汇款时间',
        type: 'select',
      },
      {
        name: 'payDocUrl',
        label: '点击上传付款凭证',
        placeholder: '点击上传付款凭证',
        type: 'image',
      },
    ];
    setElements(elementList);
  }, []);

  /**
   * value 改变
   */
  const onValueChange = useCallback(
    (value, name = '') => {
      const _elements = elements.map((item) => {
        if (item.name === name) {
          if (name === 'remitDate') {
            return { ...item, value: dayjs(value).format('YYYY-MM-DD') };
          }
          return { ...item, value };
        } else {
          return item;
        }
      });
      console.log('_elements ==', _elements);
      setElements(_elements);
      onChange(_elements);
    },
    [elements, onChange],
  );
  /**
   * 删除图片
   */
  const onDeleteImageAction = useCallback(() => {
    onValueChange(undefined, 'payDocUrl');
  }, [onValueChange]);

  /**
   * 显示选择相册框
   */
  const onShowActionSheet = useCallback(() => {
    setVisibleActionSheet(true);
  }, []);

  /**
   * 选择照片并上传
   */
  const onSelectedImageAction = async (type = '') => {
    if (type === 'photo') {
      ImagePicker.openPicker()
        .then(async (path) => {
          try {
            const res = await uploadFileUrl(path);
            if (!res?.errorType) {
              const { data = '' } = res || {};
              onValueChange(data, 'payDocUrl');
            }
          } catch (error) {
            console.log('error=', error);
          }
        })
        .catch((err) => {
          //暂发现 没有权限 用户取消上传 会走到这里
          console.log('err ===', err);
        });
    } else {
      ImagePicker.openCamera()
        .then(async (path) => {
          try {
            const res = await uploadFileUrl(path);
            if (!res?.errorType) {
              const { data = '' } = res || {};
              onValueChange(data, 'payDocUrl');
            }
          } catch (error) {
            console.log('error=', error);
          }
        })
        .catch((err) => {
          //暂发现 没有权限 用户取消上传 会走到这里
          console.log('err ===', err);
        });
    }
  };

  return (
    <View className="flex-1 bg-c-w ml-[22rpx] mr-[22rpx] rounded-8  pb-[84rpx]">
      <View className="bg-[#EAF0FA] pt-[14rpx]  pb-[14rpx]  pl-[22rpx]  pr-[22rpx]">
        <Text className="font-w5 text-[#333333] text-[28rpx]">
          请填写您的付款凭证
          <Text className="font-w5 text-[#ABAEB3] text-[26rpx]">（1-2个工作日内审核）</Text>
        </Text>
      </View>
      <View className="mt-[26rpx] ml-[16rpx] mr-[16rpx] bg-[rgba(245,245,245,0.55)] rounded-4">
        {elements.map((item, index) => {
          if (item.type === 'select') {
            return (
              <SelectDateCell item={item} onPress={(value) => onValueChange(value, item.name)} />
            );
          } else if (item.type === 'image') {
            if (item.value) {
              return (
                <View key={item.name + index} style={styles.phoneView}>
                  <ImageBackground
                    source={{
                      uri: item.value,
                    }}
                    resizeMode="cover"
                    style={styles.imageBackground}
                  >
                    <View className="flex-1 items-end ">
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onDeleteImageAction}
                        className="flex-row bg-[rgba(0,0,0,0.7)] rounded-8 items-center justify-end mt-[10rpx] mr-[10rpx] pt-[6rpx] pl-[10rpx] pr-[10rpx] pb-[6rpx]"
                      >
                        <Icon name="remove" size={28} color="#ffffff" />
                        <Text className="font-w4 text-c-w text-[26rpx] pl-[8rpx]">删除</Text>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
                </View>
              );
            } else {
              return (
                <>
                  <View className="h-[32rpx] bg-c-w" />
                  <View
                    key={item.name + index}
                    className="h-[166rpx] rounded-4 border-dashed border-[#C8C9CC] border-[2rpx]"
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={onShowActionSheet}
                      className="flex-1 items-center justify-center"
                    >
                      <Icon name="camera" size={44} color="#ABAEB3" />
                      <Text className="font-w4 text-[#ABAEB3] text-[26rpx] pt-[10rpx]">
                        点击上传付款凭证
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }
          } else {
            return (
              <TextInputCell
                item={item}
                onChangeText={(value) => onValueChange(value, item.name)}
                {...item}
              />
            );
          }
        })}
      </View>

      <View className="flex-1 pl-[24rpx] pr-[24rpx] pt-[10rpx]">
        <Text className="font-w4 text-[#969799] text-[24rpx]">单个图片上传不超过20M</Text>
      </View>

      <ActionSheet
        useSafeArea
        useNativeIOS
        visible={visibleActionSheet}
        title={'上传付款凭证'}
        destructiveButtonIndex={2}
        onDismiss={() => {
          console.log('onDismiss ==');
          setVisibleActionSheet(false);
        }}
        options={[
          { label: '相册选择', onPress: () => onSelectedImageAction('photo') },
          { label: '拍照上传', onPress: () => onSelectedImageAction() },
          { label: '取消', onPress: () => setVisibleActionSheet(false) },
        ]}
      />
    </View>
  );
};

const styles = {
  phoneView: {
    height: '166rpx',
    marginTop: '32rpx',
    marginLeft: '16rpx',
    marginRight: '16rpx',
    borderRadius: '4rpx',
    backgroundColor: '#F7F8FA',
    borderWidth: '2rpx',
    borderColor: '#C8C9CC',
    borderStyle: 'dashed',
    borderDash: [2, 20],
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
  },
};

export default CreditInfo;
