interface IGetAtomParams extends ICommonRequestParams {
  description?: string; // 组件名称
}

interface IAtom {
  id?: string;
  propertyObj?: any;
  description?: string; // 组件名称
  type?: string; // 组件类型
}
