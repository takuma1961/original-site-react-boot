package com.example.demo.config;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException {

		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
		response.setContentType("application/json;charset=UTF-8");

		PrintWriter out = response.getWriter();
		out.print("{\"error\": \"認証が必要です。\"}");
		out.flush();
	}
}