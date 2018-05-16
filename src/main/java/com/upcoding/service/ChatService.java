package com.upcoding.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.upcoding.dao.ChatDAO;

@Service
public class ChatService {
	public ChatService() {}

	@Inject
	private ChatDAO dao;
	
	public int addFriendService(String fromID,String toID) {
		return dao.addFriend(fromID, toID);
	}
	
	public int deleteFriendService(String fromID,String toID) {
		return dao.deleteFriend(fromID, toID);
	}
}
