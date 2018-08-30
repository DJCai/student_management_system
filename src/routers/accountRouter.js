//导入模板
const express = require("express");
const path = require("path");


//创建路由应用
const accountRount = express.Router();

//导入控制器
const accountCtrl = require(path.join(__dirname,"../controllers/accountController"));

//处理具体请求
//获取登录页面
accountRount.get("/login",accountCtrl.getLoginPage);

//获取注册页面
accountRount.get("/register",accountCtrl.getRegisterPage);



//导出路由
module.exports= accountRount;