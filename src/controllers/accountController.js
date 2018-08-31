const path = require("path");
//导入数据处理工具
const dataBaseTool = require(path.join(__dirname,"../tools/databasetool.js"));
//导入获取验证码的模块
const captchapng =require("captchapng");

/**
 * 最终处理: 获取注册页面
 * @param {*} req 
 * @param {*} res 
 */
exports.getRegisterPage=(req,res)=>{
    res.sendfile(path.join(__dirname,"../statics/views/register.html"))
}

/**
 * 最终处理: 注册功能
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * 最终处理: 获取登录页面
 * @param {*} req 
 * @param {*} res 
 */
exports.getLoginPage=(req,res)=>{
    //向浏览器响应登录页面
    res.sendfile(path.join(__dirname,"../statics/views/login.html"))
};

/**
 * 获取验证码
 * @param {*} req 
 * @param {*} res 
 */
exports.getVcode=(req,res)=>{
    //获取验证码
    const vcode = parseInt(Math.random() * 9000 + 1000);
    //验证码存到session中
    req.session.vcode=vcode;
    //生成验证码
    const p = new captchapng(80, 30,vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    const img = p.getBase64();
    const imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
/**
 * 登录功能
 * @param {*} req 
 * @param {*} res 
 */
exports.login=(req,res)=>{
    const result = {status:0,message:"登录成功"}
    //获取数据,先判断验证码是否一样,若一样,查询用户名与密码是否有结果,有就跳到列表页
    if(req.body.vcode != req.session.vcode){
        result.status = 1;
        result.message = "验证码输入错误";
        res.json(result);
        return;
    }
    //判断用户名与密码是否正确
    dataBaseTool.findOne("accountInfo",{username:req.body.username,password:req.body.password},(err,doc)=>{
        if(doc==null){
            //表明登录错误
            result.status = 2;
            result.message = "用户名或密码错误";
        }else{
            req.session.username =req.body.username;
        }
        res.json(result);
    })
}

exports.logout=(req,res)=>{
    //将session的值消除
    req.session.username=null;
    //跳转到登录界面
    res.send(`<script>window.location.href="/account/login" </>script`)
}   