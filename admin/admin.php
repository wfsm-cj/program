<?php
	$emailTel=$_POST["emailTel"];
	$password=$_POST["password"];
	
	//链接数据库
	$conn=mysql_connect("localhost:3306","root","");
	if(!$conn){
		die ("error :".mysql_error());
	}
	
	//指定连接的具体数据库名称
	mysql_select_db("hunsha",$conn);
	
	//设置向数据库读写数据时的编码
	mysql_query("set character set utf8");
	mysql_query("set names 'utf8'");
	
	
	
	
	$sql="select * from user where emailtel='".$emailTel."' and password='".$password."'";
	
	$result=mysql_query($sql,$conn);
	
	if(is_array(mysql_fetch_array($result))){  //判断用户名是否存在
		echo "true";
	}else{
		echo "false";
	}
	
?>