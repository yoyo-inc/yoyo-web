export default [
  {
    path: '/login',
    component: 'login',
    name: '登录',
    hideInMenu: true,
    hideInBreadcrumb: true,
    menuRender: false,
    menuHeaderRender: false,
    headerRender: false,
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    component: 'dashboard',
    name: '概览',
    icon: 'dashboard',
  },
  {
    path: '/setting',
    name: '系统设置',
    icon: 'setting',
    routes: [
      {
        path: '/setting/user',
        component: 'setting/user',
        name: '用户管理',
        icon: 'user',
      },
    ],
  },
];
