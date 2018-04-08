const qiniu = require("qiniu")

module.exports = {
  generate: (accessKey, secretKey, bucket, expires) => {
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket,
      expires
    });

    return putPolicy.uploadToken(mac);
  }
}