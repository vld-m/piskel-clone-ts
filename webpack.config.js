const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: {
    app: './src/components/app.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'piskel clone ts',
      template: './src/components/app.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].styles.css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return config;
  }

  return {
    ...config,
    devtool: 'source-map',
    devServer: {
      contentBase: './dist',
    },
  };
};
