/* eslint-disable */
const path = require('path');

module.exports = {
  mode: "development",
  // entry file
  entry: "./client/index.js",
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, "client/public"),
    filename: "bundle.js",
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'client')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                ["@babel/preset-env", {
                    corejs: 3,
                    targets: '> 1%',
                    useBuiltIns: "usage"
                }]
            ],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        test:/\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "./client/public"),
    port: 9000
  }
  
}