//环境配置封装
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '/',
    mockApi:
      'https://www.fastmock.site/mock/0b7df94a2d85d8270c718ab28e1bad78/api',
  },
  test: {
    baseApi: '//test.future.com/api',
    mockApi:
      'https://www.fastmock.site/mock/0b7df94a2d85d8270c718ab28e1bad78/api',
  },
  prod: {
    baseApi: '/future.com/api',
    mockApi:
      'https://www.fastmock.site/mock/0b7df94a2d85d8270c718ab28e1bad78/api',
  },
}
export default {
  env,
  mock: true,
  ...EnvConfig[env],
  namespace: 'manager',
}
