const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: () =>
    new Promise(resolve =>
      resolve({
        index: "./src/index.js",
      })
    ),
  // exclude peerDependencies
  externals: [
    /@material-ui\/core/,
    /@material-ui\/icons/,
    "react-dom",
    "react",
  ],
  mode: "production",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].[chunkhash].js",
    filename: "[name].js",
    library: "django-bananas",
    libraryTarget: "umd",
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerPort: 3001,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-class-properties",
            ],
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {},
          },
        ],
      },
    ],
  },
};
