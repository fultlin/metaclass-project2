const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin')

const buildPath = path.resolve(__dirname, 'dist')
const srcPath = path.resolve(__dirname, 'src')

const isProd = process.env.NODE_ENV === 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
          },
        },
      },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main.tsx', 
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin(),
    process.env.NODE_ENV === 'development' && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),

  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true)
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles()
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.js', '.jsx', '.ts'],
    alias: {
      components: path.join(srcPath, 'components')
    }
  },
  devServer: {
    port: 9000,
    hot: true,
    historyApiFallback: true,
  }
}