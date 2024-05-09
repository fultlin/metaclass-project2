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
  entry: path.join(srcPath, 'main.tsx'), 
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
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/, // Add this line to exclude the node_modules directory
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
              "react-refresh/babel"
            ],
            plugins: [
              '@babel/plugin-proposal-optional-chaining',
              { "loose": true }
            ]
          }
        }
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: /node_modules/, // Add this line to include the node_modules directory for specific packages
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
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