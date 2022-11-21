interface ILoginParams {
  username: string;
  password: string;
}

interface IGetUserParams extends ICommonRequestParams {
  username?: string;
  createTime?: string;
}

interface IUser {
  id?: string;
  userId?: string;
  username?: string;
  createTime?: string;
}
