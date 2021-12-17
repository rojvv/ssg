const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
    fallback: {
      fs: false,
      path: require.resolve("path-browserify"),
      net: false,
      crypto: false,
      os: require.resolve("os-browserify/browser"),
      util: require.resolve("util/"),
      assert: false,
      stream: false,
      constants: false,
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  mode: process.env.NODE_ENV ?? "development",
}
