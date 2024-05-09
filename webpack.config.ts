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
    {
      loader: 'css-loader',
      options: {
        modules: withModules ? {
          localIdentName: isProd ? '[hash:base64]' : '[path][name]__[local]',
        } : false,
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
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'src/styles')],
        },
      }
    }
  ];
};

module.exports = {
  mode: 'development',
  entry: path.join(srcPath, 'main.tsx'),
  target: !isProd ? 'web' : 'browsersList',
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    })
  ],

  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/i,
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