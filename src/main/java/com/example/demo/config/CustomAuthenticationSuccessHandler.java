package com.example.demo.config;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(
			HttpServletRequest request,
			HttpServletResponse response,
			Authentication authentication)
			throws IOException, ServletException {

		response.setStatus(HttpServletResponse.SC_OK);
		response.setContentType("application/json;charset=UTF-8");

		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(auth -> "ROLE_ADMIN".equals(auth.getAuthority()));

		String json = String.format(
				"{\"message\": \"Login successful\", \"role\": \"%s\"}",
				isAdmin ? "ADMIN" : "USER");

		response.getWriter().write(json);
		response.getWriter().flush();
	}
}