$(function(){
	
	function show(hlthcon,data){
		for(var row in data){
			hlthcon.append("<li>"+
				  "<a href="+data.content1-link +">"+data.content1-con+"</a> "+
				  "<img src='images/new.png' alt=''/>"+
				  "<span>" +data.content1-date+"</span>"+
				"</li>"+);
		}
		hlthcon.append("");
		return hlthcon;
	}
	
	
	$.ajax({
		"async":"false"
		"dataType":"json",//服务器返回json格式数据
		"type":"get",//HTTP请求类型
		
		"success":function(data){
			$(".hlthcom").append("<div class='ylzx1'>"
			    "<p class='ylzx1-1'><span>健康常识</span> <a href="+data.more-link+">查看更多></a></p>"+
			    "<div class='ylzx1-2'><img src="+data.img-link+ "alt=''/>"+
			        "<div class='ylzx1-3'>"+
			            "<a href="+data.content-link+">"+
			                "<h4>"+conten-topic+"</h4>"+
			                "<p>"+data.content-introduce+"</p>"+
			            "</a>"+
			        "</div>"+
			    "</div>"+
			    "<div class='ylzx2'>"+
			        "<ul>"+show(hlthcon,data)+
			              
			        "</ul>"
			    "</div>"
			"</div>")
		},
		"error":function(xhr,type,errorThrown){
			
		}
	});
	
})