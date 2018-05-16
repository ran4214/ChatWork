$(document).ready(function(){
	
  var preloadbg = document.createElement("img");
  preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";
  
	$("#searchfield").focus(function(){
		if($(this).val() == "Search contacts..."){
			$(this).val("");
		}
	});
	$("#searchfield").focusout(function(){
		if($(this).val() == ""){
			$(this).val("Search contacts...");
			
		}
	});
	
	$("#sendmessage input").focus(function(){
		if($(this).val() == "Send message..."){
			$(this).val("");
		}
	});
	$("#sendmessage input").focusout(function(){
		if($(this).val() == ""){
			$(this).val("Send message...");
			
		}
	});
	
	/* 커스텀 */
	var down = false;
	$(".bar").click(function(){
		$("#chatbox").slideToggle(300,'swing');
		/*$("#new-message").fadeToggle(300,"swing");*/
		return false;
		
	});
	$("#tab-bar").click(function(){
		$("#chatbox").slideToggle(300,'swing');
		/*$("#new-message").fadeToggle(300,"swing");*/
		return false;
	});
	/*커스텀 끝*/
		
	
	$(".friend").each(function(){		
		$(this).click(function(){
			var childOffset = $(this).offset();
			var parentOffset = $(this).parent().parent().offset();
			var childTop = childOffset.top - parentOffset.top;
			var clone = $(this).find('img').eq(0).clone();
			var top = childTop+12+"px";
			
			$(clone).css({'top': top}).addClass("floatingImg").appendTo("#chatbox");									
			
			setTimeout(function(){$("#profile p").addClass("animate");$("#profile").addClass("animate");}, 100);
			setTimeout(function(){
				$("#chat-messages").addClass("animate");
				$('.cx, .cy').addClass('s1');
				setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
				setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);			
			}, 150);														
			
			$('.floatingImg').animate({
				'width': "68px",
				'left':'108px',
				'top':'20px'
			}, 200);
			
			var name = $(this).find("p strong").html();
			var email = $(this).find("p span").html();														
			$("#profile p").html(name);
			$("#profile span").html(email);			
			
			$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
			$('#friendslist').fadeOut();
			$('#chatview').fadeIn();
		
			
			$('#close').unbind("click").click(function(){				
				$("#chat-messages, #profile, #profile p").removeClass("animate");
				$('.cx, .cy').removeClass("s1 s2 s3");
				$('.floatingImg').animate({
					'width': "40px",
					'top':top,
					'left': '12px'
				}, 200, function(){$('.floatingImg').remove()});				
				
				setTimeout(function(){
					$('#chatview').fadeOut();
					$('#friendslist').fadeIn();				
				}, 50);
			});
			
		});
	});			
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