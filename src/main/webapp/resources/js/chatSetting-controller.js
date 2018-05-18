function chaton(){
	$('#tab-bar').fadeToggle(500,"swing");
}

$(function(){
	$("#chaton").on("click",function(){
		chaton();
	});
	
});

function chatSetting(myUserID){
	console.log("전반적인 챗 세팅을 시작합니다.")
	var chatList;
	console.log("[1] 나의 전체 대화내역을 가져옵니다.")
	getMyAllChat(myUserID,function (result){
		if(result != null){
			var parsed = JSON.parse(result);
			chatList = parsed;
			console.log("[2] 나의 전체 대화내역을 토대로 나의 친구들의 정보등록 및 이벤트 등록");
			getFriends(myUserID,chatList);
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
			var toChatID = $(this).find(".userCno").val();
			console.log(toChatID);
			
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
			$("#profile>#star>.fa").removeClass("fa-star-o");
			$("#profile>#star>.fa").addClass("fa-star");
			
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
	var position = "";
	var timespan = "time-left";
	if(fromID == myUserID){ // 내가 보낸건지 상대방이 보낸건지 체크하기 위한 클래스 판단
		position = "right"
		timespan = "time-right";
	}else if(fromID == toChatID){
		position = "";
		timespan = "time-left";
	}
	
	$("#chat-messages").append("<div class='message " +
			position +
			"'>" +
			"<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg' />" +
			"<div class='bubble'>" +
			chatContent +
			"<div class='corner'></div>" +
			"<span class='"+
			timespan+
			"'>" +
			"오후 11:31" +
			"</span>" +
			"</div>" +
			"</div>");
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