//导入模块
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

//创建app应用
const app = express();

//调用中间体

// Use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Use the session middleware
app.use(session({ secret: 'keyboard cat',resave: true,saveUninitialized: false, cookie: { maxAge: 600000 }}))

// Use the express-art-template middleware
app.engine('art', require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});


//集成路由
const accountRount = require(path.join(__dirname,"./routers/accountRouter"));
app.use("/account",accountRount);

const studentManagementRount =require(path.join(__dirname,"./routers/studentManagementRouter.js"));
app.use("/studentManagement",studentManagementRount);

//开启web服务
app.listen(5566,"127.0.0.1",err=>{
    if(err) console.log(err);
    console.log("start ok")
})