<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<title>ChatWork</title>


<!-- external css -->
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">

<!-- my css -->
<link rel='stylesheet' href="/css/chat-style.css">

<!-- external js -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>

<!-- my js -->
<script src="/js/chat-controller.js"></script>


</head>
<body>

	<div id="chatbox">
		<div id="friendslist">
			<div id="topmenu">
				<span class="friends"></span> <span class="chats"></span> <span
					class="history"></span>
			</div>

			<div id="friends">
				<div class="friend">
					<img
						src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/1_copy.jpg" />
					<p>
						<strong>Martin rooter</strong><br><span>mirobadev@gmail.com</span>
					</p>
					<div class="status available"></div>
				</div>

				<div class="friend">
					<img
						src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/2_copy.jpg" />
					<p>
						<strong>Martin</strong><br><span>marjoseph@gmail.com</span>
					</p>
					<div class="status away"></div>
				</div>

				<div class="friend">
					<img
						src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/3_copy.jpg" />
					<p>
						<strong>Tomas Kennedy</strong><br><span>tomaskennedy@gmail.com</span>
					</p>
					<div class="status inactive"></div>
				</div>

				<div class="friend">
					<img
						src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/4_copy.jpg" />
					<p>
						<strong>Enrique Sutton</strong><br><span>enriquesutton@gmail.com</span>
					</p>
					<div class="status inactive"></div>
				</div>

				<div class="friend">
					<img
						src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/5_copy.jpg" />
					<p>
						<strong> Darnell Strickland</strong><br><span>darnellstrickland@gmail.com</span>
					</p>
					<div class="status inactive"></div>
				</div>

				<div id="search">
					<input type="text" id="searchfield" value="Search contacts..." />
				</div>

			</div>

		</div>

		<div id="chatview" class="p1">
			<div id="profile">

				<div id="close">
					<div class="cy"></div>
					<div class="cx"></div>
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
</body>
</html>
