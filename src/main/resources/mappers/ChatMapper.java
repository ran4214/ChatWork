package mappers;

public interface ChatMapper {
	public int addFriend(String fromID,String toID);
	public int deleteFriend(String fromID,String toID);
	public ArrayList<UserVO> getFriends(String fromID);
}
