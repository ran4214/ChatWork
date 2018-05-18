package com.upcoding.controller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.net.SyslogAppender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.gson.Gson;
import com.upcoding.model.ChatVO;
import com.upcoding.model.UserVO;
import com.upcoding.service.ChatService;

@Controller
public class ChatController {

	@Inject
	private ChatService service;

	@RequestMapping(value = "/addFriend", method = RequestMethod.POST)
	public void addFriendPOST(String fromID, String toID, HttpServletResponse response) throws Exception {
		System.out.println("[Chat-controller] addFriend");
		int re = -1;
		re = service.addFriendService(fromID, toID);
		
		response.getWriter().write(re);
	}

	@RequestMapping(value = "/deleteFriend", method = RequestMethod.POST)
	public void deleteFriendPOST(String fromID,String toID,HttpServletResponse response) throws Exception {
		System.out.println("[Chat-controller] deleteFriend");
		int re = -1;
		re = service.deleteFriendService(fromID, toID);
		
		response.getWriter().write(re);
	}
	
	@RequestMapping(value = "/getFriends", method = RequestMethod.POST)
	public void getFriendPost(String fromID,HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		
		System.out.println("[Chat-controller] getFriends");
		List<UserVO> friends = null;
		friends = service.getFriendsService(fromID);
		Gson gson = new Gson();
		
		String re = gson.toJson(friends);
		response.getWriter().write(re);
	}
	
	@RequestMapping(value = "/getMyAllChat", method = RequestMethod.POST)
	public void getMyAllChat(String fromID,HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		
		System.out.println("[Chat-controller] getMyAllChat");
		List<ChatVO> chatList = null;
		chatList = service.getMyAllChatting(fromID);
		Gson gson = new Gson();
		
		String re = gson.toJson(chatList);
		response.getWriter().write(re);
	}
	
	@RequestMapping(value = "/sendChat", method = RequestMethod.POST)
	public void sendChatPOST(String fromID,String toID,String chatContent,HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		
		System.out.println("[Chat-controller] sendChat");
		int re = -1;
		re = service.sendChatService(fromID, toID,chatContent);
		
		response.getWriter().write(re);
	}
}
