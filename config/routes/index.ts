import { IRoute } from '@umijs/max';

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
    access: 'dashboard',
  },
  {
    path: '/setting',
    name: '系统管理',
    icon: 'setting',
    access: 'setting',
    routes: [
      {
        path: '/setting/role',
        component: 'setting/role',
        name: '角色管理',
        access: 'role',
      },
      {
        path: '/setting/user',
        component: 'setting/user',
        name: '用户管理',
        icon: 'user',
        access: 'user',
      },
      {
        path: '/setting/security',
        component: 'setting/security',
        name: '系统安全',
        access: 'security',
      },
      {
        path: '/setting/log',
        component: 'setting/log',
        name: '日志管理',
        access: 'log',
        routes: [
          {
            path: '/setting/log',
            redirect: '/setting/log/audit_log',
          },
          {
            path: '/setting/log/audit_log',
            component: 'setting/log/audit-log',
            name: '审计日志',
            access: 'audit_log',
            hideInMenu: true,
          },
          {
            path: '/setting/log/security_log',
            component: 'setting/log/security-log',
            name: '安全日志',
            access: 'security_log',
            hideInMenu: true,
          },
          {
            path: '/setting/log/run_log',
            component: 'setting/log/run-log',
            name: '运行日志',
            access: 'run_log',
            hideInMenu: true,
          },
          {
            path: '/setting/log/log_config',
            component: 'setting/log/log-config',
            name: '日志设置',
            access: 'log_config',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/setting/alert',
        component: 'setting/alert',
        name: '告警管理',
        access: 'alert',
        routes: [
          {
            path: '/setting/alert',
            redirect: '/setting/alert/alert_list',
          },
          {
            path: '/setting/alert/alert_list',
            component: 'setting/alert/list',
            name: '告警列表',
            access: 'alert_list',
            hideInMenu: true,
          },
          {
            path: '/setting/alert/alert_config',
            component: 'setting/alert/alert-config',
            name: '告警配置',
            access: 'alert_config',
            hideInMenu: true,
          },
          {
            path: '/setting/alert/alert_access',
            component: 'setting/alert/alert-access',
            name: '告警接入',
            access: 'alert_access',
            hideInMenu: true,
          },
          {
            path: '/setting/alert/alert_push',
            component: 'setting/alert/alert-push',
            name: '告警推送',
            access: 'alert_push',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/setting/report',
        component: 'setting/report',
        name: '报告管理',
        access: 'report',
        routes: [
          {
            path: '/setting/report',
            redirect: '/setting/report/report_list',
          },
          {
            path: '/setting/report/report_list',
            component: 'setting/report/list',
            name: '报告列表',
            access: 'report_list',
            hideInMenu: true,
          },
          {
            path: '/setting/report/report_config',
            component: 'setting/report/config',
            name: '报告配置',
            access: 'report_config',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/setting/sched_job',
        component: 'setting/sched_job',
        name: '定时任务管理',
        access: 'sched_job',
      },
      {
        path: '/setting/resource',
        component: 'setting/resource',
        name: '资源管理',
        access: 'resource',
      },
      {
        path: '/setting/dict',
        component: 'setting/dict',
        name: '字典管理',
        access: 'dict',
      },
      {
        path: '/setting/system',
        component: 'setting/system',
        name: '系统设置',
        access: 'system',
      },
    ],
  },
];
