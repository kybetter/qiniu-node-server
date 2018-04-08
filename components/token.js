const fs = require('fs')
const path = require('path')
const config = require("../config/config")
const getToken = require('../util/getToken')

// 读取七牛配置
const accessKey = config.accessKey
const secretKey = config.secretKey
const bucket = config.bucket
const expires = config.expires

const rootDir = path.resolve(__dirname, '..')
const tokenFileName = rootDir + '/cache/token.json'

// 返回 token 并写入文件缓存
const setToken = () => {
  const token = getToken.generate(accessKey, secretKey, bucket, expires)
  const cacheData = JSON.stringify({
    token,
    // 设置缓存过期时间比七牛的早十分钟
    expires: (new Date().getTime()) + (expires - 600) * 1000
  })
  // 写缓存的过程不用管
  fs.writeFile(tokenFileName, cacheData, (err) => {
    if (err) {console.log(err)}
  })
  
  return token
}

const uploadToken = () => {
  try {
    // 命中缓存
    const cacheData = fs.readFileSync(tokenFileName, 'utf8')
    const cache = JSON.parse(cacheData)
    const expires = cache.expires
    let token = cache.token
    // 缓存过期，重设缓存
    if (expires < new Date().getTime()) {
      token = setToken()
    }
    return token
  } catch (e) {
    // 没有缓存时生成缓存
    return setToken()
  }
}

module.exports = uploadToken
