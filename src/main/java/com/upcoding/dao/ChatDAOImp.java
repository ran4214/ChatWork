package com.upcoding.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.upcoding.model.UserVO;
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

	@Override
	public List<UserVO> getFriends(String fromID) {
		return sqlsession.selectList(namespace+".getFriends",fromID);
	}

}
