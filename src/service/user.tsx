import { API_HOST } from '@/constants';
import request from '@/utils/request';

// 登录
export function login(params: ILoginParams) {
  return request.post({
    url: `${API_HOST}/auth/login`,
    data: params,
  });
}

// 获取用户信息
export function getLoginUserInfo() {
  return request.get({
    url: `${API_HOST}/auth/getLoginUser`,
  });
}

// 登出
export function logout(userId: string) {
  return request.post({
    url: `${API_HOST}/authority/logout`,
    data: {},
    params: {
      userId,
    },
  });
}

// 用户列表
export function getUsers(params: IGetUserParams) {
  return request.post({
    url: `${API_HOST}/user/list`,
    data: params,
  });
}

// 重置用户密码
export function resetPassword(id: string) {
  return request.get({
    url: `${API_HOST}/user/resetPassword?id=${id}`,
  });
}

// 删除用户
export function delUser(id: string) {
  return request.get({
    url: `${API_HOST}/user/del?id=${id}`,
  });
}

// 新增用户
export function addUser(data: IUser) {
  return request.post({
    url: `${API_HOST}/user/add`,
    data,
  });
}

// 编辑用户
export function updateUser(data: IUser) {
  return request.post({
    url: `${API_HOST}/user/update`,
    data,
  });
}
