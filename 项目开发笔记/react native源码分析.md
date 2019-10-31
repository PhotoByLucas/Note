## 源码分析
### 主线
1. ReactNative应用启动流程
2. ReactNative应用UI的绘制与渲染
3. ReactNative应用通信机制
3. ReactNative应用线程模型
### 支线
1. ReactNative运行时的异常以及异常的捕获与处理。
2. SOLoader加载动态链接库
3. ReactNative触摸事件处理机制
## 代码调用
1. 执行器的实现
    1. Native代码执行器  
    ExecutorDelegate：在Executor.h中定义，由JsToNativeBridge实现，该抽象类用于JS代码调用Native代码
    2. JS代码执行器  
    JS的解析是在Webkit-JavaScriptCore中完成的，JSCExexutor.cpp对JavaScriptCore的功能做了进一步的封装。
2. Java与C++的交互
java要调用c++ 需要用到JNI
3. JavaScript与C++的交互
## 启动流程
1. 将ReactActivity作为js页面容器初始化
2. 
## 渲染原理
## 线程模型
## 通信机制