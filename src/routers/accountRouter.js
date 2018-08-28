//导入文件

const express = require("express");
const path = require("path");

//创建路由对象
const accountRounter = express.Router();

//导入控制器
const accountCtrl = require(path.join(__dirname,"../controllers/accountController.js"))

//处理具体申请
//登录页面获取
accountRounter.get("/login",accountCtrl.getloginPage);
//注册页面获取
accountRounter.get("/register",accountCtrl.getregisterPage);

//注册功能
accountRounter.post("/register",accountCtrl.register);

//获取验证码的功能
accountRounter.get("/vcode",accountCtrl.fetchvcode);

//登录功能
accountRounter.post("/login",accountCtrl.login);



//导出路由对象 
module.exports = accountRounter;
