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
//获取新增页面
managementRount.get("/add",managementCtrl.getAddPage);

//新增功能
managementRount.post("/add",managementCtrl.addstudent);

//获取修改页面
managementRount.get("/edit/:studentId",managementCtrl.getEditPage);

//修改后的保存功能
managementRount.post("/edit/:studentId",managementCtrl.editstudent);

//删除某条数据
managementRount.get("/delete/:studentId",managementCtrl.deletestudent);

//导出路由
module.exports= managementRount;