<%@page import="com.upcoding.model.UserVO"%>
<script type="text/javascript">
	<%
		int myUserID = 0;
		if(session.getAttribute("userData")!=null){
			UserVO userData = (UserVO)session.getAttribute("userData");
			myUserID = userData.getCno();
		}
		
	%>
	var myUserID = '<%=myUserID%>';
	
</script>

<div>header</div>