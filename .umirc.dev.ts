import { defineConfig } from 'umi';

export default defineConfig({
  mock: {},
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8100/',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '' },
    },
  },
  fastRefresh: {},
});
