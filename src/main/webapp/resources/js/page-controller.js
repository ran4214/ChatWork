function switchContent(pageName){
	$('#bodyContent').children().remove();
    $('#bodyContent').load(pageName);
}