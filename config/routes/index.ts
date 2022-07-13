export default [
  {
    path: '/login',
    component: 'login',
    name: '登录',
    hideInMenu: true,
    hideInBreadcrumb: true,
    menuRender: false,
    menuHeaderRender: false,
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
    component: 'setting',
    name: '系统设置',
    icon: 'setting',
  },
];
