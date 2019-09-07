const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
const lodash = require('lodash');
// const createElectronReloadWebpackPlugin = require('electron-reload-webpack-plugin');
// const ElectronConnectWebpackPlugin = require('electron-connect-webpack-plugin');

// const RenderorElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
//   // Path to `package.json` file with main field set to main process file path, or just main process file path
//   path: path.join(__dirname, './src/client/renderer.tsx'),
//   // or just `path: './'`,
//   // Other 'electron-connect' options
//   logLevel: 0,
// });

// const MainElectronReloadWebpackPlugin = createElectronReloadWebpackPlugin({
//   // Path to `package.json` file with main field set to main process file path, or just main process file path
//   path: path.join(__dirname, './src/main/main.ts'),
//   // or just `path: './'`,
//   // Other 'electron-connect' options
//   logLevel: 0,
// });

function srcPaths(src) {
  return path.join(__dirname, src);
}


const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

const commonConfig = {
  devtool: isEnvDevelopment ? 'source-map' : false,
  mode: isEnvProduction ? 'production' : 'development',
  externals: {
        '@google-cloud/container': 'commonjs @google-cloud/container'
  },
  optimization:{minimize:false},
  output: { path: srcPaths('dist') },
  optimization: {minimize: false},
  node: { __dirname: false, __filename: false },
  // plugins: [
  //   new ElectronConnectWebpackPlugin({
  //     path: path.join(__dirname, 'dist'),
  //     logLevel: 0,
  //   }),
  // ],
  resolve: {
    alias: {
      '@': srcPaths('src'),
      '@main': srcPaths('src/main'),
      '@renderer': srcPaths('src/client'),
    },
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'url-loader?limit=8192',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  watch: false
};
// #endregion

const mainConfig = lodash.cloneDeep(commonConfig);
mainConfig.entry = ['babel-polyfill','./src/main/main.ts'];
mainConfig.target = 'electron-main';
mainConfig.output.filename = 'main.bundle.js';
mainConfig.plugins = [
  new CopyPkgJsonPlugin({
    remove: ['scripts', 'devDependencies', 'build'],
    replace: {
      main: './main.bundle.js',
      scripts: { start: 'electron ./main.bundle.js' },
      postinstall: 'electron-builder install-app-deps',
    },
  }),
  // MainElectronReloadWebpackPlugin(),
];

const rendererConfig = lodash.cloneDeep(commonConfig);
rendererConfig.entry = './src/client/renderer.tsx';
rendererConfig.target = 'electron-renderer';
rendererConfig.output.filename = 'renderer.bundle.js';
rendererConfig.plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/client/index.html'),
  }),
];

module.exports = [mainConfig, rendererConfig];
