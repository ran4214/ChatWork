$(document).ready(function(){
	
  var preloadbg = document.createElement("img");
  preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";

	
	/* 커스텀 */
	var down = false;
	$(".bar").click(function(){
		$("#chatbox").slideToggle(300,'swing');
		if($("#new-message").text() != 0){
			$("#new-message").fadeOut(300,"swing");
		}else{
			
		}
		
		return false;
		
	});
	$("#tab-bar").click(function(){
		$("#chatbox").slideToggle(300,'swing');
		return false;
	});
	/*커스텀 끝*/
		
});

function noLoginChat(){
	$('#alertModal').modal('show')
}	

// 친구 추가,삭제 분기점 펑션
function friend(myID){
	var fromID = myID;
	var toID = $('#toChatID').val();
	var re = -1;
	
	// 친구가 추가 되어있지 않다면
	if($("#star>.fa").hasClass('fa-star-o')){
		re = addFriend(fromID,toID); //추가
	}else if($("#star>.fa").hasClass('fa-star')){ // 친구가 추가되어있다면
		re = deleteFriend(fromID,toID);
	}
}

//친구 추가하는 펑션
function addFriend(fromID,toID){
	var re = -1;
	$.ajax({
		type : "POST",
		url : "addFriend",
		data : {
			fromID : fromID,
			toID : toID
		},
	
		success : function(result){
			console.log("[ajax] 친구 추가 성공!");
			re = result;
		}
	
	});
	
	$("#star>.fa").removeClass('fa-star-o');
	$("#star>.fa").addClass('fa-star');
	
	return re;
}

//친구 삭제하는 펑션
function deleteFriend(fromID,toID){
	var re = -1;
	$.ajax({
		type : "POST",
		url : "deleteFriend",
		data : {
			fromID : fromID,
			toID : toID
		},
	
		success : function(result){
			console.log("[ajax] 친구 삭제 성공!");
			re = result;
		}
	
	});
	
	$("#star>.fa").removeClass('fa-star');
	$("#star>.fa").addClass('fa-star-o');
	
	return re;
}