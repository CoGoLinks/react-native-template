import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Icon,
  ScrollView,
  DatePicker,
  Picker,
  Image,
  Unbound,
  Toast,
  Modal,
  EasyTabs,
} from '@/components';
import { RefreshControl } from 'react-native';
import dayjs from 'dayjs';
import { copyString } from '@/utils/copy';
// TODO 接口从你的api文件里获取
import { copyFromYourApiFileUrl } from '@/services/data';
import { tw } from '@/style';

/**
 * 数据列表
 */
const TemplateListPage = ({ navigation }) => {
  const [selectMonth, setSelectMonth] = useState(dayjs().format('YYYY-MM'));

  const [refreshing, setRefreshing] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [activtList, setActivtList] = useState([]);
  /**
   * Tab数据
   */
  const [tabItems, setTabItems] = useState([]);
  const [easyTabType, setEasyTabType] = useState('round');
  /**
   * picker 数据
   */
  const [pickerItems, setPickerItems] = useState([]);
  const [pickerValue, setPickerValue] = useState(1);

  // 修改筛选象刷新列表 刷新激活数量
  useEffect(() => {
    // TODO 打开
    // requestDataAction();
    // 示例数据
    setActivtList([
      {
        merchantId: '10086',
        merchantName: '中秋节礼包',
        viewPolicyName: '月饼50吨',
        agentName: 'agentName',
        activeTime: '2024-09-09 16:08:42',
      },
      {
        merchantId: '12306',
        merchantName: '国期间礼包',
        viewPolicyName: '海鲜一航母',
        agentName: 'agentName',
        activeTime: '2024-09-09 16:08:42',
      },
      {
        merchantId: '10000',
        merchantName: '春节礼包',
        viewPolicyName: '鞭炮1000只',
        agentName: 'agentName',
        activeTime: '2024-09-09 16:08:42',
      },
    ]);
    //  实际开发需要在Enum文件定义
    setTabItems([
      { value: 'round', label: '圆的' },
      { value: 'default', label: '默认' },
    ]);
    //  实际开发需要在Enum文件定义
    setPickerItems([
      { value: 'T1', label: '条件1' },
      { value: 'T2', label: '条件2' },
    ]);
  }, [requestDataAction, selectMonth]);
  // 刷新列表
  const requestDataAction = useCallback(async () => {
    setRefreshing(true);
    try {
      // TODO 接口从你的api文件里获取
      const { data } = await copyFromYourApiFileUrl({
        month: dayjs(selectMonth).format('YYYYMM'),
        query: pickerValue,
      });
      setActivtList(data || []);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  }, [pickerValue, selectMonth]);
  /**
   * 日期选择
   */
  const handleMonthChange = useCallback((value) => {
    setSelectMonth(dayjs(value).format('YYYY-MM'));
  }, []);
  /**
   * 点击事件
   */
  const onCellClick = () => {
    const alert = Modal.alert({
      title: '提示',
      message: 'TODO这是提示内容！！！',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        alert.close();
        Toast.info('点击事件！');
      },
      onCancel: () => {
        alert.close();
      },
    });
  };
  // 循环列表渲染
  const renderItem = (item, index) => {
    const { merchantId, merchantName, viewPolicyName, agentName, activeTime } = item;
    return (
      <TouchableOpacity
        className="bg-c-w rounded-8 mt-[24rpx] pb-[15rpx]"
        onPress={onCellClick}
        key={index}
      >
        <View className="flex-row items-center justify-between pt-[18rpx] pb-[16rpx] pl-[30rpx] pr-[30rpx]">
          <View className="flex-1 flex-row items-center">
            <Icon name="shang" size="32" className="mr-[8rpx]" />
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => copyString(merchantId)}
            >
              <Text className="pl-[4rpx] pr-[10rpx] font-w4 text-c-n8 text-[28rpx]">
                {merchantId || '- -'}
              </Text>
              <Icon name="copy" size={20} />
            </TouchableOpacity>
          </View>
          <Icon name="right" size={22} color="#333333" />
          <View className="bottom-[-118rpx] right-[30rpx] absolute">
            <Unbound isUnbound={item?.unbindStatus === '01'} />
          </View>
        </View>
        <View className="h-[2rpx] bg-c-n3" />
        <View className="pl-[30rpx] pr-[30rpx] mt-[18rpx]">
          <View className="flex-1 flex-row items-center pb-[12rpx]">
            <Text className="font-w5 text-c-n8 text-28">{merchantName || '- -'}</Text>
          </View>
          <View className="flex-1 flex-row items-center pb-[12rpx]">
            <Text className="font-w4 text-c-n6 text-26 pr-[24rpx]">商户活动</Text>
            <Text className="font-w4 text-c-n8 text-26 pr-[14rpx]">{viewPolicyName || '- -'}</Text>
            <View className="bg-[rgba(250,171,12,0.1)] rounded-4 pl-[8rpx] pr-[8rpx] pb-[4rpx]">
              <Text className="font-w4 text-c-cy text-[24rpx]">咩</Text>
            </View>
            <View className="bg-[rgba(7,193,96,0.1)] rounded-4 pl-[8rpx] pr-[8rpx] pb-[4rpx]">
              <Text className="font-w4 text-c-mg text-[24rpx]">喵</Text>
            </View>
            <View className="bg-[rgba(190,200,218,0.1)] rounded-4 pl-[8rpx] pr-[8rpx] pb-[4rpx]">
              <Text className="font-w4 text-[#556B92] text-[24rpx]">汪</Text>
            </View>
          </View>
          <View className="flex-1 flex-row items-center pb-[12rpx]">
            <Text className="font-w4 text-c-n6 text-[26rpx] pr-[24rpx]">归属代理</Text>
            <Text className="flex-1 font-w4 text-c-n8 text-[26rpx]">{agentName || '- -'}</Text>
          </View>
          <View className="flex-1 flex-row items-center pb-[20rpx]">
            <Text className="font-w4 text-c-n6 text-[26rpx] pr-[24rpx]">激活时间</Text>
            <Text className="flex-1 font-w4 text-c-n8 text-[26rpx]">
              {activeTime ? dayjs(activeTime).format('YYYY-MM-DD HH:mm') : '- -'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1">
      <View className="flex-row px-[22rpx] items-center bg-c-w">
        <TouchableOpacity
          onPress={() => {
            setPickerVisible(true);
          }}
          className="flex-1 px-[22rpx]"
        >
          <View className="flex-row items-center pt-[12rpx] pb-[10rpx]">
            <Text className=" text-[26rpx] font-w4 text-c-n8 ">
              {dayjs(selectMonth).format('YYYY年MM月')}
            </Text>
            <Icon name="down" size={22} color={tw.color('c-dark')} />
          </View>
          <View className="pb-[18rpx]">
            <Text className="text-[26rpx] font-w4 text-[#646566] ">
              T队激活数 {activtList?.length}
            </Text>
          </View>
          <DatePicker
            visible={pickerVisible}
            precision="month"
            value={dayjs(selectMonth) || undefined}
            onChange={(value) => handleMonthChange(value)}
            placeholder="请选择日期"
            onOk={() => setPickerVisible(false)}
            onVisibleChange={(visible) => setPickerVisible(visible)}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center bg-c-w justify-between">
        <EasyTabs
          items={tabItems}
          type={easyTabType}
          value={easyTabType}
          onChange={(item) => {
            setEasyTabType(item.value);
            Toast.info('当前标签为' + item.label);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setPickerVisible(true);
          }}
          className="flex-row items-center pr-[30rpx]"
        >
          <Text className="text-center text-[26rpx] font-w4 text-c-n8 mr-[8rpx] my-[12px]">
            选择条件
          </Text>
          <Icon name="down" size={12} color={tw.color('c-dark')} />
          <Picker
            data={pickerItems}
            onChange={(val) => {
              setPickerValue(val[0]);
            }}
            onDismiss={() => setPickerVisible(false)}
            visible={pickerVisible}
            value={[pickerValue]}
            onOk={() => setPickerVisible(false)}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-1 mx-[22rpx] rounded-8 overflow-hidden">
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={requestDataAction} />}
        >
          {activtList && activtList.length > 0 ? (
            activtList.map((item, index) => {
              return renderItem(item, index);
            })
          ) : (
            <View className="items-center">
              <Image
                assetName="common.empty_merchant"
                resizeMode="contain"
                className="w-[400rpx] h-[400rpx] mt-[180rpx]"
              />
              <Text className="text-c-n7 text-xl">暂无数据</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};
export default {
  name: 'TemplateListView',
  component: TemplateListPage,
  options: {
    title: '数据列表',
  },
};
