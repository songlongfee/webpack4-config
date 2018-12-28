const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',    //入口文件
  output: {   //输出配置
    path: path.resolve(__dirname, 'dist/'),    //打包输出目录
    filename: 'assets/js/app.js',    //输出包名，输出到指定目录，这样publicPath就可以直接配置为绝对路径'/'
    publicPath: '/',  //所有打包后资源的基础路径，而且一定是以"/"结尾
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({   //使用html模板文件
      filename: 'index.html',   //目标文件
      template: 'src/index.html'    //模板文件
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [ 
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',     //loader 在一个模块被引入之前，会预先使用loader处理模块的内容
            options: {  //此处如果没有配置options，则去babelrc查找相关配置
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.css$/,
        // 功能之一是处理css文件中的url，自动引入要引入的模块
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',   //匹配到css文件，先启用css-loader处理，处理完成后，将处理结果交给style-loader来处理
            options: {
              modules: true,  //开启css模块化
              localIdentName: '[name]-[local][hash:base64:6]' //编译后的类名，默认hash:base64  [path]-[name]-[local][hash:base64:6]
            }
          }
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          // path.resolve(__dirname, 'src/common')
        ]  //排除不需要处理的文件目录
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     {
      //       loader: 'style-loader'
      //     },
      //     {
      //       loader: 'css-loader'
      //     }
      //   ],
      //   include: [
      //     // path.resolve(__dirname, 'node_modules'),
      //     // path.resolve(__dirname, 'src/common')
      //     //从下往上执行，处理指定目录下的文件，避免多次处理报错
      //   ]
      // },
      {
        test: /\.scss$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local][hash:base64:6]'
            }
          },
          'sass-loader'
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.less$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]-[local][hash:base64:6]'
            }
          },
          'less-loader'
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        //file-loader  Instructs webpack to emit the required object as file and to return its public URL；默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
        use: [
          {
            loader: 'url-loader', //file-loader加强版，可将图片转码成base64
            options: {
              limit: 10000,  //将小于10000byte的图片转码成base64格式的文件，减少请求次数
              name: 'assets/img/[name]-[hash:8].[ext]',  //ext-后缀名，将文件打包到指定目录下
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/font/[name]-[hash:8].[ext]',  //ext-后缀名
            }
          }
        ]
      }
    ]
  },
  devServer: {    //webpack-dev-server 开发服务器，将打包的资源暂存在内存中，可访问，支持热更新
    open: true,   //Tells dev-server to open the browser after server had been started. Disabled by default.
    // contentBase: path.join(__dirname, 'src/'),  //Tell the server where to serve content from
    publicPath: '/',  //服务器打包后资源的输出路径（devServer打包资源存放在内存中）
    host: 'localhost',    //Specify a host to use. By default this is localhost
    port: 9000,   //Specify a port number to listen for requests on
    hot: true,  //Enables Hot Module Replacement (see devServer.hot) without page refresh as fallback in case of build failures
    compress: true, //Enable gzip compression for everything served
    disableHostCheck: true, //When set to true this option bypasses host checking. THIS IS NOT RECOMMENDED as apps that do not check the host are vulnerable to DNS rebinding attacks.
  }
}