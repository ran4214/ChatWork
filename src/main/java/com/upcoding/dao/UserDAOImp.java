package com.upcoding.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.upcoding.model.UserVO;


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
	
	@Override
	public int offline(String userID) {
		return sqlsession.update(namespace+".offline",userID);
	}

}
