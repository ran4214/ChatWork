<%@ page pageEncoding="utf-8" session="false"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<html>
    <head>
        <meta charset="utf-8">
        <!-- external css -->
		<link rel="stylesheet" href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700'>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		
		<!-- my css -->
		<link rel='stylesheet' href="/css/chat-style.css">
		
		<!-- external js -->
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/vue"></script>
		<script src="//unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
		<script src="//unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
		
		<!-- my js -->
		<script src="./js/chat-setting-controller.js"></script>
		<script src="./js/page-controller.js"></script>
		
			<!-- 기본 정보 담는곳 -->

    </head>
    <body>
        <tiles:insertAttribute name="header" />
        <div id="bodyContent"><tiles:insertAttribute name="content" /></div>
        <tiles:insertAttribute name="footer" />
    </body>
</html>