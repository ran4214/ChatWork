package com.upcoding.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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
}
