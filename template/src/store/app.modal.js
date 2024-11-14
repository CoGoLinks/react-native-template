import { getAppSwitch } from '@/services/system';
import { AppSwitchEnum } from '@/enums/app.switch';

/**
 * app
 */
export default {
  persistWhiteList: ['agreePrivacy', 'appSwitch'],
  create: (set) => ({
    /**
     * 是否同意隐私协议
     */
    agreePrivacy: false,
    setAgreePrivacy: (agreePrivacy) => set({ agreePrivacy }),
    /**
     * App 功能开关
     * 管理平台功能开关
     */
    appSwitch: {},
    setAppSwitch: () => {
      getAppSwitch().then((res) => {
        const permissiones = {};
        const switchList = res.data || [];
        const permissionList = AppSwitchEnum.getOptions();
        permissionList?.forEach((permission) => {
          const switchItem = switchList.find((item) => item?.switchKey === permission.value);
          if (switchItem) {
            permissiones[permission.value] = true;
          } else {
            permissiones[permission.value] = false;
          }
        });
        console.log('permissiones====', permissiones);
        set({ appSwitch: permissiones });
      });
    },
    /**
     * 所有路由名字
     */
    routeNames: [],
    setRouteNames: (routeNames) => set({ routeNames }),
  }),
};
