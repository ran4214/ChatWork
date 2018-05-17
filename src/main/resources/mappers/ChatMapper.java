package mappers;

import java.util.List;

import com.upcoding.model.UserVO;

public interface ChatMapper {
	public int addFriend(String fromID,String toID);
	public int deleteFriend(String fromID,String toID);
	public List<UserVO> getFriends(String fromID);
}
