//导入文件

const express = require("express");
const path = require("path");

//创建路由对象
const accountRounter = express.Router();

//导入控制器
const accountCtrl = require(path.join(__dirname,"../controllers/accountController.js"))

//处理具体申请
//登录页面
accountRounter.get("/login",accountCtrl.getloginPage);
//注册页面
accountRounter.get("/register",accountCtrl.getregisterPage);

//导出路由对象 
module.exports = accountRounter;
