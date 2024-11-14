import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from '@/components';
import dayjs from 'dayjs';
import { isJSONString } from '@/utils/tools';
import { useStore } from '@/store';
const MessageDetail = (props) => {
  const { route } = props;
  const { navigation, queryType, item, callBack } = route.params || {};
  const { routeNames } = useStore('routeNames');

  const {
    messageBrief,
    createdDate,
    messageContent,
    noticeBrief,
    noticeDate,
    noticeContent,
    uriMsg,
    urlType,
  } = item;
  const { buttonText, url, params } = isJSONString(uriMsg) ? JSON.parse(uriMsg) : {};

  useEffect(() => {
    return () => {
      callBack && callBack();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const JumpTo = () => {
    if (!url) {
      return;
    }
    if (urlType === 1) {
      if (routeNames?.includes(url)) {
        navigation.push(url, params);
      }
    } else {
      navigation.push('WebView', { url: url });
    }
  };
  return (
    <View className="flex-1">
      <View className="rounded-t-8 bg-c-w mt-[24rpx] min-h-full">
        <View className="py-[30rpx] px-[54rpx]">
          <Text className="text-c-n8 font-w5 text-[34rpx] leading-[48rpx]">
            {queryType === 'personal' ? messageBrief : noticeBrief}
          </Text>
          <Text className="text-c-n5 font-w4 text-[24rpx] mt-[8rpx] leading-[34rpx]">
            {dayjs(queryType === 'personal' ? createdDate : noticeDate).format('YYYY-MM-DD HH:mm')}
          </Text>
          <Text className="text-c-n7 font-w4 text-[28rpx] mt-[22rpx] leading-[44rpx]">
            {queryType === 'personal' ? messageContent : noticeContent}
          </Text>
          {buttonText && (
            <TouchableOpacity onPress={JumpTo}>
              <Text className="text-c-primary font-w4 text-[28rpx] mt-[22rpx] leading-[44rpx]">
                {buttonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default {
  name: 'MessageDetail',
  component: MessageDetail,
  options: {
    title: '消息详情',
  },
};
