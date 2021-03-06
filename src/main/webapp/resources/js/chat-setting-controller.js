var xhr;

function chatStart(myUserID){
	if(($("#chatbox").css("display") == "block") || ($("#tab-bar").css("display") == "block")){
		console.log("채팅 서비스를 중단합니다.");
		$('#tab-bar').fadeToggle(300,"swing");
		if($("#chatbox").css("display") == "block"){
			$("#chatbox").slideToggle(300,'swing');
		}
		xhr.abort(); // 실시간 채팅 받아오는 서비스 끄기
	}else {
		if(xhr != null){
			xhr.abort(); // 만약 켜져있는게 있다면 끄고 다시 키기
		}
		$('#tab-bar').fadeToggle(500,"swing");
		console.log("채팅 서비스 시작합니다.");
		chatSetting(myUserID);
		
	}
		
		
}			

function tabEvent(myUserID,chatList,chatroom_app){
	
	$(".topmenu>.search").off("click").on("click",function(){ // 서치탭 클릭
		$('#friendslist').fadeOut();
		$('#chatroomlist').fadeOut();
		$('#searchlist').fadeIn();
		addGoChatView(myUserID,chatList,chatroom_app);
	});	
	$(".topmenu>.friends").off("click").on("click",function(){ // 친구탭 클릭
		getFriends(myUserID,chatList,chatroom_app);
		$('#searchlist').fadeOut();
		$('#chatroomlist').fadeOut();
		$('#friendslist').fadeIn();
		addGoChatView(myUserID,chatList,chatroom_app);
	});
	
	
	$(".topmenu>.chats").off("click").on("click",function(){
		
		$('#searchlist').fadeOut();
		$('#friendslist').fadeOut();
		$('#chatroomlist').fadeIn();
		
		$(".room-newmessage").each(function(){
			if($(this).text() == "0"){
				$(this).css("display","none");
			}
		});
		
		addGoChatView(myUserID,chatList,chatroom_app);
	});
	
	$("#search>input").off("keyup").on("keyup",function(){
		var friends = $("#friendslist>#friends>.friend");
		var text = $("#search>input").val();
		for(var i=0;i<friends.length;i++){
			if(($(friends[i]).find("p").find("strong").text().indexOf(text)) >= 0){
				$(friends[i]).css("display","block");
			}else{
				$(friends[i]).css("display","none");
			}
		}
		
	});
	
}
	
