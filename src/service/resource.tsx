import { API_HOST } from '@/constants';
import request from '@/utils/request';

// 资源列表
export function getResources(params: IGetResourceParams) {
  return request.post({
    url: `${API_HOST}/resource/list`,
    data: params,
  });
}

// 删除资源
export function delResource(id: string) {
  return request.get({
    url: `${API_HOST}/resource/del?id=${id}`,
  });
}

// 新增资源
export function addResource(data: IResource) {
  return request.post({
    url: `${API_HOST}/resource/add`,
    data,
  });
}

// 编辑资源
export function updateResource(data: IResource) {
  return request.post({
    url: `${API_HOST}/resource/update`,
    data,
  });
}

// 获取资源详情
export function getDetail(id: string) {
  return request.get({
    url: `${API_HOST}/resource/${id}`,
  });
}
