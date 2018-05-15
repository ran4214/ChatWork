package com.upcoding.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.upcoding.dao.UserDAO;
import com.upcoding.model.UserVO;


@Service
public class UserService {
	
	public UserService() {}
	
	@Inject
	private UserDAO dao;
	
	public UserVO loginService(String userID,String userPassword) throws Exception {
		return dao.login(userID, userPassword);
	}
	
	public int onlineService(String userID) {
		return dao.online(userID);
	}
	
	public int offlineService(String userID) {
		return dao.offline(userID);
	}
}
