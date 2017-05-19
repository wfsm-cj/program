$.ajax({
	type:"get",
	url:"../common/header.html",
	async:true,
	success:function(data){
		$(".header").html(data);
		
		
		$(".nav .history").hover(function(){
				$(".nav .history .triangle").css({
					transform: "rotate(180deg)",
					transition: "all 0.5s"
				})
			},function(){
				$(".nav .history .triangle").css({
					transform: "rotate(0deg)",
					transition: "all 0.5s"
				})
			})
			
			
			$("#station").parent("li").hover(function(){
				$("#station .triangle").css({
					transform: "rotate(180deg)",
					transition: "all 0.5s"
				})
				$(this).css("background","#fff").children(".station-box").css("display","block").end()
				.children("a").css("color","#000");
				
				
			},function(){
				$("#station .triangle").css({
					transform: "rotate(0deg)",
					transition: "all 0.5s"
				})
				$(this).css("background","#666").children(".station-box").css("display","none").end()
				.children("a").css("color","#fff");
			})
			
//			$.cookie.json=true;
//			$.cookie("emailTel","hello",{expires:7,path:'/'})
//		console.log("aaa")
			var user=$.cookie("emailTel")
			console.log(user)
			if(user!==undefined){
				console.log("1")
				$("#user").text("欢迎"+user)
			}else{
				$("#user").text("hi，请登录")
			}
//			console.log(user);
			
//			$("#user")
			
			
		
	}
});


//导航的js
//		console.log($(".nav .history"))
window.onload=function(){//等页面加载完  异步请求不能获取
	

	

}
//导航的js