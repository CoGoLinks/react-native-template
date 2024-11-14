import React, { useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, Icon } from '@/components';
import { TextInput } from 'react-native';
import { toFixedString } from '@/utils/tools';

const GoodsItem = ({ item = {}, onChecked = () => {}, onChange = () => {} }) => {
  // {
  //   "subModelId": "7136",
  //   "subModelName": "1.0+Epos-华智融NEW6220(4G)",
  //   "modelName": "1.0+Epos-华智融NEW6220(4G)",
  //   "minQuantity": 5,
  //   "unitQuantity": 1,
  //   "unitPrice": 40,
  //   "unit": "台",
  //   "imageUrl": "https://sms-admin-test.suixingpay.com/img/logo_3.png"
  // }
  // 减禁用 启用
  const isMinusDisabled = useMemo(() => {
    return !(item.checked && item?.amount > item.minQuantity);
  }, [item.amount, item.checked, item.minQuantity]);
  // 加禁用 启用
  const isAddDisabled = useMemo(() => {
    return !item.checked;
  }, [item.checked]);
  return (
    <View key={Math.random()} style={styles.cellView}>
      <View style={styles.imageView}>
        <TouchableOpacity
          onPress={() => {
            onChecked(item);
          }}
          className="justify-center items-center h-full pr-[18rpx] pl-[14rpx]"
        >
          {item?.checked ? (
            <Icon name="checked" size="40" />
          ) : (
            <View className="h-[40rpx] w-[40rpx] rounded-[50rpx] border-2 border-c-mw" />
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
          className="bg-c-primary h-full items-center justify-center pr-[18rpx]"
          onPress={() => onChecked(item)}
        >
          <Checkbox
            color={item?.checked ? '#1E2B4F' : '#D8D8D8'}
            value={item?.checked || false}
            onValueChange={() => onChecked(item)}
            borderRadius={50}
            size={24}
          />
        </TouchableOpacity> */}
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: item?.imageUrl,
          }}
        />
      </View>
      <View style={styles.infoView}>
        <View style={styles.infoLayout}>
          <View>
            <Text style={styles.nameText} numberOfLines={2}>
              {item?.subModelName || ''}
            </Text>
            <Text style={styles.descText}>
              起订量：{item?.minQuantity || ''}
              {item?.unit || ''}
            </Text>
          </View>
          <View style={styles.footerView}>
            <Text className="text-c-my text-[32rpx] font-w6">
              ¥{toFixedString(item?.unitPrice)}
              <Text className="text-c-my text-[22rpx] font-w4">/{item?.unit || ''}</Text>
            </Text>
            <View style={styles.actionView}>
              <TouchableOpacity disabled={isMinusDisabled} onPress={() => onChange(item, 'minus')}>
                <View style={styles.actionMinus}>
                  <Text style={isMinusDisabled ? styles.disabledText : styles.activeText}>-</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.inputView}>
                <TextInput
                  value={`${item?.amount}`}
                  editable={false}
                  style={item.checked ? styles.activeInput : styles.disabledInput}
                />
              </View>
              <TouchableOpacity disabled={isAddDisabled} onPress={() => onChange(item, 'add')}>
                <View style={styles.actionAdd}>
                  <Text style={isAddDisabled ? styles.disabledText : styles.activeText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  cellView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: '25rpx',
    paddingRight: '18rpx',
    borderRadius: '8rpx',
    marginHorizontal: '22rpx',
  },
  imageView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '176rpx',
    height: '176rpx',
    borderRadius: '8rpx',
    backgroundColor: '#F2F2F2',
  },
  infoView: {
    flex: 1,
    paddingLeft: '26rpx',
  },
  infoLayout: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameText: {
    color: '#323233',
    fontSize: '28rpx',
    fontWeight: 'bold',
    paddingTop: '8rpx',
  },
  descText: {
    color: '#646566',
    fontSize: '26rpx',
    paddingTop: '10rpx',
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBox: {
    width: '47rpx',
    height: '47rpx',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  actionMinus: {
    width: '47rpx',
    height: '47rpx',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F3F5',
    borderRadius: '7rpx 0rpx 0rpx 7rpx',
  },
  actionAdd: {
    width: '47rpx',
    height: '47rpx',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F3F5',
    borderRadius: '0rpx 7rpx 7rpx 0rpx',
  },
  activeText: {
    color: '#323233',
  },
  disabledText: {
    color: '#C8C9CC',
  },
  inputView: {
    minWidth: '64rpx',
    height: '47rpx',
    borderColor: '#E8E9EB',
    borderWidth: '1rpx',
    marginHorizontal: '2rpx',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeInput: {
    textAlign: 'center',
    padding: 0,
    minWidth: 32,
    height: 23.5,
    color: '#323233',
  },
  disabledInput: {
    textAlign: 'center',
    padding: 0,
    minWidth: 32,
    height: 23.5,
    color: '#C8C9CC',
  },
};
export default GoodsItem;
