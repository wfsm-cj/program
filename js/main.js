require.config({
	baseUrl : "js/",
	paths : {
		"jquery" : "jquery-1.12.4.min",
		"index" : "index"
	}
});

require(["jquery", "index"], function($, myIndexModule){
	$(function(){
		console.log("ready........");
	});

	// console.log(arguments);
	myIndexModule.show();
});