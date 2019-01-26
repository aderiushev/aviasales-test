if (typeof process.env.NODE_ENV === 'undefined') process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, '/src'),
  entry: [
    '@babel/polyfill',
    'index.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { url: true } },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true, importLoaders: 2, localIdentName: '[local]_[hash]' } },
          { loader: 'resolve-url-loader' },
          { loader: 'less-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(svg|png|swf|jpg|otf|eot|ttf|woff|woff2)(\?.*)?$/,
        use: [
          { loader: 'file-loader', options: { limit: 100000, name: 'assets/[name].[ext]' } },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              // minimize: true
            },
          },
        ],
      },
    ],
  },
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = "nosources-source-map";
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  config.devtool = 'inline-source-map';

  config.plugins.push(new webpack.NamedModulesPlugin());
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  config.devServer = {
    // compress: false,
    contentBase: path.join(__dirname, 'dist'),
    port: 8030,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  };
}

module.exports = config;
