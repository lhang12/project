Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.removeVal = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
/**
 三个参数
 file：一个是文件(类型是图片格式)，
 w：一个是文件压缩的后宽度，宽度越小，字节越小
 objDiv：一个是容器或者回调函数
 photoCompress()
 */
function photoCompress(file,w,objDiv){
    var reader=new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    reader.readAsDataURL(file);
    reader.onloadend=function(e){
        var re=this.result;
        canvasDataURL(re,w,objDiv);
    }
}
function canvasDataURL(path, obj, callback){
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 * 用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    var b = new Blob([u8arr], {type:mime});
    return b;
}

var uploadImg="";
$(function() {
    var files;
    var filearr = [];
    var allImgSize=0;
    var tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
        $gallery = $("#gallery"),
        $galleryImg = $("#galleryImg"),
        $uploaderInput = $("#uploaderInput"),
        $uploaderFiles = $("#uploaderFiles");
    
    //选好图片触发
    $uploaderInput.on("change", function(e) {
        var src, url = window.URL || window.webkitURL || window.mozURL;
        files = e.target.files; 
        if(files.length > 3){//一次最多上传3张图片
            alert("图片数量大于3张,请重新选择!");
            return;
        }
        if((filearr.length + files.length) <= 3){//判断所选的总图片数是否不大于3, 大于3张不能上传
            var curNum =$("#curNum");
            var vehLen=0;
            if(addReport_data.imgArr!=null){
                vehLen=addReport_data.imgArr.length;
            }
            for(var i = 0, len = files.length, end = len-1; i < len; i++) {
               
                var curI=i;
                var imgSize = files[i].size;
                if(imgSize>1024*1024*5){//大于5M给出提示
                    alert("上传的第"+(i+1)+"张图片超过了5M!");
                    continue;
                }else{
                    //压缩开始
                    var fileObj=files[i];
                   if(fileObj.size/1024 > 1025) { //大于1M，进行压缩上传
                        photoCompress(fileObj, {
                            quality: 0.1
                        }, function(base64Codes){
                            var bl = convertBase64UrlToBlob(base64Codes);
                            var form = new FormData(); 
                            form.append("file", bl,Date.parse(new Date())+".jpg");//将压缩后的图片编程文件对象
                            allImgSize+=bl.size;
                            if(bl.size/1024 < 1024){
                                filearr.push(form.get("file"));
                            }
                            if(curI==end){
                                curNum.text(vehLen+filearr.length);
                            }
                            form.delete("file");//删除存入的压缩后的文件对象, 保证每次压缩只有当前被压缩的对象
                        });
                    }else{ //小于等于1M 原图上传
                        filearr.push(files[i]);
                        allImgSize+=files[i].size;
                    }
                    //压缩结束
     
                    if(url) {
                        src = url.createObjectURL(fileObj);
                    } else {
                        src = e.target.result;
                    }
                    $uploaderFiles.append($(tmpl.replace('#url#', src)));
                }
            }
            curNum.text(vehLen+filearr.length);
            if(filearr.length == 3){//如果已经选择了3张图片,隐藏上传按钮
                $('.weui-uploader__input-box').css('display','none');
            }
         }else{
             alert("图片总数超过3张,请重新选择!");
             return;
         }
    });

    var index; //第几张图片
    var current = 0;//旋转多少度
    $uploaderFiles.on("click", "li", function() {
        index = $(this).index();
        $galleryImg.attr("style", this.getAttribute("style"));
        $gallery.fadeIn(100);
        current = 0;
    });

    $galleryImg.on("click", function() {
        $gallery.fadeOut(100);
    });
    
    //图片旋转
    $(".weui-gallery__opr2").click(function() {
        current += 90;
        $("#galleryImg").css('transform', 'rotate(' + current + 'deg)');
    });
    
    //删除图片
    $(".weui-gallery__del").click(function() {
        $("#upBox_add").find('input').val('');//每次删除图片后,置空input框
        //$uploaderInput.attr('type','text');//第二种方法,更改input的属性, 实现重复上传

        var num=index-addReport_data.imgNum;
        allImgSize-=filearr[num].size;
        filearr.splice(num, 1);//删除刚新增的图片,如果是新增的，原有图片（vehiclePicNum）为0
        $uploaderFiles.find("li").eq(index).remove();
        var vehLen=0;
        if(data.imgArr!=null){
            vehLen=data.imgArr.length;
        }
        $("#curNum").text(vehLen+filearr.length);
        if(filearr.length < 3){//判断删除后,上传图片是否不大于3, 不大于,显示上传按钮
            $('.weui-uploader__input-box').css('display','block');
        }
        $gallery.fadeOut(100);
       
    });

    uploadImg=function(upUrl) {
        if(filearr.length>0){
            if(filearr.length<=3){
                var imgList = new FormData($("#upBox_add")[0]);  //formData提交
                imgList.delete("file");
                for(var i =0;i<filearr.length;i++){
                    imgList.append("file", filearr[i]);
                }
                //上传所有的图片
                if(allImgSize<1024*1024*10){
                    add.methods.loadingOpen();//上传中
                    submitPicture(upUrl, imgList);
                }else{
                    alert("上传图片的总大小不能超过10M！");
                }

            }else{
                alert("最多只能上传3张照片！");
                return false;
            }
        }else{//如果没有选择图片
            add.methods.addToDB();
        }
    }
});


//上传(将文件流数组传到后台)
function submitPicture(url,data) {
   
    $.ajax({
        type: "post",
        url: url,
        async: true,
        data: data,
        //下面这两个要写成false，要不然上传不了。
        processData: false,
        contentType: false,
        success: function(response) {//我这里上传接口返回的是json字符串,所以转成了对象后通过for循环将图片url存到数组中,方便html循环展示
　　　　　　　　　response = JSON.parse(response);var reArray=response.data;
                for(var i=0;i<reArray.length;i++){
                    data.imgPathList[i] = reArray[i].src;
                }
                add.methods.loadingClose();//关闭上传提示
                add.methods.addToDB();//调用保存方法,添加到数据库
       },
        error: function(xhr) {
        }
    });

}