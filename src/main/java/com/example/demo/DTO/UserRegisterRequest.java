package com.example.demo.DTO;

public class UserRegisterRequest {

	private String email;
	private String password;

	//getter setterの設定
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
