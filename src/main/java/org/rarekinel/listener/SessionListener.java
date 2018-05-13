package org.rarekinel.listener;

import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;

import org.rarekinel.model.UserVO;
import org.rarekinel.service.UserService;

public class SessionListener implements HttpSessionAttributeListener,ServletContextListener{
	
	private UserService service;
	
	HashMap<String,UserVO> loginUser = new HashMap<String, UserVO>();
	
	@Override
	public void attributeReplaced(HttpSessionBindingEvent se) {
		
	}

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		
	}
	
	@Override
	public void attributeAdded(HttpSessionBindingEvent se) {
		HttpSession session = se.getSession();
		
		UserVO user = (UserVO)session.getAttribute("userData");
		int re = service.onlineService(user.getId());
		
		if(re>0) {
			System.out.println("SessionListener : "+user.getCname()+"´ÔÀÌ ·Î±×ÀÎ ÇÏ¼Ì½À´Ï´Ù.");
			String userValue = se.getValue()+"";
			loginUser.put(userValue,user);
		}
	}

	@Override
	public void attributeRemoved(HttpSessionBindingEvent se) {
		String userValue = se.getValue()+"";
		UserVO user = loginUser.get(userValue);
		loginUser.remove("userValue");
		System.out.println("SessionListener : "+user.getCname()+"´ÔÀÌ ·Î±×¾Æ¿ô ÇÏ¼Ì½À´Ï´Ù.");
		
		}


	
	
}
