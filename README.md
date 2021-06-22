# gofor-gdut-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 初始化Vue项目
1. 厘清项目结构
```
   gofor-gdut-front
     |- /assets 资源文件夹
       |- /css
       |- /images 存放网页结构相关图片
     |- /components 可复用组件文件夹
       |- /common 存放可被其他项目复用的组件
       |- /content 存放本项目多处复用的组件
     |- /router 路由配置
       |- index.js
     |- /plugins 插件
     |- /utils 工具文件夹
     |- /store vuex配置，项目简单所以没有分模块配置
       |- index.js
       |- getter.js
       |- mutations.js
       |- actions.js
     |- /views 页面组件文件夹，内部二级文件夹以页面来划分，再存放子组件
     |- /network 封装网络请求
       |- request.js 通用网络请求配置，目录下子文件都要导入
       |- home.js/cart.js ... 按照模块划分网络请求配置文件
```

2. 项目目录下新建`Vue.config.js`文件，利用webpack配置来设置别名
3. 配置通用请求文件
    * 导入axios
    * 新建axios实例
    * 配置拦截器
4. 配置共用样式

