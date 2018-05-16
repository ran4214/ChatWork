var a = 0;

function chaton(){
	$('#tab-bar').fadeToggle(500,"swing");
}

$(function(){
	$("#chaton").on("click",function(){
		chaton();
	});
});
