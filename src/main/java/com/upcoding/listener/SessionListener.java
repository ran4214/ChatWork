package com.upcoding.listener;

import java.util.HashMap;

import javax.jws.WebParam;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import com.upcoding.model.UserVO;
import com.upcoding.service.UserService;

@Component
public class SessionListener implements HttpSessionAttributeListener,ServletContextListener,ApplicationContextAware{
	
	@Autowired
	private UserService service;
	
	WebApplicationContext context;
	
	HashMap<String,UserVO> loginUser = new HashMap<String, UserVO>();
	
	@Override
	public void attributeAdded(HttpSessionBindingEvent se) {
		HttpSession session = se.getSession();
		int re = -1;
		UserVO user = (UserVO)session.getAttribute("userData");
		
		if(service != null) {
			re = service.onlineService(user.getId());
		}
		
		
		
		if(re>0) {
			System.out.println("SessionListener : "+user.getCname()+"님이 로그인 하였습니다.");
			String userValue = se.getValue()+"";
			loginUser.put(userValue,user);
			System.out.println("현재 접속중인 유저 : "+loginUser.size());
		}
		
		
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent se) {
		
		String userValue = se.getValue()+"";
		
		UserVO user = loginUser.get(userValue);
		loginUser.remove("userValue");
		System.out.println("SessionListener : "+user.getCname()+"님이 로그아웃 하였습니다.");
	}

	@Override
	public void attributeReplaced(HttpSessionBindingEvent se) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		if (applicationContext instanceof WebApplicationContext) {
            ((WebApplicationContext) applicationContext).getServletContext().addListener(this);
        } else {
            //Either throw an exception or fail gracefully, up to you
            throw new RuntimeException("Must be inside a web application context");
        }
	}

}
