import { request } from '@/utils/request';

// 查询消息未读条数
export async function messageFindUnReadCount() {
  return request({
    url: '/app/message/findUnReadCount',
    method: 'get',
  });
}
// 查询个人消息(即时消息)
export async function messageFindMessageInstant(pageNum) {
  return request({
    url: `/app/message/findMessageInstant?pageNum=${pageNum}&pageSize=10`,
    method: 'get',
  });
}

// 查询平台消息(平台公告)
export async function messageFindMessageNotice(pageNum) {
  return request({
    url: `/app/message/findMessageNotice?pageNum=${pageNum}&pageSize=10`,
    method: 'get',
  });
}

// 读取个人消息（即时消息）
export async function messageReadMessageInstant(id) {
  return request({
    url: `/app/message/readMessageInstant?id=${id}`,
    method: 'get',
  });
}

// 读取平台消息（即时消息）
export async function messageReadMessageNotice(id) {
  return request({
    url: `/app/message/readMessageNotice?id=${id}`,
    method: 'get',
  });
}
