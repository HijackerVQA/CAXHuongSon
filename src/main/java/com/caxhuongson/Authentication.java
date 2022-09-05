package com.caxhuongson;

import javax.servlet.http.Cookie;

public class Authentication{
	public Cookie cookie = null;
	public String acc = null;
	public Authentication(Cookie[] cookies) {
		if(cookies != null) {
			for(int i=0;i<cookies.length;i++)
				if(cookies[i].getName().compareTo("account") == 0) {
					cookie = cookies[i];
					acc = cookies[i].getValue();
				}
		}
	}
}
