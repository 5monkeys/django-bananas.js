const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: {
    index: "./src/index.js",
  },
  mode: "development",
  devtool: "cheap-source-map",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[chunkhash].js",
    filename: "[name].bundle.js",
  },
  resolve: {
    alias: {
      "django-bananas": path.resolve(__dirname, "..", "src"),
    },
  },
  devServer: {
    // hot: true, // crashes
    disableHostCheck: true,
    contentBase: path.join(__dirname, "dist"),
    // lazy: true, // works to dynamically add pages with this setting on. But only on reload.
    compress: true,
    host: "0.0.0.0",
    port: 3000,
    publicPath: "/",
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Bananas.js Example App",
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
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
};
