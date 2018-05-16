package com.upcoding.dao;

import org.springframework.stereotype.Repository;

@Repository
public interface ChatDAO {
	public int addFriend(String fromID,String toID);
	public int deleteFriend(String fromID,String toID);
}
