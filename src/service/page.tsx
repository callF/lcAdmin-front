import { API_HOST } from '@/constants';
import request from '@/utils/request';

// 页面列表
export function getPages(params: IGetPageParams) {
  return request.post({
    url: `${API_HOST}/page/list`,
    data: params,
  });
}

// 删除页面
export function delPage(id: string) {
  return request.get({
    url: `${API_HOST}/page/del?id=${id}`,
  });
}

// 新增页面
export function addPage(data: IPage) {
  return request.post({
    url: `${API_HOST}/page/add`,
    data,
  });
}

// 编辑页面
export function updatePage(data: IPage) {
  return request.post({
    url: `${API_HOST}/page/update`,
    data,
  });
}

// 获取页面详情
export function getDetail(id: string) {
  return request.get({
    url: `${API_HOST}/page/${id}`,
  });
}

// 获取页面详情
export function getDetailByPath(path: string) {
  return request.get({
    url: `${API_HOST}/page/detail?path=${encodeURIComponent(path)}`,
  });
}