function chatSetting(myUserID){
	
	// 뷰설정
	Vue.component('todo-item', {
	  props: ['todo'],
	  template: "<div class='friend'>" +
	  		"<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg' />" +
	  		"<p>" +
			"<strong>{{todo.name}}</strong><br>" +
			"<span>{{todo.lastChatContent}}</span>" +
			"<span class='lastchat-time'>{{todo.lastChatTime}}</span>" +
			"<span class='room-newmessage'>{{todo.unreadCount}}</span>"+
			"</p>"+
			"<input class='userCno' type='hidden' v-model='todo.cno'>"+
			"<input class='friend-status' type='hidden' v-model='todo.cno'>" +
			"<input class='user-email' type='hidden' v-model='todo.email'>" +
			"<input class='online-status' type='hidden' v-model='todo.status'>" +
			"</div>"
	});
	
	var chatroom_app = new Vue({
	  el: '#chatrooms',
	  data: {
	    chatroom: [],
	    sortedChatroom: []
	  },
	  watch: {
		  chatroom : {
			  handler : function (val,oldVal) {
				  this.sortedChatroom = [];
				  function compare(a, b) {
				      if (a.lastChatID < b.lastChatID){
				    	  return 1;
				      } else if (a.lastChatID > b.lastChatID){
				    	  return -1;
				      }
				      
				      
				  }
				  this.sortedChatroom = Array.from(this.chatroom);
				  this.sortedChatroom.sort(compare);
			  },
	  		  deep: true
		  },
	  	sortedChatroom: {
	  		handler : function (val,oldVal) {
				  for(var i=0;i<val.length;i++){
					  if(val[i].unreadCount > 0){
						 $($(".room-newmessage").get(i)).css("display","inline-block");
					  }
					  else{
						  $($(".room-newmessage").get(i)).css("display","none");
					  }
					  
				  }
			  },
	  		  deep: true
	  	}
		  
	  }
	});
	
	// 뷰설정 끝

	/*console.log("[myUserID : "+myUserID+"] 전반적인 챗 세팅을 시작합니다.");*/
	
	var chatList = []; // 전체 대화내역을 담는 변수
	var lastChatID = 0; // 마지막으로온 메세지의 아이디를 담는 변수
	
	chatingTab(myUserID,chatroom_app); // 채팅도중 탭을 눌러 채팅을 열었을때 그사람에 대한 모든 채팅이 읽어지게 해주는 펑션

	/*console.log("1. 나의 전체 대화내역을 가져옵니다.")*/
	
	getMyAllChat(myUserID,function (result){
		
		var parsed = JSON.parse(result);
		
		chatList = parsed;
		
		if(chatList.length == 0){
			
			lastChatID = "0";
			/*console.log("2. 대화한 내역이 없습니다. 0 번째를 기준으로 새로운 메세지가 오면 갱신합니다.");*/
			
			
		}else{
			
			lastChatID = chatList[chatList.length-1].chatID;
			/*console.log("2. [lastChatID : "+lastChatID+"] 의 번호를 기준으로 새로운 메세지가 오면 갱신합니다.");*/
			
			lastChatID = chatList[chatList.length-1].chatID;
			
		}
		
		
		
		/*console.log("3. 친구 목록을 불러옵니다.");*/
		
		getFriends(myUserID,chatList,chatroom_app); // 친구 리스트 불러오기
		
		/*console.log("4. 채팅방 목록을 불러옵니다.");*/
		
		getChatList(myUserID,chatList,function(parsed){
			if(parsed.length == 0){
				return;
			}
			var unreadCount = [];
			
			var friendIDs = [];
			for(var i =0; i<parsed.length;i++){
				friendIDs.push(parsed[i].cno);
			}
			
			
			
			getUnreadChatCount(myUserID,friendIDs).then(function(unreadCount){
				for(var i=0;i<parsed.length;i++){
					var lastChatContent = getLastChat(parsed[i].cno,chatList).chatContent;
					var lastChatTime = getLastChat(parsed[i].cno,chatList).chatTime;
					var lastChatID = getLastChat(parsed[i].cno,chatList).chatID;
					var count = 0;
					for(var j = 0; j<unreadCount.length;j++){ 
						// 여러unreadCount 에담긴 해당 채팅방에 맞는유저들의 안읽는 메세지카운트 구하기
						if(unreadCount[j].toChatID == parsed[i].cno){
							count = unreadCount[j].unreadCount;
						}
					}
					
					lastChatTime = chatTimeCheck(lastChatTime);
					
					
					chatroom_app.chatroom.push({
						"cno" : parsed[i].cno,
						"name" : parsed[i].cname,
						"email" : parsed[i].email,
						"lastChatID" : lastChatID,
						"lastChatContent" : lastChatContent,
						"lastChatTime" : lastChatTime,
						"unreadCount" : count,
						"status" : parsed[i].status
					});
					
					
				}
				
				var countSum = 0; // 읽지않는 전체의 메세지의 개수를 담는 변수
				for(var i=0;i<chatroom_app.chatroom.length;i++){
					countSum += parseInt(chatroom_app.chatroom[i].unreadCount);
				}
				$("#new-message").text(countSum);
				if(countSum > 0){
					$("#new-message").fadeIn();
				}
				
				
				
			}).catch(function (err){
				console.log(err);
			});
			
			 
			
		}); // 채팅방 불러오기
		
		// 실시간 채팅 불러오기
		getChat(myUserID,lastChatID,chatList,chatroom_app);
		
		setSearchEvent(myUserID,chatList,chatroom_app); // 서치 이벤트 등록
		
		tabEvent(myUserID,chatList,chatroom_app);
		
		
	});
}

function setSearchEvent(myUserID,chatList,chatroom_app){
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
					addSearchUser(parsed.user.cno,parsed.user.cname,parsed.user.email,parsed.user.status,parsed.status);
					addGoChatView(myUserID,chatList,chatroom_app);
				}
			});
		}
	});
}

