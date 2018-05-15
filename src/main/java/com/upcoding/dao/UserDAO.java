package com.upcoding.dao;

import org.springframework.stereotype.Repository;

import com.upcoding.model.UserVO;

@Repository
public interface UserDAO {
	public UserVO login(String userID, String userPassword)throws Exception;
	public int online(String userID);
	public int offline(String userID);
}
