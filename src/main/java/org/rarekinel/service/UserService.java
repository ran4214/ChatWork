package org.rarekinel.service;

import javax.inject.Inject;

import org.rarekinel.dao.UserDAO;
import org.rarekinel.model.UserVO;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	
	@Inject
	private UserDAO dao;
	
	public UserVO loginService(String userID,String userPassword) throws Exception {
		return dao.login(userID, userPassword);
	}
}
