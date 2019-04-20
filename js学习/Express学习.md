# 第一天
1. 使用require('xxx') 引入了express 模块， 这种方式是 Node 中少数同步的操作，它一开始会去Node 的原始 node_modules 目录下寻找express 模块 然后引入，把值赋给express，然后实例化为app.
2. app.set('port',xxx) 能够设置我们的域名端口，这里process.env.PORT是指
环境变量要是设置了PORT，那么就用环境变量的PORT，环境变量没有我们就用3000