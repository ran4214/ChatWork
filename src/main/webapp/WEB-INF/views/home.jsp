<%@page import="org.rarekinel.model.UserVO"%>
<%@page import="org.springframework.web.bind.annotation.SessionAttribute"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="true"%>
<html>
<head>
<title>ChatWork</title>
<!-- external css -->
<link rel="stylesheet" href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<!-- my css -->
<link rel='stylesheet' href="/css/chat-style.css">

<!-- external js -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

<!-- my js -->
<script src="/js/chat-controller.js"></script>
<%
%>
</head>
<body>
	<c:choose>
		<c:when test="${empty sessionScope.userData}">
       		<a href="/login"><button type="button" class="btn btn-primary">login</button></a>
			<button type="button" class="btn btn-primary">chat</button>
   		</c:when>

		<c:otherwise>
       		<a href="/logout"><button type="button" class="btn btn-primary">logout</button></a>
			<button type="button" class="btn btn-primary">chat</button>
    	</c:otherwise>	
	</c:choose>


	<div id="chat-wrapper">
		<div id="tab-bar">
			<div class="bar">
				<span class="online"></span>
				<span class="bar-name"><strong>배진영</strong></span>
				<i class="fa fa-bars" id="tab-button" aria-hidden="true"></i>
			</div>
			<span id="new-message">5</span>
		</div>
		<div id="chatbox">
			<div id="friendslist">
				<div class="bar">
						<i class="fa fa-bars" aria-hidden="true"></i>
					</div>
				<div id="topmenu">
					<span class="friends"></span> <span class="chats"></span> <span
						class="history"></span>
				</div>

				<div id="friends">
					<div class="friend">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
						<p>
							<strong>배진영</strong><br> <span>ran4214@naver.com</span>
						</p>
						<div class="status available"></div>
					</div>

					<div class="friend">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
						<p>
							<strong>김민강</strong><br> <span>bae031573@gmail.com</span>
						</p>
						<div class="status away"></div>
					</div>

					<div class="friend">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/3_copy.jpg" />
						<p>
							<strong>이규민</strong><br> <span>tomaskennedy@gmail.com</span>
						</p>
						<div class="status inactive"></div>
					</div>

					<div class="friend">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/4_copy.jpg" />
						<p>
							<strong>서금지</strong><br> <span>enriquesutton@gmail.com</span>
						</p>
						<div class="status inactive"></div>
					</div>

					<div class="friend">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg" />
						<p>
							<strong>염윤철</strong><br> <span>darnellstrickland@gmail.com</span>
						</p>
						<div class="status inactive"></div>
					</div>

					<div id="search">
						<input type="text" id="searchfield" value="연락처를 검색해보세요" />
					</div>

				</div>

			</div>
			<div id="chatview" class="p1">
				<div id="profile">

					<div class="bar">
						<i class="fa fa-bars" aria-hidden="true"></i>
					</div>

					<div id="close">
						<i class="fa fa-arrow-left" aria-hidden="true"></i>
					</div>
					
					<div id="star">
						<i class="fa fa-star-o" aria-hidden="true"></i>
					</div>
					<p>Miro Badev</p>
					<span>miro@badev@gmail.com</span>
				</div>
				<div id="chat-messages">
					<label>Thursday 02</label>

					<div class="message">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
						<div class="bubble">
							Really cool stuff!
							<div class="corner"></div>
							<span>3 min</span>
						</div>
					</div>

					<div class="message right">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
						<div class="bubble">
							Can you share a link for the tutorial?
							<div class="corner"></div>
							<span>1 min</span>
						</div>
					</div>

					<div class="message">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
						<div class="bubble">
							Yeah, hold on
							<div class="corner"></div>
							<span>Now</span>
						</div>
					</div>

					<div class="message right">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
						<div class="bubble">
							Can you share a link for the tutorial?
							<div class="corner"></div>
							<span>1 min</span>
						</div>
					</div>

					<div class="message">
						<img
							src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
						<div class="bubble">
							Yeah, hold on
							<div class="corner"></div>
							<span>Now</span>
						</div>
					</div>

				</div>

				<div id="sendmessage">
					<input type="text" value="Send message..." />
					<button id="send"></button>
				</div>

			</div>
		</div>
	</div>
</body>
</html>
