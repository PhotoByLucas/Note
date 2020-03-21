[基础](https://juejin.im/post/5e01de37f265da33ab637daf?utm_source=gold_browser_extension#heading-6)
1. 是什么

    webpack它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

2. 核心概念
    1. Entry（入口）
    2. Output（出口）
    3. Loader（模块转换器）
    4. Plugins（插件）：在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
    5. Module(模块)

3. 执行过程
    webpack启动后会在entry里配置的module开始递归解析entry所依赖的所有module，每找到一个module, 就会根据配置的loader去找相应的转换规则，对module进行转换后在解析当前module所依赖的module，这些模块会以entry为分组，一个entry和所有相依赖的module也就是一个chunk，最后webpack会把所有chunk转换成文件输出，在整个流程中webpack会在恰当的时机执行plugin的逻辑

4. 构建本地服务
    ~~~
    npm install webpack-dev-server -D

    // webpack.config.js
    const path = require('path');
    module.exports = {
      entry: path.join(__dirname, "/src/index.js"), // 入口文件
      output: {
        path: path.join(__dirname, "/dist"), // 打包后的文件存放的地方 
        filename: "bundle.js" // 打包后输出文件的文件名
      },
      devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        port: '8080',
        inline: true,
        open: true,
        overlay: true,
        proxy: {
          '/api': {
            target: '', 
            changeOrigin: true,  
            pathRewrite: {
              '^/api': ''  
            }
          }
        }
      }
    }

    // package.json
    "scripts": {
      "build": "webpack",
      "dev": "webpack-dev-server --open"
    },
    ~~~

5. 配置loader
    ~~~
    module: {
        rules: [
          {
            test: /\.css$/,   // 正则匹配以.css结尾的文件
            use: ['style-loader', 'css-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
          }
        ]
      }

    ~~~
6. Plugins

    如需使用某个插件，需要通过npm进行安装，然后在webpack.config.js配置文件的plugins配置项中添加该插件的实例。

    ~~~
    npm install

    // config
    plugins: [
      new webpack.BannerPlugin('版权所有，翻版必究')  // new一个插件的实例 
    ]
    ~~~
