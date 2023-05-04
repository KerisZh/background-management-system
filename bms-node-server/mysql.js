const mysql = require("mysql");
const db_config = {
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3306",
  database: "bg_management_system",
};

const conMysql = (sql) => {
  const con = mysql.createConnection(db_config); //创建连接对象，参数为数据库配置项或者实例对象
  //连接数据库
  con.connect(function (err) {
    console.log(("连接失败", err) || "连接成功");
  });

  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const res = JSON.parse(JSON.stringify(result));
        closeMysql(con);
        resolve(res);
      }
    });
  });
};

const closeMysql = (connect) => {
  connect.end((err) => {
    if (err) {
      console.log("数据库关闭失败", err);
    } else {
      console.log("数据库关闭成功");
    }
  });
};

exports.conMysql = conMysql;
