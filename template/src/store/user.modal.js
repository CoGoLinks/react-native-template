/**
 * 用户信息相关状态
 */
export default {
  persistWhiteList: ['user', 'userInfo', 'identity'],
  create: (set) => ({
    /**
     * 用户信息
     */
    userInfo: {},
    setUserInfo: (userInfo) => {
      set({ userInfo });
    },
    /**
     * 身份信息
     */
    identity: {},
    setIdentity: (identity) => {
      set({ identity });
    },
  }),
};
