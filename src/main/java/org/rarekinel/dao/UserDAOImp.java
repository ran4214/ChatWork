package org.rarekinel.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.rarekinel.model.UserVO;
import org.springframework.stereotype.Repository;


@Repository
public class UserDAOImp implements UserDAO {
	
	@Inject
	private SqlSession sqlsession;

	private static final String namespace = "mappers.UserMapper";

	@Override
	public UserVO login(String userID, String userPassword) throws Exception {
		return (UserVO)sqlsession.selectOne(namespace+".login",userID);
	}

	@Override
	public int online(String userID) {
		return sqlsession.update(namespace+".online",userID);
	}

}
