package com.upcoding.model;

import java.io.Serializable;

public class ChatVO implements Serializable {

	int chatID;
	String fromID;
	String toID;
	String chatContent;
	String chatTime;
	int read;
	

	public int getChatID() {
		return chatID;
	}

	public void setChatID(int chatID) {
		this.chatID = chatID;
	}

	public String getFromID() {
		return fromID;
	}

	public void setFromID(String fromID) {
		this.fromID = fromID;
	}

	public String getToID() {
		return toID;
	}

	public void setToID(String toID) {
		this.toID = toID;
	}

	public String getChatContent() {
		return chatContent;
	}

	public int getRead() {
		return read;
	}

	public void setRead(int read) {
		this.read = read;
	}

	public void setChatContent(String chatContent) {
		this.chatContent = chatContent;
	}

	public String getChatTime() {
		return chatTime;
	}

	public void setChatTime(String chatTime) {
		this.chatTime = chatTime;
	}

	@Override
	public String toString() {
		return "ChatVO [chatID=" + chatID + ", fromID=" + fromID + ", toID=" + toID + ", chatContent=" + chatContent
				+ ", chatTime=" + chatTime + "]";
	}
	
}
