import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  hash: true,
  fastRefresh: true,
  antd: {},
  model: {},
  initialState: {},
  request: {
    dataField: 'data',
  },
  layout: {},
  routes,
  npmClient: 'pnpm',
  proxy,
});
