import { Reducer } from 'umi';
import { cookieUtils } from '@szsk/utils';
import { UserService } from '@/service';
import { CryptoByBase64 } from '@/utils/crypto';

export interface IUserState {
  userId: string;
  userName: string;
  // 权限列表
  permissions: string[];
}

type IUserModal = {
  namespace: 'user';
  state: IUserState;
  reducers: {
    save: Reducer;
    clear: Reducer;
  };
  effects: {
    getUserInfo: any;
    logout: any;
    login: any;
  };
  subscriptions: any;
};

const UserModal: IUserModal = {
  namespace: 'user',
  state: {
    userId: '',
    userName: '',
    permissions: [],
  },
  effects: {
    *login({ payload }: any, { call, put }: any): any {
      const { username, password } = payload;
      const [err, data] = yield call(UserService.login, {
        username,
        password: CryptoByBase64(password),
      });
      if (!err) {
        const { token, name } = data;
        localStorage.setItem('token', token);
        yield put({
          type: 'save',
          payload: {
            ...data,
            userId: name,
            userName: name,
            permissions: [],
          },
        });
      }
    },
    *getUserInfo(_: any, { call, put }: any): any {
      const [err, data] = yield call(UserService.getLoginUserInfo);
      if (!err) {
        const { id, name, permissionCodes } = data.data;
        yield put({
          type: 'save',
          payload: {
            ...data,
            userId: id,
            userName: name,
            permissions: permissionCodes,
          },
        });
      }
    },
    *logout({ payload }: any, { call, put }: any): any {
      const { userId } = payload;
      yield put({
        type: 'save',
        payload: {
          userId: '',
        },
      });
      // const [err] = yield call(UserService.logout, userId);
      // if (!err) {
      // }
    },
  },
  subscriptions: {
    setup({ dispatch }: any) {
      // 页面加载获取用户信息等，只会执行一次
      dispatch({
        type: 'getUserInfo',
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    // 为什么不能清除
    clear() {
      return {};
    },
  },
};

export default UserModal;
