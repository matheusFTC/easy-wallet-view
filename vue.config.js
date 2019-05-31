const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    proxy: {
      'api/v1/': {
        target: 'https://easy-wallet.herokuapp.com/'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          stylus: {
            import: [path.resolve(__dirname, 'src/assets/css/all.styl')]
          }
        }
      })
    ]
  }
};
