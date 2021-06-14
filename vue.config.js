let proxyObj = {};

proxyObj['/'] = {
  ws: false,
  target: 'http://localhost:8081',
  changeOrigin: true,
  pathReWrite: {
    '^/': '/'
  }
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'utils': '@/utils'
      }
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}