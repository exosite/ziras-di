const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: 'mocha!./test',
  output: {
    filename: 'index.js',
    path: './build/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/,
        include: __dirname,
      },
    ],
  },
  devServer: {
    host: '0.0.0.0',
    progress: true,
    inline: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: 'test/index.html',
    }),
  ],
  eslint: {
    configFile: './.eslintrc.json',
    fix: true,
  },
};
