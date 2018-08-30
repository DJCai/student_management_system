
const path = require("path");
//导入数据处理工具
const dataBaseTool = require(path.join(__dirname,"../tools/databasetool.js"));
//导入xtpl模板
const xtpl = require('xtpl');

exports.getListPage=(req,res)=>{
    const keyword = req.query.keyword||"";
    //查询列表数据
    dataBaseTool.findList("studentInfo",{name:{$regex:keyword}},(err,docs)=>{
        //art-template方法
        // console.log(docs);
        // const artpath = path.join(__dirname,"../statics/views/list.art");
        // res.render(artpath, {
        //    students:docs,
        //    keyword
        // });
        
        // xtpl方法
       const tplpath=path.join(__dirname,"../statics/views/list1.html");
        xtpl.renderFile(tplpath,{
            students:docs
            // keyword       
        },function(error,content){ 
            //响应数据到模板中
            res.send(content);
        });
    })
}