var express = require('express');
var router = express.Router();
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost', //数据库主机名
    user: 'root',         //数据库账号
    password: '123456',    //密码
    database: 'hlsmms'         //使用哪个数据库
});

//打开数据库链接
conn.connect((err) => {
    if (err) {
        console.log("× 数据库链接失败！", err.message);
    }
    else {
        console.log("√ 数据库链接成功！");
    }
});
//设置响应头
router.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
router.get('/', function (req, res, next) {
    res.send('路由成功了');
});
//添加用户的路由
router.post("/useradd", (req, res) => {
    /*
    要接收的值
    pass: 111111
    username: aaaaaaa
    usergroup: 超级管理员
     */
    let { username, pass, usergroup } = req.body;

    //构造sql语句
    /*
    username
    userpwd
    usergroup
    */
    //三个问号表示占位符，后期使用参数数组替换
    let sqlStr = "insert into userinfo(username,userpwd,usergroup) values(?,?,?)";
    let sqlParmas = [username, pass, usergroup];

    //执行sql语句
    //语法：conn.query("sql语句","参数数组",回调函数(err错误对象,result返回的结果)=>{});
    conn.query(sqlStr, sqlParmas, (err, result) => {
        //错误处理
        if (err) {
            throw err;
        }
        else {
            //执行的结果
            // console.log(result);
            /*
            OkPacket {
            fieldCount: 0,
            affectedRows: 1,  //受影响的行数，大于0表示执行成功
            insertId: 2,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 }
            */
            //res.send("执行的结果"+result);
            //根据执行的结果返回数据给前端
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "code": 1, "msg": "用户添加成功！" });
            }
            else {
                res.json({ "isOk": false, "code": -1, "msg": "用户添加失败！" });
            }
        }
    });

});
//删除用户
router.get("/delusers", (req, res) => {
    let userid = req.query.id;
    let sqlStr = `delete from userinfo where userid=${userid}`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            throw err
        } else {
            if (result.affectedRows > 0) {
                res.send({ "isOk": true, "code": 1, "msg": "用户删除成功" })
            } else {
                res.send({ "isOk": false, "code": 0, "msg": "用户删除失败" })
            }
        }
    })
})
//修改用户信息
router.post("/updateuser", (req, res) => {
    let { userid, username, userpwd, usergroup } = req.body;
    console.log(req.body);

    let sqlStr = `update userinfo set username='${username}',userpwd='${userpwd}',usergroup='${usergroup}' where userid='${userid}'`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            throw err
        } else {
            if (result.affectedRows > 0) {
                res.send({ "isOk": true, "code": 1, "msg": "用户修改成功" })
            } else {
                res.send({ "isOk": false, "code": 0, "msg": "用户修改失败" })
            }
        }
    })
})

//获取用户列表路由
router.get("/getusers", (req, res) => {
    let sqlStr = 'select * from userinfo order by userid DESC ';
    conn.query(sqlStr, (err, result) => {
        //错误处理
        if (err) {
            throw err;
        }
        else {
            //执行的结果
            // console.log(result.length===1);
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.json({ "isOk": false, "code": -1, "msg": "数据请求失败！" });
            }
        }
    });
});
//获取单个用户
router.get("/getuserbyid", (req, res) => {
    let userid = req.query.id;
    let sqlStr = `select * from userinfo where userid=${userid}`;
    conn.query(sqlStr, (err, result) => {
        //错误处理
        if (err) {
            throw err;
        }
        else {
            //执行的结果
            // console.log(result.length===1);
            if (result.length > 0) {
                res.json(result);
            }
            else {
                res.json({ "isOk": false, "code": -1, "msg": "数据请求失败！" });
            }
        }
    });

})

//登录路由
router.post("/login", (req, res) => {
    let { username, pass } = req.body;
    let sqlStr = 'select * from userinfo where username="' + username + '" and userpwd="' + pass + '"';
    conn.query(sqlStr, (err, result) => {
        //错误处理
        if (err) {
            throw err;
        }
        else {
            //执行的结果
            // console.log(result.length===1);
            if (result.length > 0) {
                //写入cookie
                res.cookie("userid", result[0].userid);
                res.cookie("username", username);
                console.log(req.cookies)
                res.json({ "isOk": true, "code": 1, "msg": "登录成功！" });
            }
            else {
                res.json({ "isOk": false, "code": -1, "msg": "用户名或密码错误，请重新登录！" });
            }
        }
    });

});
//查询cookie
router.get("/getCookie", (req, res) => {
    let userid = req.cookies.userid;
    let username = req.cookies.username;
    if (userid && username) {
        res.send({ "isOk": true, "code": 1 })
    } else {
        res.send({ "isOk": false, "code": 0 })
    }
})
//清除cookie
router.get("/loginOut",(req,res)=>{
    res.clearCookie("userid");
    res.clearCookie("username");
    res.send({"isOk":true});
});

module.exports = router;