function getFriends(myUserID,chatList,chatroom_app){
	// 목록 리로드를 위해 전체 내용을 초기화 시킨다.
	 $("#friends").empty();
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
		
		console.log("[친구 목록 불러오기] 성공!");
		var users = JSON.parse(jsonData);
		for(var i=0; i<users.length;i++){
			addFriendList(users[i].cno,users[i].cname,users[i].email,users[i].status);
		}
		addGoChatView(myUserID,chatList,chatroom_app); // 등록된 친구들마다의 이벤트를 등록
	});
}

function addGoChatView(myUserID,chatList,chatroom_app){
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
			
			var str = ""; // 대화내역들의 전체 str 문자열
			for(var i=0;i<chatList.length;i++){ // 전체 대화 목록 중 선택한 사람과의 대화 연락처만
												// 꺼내서 사용합니다.
				if((chatList[i].toID == toChatID && chatList[i].fromID == myUserID) || (chatList[i].fromID == toChatID && chatList[i].toID == myUserID)){
					str = addChat(myUserID,toChatID,chatList[i].fromID,chatList[i].chatContent,chatList[i].chatTime,str);
					// 전체의 말풍선들을 한문자열로 통합
				}
			}
			
			$("#chat-messages").append(str);
			
			
			$("#profile p").html(name);
			$("#profile span").html(email);
			$("#toChatID").val(toChatID);
			var friends = $("#friendslist #friends strong");
			var friendStatus = 0;
			for(var i=0;i<friends.length;i++){
				if($(friends[i]).text() == name){
					friendStatus = '1';
				}
			}
			if(friendStatus == '1'){
				$("#profile>#star>.fa").removeClass("fa-star-o");
				$("#profile>#star>.fa").addClass("fa-star");
			}else{
				$("#profile>#star>.fa").removeClass("fa-star");
				$("#profile>#star>.fa").addClass("fa-star-o");
			}
			
			$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
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
						getFriends(myUserID,chatList,chatroom_app);
						$('#chatview').fadeOut();
						barDefaultSet();

							
				}, 50);
			});
			
			$("#chat-messages").scrollTop($('#chat-messages')[0].scrollHeight);
			
			readAllChat(myUserID,toChatID,chatroom_app);
			
			barSet(name,$(this).find(".status").hasClass("available"),$(this).find(".userCno").val());
			$("#new-message").text("0");
		});
	}); 
	
	// 단톡방에 있는거는 따로 설정
	
	
	$("#chatrooms>.friend").each(function(){
		$(this).off("click");
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
			var email = $(this).find(".user-email").val();
			var toChatID = $(this).find(".userCno").val();
			
			$("#chat-messages").empty();
			$("#chat-messages").append("<label>Messages</label>");
			// 전에 대화내역들을 초기화 시킨다.
			
			var str = ""; // 대화내역들의 전체 str 문자열
			for(var i=0;i<chatList.length;i++){ // 전체 대화 목록 중 선택한 사람과의 대화 연락처만
												// 꺼내서 사용합니다.
				if((chatList[i].toID == toChatID && chatList[i].fromID == myUserID) || (chatList[i].fromID == toChatID && chatList[i].toID == myUserID)){
					str = addChat(myUserID,toChatID,chatList[i].fromID,chatList[i].chatContent,chatList[i].chatTime,str);
					// 전체의 말풍선들을 한문자열로 통합
				}
			}
			
			$("#chat-messages").append(str);
			
			$("#profile p").html(name);
			$("#profile span").html(email);
			$("#toChatID").val(toChatID);
			var friends = $("#friendslist #friends strong");
			var friendStatus = 0;
			for(var i=0;i<friends.length;i++){
				if($(friends[i]).text() == name){
					friendStatus = '1';
				}
			}
			
			if(friendStatus == '1'){
				$("#profile>#star>.fa").removeClass("fa-star-o");
				$("#profile>#star>.fa").addClass("fa-star");
			}else{
				$("#profile>#star>.fa").removeClass("fa-star");
				$("#profile>#star>.fa").addClass("fa-star-o");
			}
			
			$(".message").not(".right").find("img").attr("src", $(clone).attr("src"));									
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
					
						getChatList(myUserID,chatList,function(parsed){
							if(parsed.length == 0){
								return;
							}
							
							var unreadCount = [];
							
							var friendIDs = [];
							for(var i =0; i<parsed.length;i++){
								friendIDs.push(parsed[i].cno);
							}
							
							getUnreadChatCount(myUserID,friendIDs).then(function(unreadCount){
								for(var i=0;i<parsed.length;i++){
									var lastChatContent = getLastChat(parsed[i].cno,chatList).chatContent;
									var lastChatTime = getLastChat(parsed[i].cno,chatList).chatTime;
									var count = 0;
									for(var j = 0; j<unreadCount.length;j++){ // 여러
																				// unreadCount
																				// 에 담긴
																				// 해당
																				// 채팅방에
																				// 맞는
																				// 유저들의
																				// 안읽는
																				// 메세지
																				// 카운트
																				// 구하기
										if(unreadCount[j].toChatID == parsed[i].cno){
											count = unreadCount[j].unreadCount;
										}
									}
									addChatRoom(parsed[i].cno,parsed[i].cname,parsed[i].email,lastChatContent,lastChatTime,count,parsed[i].status);
									
								}
								var countSum = 0;
								for(var i=0;i<unreadCount.length;i++){
									countSum += parseInt(unreadCount[i].unreadCount);
								}
								if(countSum == 0){
									$("#new-message").css("display","none");
								}else {
									$("#new-message").text(countSum);
								}	
								$("#new-message").text(countSum);
								addGoChatView(myUserID,chatList,chatroom_app);
							}).catch(function (err){
								console.log(err);
							});
							
	
							
						}); // 채팅방 불러오기
					
						$('#chatview').fadeOut();	
						barDefaultSet();
						
						
							
				}, 50);
			});
			
			$("#chat-messages").scrollTop($('#chat-messages')[0].scrollHeight);	
			
			readAllChat(myUserID,toChatID,chatroom_app)// 채팅방에 들어가서 등록되어있는 채팅들의 읽음 처리
			
			barSet(name,$(this).find(".online-status").val(),$(this).find(".userCno").val());
			$("#new-message").text("0");
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
			console.log("[전체 대화내역 가져오기] 성공!")
			callback(result);
		}
	})
}
	
