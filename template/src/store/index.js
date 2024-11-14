import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { useSelector } from './useSelector';

// 自动加载所有modal文件
const modals = require.context('.', true, /\.modal.js/);

const commonCreate = (set) => ({
  setState: (state) => set(() => ({ ...state })),
});

const initializers = [commonCreate];
const whiteList = [];

modals.keys().map((key) => {
  const { create: initializer, persistWhiteList = [] } = modals(key).default;
  initializers.push(initializer);
  whiteList.push(...persistWhiteList);
});

const useBaseStore = create(
  persist(
    (...args) => {
      let stateTotal = 0;
      const stores = initializers.map((initializer) => {
        const slice = initializer(...args);
        stateTotal += Object.keys(slice).length;
        return slice;
      });

      const store = Object.assign(...stores);

      // 检测store属性是否重复
      if (stateTotal > Object.keys(store).length) {
        throw new Error('store 属性重复，请修改！');
      }

      return store;
    },
    {
      name: 'syt-data',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => {
        // 只持久化白名单中的属性
        return Object.keys(state).reduce((acc, key) => {
          if (whiteList.includes(key)) {
            acc[key] = state[key];
          }
          return acc;
        }, {});
      },
    },
  ),
);

const useStore = (...stateKeys) => {
  const store = useBaseStore(useSelector(['setState', ...stateKeys]));
  return store;
};

hoistNonReactStatic(useStore, useBaseStore);

export { useStore };
