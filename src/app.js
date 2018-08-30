//导入模块
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

//创建app应用
const app = express();

//调用中间体
app.use(bodyParser.urlencoded({ extended: false }));

//集成路由
const accountRount = require(path.join(__dirname,"./routers/accountRouter"));
app.use("/account",accountRount);

//开启web服务
app.listen(5566,"127.0.0.1",err=>{
    if(err) console.log(err);
    console.log("start ok")
})