## Mock服务使用说明
+ 安装依赖
> 运行npm install 或者 yarn

+ 启动Mock服务
> 运行npm run start，可以同时启动开发服务器和Mock服务器，由于开发过程中
需要频繁修改mock数据、重启mock服务器，建议分别启动开发服务器和Mock服务器：
npm run serve; npm run server:mock

+ 开发Mock接口
> 使用express作为Mock服务器框架，路由规则与express一致。

> 开发时可参考接口文档，配置请求路径和响应内容。在前端调用时，
在根目录下mock.config.js，将需要mock的请求路径后即会将开发环境的请求转发到mock服务

