import { Route } from '@ant-design/pro-layout/lib/typings';
import { DashboardOutlined } from '@ant-design/icons';
import React from 'react';

export const PERMISSIONS = {
  TEMPLATE_ONE: 'template_one',
  TEMPLATE_TWO: 'template_two',
  somePermissionAllow: (
    allowPermissions: string[] = [],
    ownerPermissions: string[] = [],
  ) =>
    !allowPermissions.length ||
    ownerPermissions.some((perm) => allowPermissions.includes(perm)),
};

export const menu: Route = {
  routes: [
    {
      icon: <DashboardOutlined />,
      name: '系统管理',
      somePermissions: [],
      routes: [
        {
          name: '用户管理',
          exact: true,
          path: '/system/user',
          somePermissions: [],
        },
      ],
    },
    {
      icon: <DashboardOutlined />,
      name: '活动页配置',
      somePermissions: [],
      routes: [
        {
          name: '页面管理',
          exact: true,
          path: '/activity/page',
          somePermissions: [],
        },
        {
          name: '资源管理',
          exact: true,
          path: '/activity/resources',
          somePermissions: [],
        },
        {
          name: '组件管理',
          exact: true,
          path: '/activity/atom',
          somePermissions: [],
        },
      ],
    },
  ],
};
