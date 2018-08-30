const path = require("path");
/**
 * 最终处理: 获取登录页面
 * @param {*} req 
 * @param {*} res 
 */
exports.getLoginPage=(req,res)=>{
    //向浏览器响应登录页面
    res.sendfile(path.join(__dirname,"../statics/views/login.html"))
}

exports.getRegisterPage=(req,res)=>{
    res.sendfile(path.join(__dirname,"../statics/views/register.html"))
}