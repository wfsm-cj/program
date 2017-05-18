$(document).ready(function(){
	
})


//让mask显示
			$(".banner").hover(function(){
				if($("#banner").css("display")==="inline-block"){
					$("#style .mask").css("display","block");
					$("#banner").stop().animate({
						width:1170,
						height:520,
						marginTop:-10,
						marginLeft:-10
					},1000)
				}
			},function(){
				if($("#banner").css("display")==="inline-block"){
					$("#style .mask").css("display","none");
					$("#banner").stop().animate({//不能清空队列   --  
						width:1150,
						height:500,
						marginTop:0,
						marginLeft:0
					},1000)
				}
			});
			
			
			//模板加载
			var data={
					imgUrl:["img/style300_300_1.jpg","img/style300_300_2.jpg","img/style300_300_3.jpg","img/style300_300_4.jpg","img/style300_300_5.jpg","img/style300_300_6.jpg"],
					info:["我们的风格很经典!很多年以后看还是如此","【大理】花落桥","红紫","校园小清新","【客片】李先生&黄小姐","prada女王"],
					title:["成都金夫人婚纱摄影","成都爱拍全图旅拍","成都摩卡视觉摄影工作室","成都西凡视觉婚纱摄影工作","成都丽群婚纱摄影","成都亚果国际摄影"]
				}
				
				var html=template("styleTemplate",data)
//				console.log(html)
//				console.log($(".right")[0])
				$(".right").html(html);//模板添加到right
				
				
				
			//   点击让banner退出
			$(".maskbox").on("click",function(){
//				$(".mask").hide();
				$(".maskbox").hide(1000,function(){//banner隐藏后显示left right
					$("#style .left").show(2000);
					$("#style .right").show(2000)
				});
			})
			
			//.style-box 效果hover
			$(".style-box").hover(function(){
				var index=$(this).index();
//				console.log(index)
				$(".bottom").eq(index).stop().animate({"bottom":0},500);
			},function(){
				 index=$(this).index();
				$(".bottom").eq(index).stop().animate({"bottom":-22},500);
			})
			
			
			
			//cheap 模板
			var cheapData={
				tip:["【亚太旗舰店】","1个外景不够大，8大外景任选任拍","格拉视觉【全客片展示】","「婚博爆款」服装不限套数","「特色」双外景+双场馆畅拍","《FOREVER》by LUCE"],
				price:["1000","2000","3000","4000","5000","6000"],
				highPrice:["1000","2000","30000","40000","50000","60000"],
				info:["任意拍，服装不限套数","【普罗旺斯】初夏稀缺档期 预定立减100...","订单送8000元结婚大礼包","《FOREVER》by LUCE"],
				imgUrl:["img/cheap600_400_1.jpg","img/cheap600_400_2.jpg","img/cheap600_400_3.jpg","img/cheap600_400_4.jpg","img/cheap600_400_5.jpg","img/cheap600_400_6.jpg"]
			}
			
			var cheapHtml=template("cheapTemplate",cheapData)
//			console.log(cheapHtml)
			$("#cheap").html(cheapHtml)
			

			//cheap轮播
			var $cheap=$("#cheap .cheap-box");
//			console.log($cheap)
			
			$cheap.clone(true).appendTo($("#cheap"))//复制一份
			var imgWidth=$cheap.outerWidth(true);//包括margin
//			console.log($cheap)
			
			var len=$cheap.length;//之前的length为6
			console.log(imgWidth,len)
			
			var cheapWidth=imgWidth*len*2;
			$("#cheap").width(cheapWidth);//设置大盒子#cheap的宽度
			
			var index=0;
			var direction=1;//1表示向右 
			var isRunning=false;//是否人为滑动
			
			$(".big-container #prev").on("click",function(){
				direction=-1;
				
//				index--;
				move();
				isRunning=true;
			})
			$(".big-container #next").on("click",function(){
				direction=1;
				move()
				isRunning=true
			})
			
			
			if(direction===-1){
				$("#cheap").css("left",-cheapWidth/2);
				index=len/3;
			}
			
			setInterval(move,5000)
			function move(){
				if(isRunning){
					console.log("aaa")
					return;
				}
				if(direction===1){
					index++;
					var _left=-1*imgWidth*index*3;
//					console.log(index)
					$("#cheap").stop().animate({"left":_left},1000,function(){
//						console.log(index,len/3)  异步的 index不能放后面
						if(index>len/3){
							$("#cheap").css("left",0)
							index=0;
						}
						isRunning=false;
					});
				}
				
				if(direction===-1){
					index--;
					var _left=-1*imgWidth*index*3;
					if(index<0){
						_left=-1*cheapWidth/2;
						$("#cheap").css("left",_left)
						index=len/3;
					}
					
					console.log(index)
					$("#cheap").stop().animate({"left":_left},1000,function(){
						if(index<0){
							$("#cheap").css("left",-cheapWidth/2)
							index=len/3;
						}
						isRunning=false;
					});
				}
			}



