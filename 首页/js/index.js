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
				console.log(currentIndex)
				$ul.animate({left:-currentIndex*imgWidth},0);//单线程 会先执行下面内容 animate
			}
			if(nextIndex<=1){//在这之前有个nextIndex++  
				nextIndex=len-3;
				currentIndex=len-2;
				$ul.animate({left:-currentIndex*imgWidth},0)
			}
		}
	}
	
	
