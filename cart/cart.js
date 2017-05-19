$(document).ready(function(){
				$.cookie.json=true;
				var _products=$.cookie("products")//_products是一个数组
//				$.cookie.raw=true;
//				console.log(_products)
				var data={
					products:_products
				}
				var html=template("cartTemplate",data);
				$("#main").html(html)
				
				
				//删除
				$("#main").delegate("a","click",function(){
					$(this).parents(".main_body").hide();
					var _products=$.cookie("products");
					var index=$(this).parents(".main_body").index();
//					console.log(index)
					_products.splice(index,1);
					$.cookie("products",_products,{expires:7,path:'/'});//两个cookie  路径不一样
				})
				
				
				//合计
				$("#btn").on("click",function(){
					var $select=$(".main_body").find(".select");//获取所有的select
					var sum=0;
					for(var i=0,len=$select.length;i<len;i++){
						if($select[i].checked===true){
							var price=$(".select").eq(i).parents(".main_body").find(".price").text();
							var amount=$(".select").eq(i).parents(".main_body").find(".amount").val();
							price=Number(price);
							amount=Number(amount);
							sum+=price*amount;
						}
					}
					console.log(sum)
					$("#sum").text(sum)
//					var isChecked=$(".select")[0].checked;
				})
				
				
//				修改数量
				$("#main").delegate(".amount","blur",function(){
					var amount=Number($(this).val());
					if(amount<=0){
						alert("请输入有效数字")
					}
					var index=$(this).parents(".main_body").index();
//					console.log(index)
					var _products=$.cookie("products");
					_products[index].amount=amount;
					$.cookie("products",_products);
				})
				
				//增加数量
				$("#main").delegate(".add","click",function(){
					var amount=Number($(this).prev(".amount").val());
					amount++;
					$(this).prev(".amount").val(amount);
					var _products=$.cookie("products");
					var index=$(this).parents(".main_body").index();
					_products[index].amount=amount;
					$.cookie("products",_products);
				})
				
				
				//减少数量
				$("#main").delegate(".minus","click",function(){
					var amount=Number($(this).next(".amount").val());
					amount--;
					if(amount<=0){
						alert("购买数量不能为0")
						amount++;
					}
					$(this).next(".amount").val(amount);
					var index=$(this).parents(".main_body").index();
					var _products=$.cookie("products");
					_products[index].amount=amount;
					$.cookie("products",_products);
				})
				
				
				
				
				//三级联动
//				var address={};
//				$.ajax({
//					type:"get",
//					url:"../data/addresses.json",
//					async:true,
//					success:function(data){
////						console.log(data.regions)
////						var obj=data.regions;
//////						var html=""
////						obj.forEach(function(province){
//////							html+="<option value='"+province.name+"'>"+province.name+"</option>";
//////							var cityHtml="";
////							address[province.name]={}
////							province.regions.forEach(function(city){
////
////							});
//////							province.name
////						})
////						$("#province").html(html);
//
////					data.regi
//
//
////								city
//							})
//						})
//						console.log(address)
//					}
//				});
				
				
//				function initProvince(){
//					var html="";
//					cityHtml+="<option value='"+province.name+"'>"+province.name+"</option>"
//					
//				}
			})