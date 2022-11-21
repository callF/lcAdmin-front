// 默认每页pagesize
export const PAGE_SIZE = 10;
export const INFINITE_PAGE_SIZE = 100000000;
export const DEFAULT_CONDITION = { pageSize: PAGE_SIZE, pageNum: 1 };
export const OPERATE_TYPE = {
  ADD: 1,
  EDIT: 2,
  toString: (v: number | string) => {
    switch (v) {
      case OPERATE_TYPE.ADD:
        return '新增';
      case OPERATE_TYPE.EDIT:
        return '编辑';
      default:
        return '';
    }
  },
};
