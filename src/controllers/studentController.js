
const path = require("path");
//导入数据处理工具
const dataBaseTool = require(path.join(__dirname,"../tools/databasetool.js"));
//导入xtpl模板
const xtpl = require('xtpl');

/**
 * 最后处理 获取的学生列表信息,包括搜索功能
 * 
 */
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

/**
 * 最后处理 获取新增页面
 */
exports.getAddPage = (req,res)=>{
    // res.send("你好,未来");
    const tplpath=path.join(__dirname,"../statics/views/add.html");
    xtpl.renderFile(tplpath,{
        // students:docs
        // keyword       
    },function(error,content){ 
        //响应数据到模板中
        res.send(content);
    });
}

/**
 * 新增功能
 */
exports.addstudent=(req,res)=>{
    //使用数据插入的功能
    dataBaseTool.insertOne("studentInfo",req.body,(err,result)=>{
        if(result==null){
            res.send(`<script>alert("信息添加失败,请再次尝试")</script>`)
        }else{
            res.send(`<script>alert("添加成功");window.location.href="/studentManagement/list"</script>`);
        }
    })
}

/**
 * 获取编辑页面
 */
exports.getEditPage=(req,res)=>{
    //使用params传参
    const studentId = dataBaseTool.ObjectID(req.params.studentId)
    //获取数据
    
    dataBaseTool.findOne("studentInfo",{_id:studentId},(err,doc)=>{
        //获取数据,通过模板渲染到页面中
        const tplpath=path.join(__dirname,"../statics/views/edit.html");
        xtpl.renderFile(tplpath,doc,function(error,content){ 
        //响应数据到模板中
            res.send(content);
        });
    })
    
}

/**
 * 修改数据
 */
exports.editstudent=(req,res)=>{
    const studentId = dataBaseTool.ObjectID(req.params.studentId);
    // console.log(studentId);
    //进行修改
    dataBaseTool.updateOne("studentInfo",{_id:studentId},req.body,(err,result)=>{
        if(result==null){
            res.send(`<script>alert("信息修改失败,请再次尝试")</script>`)
        }else{
            res.send(`<script>alert("修改成功");window.location.href="/studentManagement/list"</script>`);
        }
    })
}

/**
 * 删除数据
 */
exports.deletestudent=(req,res)=>{
    const studentId = dataBaseTool.ObjectID(req.params.studentId);
    dataBaseTool.deleteOne("studentInfo",{_id:studentId},(err,result)=>{
        if(result==null){
            res.send(`<script>alert("信息删除失败,请再次尝试")</script>`)
        }else{
            res.send(`<script>alert("删除成功");window.location.href="/studentManagement/list"</script>`);
        }
    })
}
