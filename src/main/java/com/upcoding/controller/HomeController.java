package com.upcoding.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;



import com.upcoding.model.UserVO;
import com.upcoding.service.UserService;

@Controller
public class HomeController {
	
private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Inject
	private UserService service;
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public void loginPage() {}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Object login(HttpServletRequest request,String userID, String userPassword) throws Exception {
		
		if (userID == null || userID.equals("") || userPassword.equals("") || userPassword == null) {
			System.out.println("정상적인 값을 입력해주세요.");
		}
		
		UserVO user = null;
		user = service.loginService(userID, userPassword);

		if(user==null) {
		}else {
			request.getSession().setAttribute("userData",user);
			ModelAndView mav = new ModelAndView();
			
			mav.setView(new RedirectView("/"));
			
			return mav;
		}
		return null;
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public ModelAndView logoutGET(HttpServletRequest request) throws Exception {
		request.getSession().invalidate();
		
		ModelAndView mav = new ModelAndView();
		
		mav.setView(new RedirectView("/"));
		
		return mav;
	}
	
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public void logoutPOST(HttpServletRequest request) throws Exception {
		request.getSession().invalidate();
	}
	
}
