package com.upcoding.dao;

import java.util.HashMap;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;
@Repository
public class ChatDAOImp implements ChatDAO {

	@Inject
	private SqlSession sqlsession;

	private static final String namespace = "mappers.ChatMapper";
	
	@Override
	public int addFriend(String fromID, String toID) {
		HashMap<String, String> map = new HashMap<String,String>();
		map.put("fromID", fromID);
		map.put("toID", toID);
		
		return sqlsession.insert(namespace+".addFriend",map);
	}

	@Override
	public int deleteFriend(String fromID, String toID) {
		HashMap<String, String> map = new HashMap<String,String>();
		map.put("fromID", fromID);
		map.put("toID", toID);
		
		return sqlsession.insert(namespace+".deleteFriend",map);
	}

}
