import React from 'react';
import { View, Text, TouchableOpacity } from '@/components';
import { Dialog, PanningProvider } from 'react-native-ui-lib';

function DialogView(props) {
  const {
    visible = false,
    title = '',
    content = null,
    cancelText = '取消',
    isShowCancel = true,
    confirmText = '确定',
    onConfirm = () => {},
    onCancel = () => {},
    onDismiss = () => {},
    data = {}, // 额外数据， 需要传递数据的时候使用，
  } = props;

  return (
    <Dialog
      visible={visible}
      useSafeArea
      overlayBackgroundColor="rgba(0, 0, 0, 0.7)"
      onDismiss={() => {
        onDismiss(data);
      }}
      panDirection={PanningProvider.Directions.DOWN}
    >
      <View className="bg-c-w rounded-20 pt-[46rpx] pr-[28rpx] pl-[28rpx] ml-[32rpx] mr-[32rpx]">
        <View className="items-center border-b-[1rpx] border-b-[#EBEDF0] pb-[40rpx]">
          {title && (
            <View className="pb-20">
              <Text style={styles.titleText}>{title}</Text>
            </View>
          )}
          {React.isValidElement(content) ? (
            content
          ) : (
            <Text style={styles.contentText}>{content}</Text>
          )}
        </View>
        <View className="flex-row justify-around">
          {isShowCancel && (
            <TouchableOpacity className="pt-[24rpx] pb-[24rpx]" onPress={() => onCancel(data)}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
          )}
          {isShowCancel && <View style={styles.lineView} />}

          <TouchableOpacity className="pt-[24rpx] pb-[24rpx]" onPress={() => onConfirm(data)}>
            <Text style={styles.confirmText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Dialog>
  );
}

const styles = {
  titleText: {
    color: '#323233',
    fontSize: '32rpx',
    fontWeight: '500',
  },
  contentText: {
    color: '#323233',
    fontSize: '28rpx',
    fontWeight: '400',
  },
  cancelText: {
    color: '#323233',
    fontSize: '32rpx',
    fontWeight: '400',
  },
  confirmText: {
    color: '#1677FF',
    fontSize: '32rpx',
    fontWeight: '400',
  },
  lineView: {
    height: '96rpx',
    width: '1rpx',
    backgroundColor: '#EBEDF0',
  },
};

export default DialogView;
