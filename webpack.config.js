/* eslint-disable */
const path = require("path");

module.exports = {
  mode: "development",
  // entry file
  entry: "./src/index.js",
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, "src/public"),
    filename: "bundle.js",
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src/components"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  corejs: 3,
                  targets: "> 1%",
                  useBuiltIns: "usage",
                },
              ],
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "./src/public"),
    port: 9000,
    proxy: {
      "/api/": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
};
