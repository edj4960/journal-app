import mysql from 'mysql';

class DB {
  constructor() {
    let config = {
      host: process.env.REACT_APP_MY_SQL_HOST,
      user: process.env.REACT_APP_MY_SQL_USER,
      password: REACT_APP_MY_SQL_PASSWORD,
      database: REACT_APP_MY_SQL_DATABASE,
    }
    this.connection = mysql.createConnection(config);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

export default DB;
