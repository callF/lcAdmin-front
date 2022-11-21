interface IGetResourceParams extends ICommonRequestParams {
  code?: string; // 资源编号
  type?: string; // 组件类别
}

interface IResource {
  code?: string;
  id?: string;
  type?: string;
  atomId?: string;
  atom?: IAtom;
  configObj?: any;
}
