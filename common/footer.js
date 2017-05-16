//在jquery的条件下引用  和footer.html
//		<!--footer的js开始-->

			$.ajax({
				url:"../footer.html",
				type:"get",
				success:function(data){
//					console.log(data)
					$(".footer").append(data);
				}
			})
			
			
			
			
			var i=1;
			var timer=setInterval(foot,3000)// ----
			function foot(){
				$("#friendly"+i).show().siblings().hide()
				i++;
				if(i>3){
					i=1;
				}
			}
			$("#friendly").hover(function(){
				clearInterval(timer);
			},function(){
				timer=setInterval(foot,1000)
			})
		
//		<!--footer的js结束-->