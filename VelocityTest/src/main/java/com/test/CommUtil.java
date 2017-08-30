package com.test;

import java.text.SimpleDateFormat;
import java.util.*;

public class CommUtil {

	/**
	 * 以一个默认格式格式化时间显示
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDate(Date date) {
		return formatDate("yyyy年MM月dd日 HH:mm:ss E", date);
	}

	/**
	 * 格式化时间显示
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDate(String type, Date date) {
		return new SimpleDateFormat(type).format(date);
	}

	public static  void  main (String args[]){
		System.out.println(formatDate("yyyy年MM月dd日",new Date()));
	}
}
