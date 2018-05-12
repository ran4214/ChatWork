package mappers;

import java.util.ArrayList;
import java.util.HashMap;

import org.rarekinel.model.ChatVO;

public interface ChatMapper {
	public ArrayList<ChatVO> getChatListByID(String fromID,String toID,String chatID);
	public ArrayList<ChatVO> getChatListByRecent(HashMap<String, Object> map);
	public int submit(String fromID,String toID,String chatContent);
	public ArrayList<String> getToChatRoom(String userID);
	public ArrayList<String> getFromChatRoom(String userID);
}
