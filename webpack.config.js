var path = require("path");
var assetsPath = path.resolve(__dirname, "./compiled");

module.exports = {
	entry: ["babel-polyfill", "./src/index.js"],
	devtool: "source-map",
	output: {
		path: assetsPath,
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			}
		]
	}
};
