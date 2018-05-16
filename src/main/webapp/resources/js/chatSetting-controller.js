function chaton(){
	$('#tab-bar').fadeToggle(500,"swing");
}

$(function(){
	$("#chaton").on("click",function(){
		chaton();
	});
});

function chatSetting(myUserID){
	// 목록 리로드를 위해 전체 내용을 초기화 시킨다.
	$("#friends").empty(); // 친구목록
	
	// 친구 목록 불러오기
	$.ajax({
		type : "POST",
		url : "getFriends",
		data : {
			fromID : myUserID
		},
		
		success : function(data){
			if(data == "") return;
			console.log("[ajax] 친구목록 로드성공!");
			var users = JSON.parse(data);
			for(var i=0; i<users.length;i++){
				console.log(users[i]);
				addFriendList(users[i].cno,users[i].cname,users[i].email,users[i].status);
			}
			var users ="";
		}
	})
	
}

function addFriendList(cno,cname,email,status){
	var statusClass = 'inactive';
	console.log(cname+status);
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
			"<div class='status "
			+statusClass+"'>"+
			"</div>");

	
	
}