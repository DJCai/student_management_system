//导入模板
const express = require("express");
const path = require("path");


//创建路由应用
const accountRount = express.Router();

//导入控制器
const accountCtrl = require(path.join(__dirname,"../controllers/accountController"));

//处理具体请求

//获取注册页面
accountRount.get("/register",accountCtrl.getRegisterPage);
//注册功能
accountRount.post("/register",accountCtrl.register);

//获取登录页面
accountRount.get("/login",accountCtrl.getLoginPage);
//获取验证码
accountRount.get("/vcode",accountCtrl.getVcode);

//登录功能
accountRount.post("/login",accountCtrl.login);

//登出功能
accountRount.get("/logout",accountCtrl.logout);
//导出路由
module.exports= accountRount;