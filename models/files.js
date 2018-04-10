//文件操作
var fs=require("fs")
exports.getAlbum=function(callback){
    fs.readdir("./upload",function(err,files){
        if(err){
            callback("出错了",null);
            return;
        }
        var allAlbum=[];
        //console.log(files);
        (function iterator(i){
            if(i==files.length){
                //return allAlbum;
                callback(null,allAlbum);
                return;
            }
            fs.stat("./upload/"+files[i],function (err2, stats) {
                if(err){
                    callback("出错了",null);
                    return;
                }
                if(stats.isDirectory()){
                    allAlbum.push(files[i])
                }
                iterator(i+1);
            })
        })(0);
    })
}
//通过文件夹名得到所有图片
exports.getImagesByName=function(albumName,callback){
    fs.readdir("./upload/"+albumName,function (err,files) {
        if(err){
            callback("出错了",null);
            return;
        }
        var allImages=[];
        console.log(files);
        (function iterator(i){
            if(i==files.length){
                //return allAlbum;
                callback(null,allImages);
                return;
            }
            fs.stat("./upload/"+albumName+"/"+files[i],function (err2, stats) {
                if(err){
                    callback("出错了",null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i])
                }
                iterator(i+1);
            })
        })(0);
    })
}