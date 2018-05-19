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
}
