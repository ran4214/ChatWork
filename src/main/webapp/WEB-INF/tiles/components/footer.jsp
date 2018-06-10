<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div>footer</div>

<!-- chat -->
	<div id="chat-wrapper">
		<div id="tab-bar" style="display: none">
			<!-- <div class="bar">
				<span class="online"></span>
				<span class="bar-name"><strong>배진영</strong></span>
				<i class="fa fa-bars" id="tab-button" aria-hidden="true"></i>
			</div> -->


			<div class="bar" id="bottom-bar">
				<i class="fa fa-comments" aria-hidden="true"></i>
				<span class="bar-name"><strong>채팅</strong></span>
				<i class="fa fa-bars" id="tab-button" aria-hidden="true"></i>
			</div>


			<span id="new-message">5</span>

		</div>
		<div id="chatbox" style="display: none">
		
		
			<div id="friendslist">
				<div class="bar">
					<i class="fa fa-bars" aria-hidden="true"></i>
				</div>
				<div class="topmenu"> <!-- 상단탑바 -->
					<span class="friends"></span>
					<span class="chats"></span>
					<span class="search"></span>
				</div>

				<div id="friends">

					<!-- 친구의 목록들이 들어가는곳 -->

				</div>
				
				<div id="search">
					<input type="text" id="searchfield" placeholder="연락처를 검색해보세요" />
				</div>

			</div>
			
			
			<div id="chatroomlist" style="display:none">
				<div class="bar">
					<i class="fa fa-bars" aria-hidden="true"></i>
				</div>
				<div class="topmenu"> <!-- 상단탑바 -->
					<span class="friends"></span>
					<span class="chats"></span>
					<span class="search"></span>
				</div>

				<div id="chatrooms">
					<todo-item
				        v-for="item in sortedChatroom"
				        v-bind:todo="item"
				        v-bind:key="item.id">
				    </todo-item>
				</div>


			</div>
			
			
			<div id="searchlist" style="display:none">
				<div class="bar">
					<i class="fa fa-bars" aria-hidden="true"></i>
				</div>
				<div class="topmenu"> <!-- 상단탑바 -->
					<span class="friends"></span>
					<span class="chats"></span>
					<span class="search"></span>
				</div> 

				<div id="searchs">

					<!-- 아이디 검색 목록 -->

				</div>
				
				<div id="user-search">
					<input type="text" id="user-searchfield" placeholder="아이디로 친구를 추가해보세요." />
				</div>

			</div>


			<div id="chatview" class="p1">
				<div id="profile">

					<div class="bar">
						<i class="fa fa-bars"></i>
					</div>

					<div id="close">
						<i class="fa fa-arrow-left"></i>
					</div>

					<div id="star" onclick="friend(myUserID)">
						<i class="fa fa-star-o"></i>
					</div>
					<p id="toChatUser">Miro Badev</p>
					<input type="hidden" id="toChatID" value=""> <span>miro@badev@gmail.com</span>
				</div>
				<div id="chat-messages"></div>

				<div id="sendmessage">
					<input type="text" placeholder="메세지를 입력하세요."/>
					<button id="send"></button>
				</div>

			</div>
		
		
		</div>
	</div>







	<!-- alert modal -->
	<div class="modal fade" id="alertModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">알림</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true"></span>
					</button>
				</div>
				<div class="modal-body">로그인이 필요한 컨텐츠입니다.</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	