package com.test;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.JsonObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserControl {
	
	@RequestMapping("/userList.do")
	public ModelAndView userList(String value){
		ModelAndView modelAndView = new ModelAndView("/index.jsp");
		Map<String, String> map = new HashMap<>();
		map.put("test", value);
		modelAndView.addAllObjects(map);
		System.out.println(1);
		return modelAndView;
	}

	@RequestMapping("/bail_report.htm")
	public ModelAndView bailReport(){
		ModelAndView modelAndView = new ModelAndView("print_bail_report.html");
		Map<String, String> map = new HashMap<>();
		map.put("test", "test1");
		modelAndView.addAllObjects(map);
		return modelAndView;
	}

	@RequestMapping("/cash_report.htm")
	public ModelAndView CashReport(){
		ModelAndView modelAndView = new ModelAndView("print_cash_report.html");
		Map<String, Object> map = new HashMap<>();
		map.put("paytime", new Date());
		modelAndView.addAllObjects(map);
		return modelAndView;
	}

	@RequestMapping(value = "/changeValue.do", produces = "application/json; charset=utf-8")
	@ResponseBody
	public String changeValue(String value){
		JsonObject jsonObject = new JsonObject();
		jsonObject.addProperty("test",value);
		return jsonObject.toString();
	}
}
