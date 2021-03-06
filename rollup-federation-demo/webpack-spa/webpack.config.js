const path = require("path");

const { ModuleFederationPlugin } = require("webpack").container;

const pkg = require("./package.json");

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: "./src/index",
  mode: "production",
  target: "web",
  devtool: false,
  output: {
    libraryTarget: "system", // 将library暴露为systemjs
    libraryExport: "main", // 入口导出为main
    publicPath: "http://localhost:8081/",
  },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  externals: ["react", "react-dom"],
  plugins: [
    new ModuleFederationPlugin({
      name: "rwebpackremote",
      library: { type: "system" },
      filename: "remoteEntry.js",
      remotes: {
        rollup_spa: "rollup_spa",
      },
      exposes: {
        "./Button": "./src/Button",
      },
      shared: { // 让远程加载的模块对应依赖改为使用本地项目的 React 或 ReactDOM
        react: {
          eager: true,
          singleton: true,
          requiredVersion: pkg.dependencies.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: pkg.dependencies["react-dom"],
        },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname),
    },
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};