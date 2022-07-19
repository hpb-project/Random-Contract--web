const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath:'./',
  outputDir: 'dist',
  lintOnSave: true,
  pages: undefined,
  runtimeCompiler: false,
  productionSourceMap: false,
  devServer: { 
    port:8080,
    https: false,
    open: true,
    proxy: { 
      '/api1/': {
        target: 'http://3.11.211.183:38100',
        changeOrigin: true,
        pathRewrite: {
          '^/api1': '/'  
        } 
      }, 
      '/api2/': {
        target: 'http://52.193.53.3:8011',
        changeOrigin: true,
        pathRewrite: {
          '^/api2': '/'  
        } 
      },
    } 
  },
  configureWebpack:config =>{
    return {
        plugins:[
            new BundleAnalyzerPlugin()
        ]
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
      "maxEntrypointSize": 10000000,
      "maxAssetSize": 30000000
      }
    }
  },
  lintOnSave: false
}
