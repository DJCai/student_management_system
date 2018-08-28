const path = require("path");
//导入数据库的模板
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd21';


//处理最后的环节
//获取登录页面
exports.getloginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/login.html"));
}
//获取注册页面
exports.getregisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/register.html"));
}


//注册功能
exports.register = (req, res) => {
    //设置返回的状态
    const result = {
        status: 0,
        message: "注册成功"
    };
    MongoClient.connect(url, function (err, client) {

        //数据,处理数据
        const url = 'mongodb://localhost:27017';
        // 数据库名
        const dbName = 'szhmqd21';
        const db = client.db(dbName);
        // 拿到集合名
        const collection = db.collection('accountInfo');

        //查询是否有该用户名
        collection.findOne({
            username: req.body.username
        }, (err, doc) => {
            if (doc) {
                //表明重名了
                client.close();
                result.status = 1;
                result.message = "用户名重合了"
                res.json(result);
            } else {
                //将注册信息添加到数据库
                collection.insertOne(req.body, (err, result2) => {
                    client.close();
                    if (result2 == null) {
                        //若为空,表示注册失败
                        result.status = 2;
                        result.message = "注册失败";
                    }
                    res.json(result);
                })
            }
        })
    });
}

//登录功能