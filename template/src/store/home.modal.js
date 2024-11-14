import { messageFindUnReadCount } from '@/services/messageCenter';

/**
 * 首页相关状态
 */
export default {
  create: (set) => ({
    banner: { list: ['12'] },
    setBanner: () => set((banner) => ({ banner })),
    unReadCount: {},
    setUnReadCount: async () => {
      const { data = {} } = await messageFindUnReadCount();
      set({ unReadCount: data });
    },
  }),
};
