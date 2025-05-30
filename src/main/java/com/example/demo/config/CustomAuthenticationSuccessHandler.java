package com.example.demo.config;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(
			HttpServletRequest request,
			HttpServletResponse response,
			Authentication authentication)
			throws IOException, ServletException {
		//react用に追加2025/5/29 start
		response.setStatus(HttpServletResponse.SC_OK);
		response.setContentType("application/json");
		response.getWriter().write("{\"message\": \"Login successful\"}");
		//react用に追加2025/5/29 end
		
		// ユーザーのロールに応じてリダイレクト先を変更
		boolean isAdmin = false;
		for (GrantedAuthority auth : authentication.getAuthorities()) {
			if ("ROLE_ADMIN".equals(auth.getAuthority())) {
				isAdmin = true;
				break;
			}
		}

		if (isAdmin) {
			response.sendRedirect("/admin/products"); // 管理者用ホーム
		} else {
			response.sendRedirect("/home"); // 一般ユーザー用ホーム
		}
	}

}
