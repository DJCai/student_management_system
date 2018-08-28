//导入文件
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require('express-session');

//创建app应用
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

//集成路由

const accountRouter = require(path.join(__dirname,"./routers/accountRouter.js"));
app.use("/account",accountRouter)

const managementRouter = require(path.join(__dirname,"./routers/managementRouter.js"))
app.use("/management",managementRouter);


//开启服务
app.listen(5566,"127.0.0.1",err=>{
    if(err) console.log(err);
    console.log("start ok");
})