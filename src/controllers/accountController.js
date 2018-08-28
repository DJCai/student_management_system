const path = require("path");
//导入数据库的模块
const MongoClient = require('mongodb').MongoClient;
//导入生成验证码的模块
var captchapng = require('captchapng');

//处理最后的环节
//获取登录页面
exports.getloginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/login.html"));
}
//获取注册页面
exports.getregisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/register.html"));
}

/**
 * 最终处理: 把注册信息存储起来,并把注册结果返回给浏览器
 */
//注册功能
exports.register = (req, res) => {
    //设置返回的状态
    const result = {
        status: 0,
        message: "注册成功"
    };
    //数据库
    const url = 'mongodb://localhost:27017';
    MongoClient.connect(url, function (err, client) {

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

//获取验证码功能
/** 最终处理
 * 获取验证码,并将验证码返回给浏览器
 */
exports.fetchvcode = (req, res) => {

    const vcode = parseInt(Math.random() * 9000 + 1000);  
    //存储到sesion中
    req.session.vcode=vcode;
    
    const p = new captchapng(80, 30, vcode ); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    const img = p.getBase64();
    const imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

/**最终处理
 * 
 */
//
exports.login = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/register.html"));
}