const path = require("path");
//导入数据处理工具
const dataBaseTool = require(path.join(__dirname,"../tools/databasetool.js"));

/**
 * 最终处理: 获取登录页面
 * @param {*} req 
 * @param {*} res 
 */
exports.getLoginPage=(req,res)=>{
    //向浏览器响应登录页面
    res.sendfile(path.join(__dirname,"../statics/views/login.html"))
}
/**
 * 最终处理: 获取注册页面
 * @param {*} req 
 * @param {*} res 
 */
exports.getRegisterPage=(req,res)=>{
    res.sendfile(path.join(__dirname,"../statics/views/register.html"))
}

exports.register=(req,res)=>{
    //获取表单数据--post,判断是否重名,不重名,就注册
    const result = {status:0,message:"注册成功"};
    console.log(req.body);
    //调用数据查询的工具
    dataBaseTool.findOne("accountInfo",{username:req.body["username"]},(err,doc)=>{
        if(doc){
            //若有结果,就是重名
            result.status=1;
            result.message="用户名已用";
            res.json(result);
        }else{
            //没有结果,那就注册
            dataBaseTool.insertOne("accountInfo",req.body,(err,result2)=>{
                if(result2==null){
                    //表明注册失败
                    result.status=2;
                    result.message = "注册失败";
                }
                res.json(result);
            })
        }
    })

}