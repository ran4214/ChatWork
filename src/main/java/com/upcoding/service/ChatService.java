package com.upcoding.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.upcoding.dao.ChatDAO;
import com.upcoding.model.ChatVO;
import com.upcoding.model.UserVO;

@Service
public class ChatService {
	public ChatService() {
	}

	@Inject
	private ChatDAO dao;

	public int addFriendService(String fromID, String toID) {
		return dao.addFriend(fromID, toID);
	}

	public int deleteFriendService(String fromID, String toID) {
		return dao.deleteFriend(fromID, toID);
	}

	public List<UserVO> getFriendsService(String fromID) {
		return dao.getFriends(fromID);
	}

	public List<ChatVO> getMyAllChatting(String fromID) {
		return dao.getMyAllChat(fromID);
	}

	public int sendChatService(String fromID, String toID, String chatContent) {
		return dao.sendChat(fromID, toID, chatContent);
	} 
	
	public List<ChatVO> getChatService(String fromID, String lastChatID) {
		return dao.getChat(fromID, lastChatID);
	}
	
	public UserVO searchUserService(String userID) {
		return dao.searchUser(userID);
	}
	
	public String searchFriendService(String myCno,String searchCno) {
		return dao.searchFriend(myCno, searchCno);
	}
	
	public List<UserVO> getChatList(String cno){
		return dao.getChatList(cno);
	}
	
	public int readAllChatService(String myUserID,String toChatID) {
		return dao.readAllChat(myUserID, toChatID);
	}
}
