const http = require('http')
const url = require('url')
const querystring = require('querystring')
const config = require('./config/config')
const uploadToken = require('./components/token')
if (config.mysql) {
  const connection = require('./database/connect')
  const user = require('./database/user')
}


// 简单开启一个服务来返回 token 数据
const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "application/json")

  // 限定只能是 /token 路由才能进入
  const isCorrectRoute = /^\/?token\/?$/.test(url.parse(request.url).pathname)

  if (isCorrectRoute && request.method === "POST") {
    let chunkData = ""
    request.on('data', (chunk) => {
      chunkData += chunk
    })
    request.on('end', () => {
      if (config.mysql) {
        response.end(JSON.stringify({
          token: uploadToken(),
          // post: postData,
          // user: userData
        }))
        return;
      }
      postData = querystring.parse(chunkData)
      if (!(postData.account && postData.password)) {
        response.end(JSON.stringify({
          error: "账户错误",
        }))
      } else {
        // 查询用户数据
        const userQuery = new user(connection).findOneUser(postData.account, postData.password)
        let userData = null
        userQuery.on('error', (err) => {
          response.end(JSON.stringify({
            error: err
          }))
        }).on('result', (data) => {
          userData = data
        }).on('end', () => {
          if (userData) {
            response.end(JSON.stringify({
              token: uploadToken(),
              // post: postData,
              // user: userData
            }))
          } else {
            response.end(JSON.stringify({
              error: '用户查询失败',
            }))
          }
        })
      }
    })
  } else {
    response.end(JSON.stringify({
      error: '没有权限访问',
    }))
  }
})

server.listen(config.port, config.domain, () => {
 console.log(`http server start on http://${config.domain}:${config.port}`)
})