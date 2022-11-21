interface IGetPageParams extends ICommonRequestParams {
  path?: string; // 页面hash路径
  name?: string; // 页面名称
}

interface IPage {
  id?: string;
  path?: string;
  name?: string;
  cList?: number[];
  resourceList?: IResource[];
}
