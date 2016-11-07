module.exports = {
  entry: "./front/app.js",
  output: {
    path: "./bundle",
    filename: "bundle.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
      	test: /\.scss$/,
      	loaders: ['style','css','sass']
      },
      {
		test: [/\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf|ico)$/i],
		loader: 'file-loader?name=[name].[ext]'
      },      
      {
		test: /\.html$/,
		loader: ['file?name=[name].[ext]']
      } 
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
