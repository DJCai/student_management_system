//导入文件
const express = require("express");
const path = require("path");

//创建路由对象
const managementRouter = express.Router();

//导入控制器
const managementCtrl = path.join(__dirname,"../controllers/managementController.js");

//处理具体请求
//获取学生管理系统的页面
// managementRouter.get("/list",managementCtrl.getStudentListPage);
managementRouter.get("/list",(req,res)=>{
    // res.send(managementCtrl.getStudentListPage);
    res.send("这是学生列表页面,待完善...")
})
// managementRouter.get('/list',managementCtrl.getStudentListPage);

//导出
module.exports= managementRouter;