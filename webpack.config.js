const path = require("path");

module.exports = {
  mode: "development",
  entry: ["./index.ts"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "assets"),
    },
    compress: true,
    port: 8080,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
