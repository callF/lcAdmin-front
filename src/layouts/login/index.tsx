import React from 'react';
import { useDispatch, useSelector } from 'umi';
import LoginForm from './loginForm';
import './index.less';

const bannerSource = require('@/assets/img/banner.jpg');

const Login = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values: ILoginParams) => {
    dispatch({
      type: 'user/login',
      payload: values,
    });
  };

  return (
    <div className="layout-login">
      <div className="login-wrap">
        <div className="login-info">
          <div className="project-name">LOW CODE</div>
          <div className="login-content">
            <div className="login-banner">
              <img src={bannerSource} />
            </div>
            <div className="login-form">
              <div className="login-title">账号密码登录</div>
              <LoginForm handleOk={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
