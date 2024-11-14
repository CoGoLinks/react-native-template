import { createNavigationContainerRef, CommonActions } from '@react-navigation/native';
import { useStore } from '@/store';
import { Modal } from '@/components';

export const navigationRef = createNavigationContainerRef();

const navigation = {};

/**
 * 跳转页面
 * @param {String} routeName 路由名称
 * @param {Object} params 参数
 */
navigation.push = (routeName, params) => {
  navigationRef.navigate(routeName, params);
};

/**
 * 跳转页面
 * @param {String} routeName 路由名称
 * @param {Object} params 参数
 */
navigation.navigate = (routeName, params) => {
  navigationRef.navigate(routeName, params);
};

/**
 * 替换页面
 * @param {String} routeName 路由名称
 * @param {Object} params 参数
 */
navigation.replace = (routeName, params) => {
  navigationRef.replace(routeName, params);
};

/**
 * 重置路由
 * @param {Object} state 新路由状态
 */
navigation.reset = (state) => {
  navigationRef.dispatch(CommonActions.reset(state));
};

/**
 * 执行指定action
 * @param {Object} state 新路由状态
 */
navigation.dispatch = (action) => {
  navigationRef.dispatch(action);
};

/**
 * 退出登录
 * @param {Object} options 配置参数
 * @param {Boolean} options.confirm 是否需要确认
 */
navigation.logout = (options = {}) => {
  const { confirm = true } = options;

  const { name } = navigationRef.getCurrentRoute();

  if (name === 'Login') {
    return;
  }

  const onOk = () => {
    useStore.setState({
      userInfo: {},
      identity: {},
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    Modal.alert.close();
  };
  if (confirm) {
    Modal.alert({
      title: '确定退出登录吗？',
      onOk,
    });
  } else {
    onOk();
  }
};

export { navigation };
