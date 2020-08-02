const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:8080/",
    publicPath:
      argv.mode === "development"
        ? "http://localhost:8080/"
        : "https://consumer.jherrington.vercel.app/",
    path: path.resolve(__dirname, "build"),
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "consumer",
      filename: "remoteEntry.js",
      remotes: {
        header: "header@https://preact.jherrington.vercel.app/remoteEntry.js",
      },
      shared: require("./package.json").dependencies,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
