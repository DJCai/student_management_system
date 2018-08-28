const path = require("path");

//处理最后的环节
//获取登录页面
exports.getloginPage = (req,res)=>{
    res.sendFile(path.join(__dirname,"../statics/views/login.html"));
}
//获取注册页面
exports.getregisterPage= (req,res)=>{
    res.sendFile(path.join(__dirname,"../statics/views/register.html"));
}