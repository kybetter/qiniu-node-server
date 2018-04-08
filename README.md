### 使用 nodeJs 写的七牛服务端

#### 主要功能
开启一个 http 服务，给客户端返回上传至七牛所需要的 token

#### 使用方法
- 修改 `config`目录下的`config.js_`文件名修改为`config.js`
- 将里面的配置修改成适合你的
- 安装依赖，执行 `npm install 或 cnpm install 或 yarn`
- 本地运行或开发，执行 `npm run dev 或 yarn start`
- 线上运行，执行 `npm run prod 或 yarn prod`

#### 简单用户验证
如果需要用户验证，参考表字段如下：
```sql
CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `account` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `sex` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```