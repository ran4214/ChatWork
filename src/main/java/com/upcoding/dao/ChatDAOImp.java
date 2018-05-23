package com.upcoding.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.upcoding.model.ChatVO;
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

	@Override
	public List<ChatVO> getMyAllChat(String fromID) {
		return sqlsession.selectList(namespace+".getMyAllChat",fromID);
	}

	@Override
	public int sendChat(String fromID, String toID,String chatContent) {
		HashMap<String, String> map = new HashMap<String,String>();
		map.put("fromID", fromID);
		map.put("toID", toID);
		map.put("chatContent",chatContent);
		
		return sqlsession.insert(namespace+".sendChat",map);
	}
	
	@Override
	public List<ChatVO> getChat(String fromID,String lastChatID) {
		HashMap<String, String> map = new HashMap<String,String>();
		map.put("fromID", fromID);
		map.put("lastChatID", lastChatID);
		
		return sqlsession.selectList(namespace+".getChat",map);
	}

	@Override
	public UserVO searchUser(String userID) {
		return sqlsession.selectOne(namespace+".searchUser",userID);
	}

	@Override
	public String searchFriend(String myCno, String searchCno) {
			HashMap<String, String> map = new HashMap<String,String>();
			map.put("myCno", myCno);
			map.put("searchCno", searchCno);
			
		return sqlsession.selectOne(namespace+".searchFriend",map);
	}

	@Override
	public List<UserVO> getChatList(String cno) {
		List<UserVO> all = new ArrayList<UserVO>();
		List<UserVO> sender = null;
		List<UserVO> receiver = null;
		
		sender = sqlsession.selectList(namespace+".sender",cno);
		receiver = sqlsession.selectList(namespace+".receiver",cno);
		
		for(int i=0;i<sender.size();i++) {
			all.add(sender.get(i));
		}
		
		for(int i=0;i<receiver.size();i++) {
			all.add(receiver.get(i));
		}
		
		HashSet<UserVO> hshs = new HashSet<UserVO>(all);
		
		List<UserVO> all_modified = new ArrayList<UserVO>(hshs);
		
		
		for(int i=0;i<all_modified.size();i++) {
			System.out.println(all_modified.get(i));
		}
		
		return all;
	}

}
