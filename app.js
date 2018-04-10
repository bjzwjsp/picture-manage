var express=require("express");
var app=express();
//控制器
var router=require("./controller/router.js")
//设置模板引擎
app.set("view engine","ejs");
//路由中间件
app.use(express.static("./public"));//静态文件
app.use(express.static("./upload"))//静态文件
//首页
app.get("/",router.showIndex);
app.get("/up",router.showUp);
app.post("/up",router.dopost)
app.get("/:albumName",router.showAlbum);
app.use(function(req,res){
    res.render("err")
})
app.listen(5000,"127.0.0.1")