package org.rarekinel.dao;

import org.rarekinel.model.UserVO;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDAO {
	public UserVO login(String userID, String userPassword)throws Exception;
}
