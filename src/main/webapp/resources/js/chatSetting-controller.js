function chaton(){
	$('#tab-bar').fadeToggle(500,"swing");
}

$(function(){
	$("#chaton").on("click",function(){
		chaton();
	});
	
	$("#topmenu>.search").on("click",function(){
		$('#friendslist').fadeOut();
		$('#searchlist').fadeIn();
	});
	
	$("#topmenu>.friends").on("click",function(){
		$('#friendslist').fadeIn();
		$('#searchlist').fadeOut();
	});
	
	
	
});

function chatSetting(myUserID){

	console.log("전반적인 챗 세팅을 시작합니다.");
	var chatList;
	console.log("[1] 나의 전체 대화내역을 가져옵니다.")
	getMyAllChat(myUserID,function (result){
		if(result == "[]"){ //데화 데이터 없는경우
			var parsed = JSON.parse(result);
			chatList = parsed;
			getFriends(myUserID,chatList);
			var lastChatID = "0";
			console.log("[3]"+lastChatID+"를 기준으로 새로운 메세지가 오면 갱신합니다.");
			getChat(myUserID,lastChatID,chatList);
		}else if(result != null){ //대화데이터가 있을경우
			var parsed = JSON.parse(result);
			chatList = parsed;
			var lastChatID = chatList[chatList.length-1].chatID;
			console.log("[2] 나의 전체 대화내역을 토대로 나의 친구들의 정보등록 및 이벤트 등록");
			getFriends(myUserID,chatList);
			console.log("[3]"+lastChatID+"를 기준으로 새로운 메세지가 오면 갱신합니다.");
			getChat(myUserID,lastChatID,chatList);
			
			//3번째 탭 검색 이벤트 등록
			$("#user-searchfield").on("keyup",function(event){
				var keycode = (event.keyCode ? event.keyCode : event.which);
				var searchStr = $("#user-searchfield").val();
				if(keycode == '13'){
					$.ajax({
						url : "searchUser",
						type : "POST",
						data : {
							userID : searchStr,
							myCno : myUserID
						},
						success : function(data) {
							if (data == "") {
								notFoundedUser();
								return
							}
							var parsed = JSON.parse(data);
							console.log(parsed.status);
							addSearchUser(parsed.user.cno,parsed.user.cname,parsed.user.email,parsed.user.status,parsed.status);
							addGoChatView(myUserID,chatList);
						}
					});
				}
			});
			//
		}
	});
}

function getFriends(myUserID,chatList){
	// 목록 리로드를 위해 전체 내용을 초기화 시킨다.
	/*$("#friends").empty();*/ // 친구목록
	var jsonData;
	// 친구 목록 불러오기
	$.ajax({
		type : "POST",
		url : "getFriends",
		data : {
			fromID : myUserID
		},
		
		success : function(data){
			jsonData = data;
		}
	}).done(function(){
		if(jsonData == "") 
			return;
		
		console.log("[2](ajax) 성공!");
		var users = JSON.parse(jsonData);
		for(var i=0; i<users.length;i++){
			addFriendList(users[i].cno,users[i].cname,users[i].email,users[i].status);
		}
		addGoChatView(myUserID,chatList); // 등록된 친구들마다의 이벤트를 등록
	});
}

function addGoChatView(myUserID,chatList){
	$(".friend").each(function(){	
		$(this).off('click');
		$(this).on("click",function(){
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
			var toChatID = $(this).find(".userCno").val();
			
			$("#chat-messages").empty();
			$("#chat-messages").append("<label>Messages</label>");
			// 전에 대화내역들을 초기화 시킨다.
			
			for(var i=0;i<chatList.length;i++){ // 전체 대화 목록 중 선택한 사람과의 대화 연락처만 꺼내서 사용합니다.
				if((chatList[i].toID == toChatID && chatList[i].fromID == myUserID) || (chatList[i].fromID == toChatID && chatList[i].toID == myUserID)){
					addChat(myUserID,toChatID,chatList[i].fromID,chatList[i].chatContent,chatList[i].chatTime) // 하나하나의 말풍선들을 append 해주는 함수
				}
			}
			
			
			
			$("#profile p").html(name);
			$("#profile span").html(email);
			$("#toChatID").val(toChatID);
			var friendStatus =$(this).find(".friend-status").val();
			console.log(friendStatus);
			if(friendStatus == '1'){
				$("#profile>#star>.fa").removeClass("fa-star-o");
				$("#profile>#star>.fa").addClass("fa-star");
			}else{
				$("#profile>#star>.fa").removeClass("fa-star");
				$("#profile>#star>.fa").addClass("fa-star-o");
			}
			
			$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
			$('#friendslist').fadeOut();
			$('#chatview').fadeIn();
			
			$("#sendmessage input").on("keydown",function(event){
				var keycode = (event.keyCode ? event.keyCode : event.which);
				if(keycode == '13'){
					var toChatID = $("#toChatID").val();
					var chatContent = $("#sendmessage input").val();
					if(chatContent != "" && chatContent != null ){
						sendChat(myUserID,toChatID,chatContent);
						$("#sendmessage input").val("");
					}
				}	
			});
		
			
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
			
			$("#chat-messages").scrollTop($('#chat-messages')[0].scrollHeight);
			
		});
	});		
}

