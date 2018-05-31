<%@page import="com.upcoding.model.UserVO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="true"%>
<html>
<head>
<title>ChatWork</title>


</head>
<body>
	<c:choose>
		<c:when test="${empty sessionScope.userData}">
       		<a href="/login"><button type="button" class="btn btn-primary">login</button></a>
			<button type="button" class="btn btn-primary" onclick="noLoginChat()">chat</button>
   		</c:when>

		<c:otherwise>
       		<a href="/logout"><button type="button" class="btn btn-primary">logout</button></a>
			<button id="chaton" type="button" class="btn btn-primary" onclick="chatStart(myUserID)">chat</button>
    	</c:otherwise>	
	</c:choose>
	
	<a href="/home1">1페이지</a>
	<a href="/home2">2페이지</a>
	<a href="/home3">3페이지</a>
	

</body>
</html>
