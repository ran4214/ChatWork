var validNavigation = false;
	
function windowClose(){
	$.ajax({
		type:"POST",
		url : "logout"
	});
}
	
function defaultBindEvents(){
	
	$(window).on('beforeunload',function(){
		if(!validNavigation){	
			return windowClose();
		}
	});
	
	$(window).on('unload',function(){
		if(!validNavigation){
			return windowClose();
		}
	});
	
	$(document).keydown(function(event){
		
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if(keycode == '116'||keycode == '82'|| keycode == '13'){
			alert("a");
			validNavigation = true;
		}
	});
	
	$('a').on('click',function(){
		validNavigation = true;
	});
	
	$('form').on('submit',function(){
		validNavigation = true;
	});
	
	$('input[type=submit]').on('click',function(){
		validNavigation = true;
	});
}
	
$(function(){
	defaultBindEvents();
});