function addChat(myUserID,toChatID,fromID,chatContent,chatTime,str){
	var position = "";
	var timespan = "time-left";
	if(fromID == myUserID){ // 내가 보낸건지 상대방이 보낸건지 체크하기 위한 클래스 판단
		position = "right"
		timespan = "time-right";
	}else if(fromID == toChatID){
		position = "";
		timespan = "time-left";
	}
			
	str += "<div class='message " +
			position +
			"'>" +
			"<img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg' />" +
			"<div class='bubble'>" +
			chatContent +
			"<div class='corner'></div>" +
			"<span class='"+
			timespan+
			"'>" +
			chatTime+
			"</span>" +
			"</div>" +
			"</div>";
			
	return str;
	
	/* $("#chat-messages").scrollTop($('#chat-messages')[0].scrollHeight); */
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

function getChat(myUserID,lastChatID,chatList,chatroom_app){
	    xhr = $.ajax({
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
	            var chat = JSON.parse(result);
	            
	            str = "";
	            
	            for(var i=0; i<chat.length;i++){
	            	var display = $("#tab-bar .userCno").val();
	            	
	            	// 받는사람이 보낸사람과 대화중이라면 즉각 오는 메세지마다 읽음처리를 해준다.
	            	if(chat[i].fromID != myUserID && display == chat[i].fromID && $("#chatbox").css("display") == "block"){
	            		readChat(chat[i].chatID);
	            	}
	            	//
	            	
	            	// 상대의 대화는 그상대와 대화하고있어야만 창이올라가야한다.
	            	if(display == chat[i].fromID || display == chat[i].toID){ 
	            		str += addChat(myUserID,toChatID,chat[i].fromID,chat[i].chatContent,chat[i].chatTime,str);
	            	}
	            	chatList.push(chat[i]);
	            }
	            
	            $("#chat-messages").append($(str).hide().fadeIn(160));
	            $("#chat-messages").scrollTop($('#chat-messages')[0].scrollHeight);
	            
	            lastChatID = chat[chat.length-1].chatID; // 라스트 아이디를 바꿈;
	            
	            //채팅방 새로고침
	            getChatList(myUserID,chatList,function(parsed){
	    			if(parsed.length == 0){
	    				return;
	    			}
	    			var unreadCount = [];
	    			
	    			var friendIDs = [];
	    			for(var i =0; i<parsed.length;i++){
	    				friendIDs.push(parsed[i].cno);
	    			}
	    			
	    			
	    			
	    			getUnreadChatCount(myUserID,friendIDs).then(function(unreadCount){
	    				for(var i=0;i<parsed.length;i++){
	    					var lastChatContent = getLastChat(parsed[i].cno,chatList).chatContent;
	    					var lastChatTime = getLastChat(parsed[i].cno,chatList).chatTime;
	    					var lastChatID = getLastChat(parsed[i].cno,chatList).chatID;
	    					var count = 0;
	    					for(var j = 0; j<unreadCount.length;j++){ 
	    						// 여러 unreadCount 에담긴 해당 채팅방에 맞는유저들의 안읽는 메세지카운트 구하기
	    						if(unreadCount[j].toChatID == parsed[i].cno){
	    							count = unreadCount[j].unreadCount;
	    						}
	    					}
	    					
	    					lastChatTime = chatTimeCheck(lastChatTime);
	    					
	    					for(var j=0;j<chatroom_app.chatroom.length;j++){
	    						if(parsed[i].cno == chatroom_app.chatroom[j].cno){
	    							chatroom_app.chatroom[j].lastChatID = lastChatID;
	    							chatroom_app.chatroom[j].lastChatContent = lastChatContent;
	    							chatroom_app.chatroom[j].lastChatTime = lastChatTime;
	    							chatroom_app.chatroom[j].unreadCount = count;
	    							break;
	    						}else if(j == chatroom_app.chatroom.length-1){
	    							// 마지막까지 이사람에 대한 채팅방이 없는것을 발견하면 채팅방추가
	    							chatroom_app.chatroom.push({
	    	    						"cno" : parsed[i].cno,
	    	    						"name" : parsed[i].cname,
	    	    						"email" : parsed[i].email,
	    	    						"lastChatID" : lastChatID,
	    	    						"lastChatContent" : lastChatContent,
	    	    						"lastChatTime" : lastChatTime,
	    	    						"unreadCount" : count,
	    	    						"status" : parsed[i].status
	    	    					});
	    						}
	    					}
	    					
	    					if(chatroom_app.chatroom.length == 0){
	    						chatroom_app.chatroom.push({
    	    						"cno" : parsed[i].cno,
    	    						"name" : parsed[i].cname,
    	    						"email" : parsed[i].email,
    	    						"lastChatID" : lastChatID,
    	    						"lastChatContent" : lastChatContent,
    	    						"lastChatTime" : lastChatTime,
    	    						"unreadCount" : count,
    	    						"status" : parsed[i].status
    	    					});
	    					}
	    					
	    				}
	    				
	    				var countSum = 0; // 읽지않는 전체의 메세지의 개수를 담는 변수
	    				
	    				if($("#tab-bar .userCno").val() == chat[0].fromID && $("#chatbox").css("display") == "none"){
	    					for(var i=0;i<chatroom_app.chatroom.length;i++){
	    						if(chatroom_app.chatroom[i].cno == chat[0].fromID){
	    							countSum = parseInt(chatroom_app.chatroom[i].unreadCount);
	    						}
		    					
		    				}
	    					
	    					
	    				}else if($("#chatbox").css("display") == "none" && $("#tab-bar .userCno").val() == undefined){
	    					
	    					for(var i=0;i<chatroom_app.chatroom.length;i++){
		    					countSum += parseInt(chatroom_app.chatroom[i].unreadCount);
		    				}
		    				
	    				}else{
	    					
	    				}
	    				
	    				$("#new-message").text(countSum);
	    				if(countSum > 0 && $("#chatbox").css("display") != "block"){
	    					$("#new-message").fadeIn();
	    				}
	    					
	    					
	    				
	    			}).catch(function (err){
	    				console.log(err);
	    			});
	    			
	    			
	    		}); // 채팅방 불러오기
	            
	            
	        	getChat(myUserID,lastChatID,chatList,chatroom_app);
	   
	        },
	        error : function(request,status,error){
	        	 if(error == "timeout"){ // 타임아웃 종료로 다시실행
	        		 console.log("타임아웃");
	        		 getChat(myUserID,lastChatID,chatList,chatroom_app);
	        	 }else{ // 그 이외 채팅 기능 종료
	        		 console.log("채팅기능 끄기");
	        	 }
	        },
	        timeout: 30000,
	    });
	    

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

function getChatList(myUserID,chatList,callback){
	
	/*
	 * $("#chatrooms").empty(); // 방초기화 $("#chatrooms").empty();
	 */
	$.ajax({
		type : "POST",
		url : "getChatList",
		data : {
			cno : myUserID
		},
		
		success : function(result){
			console.log("[채팅방 목록 가져오기] 성공!");
			var parsed = JSON.parse(result);
			
			callback(parsed);
		}
	})
}

function chatTimeCheck(lastChatTime){
	var dt = new Date();
	
	var todayDay = dt.getDate();
	
	var lastChatDay = lastChatTime.substring(3,5);
	
	if(todayDay != lastChatDay){
		lastChatTime = lastChatTime.substring(0,5);
	}else if(todayDay == lastChatDay){
		lastChatTime = lastChatTime.substring(6,lastChatTime.length);
	}
	
	return lastChatTime;
}

function addChatRoom(cno,cname,email,lastChatContent,lastChatTime,count,status){
	
	/*
	 * var dt = new Date();
	 * 
	 * var todayDay = dt.getDate();
	 * 
	 * var lastChatDay = lastChatTime.substring(3,5);
	 * 
	 * if(todayDay != lastChatDay)
	 * {
	 * 	  lastChatTime = lastChatTime.substring(0,5);
	 * }else if(todayDay == lastChatDay)
	 * 		{ 
	 * 			lastChatTime = lastChatTime.substring(6,lastChatTime.length); 
	 * 		} 
	 * 
	 * var newMessageClass = "<span class='room-newmessage'>"+count+"</span>"; 
	 * 
	 * if(count == 0 || count == "0" ||count == undefined)
	 * { newMessageClass = ""; }
	 * 
	 * if(count > 99){ count = "N"; newMessageClass = "<span
	 * class='room-newmessage'>"+count+"</span>"; }
	 * 
	 * $("#chatrooms").append("<div class='friend'>" + "<img
	 * src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg' />" + "<p>" + "<strong>" +
	 * cname + "</strong><br>" + "<span>"+ lastChatContent+ "</span>" + "<span
	 * class='lastchat-time'>" + lastChatTime+ "</span>" + newMessageClass + "</p>"+ "<input
	 * class='userCno' type='hidden' value='"+ cno+ "'>"+ "<input
	 * class='friend-status' type='hidden' value='"+ cno+ "'>" + "<input
	 * class='user-email' type='hidden' value='" + email + "'>" + "<input
	 * class='online-status' type='hidden' value='" + status + "'>" + "</div>");
	 */
}

function getLastChat(userCno,chatList){
	
	for(var i=chatList.length-1;i>=0;i--){
		if((chatList[i].toID == myUserID && chatList[i].fromID == userCno) || (chatList[i].toID == userCno && chatList[i].fromID == myUserID)){
			return chatList[i];
		}
	}
}

function readAllChat(myUserID,toChatID,chatroom_app){
	$.ajax({
		url : "readAllChat",
		type : "post",	
		data : {
			myUserID : myUserID,
			toChatID : toChatID
		},
		success : function(result){
			for(var i=0;i<chatroom_app.sortedChatroom.length;i++){
				if(chatroom_app.sortedChatroom[i].cno == toChatID){
					chatroom_app.sortedChatroom[i].unreadCount = 0;
				}
			}
		}
	});
}

function getUnreadChatCount(myUserID,friends){
	return new Promise(function (resolve, rejecet){
			$.ajax({
				url : 'getUnreadChatCount',
				type : "POST",
				data : {
					myUserID : myUserID,
					friends : friends
				},
				
				success : function(result){
					var parsed = JSON.parse(result);
					resolve(parsed);
				}
			});
		
	});
		
/*
 * $.ajax({ url : 'getUnreadChatCount', type : "POST", data : { myUserID :
 * myUserID, toChatID : toChatID },
 * 
 * success : function(result){ unreadCount.push({"toChatID" : toChatID,
 * "unreadCount" : result}); if(i==length){ callback(unreadCount); } } });
 */
}

function barSet(name,onlineStatus,userCno){
	var onlineClass;
	if(onlineStatus == "1" || onlineStatus == true){
		onlineClass = "available";
	}else {
		onlineClass = "inactive";
	}
	
	$("#bottom-bar").empty();
	$("#bottom-bar").append("<div class='status " +
			onlineClass +
			" tab-status'></div>" +
			"<span class='bar-name'><strong style='margin-left : 8px;'>" +
			name +
			"</strong></span>" +
			"<input  type='hidden' class='userCno' value='" +		
			userCno +
			"'/>" +
			"<i class='fa fa-bars' id='tab-button' aria-hidden='true'></i>");
	
}

function barDefaultSet(){
	$("#bottom-bar").empty();
	$("#bottom-bar").append("<i class='fa fa-comments' aria-hidden='true'></i>" +
			"<span class='bar-name' style='margin-left : 5px;'><strong>채팅</strong></span>" +
			"<i class='fa fa-bars' id='tab-button' aria-hidden='true'></i>");
	
}

function readChat(chatID){
	$.ajax({
		type : "POST",
		url : "readChat",
		data : {
			chatID : chatID
		},
		success : function(result){}
	});
}

function chatingTab(myUserID,chatroom_app){
	$("#tab-bar").off("click").on("click",function(){
		
		$("#chatbox").slideToggle(300,'swing');
		
		var toChatID = $("#tab-bar .userCno").val();
		if(toChatID != undefined && toChatID != null){
			readAllChat(myUserID,toChatID,chatroom_app);
			$("#chat-messages").scrollTop($('#chat-messages')[0].scrollHeight);
		}
		
		$("#new-message").fadeOut();

		
	});
	
	$("#tab-bar .bar").off("click").click(function(){
		$("#chatbox").slideToggle(300,'swing');
		
		var toChatID = $("#tab-bar .userCno").val();
		if(toChatID != undefined && toChatID != null){
			readAllChat(myUserID,toChatID,chatroom_app);
			$("#chat-messages").scrollTop($('#chat-messages')[0].scrollHeight);
		}
		
		$("#new-message").fadeOut();
		
		return false;
	});
	
	$("#chatbox .bar").off("click").click(function(){
		$("#chatbox").slideToggle(300,'swing');
		
		if($("#new-message").text() != "0"){
			$("#new-message").fadeIn();
		}
		
	});
	
	$("#chatbox .bar").off("click").click(function(){
		$("#chatbox").slideToggle(300,'swing');
		
		if($("#new-message").text() != "0"){
			$("#new-message").fadeIn();
		}
		
	});
	
	$("#chatview .bar").off("click").click(function(){
		$("#chatbox").slideToggle(300,'swing');
		
		$("#new-message").text("0");
		
		if($("#new-message").text() != "0"){
			$("#new-message").fadeIn();
		}
		
	});
	
}

function barMessageCountSet(){
	
}

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
		re = addFriend(fromID,toID); // 추가
	}else if($("#star>.fa").hasClass('fa-star')){ // 친구가 추가되어있다면
		re = deleteFriend(fromID,toID);
	}
}
// 친구 추가하는 펑션
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
			
			$("#star>.fa").removeClass('fa-star-o');
			$("#star>.fa").addClass('fa-star');
		}
	
	});
	
	return re;
}
// 친구 삭제하는 펑션
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

