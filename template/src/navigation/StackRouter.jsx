import { StackRouter } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import { navigation } from './navigation';

/**
 * “是否允许跳转”的参数字段名
 */
const ALLOW_JUMP_PARAM = `ALLOW_JUMP_PARAM_${Date.now()}`;

const MyStackRouter = (routeOptions) => {
  const { intercepts, pageOptions } = routeOptions;
  const router = StackRouter(routeOptions);

  return {
    ...router,
    getStateForAction(state, action, options) {
      const { payload, type } = action;
      const { name, params } = payload || {};

      /* 判断是否为跳转 */
      const isJumpAction = ['PUSH', 'REPLACE', 'NAVIGATE'].includes(type);

      // 拦截器
      if (isJumpAction && intercepts[name] && !params?.[ALLOW_JUMP_PARAM]) {
        intercepts[name]({
          navigation,
          route: { name, params },
          next: (_name, _params) => {
            const next_payload = _name
              ? { name: _name, params: _params }
              : {
                  name,
                  params: {
                    params,
                    [ALLOW_JUMP_PARAM]: true,
                  },
                };
            navigation.dispatch({
              payload: next_payload,
              type,
            });
          },
        });

        return state;
      } else if (params?.[ALLOW_JUMP_PARAM]) {
        // 清除“是否允许跳转”参数
        action.payload.params = action.payload.params.params;
      }

      const result = router.getStateForAction(state, action, options);

      if (
        result != null &&
        result.index > state.index &&
        state.routes[state.index].params?.isEditing
      ) {
        return state;
      }

      return result;
    },
  };
};

export default MyStackRouter;
