/**
 * 事件监听方法及Hook
 */
import { useEffect } from 'react';

/**
 * 监听事件列表
 */
const eventMap = {};

/**
 * 新增监听事件
 * @param {String} eventName 事件名称
 * @param {Function} eventCallback 事件回调函数
 * @param {Boolean} isOnce 是否一次性
 */
const onEvent = (eventName, eventCallback, isOnce = false) => {
  eventMap[eventName] = {
    isOnce,
    eventCallback,
  };
};

/**
 * 新增监听事件
 * @param {String} eventName 事件名称
 * @param {Function} eventCallback 事件回调函数
 */
const onceEvent = (eventName, eventCallback) => {
  onEvent(eventName, eventCallback, true);
};

/**
 * 删除监听事件
 * @param {String} eventName 事件名称
 */
const removeEvent = (...eventNames) => {
  eventNames.forEach((item) => {
    delete eventMap[item];
  });
};

/**
 * 给监听事件发送通知
 * @param {String} eventName 事件名称
 * @param {any} params 事件参数
 */
const emitEvent = (eventName, params) => {
  const eventItem = eventMap[eventName];
  if (eventItem) {
    eventItem.eventCallback(params);
    eventItem.isOnce && removeEvent(eventName);
  }
};

/**
 * 事件监听Hook
 * @param {String} eventName 事件名称
 * @param {Function} callback 事件回调
 */
export function useEvent(eventName, callback) {
  useEffect(() => {
    onEvent(eventName, callback);
    return () => removeEvent(eventName);
  });
}

export default {
  on: onEvent,
  once: onceEvent,
  emit: emitEvent,
  remove: removeEvent,
};
