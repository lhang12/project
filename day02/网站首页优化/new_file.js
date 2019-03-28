			var provice =[["深圳市","东莞市","广州市"],["武汉市","长沙市","湘潭市"],["泉州市","厦门市","潭州市"]];
			function selectProvice(){
				var select1 = document.getElementById("select");
				select1.options.length = 0;
				var provice1 = document.getElementById("provice");
				// alert(provice[provice1.value][0])
 				for (var i=0;i<provice[provice1.value].length;i++){
 					// alert(i);
  					element = document.createElement("option");
  					text = document.createTextNode(provice[provice1.value][i]);
  					
  					element.appendChild(text);
  					select1.appendChild(element);
 				}
			}