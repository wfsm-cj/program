$(document).ready(function(){
	
//	header开始
	$("ul").delegate("a","mouseenter",function(){
		$(this).addClass("current").parent().siblings().children("a").removeClass("current")
		.next().css({display:"none"});//
	}).delegate("a","mouseleave",function(){
		$(this).removeClass("current");
	})
	
	$(".select").on("mouseenter",function(){
		$(this).next().css({display:"block"}).on("mouseleave",function(){
//			console.log(this)
			$(this).css({display:"none"})
		})
		

	})
//header结束
	
	
	//全屏轮播
	fullScreen();
	
	
	
	
	
	
	
})
	//全屏轮播
	function fullScreen(){
		var $img=$("#fullScreen ul li");//包含图片的li
		var imgWidth=$img.outerWidth();
		var len=$img.length;
		var currentIndex=1;
		var nextIndex=2;
		var $ul=$("#fullScreen ul");
		var isRunning=false;//是否是人为触发
		var timer=null;
		
		//克隆最后一张和第一张
		$img.eq(0).clone(true).appendTo($("#fullScreen ul"));
		//eq()里面跟索引   last() first()
		$img.last().clone(true).prependTo($("#fullScreen ul"))
		
		len=len+2;
		//设置ul的宽度
		$ul.width(len*imgWidth);
		$ul.css({
			left:-currentIndex*imgWidth
		});
		
		
		//添加小圆点
		var html=""
		for(var i=0;i<len-2;i++){
			html+="<i><span></span></i>";
		}
		$("#circle").append(html);
		
//		$("#circle").width((len-3)*30);//设置小圆点盒子的宽度
		var circleWidth=$("#circle").width();
		$("#circle").css({marginLeft:-circleWidth/2})
		//设置默认小圆点
		$("#circle i span").eq(currentIndex-1).addClass("current");
		
		
		//小圆点移入切换图片
		$("#circle").delegate("i","mouseenter",function(){
			//0 开始
			nextIndex=$(this).index()+1;
			move();
			isRunning=true;
		})
		
		//两侧箭头点击
		$("#prev").on("click",function(){
			nextIndex=currentIndex-1;
			move()
			isRunning=true;
		})
		$("#next").on("click",function(){
			move()
			isRunning=true;
		})
		
		//设置不能选择文本
		$("#prev,#next").on("selectstart",function(){
			return false;
		})
		
		//设置定时器
//		var timer=setInterval(move,2000);
		
		$("#fullScreen").hover(function(){
			clearInterval(timer);
		},function(){
			timer=setInterval(move,3000)
		})
		.trigger("mouseleave")//设置trigger  触发被选元素的指定事件类型
		
		function move(){//还可以在animate后面的function换条件
			if(isRunning){//是人为
				return;
			}
			var _left=-nextIndex*imgWidth;
			$ul.stop().animate({left:_left},1000,function(){//清空前面动画队列+
				isRunning=false;
			});
			
			
			
			currentIndex=nextIndex;
			nextIndex++;
			
			var circleIndex=currentIndex-1;
			if(circleIndex<0){
				circleIndex=len-3;
			}
			if(circleIndex>len-3){
				circleIndex=0
			}
			$("#circle i span").eq(circleIndex).addClass("current").parent().siblings().children("span")
			.removeClass("current")
//			图片的序号  0 1 ...len-1
			if(nextIndex>len-1){
				currentIndex=1;
				nextIndex=currentIndex+1;
//				console.log(currentIndex)
				$ul.animate({left:-currentIndex*imgWidth},0);//单线程 会先执行下面内容 animate
			}
			if(nextIndex<=1){//在这之前有个nextIndex++  
				nextIndex=len-3;
				currentIndex=len-2;
				$ul.animate({left:-currentIndex*imgWidth},0)
			}
		}
	}
	
	

//第三部分js
$("#container-3 #container-3-prev").on("click",function(){
				var _left=-1*$("#container-3 .pic3-left").outerWidth();
//				console.log(_left);
				$("#container-3 .pic3-left").animate({
					left:_left
				},2000)
			})

$("#container-3 #container-3-next").on("click",function(){
				var _left=0;
//				console.log(_left);
				$("#container-3 .pic3-left").animate({
					left:_left
				},2000)
			})




//第四部分
	var $img4=$(".container-4-right li");
//	console.log($img4)
	var img4Width=$(".container-4-right li").outerWidth(true);
	var len4=$img4.length;
	var $ul4=$(".container-4-right ul");
	$ul4.width(img4Width*len4)
	var maxLen=(len4-1)*img4Width-$(".container-4-right-box").outerWidth();
	
	console.log(img4Width,len4,maxLen)
	var index4=0;//当前商品索引
	var next4=1;
	$("#container-4-next").on("click",function(){
		var _left=img4Width*next4*-1;
		
//		if(_left)
			console.log(_left,maxLen)
		if(Math.abs(_left)>=maxLen){
				console.log("Aa")
				$("#container-4-next").addClass("disabled").siblings().removeClass("disabled");
			}else{
				$ul4.animate({
					left:_left
				},1000,function(){
					index4=next4;
					next4++;
					if(index4>len4-4){
						index4=0;
						next4=0;
					}
				})
				$("#container-4-next").removeClass("disabled")
			}
	})
	
	$("#container-4-prev").on("click",function(){
		
		var _left=img4Width*next4*-1;
		
		if(Math.abs(_left)<=0){
			$("#container-4-prev").addClass("disabled").siblings().removeClass("disabled");
		}else{
			$ul4.animate({
				left:_left
			},1000,function(){
				next4--;
				if(next4<0){
					next4=0;
				}
			})
			$("#container-4-prev").removeClass("disabled");
			
		}
		
		
		if($ul4.css("left")<=0){
		$("#container-4-prev").addClass("disabled").siblings().removeClass("disabled");
		}
	})



	//左侧边栏
			$("#sidebar").delegate(".sbar","mouseenter",function(){
				$(this).stop().animate({width:200},500).children("span").show()
				.end().siblings().stop().animate({width:45},500).children("span").hide();
			})
			$("#sidebar").delegate(".sbar","mouseleave",function(){
				$(this).stop().animate({width:45},500).children("span").hide()
			})
			$("#totop").on("click",function(){
//				$(window).scrollTop(0);
//				$(window).animate({scrollTop:0},2000)//不是让window做动画是html或body
				$("html,body").stop().animate({scrollTop:0},2000);
			})
			



//		滚动函数

			//滚动函数
			
			var isScroll=true;
			var currIndex=0;
			var $circles=$("#navButtons ul li");
			$("#navButtons").delegate("li","click",function(){
				isScroll=false;
//				console.log(currIndex)
				var clickIndex=$(this).index();
				scrollHandler(currIndex,clickIndex);
				
			})
			$(window).on("scroll",function(){
				if(!isScroll){
					return;
				}
				var currHeight=$(window).scrollTop();
				currIndex=Math.floor(currHeight/($(window).height()-55));//翻过了多少层
				//小圆点index由0开始
				$circles.eq(currIndex).addClass("current").siblings().removeClass("current");
				
			})
			
			
//			function initPagesSize(){
//				nowWindowHeight=$(window).height();
//			}
			
			//要滚到的索引
			function scrollHandler(currIndex,clickIndex){
				$circles.eq(clickIndex).addClass("current").siblings().removeClass("current");
				var _top=clickIndex*$(window).height();
				$("html,body").animate({scrollTop:_top},2000,function(){
					isclick=true;
				})
				
			}