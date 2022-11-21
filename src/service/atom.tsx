import { API_HOST } from '@/constants';
import request from '@/utils/request';

// 获取原子列表
export function getAtoms(params: IGetAtomParams) {
  return request.post({
    url: `${API_HOST}/atom/list`,
    data: params,
  });
}

// 删除原子
export function delAtom(id: string) {
  return request.get({
    url: `${API_HOST}/atom/del?id=${id}`,
  });
}

// 新增原子
export function addAtom(data: any) {
  return request.post({
    url: `${API_HOST}/atom/add`,
    data,
  });
}

// 编辑原子
export function updateAtom(data: IAtom) {
  return request.post({
    url: `${API_HOST}/atom/update`,
    data,
  });
}