function addFriendList(cno,cname,email,status){
	var statusClass = 'inactive';
	if(status == 1){
		statusClass = 'available';
	}
	
	$("#friends").append("<div class='friend'>" +
			"<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg' />" +
			"<p>" +
			"<strong>" +
			cname +
			"</strong><br>" +
			"<span>"+
			email+
			"</span></p>"+
			"<input class='userCno' type='hidden' value='"+
			cno+
			"'>"+
			"<input class='friend-status' type='hidden' value='1'>"+
			"<div class='status "+
			statusClass+"'>"+
			"</div>");

}

function getMyAllChat(myUserID,callback){
	$.ajax({
		type : "POST",
		url : "getMyAllChat",
		data : {
			fromID : myUserID
		},
		success : function(result){
			if(result==""){
				return;
			}
			console.log("[1](ajax) : 성공!")
			callback(result);
		}
	})
}

function addChat(myUserID,toChatID,fromID,chatContent,chatTime){
	console.log("addChat");
	var position = "";
	var timespan = "time-left";
	if(fromID == myUserID){ // 내가 보낸건지 상대방이 보낸건지 체크하기 위한 클래스 판단
		position = "right"
		timespan = "time-right";
	}else if(fromID == toChatID){
		position = "";
		timespan = "time-left";
	}
	
	$("#chat-messages").append($("<div class='message " +
			position +
			"'>" +
			"<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg' />" +
			"<div class='bubble'>" +
			chatContent +
			"<div class='corner'></div>" +
			"<span class='"+
			timespan+
			"'>" +
			chatTime+
			"</span>" +
			"</div>" +
			"</div>").hide().fadeIn(180));
	
	$("#chat-messages").scrollTop($('#chat-messages')[0].scrollHeight);
}

function sendChat(myUserID,toID,chatContent){
	$.ajax({
		type : "POST",
		url : "sendChat",
		data : {
			fromID : myUserID,
			toID : toID,
			chatContent : chatContent
		},
		
		success : function(result){
			if(result > 0){
				console.log("[ajax] 메세지 보내기 성공");
			}
		}
	});
}

function getChat(myUserID,lastChatID,chatList){
	    $.ajax({
	        url: '/getChat',
	        type: 'POST',
	        data : {
	        	fromID : myUserID,
	        	lastChatID : lastChatID
	        },
	    
	        success: function(result) {
	        	if(result == "" || result == null){
	        		return;
	        	}
	        	console.log(result);
	            var chat = JSON.parse(result);
	            for(var i=0; i<chat.length;i++){
	            	addChat(myUserID,toChatID,chat[i].fromID,chat[i].chatContent,chat[i].chatTime);
	            	chatList.push(chat[i]);
	            }
	            lastChatID = chat[chat.length-1].chatID;
	        },
	        complete : function(){
	        	addGoChatView(myUserID,chatList);
	        	getChat(myUserID,lastChatID,chatList);
	        },
	        timeout: 30000,
	    })
}

function addSearchUser(cno,cname,email,status,friendStatus){
	var statusClass = 'inactive';
	if(status == 1){
		statusClass = 'available';
	}
	
	var friendStatusValue = "0";
	if(friendStatus == "true"){
		friendStatusValue = "1";
	}
	
	$("#searchs").empty();
	$("#searchs").append($("<div class='friend'>" +
			"<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg' />" +
			"<p>" +
			"<strong>" +
			cname +
			"</strong><br>" +
			"<span>"+
			email+
			"</span></p>"+
			"<input class='userCno' type='hidden' value='"+
			cno+
			"'>"+
			"<input class='friend-status' type='hidden' value='"+
			friendStatusValue+
			"'>"+
			"<div class='status "+
			statusClass+
			"'>"+
			"</div>").hide().fadeIn(180));
}

function notFoundedUser(){
	$("#searchs").empty();
	$("#searchs").append($("<div class='notfound'>검색된 유저가 없습니다.</div>)").hide().fadeIn(180));
}
