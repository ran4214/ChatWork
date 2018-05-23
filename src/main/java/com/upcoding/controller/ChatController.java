package com.upcoding.controller;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
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
		
		for(int i=0;i<chatList.size();i++) {
			String day = chatList.get(i).getChatTime().substring(5,11);
			String hour = chatList.get(i).getChatTime().substring(11, 13);
			String minute = chatList.get(i).getChatTime().substring(14, 16);
			String time = null;
			
			if(Integer.parseInt(hour)>11) {
				time = "오후";
				if(Integer.parseInt(hour) != 12) {
					hour = (Integer.parseInt(hour)-12)+"";
				}
			}else {
				time = "오전";
				if(Integer.parseInt(hour)==0) {
					hour = "12";
				}
			}
			
			String chatTime = day+time+" "+hour+":"+minute;
			chatList.get(i).setChatTime(chatTime);
		}
		
		String re = "";
		Gson gson = new Gson();
		re = gson.toJson(chatList);
		
		
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
	
	@RequestMapping(value = "/getChat", method = RequestMethod.POST)
	public void getChatPOST(String fromID,String lastChatID,HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		
		System.out.println("[Chat-controller] getChat");
		List<ChatVO> chatList = service.getChatService(fromID, lastChatID);
		Gson gson = new Gson();
		String re = "";
		while(chatList.toString() == "[]") {
			chatList = service.getChatService(fromID, lastChatID);
			Thread.sleep(100);
		}
		
		for(int i=0;i<chatList.size();i++) {
			String day = chatList.get(i).getChatTime().substring(5,11);
			String hour = chatList.get(i).getChatTime().substring(11, 13);
			String minute = chatList.get(i).getChatTime().substring(14, 16);
			String time = null;
			
			if(Integer.parseInt(hour)>11) {
				time = "오후";
				if(Integer.parseInt(hour) != 12) {
					hour = (Integer.parseInt(hour)-12)+"";
				}
			}else {
				time = "오전";
				if(Integer.parseInt(hour)==0) {
					hour = "12";
				}
			}
				
			String chatTime = day+time+" "+hour+":"+minute;
			chatList.get(i).setChatTime(chatTime);
		}
		
		re = gson.toJson(chatList);
		response.getWriter().write(re);
		
	}

	@RequestMapping(value = "/searchUser", method = RequestMethod.POST)
	public void searchUserPOST(String userID,String myCno,HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		System.out.println("[Chat-controller] searchUser");
		
		UserVO user = null;
		String status = "";
		
		user = service.searchUserService(userID);
		
		if(user != null && !(myCno.equals(user.getCno()+""))) {
			
			
			String friendName = service.searchFriendService(myCno, user.getCno()+"");
			
			if(friendName != null) {
				status = "true";
			}else {
				status = "false";
			}
			
			HashMap<String,Object> map = new HashMap<String,Object>();
			map.put("user", user);
			map.put("status",status);
			
			Gson gson = new Gson();
			String re = gson.toJson(map);
			
			response.getWriter().write(re);
		}
		
		response.getWriter().write("");
	}
	
	@RequestMapping(value = "/getChatList", method = RequestMethod.POST)
	public void getChatListPOST(String cno,HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		
		System.out.println("[Chat-controller] getChatList");
		
		
		int re = -1;
		List<UserVO> list = service.getChatList(cno);
		
		response.getWriter().write("");
	}
}
