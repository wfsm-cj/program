$(document).ready(function(){
	
	var _emailTel=document.getElementById("emailTel");
	var _password=document.getElementById("password");
	var _picCode=document.getElementById("picCode");
	var _code=document.getElementById("code");
	//判断邮箱用户名是否正确
	_emailTel.onblur=function(){
		verify(_emailTel,{
			regEmail:"/^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_]+([.][a-zA-Z]+){1,2}$/",
			regTel:"/^1[34578][0-9][0-9]{8}$/"
		},"@必须输入登录的邮箱地址或手机","输入邮箱或手机格式错误");
	}
	
	//密码长度的验证 
	_password.onblur=function(){
		verify(_password,{
			regPsd:"/[a-zA-Z0-9]{6,}/"
		},"@必须输入密码","密码长度必须大于6位")
	}
		
//	给picCode设置验证码	
	_picCode.value=code(5)
//	点击picCode更换验证码
	_picCode.onclick=function(){
		this.value=code(5);
	}
	
//	_picCode.onselectstart=function(){
//		return false;
//	}对input textarea无效
	
	//验证码是否输入正确
	_code.onblur=function(){
		isTrue(this,_picCode.value);
	}
	
	
	
});


