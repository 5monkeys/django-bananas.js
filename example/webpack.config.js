const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const path = require("path");

module.exports = {
  context: __dirname,
  mode: "development",
  entry: "./index.tsx",
  output: {
    publicPath: "/",
    chunkFilename: "[name].[chunkhash].js",
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
    new NodePolyfillPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.m?[jt]sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  optimization: {
    nodeEnv: "development",
  },
  devServer: {
    allowedHosts: "all",
    hot: true,
    compress: true,
    host: "0.0.0.0",
    port: 8123,
    historyApiFallback: true,
    proxy: {
      "/_": "http://localhost:8000",
      "/api": "http://localhost:8000",
      "/private": "http://localhost:8000",
    },
  },
  devtool: "eval-source-map",
};
