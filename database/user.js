
class user {
  constructor (connection) {
    this.connection = connection
    // this.userData = null
  }

  findOneUser (account, password) {
    const sql = ' SELECT * from user WHERE account = ' + this.connection.escape(account) + ' and password = ' + this.connection.escape(password)
    return this.connection.query(sql)
    // return this.connection.query(sql, (error, results, fields) => {
    //   if (error) {
    //     // throw error
    //     console.log(error)
    //   }
    //   console.log(results)
    //   this.userData = results
    //   console.log(this.userData)
    // })
  }
}

module.exports = user