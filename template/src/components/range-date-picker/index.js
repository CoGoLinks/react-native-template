import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Icon, TouchableOpacity, DatePickerView } from '@/components';
import moment from 'dayjs';
import { tw } from '@/style';
import dayjs from 'dayjs';

const RangeDatePicker = ({
  title = '',
  visible = false,
  onClose = () => {},
  value = [],
  onOk = () => {},
  isOnce = false,
  maxDate = new Date(),
}) => {
  const [startDate, endDate] = value;
  const [activeItem, setActiveItem] = useState(0);
  const [showStartDate, setShowStartDate] = useState();
  const [showEndDate, setShowEndDate] = useState();
  useEffect(() => {
    if (visible) {
      setShowStartDate(startDate || new Date());
      setShowEndDate(endDate);
    } else {
      setActiveItem(0);
    }
  }, [endDate, startDate, visible]);
  const handleChangeActiveItem = (key) => {
    if (key === 0 && !showStartDate) {
      setShowStartDate(new Date());
    }
    if (key === 1 && !showEndDate) {
      setShowEndDate(new Date());
    }
    setActiveItem(key);
  };

  const onDateChange = (date) => {
    activeItem === 0 && setShowStartDate(date);
    activeItem === 1 && setShowEndDate(date);
  };
  let isDisibleOk = !showStartDate || !showEndDate;
  if (
    isOnce &&
    (showStartDate === '' || showStartDate === undefined) &&
    (showEndDate === '' || showEndDate === undefined)
  ) {
    isDisibleOk = false;
  }
  const onConfirm = () => {
    if (isDisibleOk) {
      return;
    }
    onOk({
      startDate: showStartDate,
      endDate: showEndDate,
    });
    onClose();
  };
  const format = 'YYYY/MM/DD';
  return (
    <Modal
      visible={visible}
      position="bottom"
      animationType="fadeIn"
      maskClosable
      onClose={onClose}
    >
      <View className="pt-10 pb-30 bg-c-w rounded-t-20" useSafeArea>
        <View className="row a-center h-9 px-20 border-b-[#E5E5E5] border-b-1">
          <Text className="px-10 py-[24rpx] text-c-primary" onPress={onClose}>
            取消
          </Text>
          <Text className="flex-1 text-center text-xl">{title}</Text>
          <Text className={[isDisibleOk ? 'text-c-n7' : 'text-c-primary']} onPress={onConfirm}>
            确定
          </Text>
        </View>
        <View row center className="row a-center h-10 pt-[8rpx]">
          <View
            className={[
              'row a-center w-[310rpx] h-[64rpx] px-[24rpx] border-1  rounded-8 justify-between',
              activeItem === 0 ? 'border-c-primary' : 'border-c-n5',
            ]}
          >
            <Text
              onPress={() => handleChangeActiveItem(0)}
              className={['flex-1 text-base', activeItem === 0 ? 'text-c-primary' : 'text-c-n5']}
            >
              {showStartDate ? moment(showStartDate).format(format) : '开始时间'}
            </Text>
            {showStartDate ? (
              <TouchableOpacity
                onPress={() => {
                  setShowStartDate('');
                }}
              >
                <View className="row w-5 justify-end">
                  <Icon name="result_error" color={tw.color('c-n5')} size={28} />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          <View className="w-[24rpx] h-[2rpx] mx-[28rpx] bg-c-n6" />
          <View
            className={[
              'row a-center w-[310rpx] h-[64rpx] px-[24rpx] border-1  rounded-8 justify-between',
              activeItem === 1 ? 'border-c-primary' : 'border-c-n5',
            ]}
          >
            <Text
              onPress={() => handleChangeActiveItem(1)}
              className={['flex-1 text-base', activeItem === 1 ? 'text-c-primary' : 'text-c-n5']}
            >
              {showEndDate ? moment(showEndDate).format(format) : '截止时间'}
            </Text>
            {showEndDate ? (
              <TouchableOpacity
                onPress={() => {
                  setShowEndDate('');
                }}
              >
                <View className="row w-5 justify-end">
                  <Icon name="result_error" color={tw.color('c-n5')} size={28} />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <DatePickerView
          value={activeItem === 0 ? showStartDate : showEndDate}
          mode="date"
          defaultDate={new Date()}
          maxDate={maxDate}
          onChange={onDateChange}
        />
      </View>
    </Modal>
  );
};
export default RangeDatePicker;
