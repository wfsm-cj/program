$(function(){
	var _emailTel=document.getElementById("emailTel");
	var _password=document.getElementById("password");
	var _picCode=document.getElementById("picCode");
	var _code=document.getElementById("code");
	var send=document.getElementById("send");
	
	//判断邮箱用户名是否正确
	_emailTel.onblur=function(){
		verify(_emailTel,{
			regEmail:"/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_]+([.][a-zA-Z]+){1,2}$/",
			regTel:"/^1[34578][0-9][0-9]{8}$/"
		},"@必须输入登录的邮箱地址或手机","输入邮箱或手机格式错误");
	}
	
	
	
	
	//	给picCode设置验证码	
	_picCode.value=code(5)
//	点击picCode更换验证码
	_picCode.onclick=function(){
		this.value=code(5);
	}
	
	//验证码是否输入正确
	_code.onblur=function(){
		isTrue(this,_picCode.value);
	}
	
	//点击显示下面验证码
	send.onclick=sendCode;//定时器异步
	function sendCode(){
		var ele="你还有<b id='time'>10</b>秒钟";
		$(".time").empty().append(ele);
		var second=10;
		this.nextElementSibling.innerHTML=code(5);
		$(".time").fadeIn(1000);
		var timer=setInterval(function(){
//			console.log(this,second)
			second--;
			if(second<0){
				clearInterval(timer);
			}
			$("#time").text(second);
			if(second===-1){
				$(".time").html("重新获取验证码");
			}
		},1000)
	}
	
	$("#emailCode").blur(function(){
			isTrue2($("#emailCode")[0],$(".code2").text())
	})
	
	//username
	
	var username=document.getElementById("username");
	username.onblur=function(){
		verify(username,{
				regName:/[a-zA-Z@0-9]{2,}/
			},"@必须输入用户名","请输入正确格式用户名");
	}
	
	//密码必须大于6位
	_password.onblur=function(){
		verify(_password,{
			regPsd:"/[a-zA-Z0-9]{6,}/"
		},"@必须输入密码","密码长度必须大于6位")
	}
	
	
})

function isTrue2(element,picCode){
	var code=element.value;
	console.log(code,picCode)
	if(code===""){
		if($(".code2").next()[0].style.display==="none"){
			element.nextElementSibling.nextElementSibling.innerHTML="请获取验证码";
			return;
		}
	}
//	console.log(code.toLowerCase())
	if(code.toLowerCase()===picCode.toLowerCase()){
		element.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML="";
		element.nextElementSibling.nextElementSibling.style.display="none";
		return;
	}else{
		element.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML="验证码输入错误";
	}
}