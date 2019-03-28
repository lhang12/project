
$(function(){
    $('#wrap img').each(function(i) {
        //遍历 $('#wrap img')----改变他们的css样式
        $(this).css('transform', 'rotateY('+ i*Deg +'deg) translateZ(350px)').attr('ondragstart','return false');
    　　//旋转以及禁止拖拽复制
    });
})
$(function(){
 　　var imgL = $('#wrap img').length;
    //获取当前的img 长度
    var Deg = 360 / imgL; 
    //  360/imgL   和角度有关系
    var roY = 0,roX = -10,xN,yN; 
    $(document).mousedown(function(ev){
    　　//绑定事件  鼠标按下时触发的时间
       var x_ = ev.clientX;
       //获取当前鼠标相对于浏览器页面（或客户区）的  x  方向的位置 保存在变量 x_
       var y_ = ev.clientY;
       //………………y方向的位置  保存在变量y_
       $(this).bind('mousemove',function(ev){
       　　//给当前元素 （这里的当前元素是document ）绑定 mousemove（鼠标在当前元素内移动的事件）
      　　 var x = ev.clientX;
       　　//获取当前鼠标相对于浏览器页面（或客户区）的  x  方向的位置    保存在变量 x
       　　var y = ev.clientY;
       　　//………………y方向的位置   保存在变量y
       　　xN = x - x_;  
       　　//计算鼠标在当前元素内 相对 上次鼠标按下时的 x轴距离  并保存在变量
       　　yN = y - y_;
       　　//计算鼠标在当前元素内 相对 上次鼠标按下时的 y轴距离  并保存在变量
          roY += xN*0.2;
          //按照比例换算  并在变量基础上增加（围绕Y轴旋转的角度，之所以乘0.2是为了不让自己的鼠标动作太敏感，可以改变数值试一下，理解个中含义）
          roX +=yN*0.07; 
          //按照比例换算  并在变量基础上增加（围绕x轴旋转的角度，意义同上）
          $('#wrap').css('transform','perspective(800px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'); 
          //$('#wrap')  改变css动画transform样式  值为…………角度是变量roY,roX的
          x_ = ev.clientX; 
          //并将鼠标按下的位置设置成当前移动到的位置
          y_ = ev.clientY; 
          //并将鼠标按下的位置设置成当前移动到的位置
     });
  }).mouseup(function(){  
     //绑定事件  鼠标松开时触发的时间
     $(this).unbind('mousemove');
     //  移除 当前元素（这里的当前元素是document ）的 mousemove（鼠标在当前元素内移动的事件）
  });
});
$(function(){
            var imgL = $('#wrap img').size();
            //获取当前的img 长度
            console.log($('#wrap img').size());
            var Deg = 360 / imgL; 
            //  360/imgL   和角度有关系
            var roY = 0,roX = -10,xN,yN,play=null; 
            //挨个赋值

            $('#wrap img').each(function(i) {
            //遍历 $('#wrap img')----改变他们的css样式
                $(this).css('transform', 'rotateY('+ i*Deg +'deg) translateZ(350px)')
                .attr('ondragstart','return false');
                //旋转以及禁止拖拽复制
            });

           $(document).mousedown(function(ev){
            //绑定事件  鼠标按下时触发的时间
                clearInterval( play );
                //关闭计时器(play)
                var x_ = ev.clientX;
                //获取当前鼠标相对于浏览器页面（或客户区）的  x  方向的位置 保存在变量 x_
                var y_ = ev.clientY;
                //………………y方向的位置  保存在变量y_

                $(this).bind('mousemove',function(ev){
                //给当前元素 （这里的当前元素是document ）绑定 mousemove（鼠标在当前元素内移动的事件）
                    var x = ev.clientX;
                    //获取当前鼠标相对于浏览器页面（或客户区）的  x  方向的位置    保存在变量 x
                    var y = ev.clientY;
                    //………………y方向的位置   保存在变量y

                    xN = x - x_;  
                    //计算鼠标在当前元素内 相对 上次鼠标按下时的 x轴距离  并保存在变量
                    yN = y - y_;
                    //计算鼠标在当前元素内 相对 上次鼠标按下时的 y轴距离  并保存在变量

                    roY += xN*0.2;
                    //按照比例换算  并在变量基础上增加
                    roX +=yN*0.07; 
                    //按照比例换算  并在变量基础上增加

                    $('#wrap').css('transform','perspective(800px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'); 
                    //$('#wrap')  改变css动画transform样式  值为…………角度是变量roY,roX的

                    x_ = ev.clientX; 
                    //并将鼠标按下的位置设置成当前移动到的位置
                    y_ = ev.clientY; 
                    //并将鼠标按下的位置设置成当前移动到的位置
                });
            }).mouseup(function(){  
            //绑定事件  鼠标松开时触发的时间
                $(this).unbind('mousemove');
                //  移除 当前元素（这里的当前元素是document ）的 mousemove（鼠标在当前元素内移动的事件）
               play = setInterval(function(){
                //开始周期性计时器
                    xN = xN * 0.95;
                    //按照比例换算 
                    yN = yN * 0.95;
                    //按照比例换算 
                    if ( Math.abs(xN) <= 0.5 && Math.abs(yN)<= 0.5 )
                    //判断  (xN的绝对值<=0.5)而且 yN的绝对值也要<= 0.5)的时候就执行下面的语句
                    {
                        clearInterval( play );
                        //关闭计时器(play)
                    }
                    roY += xN*0.2; 
                    //按照比例换算  并在变量基础上增加
                    roX +=yN*0.07;
                    //按照比例换算  并在变量基础上增加
                    $('#wrap').css('transform','perspective(800px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)');
                    //$('#wrap')  改变css动画transform样式  值为…………角度是变量roY,roX的
                },30);
                //计时器每30毫秒触发一次
            });
        });