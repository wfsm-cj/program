//element节点   options正则参数
function verify(element,options,str1,str2){//浏览器缓存问题
//	console.log("element")
	var info=element.value;
	var flag=false;
//	console.log(info==="")
	if(info===""){
		element.nextElementSibling.innerText=str1;
		return false;
	}
	for(var reg in options){
		var aa=eval(options[reg]);//用eval()将字符串转为正则  
		if(aa.test(info)){
			flag=true;
		}
	}
	if(flag===true){
		element.nextElementSibling.innerText="";
		return true;
	}else{
		element.nextElementSibling.innerText=str2;
		return false;
	}
}


//生成验证码   26  26 10 =62
//数字编码48-57  大写字母 65-90  小写字母97-122
//122-48=74
function code(len){
	
	var str=""
	
	for(var i=0;i<len;i++){
		var rand=Math.floor(Math.random()*75)+48;
		while(rand>57 && rand<65 || rand>90 && rand<97){
			rand=Math.floor(Math.random()*75)+48;
		}
		str+=String.fromCharCode(rand);
	}
	
	return str;
	
}


//
function isTrue(element,picCode){
	var code=element.value;
	if(code===""){
		element.nextElementSibling.nextElementSibling.innerHTML="请输入验证码";
		return false;
	}
//	console.log(code.toLowerCase())
	if(code.toLowerCase()===picCode.toLowerCase()){
		element.nextElementSibling.nextElementSibling.innerHTML="";
		return true;
	}else{
		element.nextElementSibling.nextElementSibling.innerHTML="验证码输入错误";
		return false;
	}
}
