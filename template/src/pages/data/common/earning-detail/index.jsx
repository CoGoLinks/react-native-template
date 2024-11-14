import React, { useEffect, useState, useMemo } from 'react';
import { Text, View, Image } from '@/components';
import { EarningDetailConfig, handleFormat } from '../enums';
import Device from '@/config/device';

function EarningDetail(props) {
  const { route, getDetails = () => {} } = props || {};
  const { main = [], trade = [] } = EarningDetailConfig[route] || {};

  const [details, setDetails] = useState({ mainData: [], tradeData: [] });
  const [pageData, setPageData] = useState({});
  const statusBarHeight = useMemo(() => {
    return Device.getStatusBarHeight();
  }, []);
  useEffect(() => {
    (async () => {
      const data = (await getDetails()) || {};
      setPageData(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const main_ = main.map(({ label, name, type }) => ({
      label,
      value: handleFormat({ value: pageData[name], type }),
    }));
    const trade_ = trade.map(({ label, name, type, options }) => {
      if (type === 'title') {
        return {
          title: label,
        };
      }
      if (type === 'select' && !pageData[name]) {
        return {};
      }
      return {
        label,
        value: handleFormat({ value: pageData[name], type, options }),
      };
    });
    setDetails({ mainData: main_, tradeData: trade_ });
  }, [main, pageData, trade]);

  const { mainData, tradeData } = details || {};

  return (
    <View className="flex-1">
      <View className={`h-[${statusBarHeight}px] bg-c-dark`} />
      <View className="bg-c-dark h-18" />
      <View className="mx-[22rpx] mt-[-171rpx] rounded-8 overflow-hidden bg-c-w">
        <View className="px-[36rpx] pt-[28rpx] pb-[20rpx]">
          <View className="row mb-[32rpx]">
            <Text className="text-2xl text-c-n7">{mainData[0]?.label}</Text>
            <Text className="text-2xl text-c-n8 font-w5">{mainData[0]?.value}</Text>
          </View>

          <Text className="text-sm text-[#787B80]">{mainData[1]?.label}</Text>
          <Text className="text-[48rpx] text-c-my leading-[58rpx] font-w6">
            {mainData[1]?.value}
          </Text>
        </View>
        <Image assetName="data.middle_bar" className="w-[100%] h-[36rpx]" />
        <View className="px-[36rpx] py-[24rpx] rounded-8">
          {tradeData?.map((item, index) => {
            const { title, label, value } = item;
            if (title) {
              return (
                <Text className="text-sm text-c-n8 font-w5 mb-[22rpx]" key={index}>
                  {title}
                </Text>
              );
            }
            if (!label) {
              return null;
            }
            return (
              <View className="row mb-[24rpx]" key={index}>
                <Text className="text-sm text-c-n7 w-[144rpx]">{label}</Text>
                <Text className="text-sm text-c-n8 font-w5">{value}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default EarningDetail;
