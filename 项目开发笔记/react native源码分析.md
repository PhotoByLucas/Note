## 源码分析

### 主线

1. ReactNative 应用启动流程
2. ReactNative 应用 UI 的绘制与渲染
3. ReactNative 应用通信机制
4. ReactNative 应用线程模型

### 支线

1. ReactNative 运行时的异常以及异常的捕获与处理。
2. SOLoader 加载动态链接库
3. ReactNative 触摸事件处理机制

## 代码调用

1. 执行器的实现
   1. Native 代码执行器  
      ExecutorDelegate：在 Executor.h 中定义，由 JsToNativeBridge 实现，该抽象类用于 JS 代码调用 Native 代码
   2. JS 代码执行器  
      JS 的解析是在 Webkit-JavaScriptCore 中完成的，JSCExexutor.cpp 对 JavaScriptCore 的功能做了进一步的封装。
2. Java 与 C++的交互
   java 要调用 c++ 需要用到 JNI
3. JavaScript 与 C++的交互

## 启动流程

1.  应用初始化流程
    1. 将 ReactActivity 作为 js 页面容器初始化
    2. 页面继承 ReactActivity，ReactActivity 作为 JS 页面的容器。
    3. 有了 ReactActivity 作为容器，我们就可以用 JS 开发页面了。
2.  应用启动流程

    1. 在程序启动的时候，也就是 ReContextactActivity 的 onCreate()函数中，我们会去创建一个 ReactInstanceManagerImpl 对象

    2. ReactRootView 作为整个 RN 应用的根视图，通过调用 ReactRootView.startReactApplication()方法启动 RN 应用。

    3. RN 应用页面渲染前，需要先创建 ReactContext 的创建流程在，异步任务 ReactContextInitAsyncTask 负责来完成这个任务。

    4. ReactContextInitAsyncTask 在后台 ReactContextInitAsyncTask.doInBackground()执行 ReactContext 的创建，创建 ReactContext 的过程中，会依据 ReactPackage 创建 JavaScriptModuleRegistry 与 NativeModuleRegistry 注册表以及它们的管理类 CatalystInstanceImpl，同时创建 JS、Native 与 UI 线程队列，并最终调用 CatalystInstanceImpl.runJSBundle()去异步加载 JS Bundle 文件。

    5. 后台任务执行完成后，在 ReactContextInitAsyncTask.onPostExecute()会调用 ReactInstanceManager.setupReactContext()设置创建好的 ReactContext，并将 ReactRootView 加载进来，并调用 RN 应用的 JS 入口 APPRegistry 来启动应用。

    6. JS 层找到已经注册的对应的启动组件，执行 renderApplication()来渲染整个应用。

## [渲染原理 我的](https://blog.csdn.net/AllenWells/article/details/77801543)

## 线程模型 

## 通信机制

# 渲染原理

1. JS 的加载流程  
   JS 的加载有很多种方式，可以从本地加载，也可以从服务器加载。react native 则是在在创建上下文的之前会去加载 JS。
