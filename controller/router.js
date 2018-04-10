var files=require("../models/files.js");
var formidable=require("formidable");
var path=require("path");
var fs=require("fs");
var sd=require("silly-datetime")
//首页
exports.showIndex=function(req,res){
    // res.render("index",{"album":files.getAlbum()});//{"album":["美女","风景","跑车"]}
    files.getAlbum(function(err,allAlbum){
        if(err){
            res.render("err");
            return;
        }
        res.render("index",{"album":allAlbum})
    })
}
//相册页
exports.showAlbum=function(req,res){
//遍历文件夹中的相册图片
    var albumName=req.params["albumName"];
    files.getImagesByName(albumName,function(err,imagesArray){
        if(err){
            res.render("err");
            return;
        }
        res.render("album",{"albumname":albumName,"images":imagesArray})
    })
}
//上传页
exports.showUp=function(req,res){
  files.getAlbum(function(err,album){
      res.render("up",{"album":album})
  })
}

//上传图片
exports.dopost=function(req,res){
    var form=new formidable.IncomingForm();
    form.uploadDir=path.normalize(__dirname+"/../tempup/")//改变上传的默认地址
    form.parse(req,function(err,fields,files,next){
        console.log(fields);
        console.log(files);
        //改名
        if(err){
            next();//该中间键不再受理请求，继续往下找
              return;
        }
        //判断图片大小；
        var size=parseInt(files.tupian.size);
        if(size>40000){
            res.send("图片太大，无法上传！");
            fs.unlink(files.tupian.path,function(err){

            });
            return;
        }
        var date=sd.format(new Date(),"YYYYMMDDHHmmss");
        var random=parseInt(Math.random()*89999+10000);
        var extname=path.extname(files.tupian.name);
        var wenjianjia=fields.wenjianjia;
        var oldpath=files.tupian.path;
        var newpath=path.normalize(__dirname+"/../upload/"+fields.wenjianjia+"/"+date+random+extname);
            fs.rename(oldpath,newpath,function(err){
                if(err){
                    res.send("改名失败");
                    return;
                }
                res.send("成功")
            })

    })
}
