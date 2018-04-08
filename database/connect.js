const mysql = require('mysql')
const config = require('../config/config')

class database {
  constructor () {
    this.host = config.host
    this.user = config.user
    this.password = config.password
    this.database = config.database
  }
  
  run () {
    const connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    })

    connection.connect((err) => {
      if (err) {
        console.log('error connecting: ' + err.stack)
        return ;
      }
      console.log('connected as id ' + connection.threadId);
    })
    
    return connection
  }

}

module.exports = new database().run()