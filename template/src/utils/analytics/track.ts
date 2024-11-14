import sensors, { PropertiesObjectType } from 'sensorsdata-analytics-react-native';

export type trackType = {
  /**
   * 页面曝光
   */
  pageShow: Function;
  /**
   * 模块曝光
   */
  modShow: Function;
  /**
   * 模块点击
   */
  modClick: Function;
  /**
   * 按钮曝光
   */
  buttonShow: Function;
  /**
   * 按钮点击
   */
  buttonClick: Function;
  /**
   * push点击
   */
  pushClick?: Function;
  /**
   * push曝光
   */
  pushShow?: Function;
  /**
   * 浏览时长
   */
  lenTime?: Function;
  /**
   * 设置用户属性
   */
  setUserParams?: Function;
};

/**
 * 埋点方法
 * @param  {string} name 事件名称
 * @param  {object} params 事件属性
 * @return {void}
 */
const sensorsTrack = (name: string, params: PropertiesObjectType) => {
  try {
    sensors.track(name, params);
    console.log('埋点-->>>>>：', JSON.stringify({ name, params }));
  } catch (e) {
    console.log('埋点异常：', e);
  }
};

const track: trackType = {
  /**
   * 页面曝光事件
   */
  pageShow: ({
    page_name = '', // 页面标题
    prepage_name = '', // 上一个页面标题
    ...other
  }) => {
    sensorsTrack('page_show', {
      page_name,
      prepage_name,
      ...other,
    });
  },
  /**
   * 模块曝光事件
   */
  modShow: ({
    page_name = '', // 页面标题
    mod_name = '', // 模块名称
    ...other
  }) => {
    sensorsTrack('mod_show', {
      page_name,
      mod_name,
      ...other,
    });
  },
  /**
   * 模块点击事件
   */
  modClick: ({
    page_name = '', // 页面标题
    mod_name = '', // 模块名称
    ...other
  }) => {
    sensorsTrack('mod_click', {
      page_name,
      mod_name,
      ...other,
    });
  },
  /**
   * 按钮曝光事件
   */
  buttonShow: ({
    page_name = '', // 页面名称
    button_name = '', // 按钮名称
    ...other
  }) => {
    sensorsTrack('button_show', {
      page_name,
      button_name,
      ...other,
    });
  },
  /**
   * 按钮点击事件
   */
  buttonClick: ({
    page_name = '', // 页面名称
    button_name = '', // 按钮名称
    ...other
  }) => {
    sensorsTrack('button_click', {
      page_name,
      button_name,
      ...other,
    });
  },
  /**
   * push 点击事件
   */
  pushClick: ({
    push_id = '', // 推送id
    push_text = '', // 推送标题
    push_comment = '', // 推送内容
  }) => {
    sensorsTrack('push_button_click', {
      push_id,
      push_text,
      push_comment,
    });
  },
  /**
   * push 曝光事件
   */
  pushShow: ({
    push_id = '', // 推送id
    push_text = '', // 推送标题
    push_comment = '', // 推送内容
  }) => {
    sensorsTrack('push_mod_show', {
      push_id,
      push_text,
      push_comment,
    });
  },
  /**
   * 浏览时长事件
   */
  lenTime: ({
    page_name = '', // 页面名称
    length_time = '', // 浏览时长
    ...other
  }) => {
    sensorsTrack('length_time', {
      page_name,
      length_time,
      ...other,
    });
  },
  /**
   * 设置用户属性
   */
  setUserParams: (userId: string, params: sensors.PropertiesObjectType) => {
    if (userId) {
      try {
        sensors.login(userId);
        sensors.registerSuperProperties(params);
      } catch (error) {
        console.log('埋点异常：埋点登录和设置公共属性异常！', error);
      }
    }
  },
};

export default track;
