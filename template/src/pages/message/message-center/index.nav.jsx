import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, InfiniteScroll, View, Text, Icon, Image } from '@/components';
import dayjs from 'dayjs';
import {
  messageFindMessageInstant,
  messageFindMessageNotice,
  messageReadMessageInstant,
  messageReadMessageNotice,
} from '@/services/messageCenter';
import { useStore } from '@/store';

const MessageCenter = ({ navigation }) => {
  const { routeNames, unReadCount, setUnReadCount } = useStore(
    'routeNames',
    'unReadCount',
    'setUnReadCount',
  );
  const [total, setTotal] = useState(0);
  const [queryType, setQueryType] = useState('personal');
  const listRef = useRef();
  useEffect(() => {
    getMessageCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMessageCount = async () => {
    setUnReadCount();
  };

  const onRefresh = () => {
    listRef.current.cleanData();
    listRef.current.refresh();
  };
  useEffect(() => {
    onRefresh();
  }, [queryType]);
  // 循环列表加载
  const loadMore = async ({ pageNum }) => {
    let request = null;
    if (queryType === 'personal') {
      request = messageFindMessageInstant;
    } else {
      request = messageFindMessageNotice;
    }
    const { data = {} } = await request(pageNum);
    const { total: totalNum } = data;
    setTotal(totalNum);
    return {
      data,
    };
  };
  // 读取消息
  const readMessage = async (id) => {
    let request = null;
    if (queryType === 'personal') {
      request = messageReadMessageInstant;
    } else {
      request = messageReadMessageNotice;
    }
    await request(id);
  };
  // 循环列表渲染
  const renderItem = ({ item, index }) => {
    const {
      readFlag,
      messageBrief,
      createdDate,
      messageContent,
      noticeBrief,
      noticeDate,
      noticeContent,
      urlType,
      noticeUrl,
    } = item;
    return (
      <TouchableOpacity
        className={[
          'py-[32rpx] px-[32rpx] flex-row  bg-c-w',
          {
            'rounded-t-8': index === total - 1,
            'rounded-b-8': index === 0,
            'border-b-[2rpx] border-b-[#EBEDF0]': index !== total - 1,
          },
        ]}
        onPress={() => {
          if (queryType === 'personal') {
            navigation.push('MessageDetail', {
              navigation,
              queryType,
              item,
              callBack: () => {
                if (!readFlag) {
                  getMessageCount();
                  onRefresh();
                }
              },
            });
          } else {
            if (!noticeUrl) {
              return;
            }
            if (urlType === 1) {
              if (routeNames?.includes(noticeUrl)) {
                navigation.push(noticeUrl);
              }
            } else {
              navigation.push('WebView', { url: noticeUrl });
            }
          }
          if (!readFlag) {
            readMessage(item.id);
          }
        }}
      >
        <View>
          <Icon name="notice3" size={52} />
          {!readFlag ? (
            <View className="absolute min-w-[20rpx] h-[20rpx] rounded-10 bg-c-mr border-[2rpx] border-[#FFFFFF] left-[40rpx] top-[-4rpx]" />
          ) : null}
        </View>
        <View className="flex-1 ml-[16rpx]">
          <View className="row a-center justify-between">
            <Text className="w-[336rpx] h-[40rpx] text-c-n8 font-w5 text-[28rpx]" numberOfLines={1}>
              {queryType === 'personal' ? messageBrief : noticeBrief}
            </Text>
            <Text className="text-c-n5 text-[24rpx]">
              {dayjs(queryType === 'personal' ? createdDate : noticeDate).format(
                'YYYY-MM-DD HH:mm',
              )}
            </Text>
          </View>
          <Text
            className="w-[582rpx] max-h-[72rpx] text-c-n7 text-[26rpx] mt-[16rpx] leading-[36rpx]"
            numberOfLines={2}
          >
            {queryType === 'personal' ? messageContent : noticeContent}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View className="flex-1">
      <View className="h-[88rpx] flex-row items-end bg-c-w">
        <TouchableOpacity
          className="flex-1 justify-center items-center"
          onPress={() => setQueryType('personal')}
        >
          <View>
            <Text
              className={[
                'text-center text-[32rpx]  font-w5',
                {
                  'text-c-n6': true,
                  'text-c-primary': queryType === 'personal',
                },
              ]}
            >
              个人消息
            </Text>
            {unReadCount?.instantUnReadCount ? (
              <View className="absolute min-w-[32rpx] h-[32rpx] rounded-16 bg-c-mr px-[8rpx] left-[120rpx] top-[-10rpx]">
                <Text className="text-center text-[24rpx] text-c-w font-w5 leading-[32rpx]">
                  {unReadCount.instantUnReadCount}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            className={[
              'w-[96rpx] h-[6rpx] mt-[24rpx]',
              { 'text-c-n6': true, 'bg-c-primary': queryType === 'personal' },
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 justify-end items-center"
          onPress={() => setQueryType('platform')}
        >
          <View>
            <Text
              className={[
                'text-center text-[32rpx]  font-w5',
                {
                  'text-c-n6': true,
                  'text-c-primary': queryType === 'platform',
                },
              ]}
            >
              平台消息
            </Text>
            {unReadCount?.noticeUnReadCount ? (
              <View className="absolute min-w-[32rpx] h-[32rpx] rounded-16 bg-c-mr px-[8rpx] left-[120rpx] top-[-10rpx]">
                <Text className="text-center text-[24rpx] text-c-w font-w5 leading-[32rpx]">
                  {unReadCount?.noticeUnReadCount}
                </Text>
              </View>
            ) : null}
          </View>
          <View
            className={[
              'w-[96rpx] h-[6rpx] mt-[24rpx]',
              { 'text-c-n6': true, 'bg-c-primary': queryType === 'platform' },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View className="px-[22rpx] pt-[24rpx]">
        <InfiniteScroll
          ref={listRef}
          loadMore={loadMore}
          renderItem={renderItem}
          ListEmptyComponent={<DataCatchRender />}
          autoLoad={false}
        />
      </View>
    </View>
  );
};

const DataCatchRender = () => {
  return (
    <View className="mt-[180rpx] items-center">
      <Image
        assetName="common.empty_message"
        resizeMode="contain"
        className="w-[400rpx] h-[400rpx] mt-[180rpx]"
      />
      <Text className="text-c-n7 text-xl"> 暂无消息 </Text>
    </View>
  );
};

export default {
  name: 'MessageCenter',
  component: MessageCenter,
  options: { title: '消息中心' },
};
