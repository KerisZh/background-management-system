const { conMysql } = require("./mysql");
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");

app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded
app.use(multiparty()); // mutipart/form-data
app.use(bodyParser.json()); //application/json

// 创建统一的返回报文对象
class Response {
  constructor(isSucceed, msg, code, data) {
    this.isSucceed = isSucceed;
    this.msg = msg;
    this.code = code;
    this.data = data;
  }
}

// 登录
app.post("/login", (req, res) => {
  const sql = `SELECT * FROM user WHERE username='${req.body.username}'`;
  conMysql(sql)
    .then((result) => {
      if (result[0]?.password === req.body.password) {
        const response = new Response(true, "登录成功", 200, result);
        res.send(response);
      } else {
        const response = new Response(false, "用户名或密码错误", 400, null);
        res.send(response);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/register", (req, res) => {
  const sql = `INSERT INTO user (username, password, name) VALUES ('${req.body.username}', '${req.body.password}', '${req.body.name}')`;
  conMysql(sql)
    .then((result) => {
      console.log(result);
      const response = new Response(true, "注册成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/modify", (req, res) => {
  const sql = `UPDATE user SET password = '${req.body.password}', name = '${req.body.name}' WHERE username = '${req.body.username}'`;
  conMysql(sql)
    .then((result) => {
      const response = new Response(true, "修改成功", 200, result);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/delete", (req, res) => {
  
})

app.get("/test", (req, res) => {
  res.send("Hello World");
}); // testing the server

app.get("/info", (req, res) => {
  const sql = "select * from user";
  conMysql(sql).then((result) => {
    res.send(result);
  });
});

app.listen(3000, () => console.log("Example app listening on port 3000!")); // running the server
