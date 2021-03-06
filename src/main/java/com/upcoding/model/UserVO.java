package com.upcoding.model;

import java.io.Serializable;
import java.sql.Timestamp;


public class UserVO implements Serializable {

	int cno;
	String cname;
	String id;
	String pass;
	String location;
	String grade;
	String favor;
	int leveltest;
	Timestamp regdate;
	int status;
	String email;
	
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public int getCno() {
		return cno;
	}
	public void setCno(int cno) {
		this.cno = cno;
	}
	public String getCname() {
		return cname;
	}
	@Override
	public String toString() {
		return "UserVO [cno=" + cno + ", cname=" + cname + ", id=" + id + ", pass=" + pass + ", location=" + location
				+ ", grade=" + grade + ", favor=" + favor + ", leveltest=" + leveltest + ", regdate=" + regdate
				+ ", status=" + status + ", email=" + email + "]";
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPass() {
		return pass;
	}
	public void setPass(String pass) {
		this.pass = pass;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public String getFavor() {
		return favor;
	}
	public void setFavor(String favor) {
		this.favor = favor;
	}
	public int getLeveltest() {
		return leveltest;
	}
	public void setLeveltest(int leveltest) {
		this.leveltest = leveltest;
	}
	public Timestamp getRegdate() {
		return regdate;
	}
	public void setRegdate(Timestamp regdate) {
		this.regdate = regdate;
	}
	
	

	

}
