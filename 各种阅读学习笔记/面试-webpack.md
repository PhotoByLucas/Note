[基础](https://juejin.im/post/5e01de37f265da33ab637daf?utm_source=gold_browser_extension#heading-6)

1. 是什么

   webpack 它做的事情是，分析你的项目结构，找到 JavaScript 模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript 等），并将其打包为合适的格式以供浏览器使用。

2. 核心概念

   1. Entry（入口）
   2. Output（出口）
   3. Loader（模块转换器）
   4. Plugins（插件）：在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
   5. Module(模块)

3. 执行过程
   webpack 启动后会在 entry 里配置的 module 开始递归解析 entry 所依赖的所有 module，每找到一个 module, 就会根据配置的 loader 去找相应的转换规则，对 module 进行转换后在解析当前 module 所依赖的 module，这些模块会以 entry 为分组，一个 entry 和所有相依赖的 module 也就是一个 chunk，最后 webpack 会把所有 chunk 转换成文件输出，在整个流程中 webpack 会在恰当的时机执行 plugin 的逻辑

4. 构建本地服务

   ```
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
   ```

5. 配置 loader

   ```
   module: {
       rules: [
         {
           test: /\.css$/,   // 正则匹配以.css结尾的文件
           use: ['style-loader', 'css-loader']  // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
         }
       ]
     }

   ```

6. Plugins

   在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

   如需使用某个插件，需要通过 npm 进行安装，然后在 webpack.config.js 配置文件的 plugins 配置项中添加该插件的实例。

   ```
   npm install

   // config
   plugins: [
     new webpack.BannerPlugin('版权所有，翻版必究')  // new一个插件的实例
   ]
   ```

7. 构建流程
   1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
   2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
   3. 确定入口：根据配置中的 entry 找出所有的入口文件
   4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
   5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
   6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
   7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

8. 手写loader
    ~~~
    // 定义
    module.exports = function(src) {
      //src是原文件内容（abcde），下面对内容进行处理，这里是反转
      var result = src.split('').reverse().join('');
      //返回JavaScript源码，必须是String或者Buffer
      return `module.exports = '${result}'`;
    }
    //使用
    {
      test: /\.txt$/,
      use: [
        {
          './path/reverse-txt-loader'
        }
      ]
    },
    ~~~
9. 手写插件 
    ~~~
    apply (compiler) {
      const afterEmit = (compilation, cb) => {
        cb()
        setTimeout(function () {
          process.exit(0)
        }, 1000)
      }

      compiler.plugin('after-emit', afterEmit)
    }
    }

    module.exports = BuildEndPlugin
    ~~~