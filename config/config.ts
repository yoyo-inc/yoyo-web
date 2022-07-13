import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  hash: true,
  fastRefresh: true,
  antd: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    layout: 'mix',
    menu: {
      locale: false,
    },
    navTheme: 'light',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
  },
  routes,
  npmClient: 'pnpm',
  proxy,
});
