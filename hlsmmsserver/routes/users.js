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
router.get("/loginOut", (req, res) => {
    res.clearCookie("userid");
    res.clearCookie("username");
    res.send({ "isOk": true });
});
//修改当前用户密码
router.post("/updatepwd", (req, res) => {
    let { oldpass, pass } = req.body;
    let userid = req.cookies.userid;
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
                if (result[0].userpwd !== oldpass) {
                    res.json({ "isOk": false, "code": -1, "msg": "原密码错误，请你想一想" });
                } else {
                    let sqlStr1 = `update userinfo set userpwd='${pass}' where userid='${userid}'`;
                    conn.query(sqlStr1, (err, result1) => {
                        if (err) {
                            throw err
                        } else {
                            if (result1.affectedRows > 0) {
                                res.clearCookie("userid");
                                res.clearCookie("username");
                                res.send({ "isOk": true, "code": 1, "msg": "密码修改成功，请重新登录" })
                            } else {
                                res.send({ "isOk": false, "code": 0, "msg": "密码修改失败" })
                            }
                        }
                    })
                }
            }
            else {
                res.json({ "isOk": false, "code": -1, "msg": "服务器错误，修改失败" });
            }
        }
    });
})
//添加商品
router.post("/shopadd", (req, res) => {
    let { shopclass, bar, shopname, sellprice, bazaarprice, inprice, inventory, heavy, company, vip, promotion, introduction } = req.body
    let sqlStr = "insert into shops(shopclass,bar,shopname,sellprice,bazaarprice,inprice,inventory,heavy,company,vip,promotion,introduction) values(?,?,?,?,?,?,?,?,?,?,?,?)";
    let sqlParmas = [shopclass, bar, shopname, sellprice, bazaarprice, inprice, inventory, heavy, company, vip, promotion, introduction];
    conn.query(sqlStr, sqlParmas, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "code": 1, "msg": "商品添加成功！" });
            }
            else {
                res.json({ "isOk": false, "code": -1, "msg": "商品添加失败！" });
            }
        }
    });

})
//获取商品列表路由
router.get("/getshops", (req, res) => {
    //2）后端——接收 商品分类和关键词
    let { classname, keywords } = req.query;
    //构造sql语句【全表】
    let sqlStr = "select * from shops where 1=1"; //where 1=1永远成立，全表查询

    //3）后端——判断 商品分类和关键词 是否是有效的值，然后在拼接sql语句
    //商品分类有值就执行拼接
    if (classname) {
        sqlStr += ` and shopclass='${classname}'`; //字符串加引号
    }
    //关键词有值就执行拼接
    if (keywords) {
        sqlStr += ` and (shopname like '%${keywords}%' or bar like '%${keywords}%')`; //商品名和条码二选一
    }
    //console.log(sqlStr);  验证拼接是否正常
    //拼接排序的字句【排序】
    sqlStr += " order by pid DESC";
    //执行sql查询：4）后端——执行sql查询就是要搜索的结果，并把结果返回前端
    //执行查询获取总的满足条件的记录数
    let total = 0;
    conn.query(sqlStr, (err, goodsTotal) => {
        if (err) {
            throw err;
        }
        else {
            total = goodsTotal.length;//总记录条数
            //res.send(goodsArray); //如果没有数据就是空数组，有数据就是数组对象
        }
    });
    //分页--------------------------------------------------------------------------------------------
    let { pagesize, currentpage } = req.query;
    console.log('pagesize', pagesize, 'currentpage', currentpage);

    //拼接分页的sql语句
    //console.log(sqlStr);  验证拼接是否正常
    if (pagesize && currentpage) {
        let skip = (currentpage - 1) * pagesize;//跳过多少条
        sqlStr += ` limit ${skip},${pagesize}`;
    }

    //执行sql查询：4）后端——执行sql查询就是要搜索的结果，并把结果返回前端
    conn.query(sqlStr, (err, goodsArray) => {
        if (err) {
            throw err;
        }
        else {
            res.send({ "total": total, "goodsArray": goodsArray }); //如果没有数据就是空数组，有数据就是数组对象
        }
    });


});
//删除商品
router.get("/delshops", (req, res) => {
    let pid = req.query.id;
    let sqlStr = `delete from shops where pid=${pid}`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            throw err
        } else {
            if (result.affectedRows > 0) {
                res.send({ "isOk": true, "code": 1, "msg": "商品删除成功" })
            } else {
                res.send({ "isOk": false, "code": 0, "msg": "商品删除失败" })
            }
        }
    })
})
//获取单个商品
router.get("/getshopbyid", (req, res) => {
    let pid = req.query.id;
    let sqlStr = `select * from shops where pid=${pid}`;
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
//修改商品信息
router.post("/updateshop", (req, res) => {
    let { pid, shopclass, bar, shopname, sellprice, bazaarprice, inprice, inventory, heavy, company, vip, promotion, introduction } = req.body;
    console.log(req.body);
    let sqlStr = `update shops set shopclass='${shopclass}',bar='${bar}',shopname='${shopname}',sellprice='${sellprice}',bazaarprice='${bazaarprice}',inprice='${inprice}',inventory='${inventory}',heavy='${heavy}',company='${company}' ,vip='${vip}' ,promotion='${promotion}',introduction='${introduction}'  where pid='${pid}'`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            throw err
        } else {
            if (result.affectedRows > 0) {
                res.send({ "isOk": true, "code": 1, "msg": "商品修改成功" })
            } else {
                res.send({ "isOk": false, "code": 0, "msg": "商品修改失败" })
            }
        }
    })
})
//获取顶级分类路由
router.get("/gettclass", (req, res) => {
    let sqlStr = 'select * from topclass order by tid DESC ';
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
//获取分类路由 排除禁用
router.get("/getclass", (req, res) => {
    let sqlStr = 'select * from class  where cstatus="1" order by cid DESC';
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
//获取分类路由
router.get("/getclasslist", (req, res) => {
    let sqlStr = 'select * from class  order by tid DESC';
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
//添加子分类
router.post("/classadd", (req, res) => {
    let { username, group, state } = req.body;
    console.log(username + group + state);

    let sqlStr = `insert into class(classname,cstatus,tid) values('${username}',${state},'${group}')`;
    // let sqlParmas = [username, state, group];
    conn.query(sqlStr, (err, result) => {
        //错误处理
        if (err) {
            throw err;
        }
        else {
            if (result.affectedRows > 0) {
                res.json({ "isOk": true, "code": 1, "msg": "分类添加成功！" });
            }
            else {
                res.json({ "isOk": false, "code": -1, "msg": "分类添加失败！" });
            }
        }
    });
});
//删除子分类
router.get("/delclasss", (req, res) => {
    let cid = req.query.id;
    let sqlStr = `delete from class where cid=${cid}`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            throw err
        } else {
            if (result.affectedRows > 0) {
                res.send({ "isOk": true, "code": 1, "msg": "分类删除成功" })
            } else {
                res.send({ "isOk": false, "code": 0, "msg": "分类删除失败" })
            }
        }
    })
})
//获取单个分类
router.get("/getclassbyid", (req, res) => {
    let cid = req.query.id;
    let sqlStr = `select * from class where cid=${cid}`;
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
//修改分类
router.post("/updateclass", (req, res) => {
    let { cid, classname, tid, cstatus } = req.body;
    console.log(req.body);
    let sqlStr = `update class set classname='${classname}',tid='${tid}',cstatus='${cstatus}' where cid='${cid}'`;
    conn.query(sqlStr, (err, result) => {
        if (err) {
            throw err
        } else {
            if (result.affectedRows > 0) {
                res.send({ "isOk": true, "code": 1, "msg": "分类修改成功" })
            } else {
                res.send({ "isOk": false, "code": 0, "msg": "分类修改失败" })
            }
        }
    })
})




module.exports = router;
