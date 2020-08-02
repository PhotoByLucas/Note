[原文](https://juejin.im/post/5efd782c5188252e955a54d0?utm_source=gold_browser_extension)

1. 通过 `process.env.xxx` 引用环境变量

   如特殊变量 `NODE_ENV`

   - npm run start : NODE_ENV = development
   - npm run build : NODE_ENV = production

   自定义变量，在 `create-react-app` 中，变量名为 `REACT_APP_xxx` ，同样可通过 `process.env.REACT_APP_xxx`

