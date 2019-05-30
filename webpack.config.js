const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.fmc$/i,
        use: 'raw-loader',
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'docs')
  },
};
