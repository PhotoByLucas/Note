## 1. 初始化
+ @/路径配置  
    由webpack决定 在build/webpack.base.conf.js
+ this.$router  
    在main.js中new Vue({router}),直接将router挂载到vue实例上
    <!-- todo -->
+ vuex引入  
    1. npm install
    2. 建一个src/store
    3. main.js中new Vue({store})