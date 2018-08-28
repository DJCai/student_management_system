//导入文件
const express = require("express");
const path = require("path");

//创建app应用
const app = express();

//集成路由

const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"));
app.use("/account",accountRouter)

//开启服务
app.listen(5566,"127.0.0.1",err=>{
    if(err) console.log(err);
    console.log("start ok");
})