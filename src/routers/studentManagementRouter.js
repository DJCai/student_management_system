//导入模板
const express = require("express");
const path = require("path");


//创建路由应用
const managementRount = express.Router();

//导入控制器
const managementCtrl = require(path.join(__dirname,"../controllers/studentController.js"));

//处理具体请求

//获取注册页面
managementRount.get("/list",managementCtrl.getListPage);


//导出路由
module.exports= managementRount;