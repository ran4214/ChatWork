package com.upcoding.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.upcoding.model.ChatVO;
import com.upcoding.model.UserVO;

@Repository
public interface ChatDAO {
	public int addFriend(String fromID,String toID);
	public int deleteFriend(String fromID,String toID);
	public List<UserVO> getFriends(String fromID);
	public List<ChatVO> getMyAllChat(String fromID);
	public int sendChat(String fromID,String toID, String chatContent);
	public List<ChatVO> getChat(String fromID, String lastChatID);
	public UserVO searchUser(String userID);
	public String searchFriend(String myCno,String searchCno);
	public List<UserVO> getChatList(String cno);
	public int readAllChat(String myUserID,String toChatID);
	public int getUnreadChatCount(String myUserID,String toChatID);
	public int readChat(String chatID);
}
