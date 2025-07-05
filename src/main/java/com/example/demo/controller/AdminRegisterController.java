package com.example.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/Admin")
public class AdminRegisterController {

	@Autowired
	private UserService userService;

	@GetMapping("/register")
	public String showAdminRegisterForm(Model model) {
		model.addAttribute("user", new User());
		return "admin_register";
	}

	//Reactへ移行のためコメントアウト
	//	@PostMapping("/AddAdminRegister")
	//	public String registerAdmin(@ModelAttribute("user") User user, Model model) {
	//		if (userService.existsByEmail(user.getEmail())) {
	//			model.addAttribute("error", "既に登録済みのメールアドレスです");
	//			return "admin_register"; // 管理者登録画面のテンプレート名に合わせてください
	//		}
	//
	//		user.setRole(Role.ADMIN); // 管理者として設定
	//		user.setEnabled(true); // メール認証をスキップ
	//		userService.registerUser(user); // 登録処理
	//		return "redirect:/login_admin"; // ログインページにリダイレクト
	//	}

	@PostMapping("/AddAdminregister")
	public ResponseEntity<?> registerAdmin(@RequestBody User user) {//ResponseEntity<?>どんな型のレスポンスボディでも OK
	
		if (userService.existsByEmail(user.getEmail())) {
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body(Map.of("error", "すでに登録済みのメールアドレスです"));
		}
		user.setRole(Role.ROLE_ADMIN);
		user.setEnabled(true);
		userService.registerUser(user);

		return ResponseEntity.status(HttpStatus.CREATED)
				.body(Map.of("message", "完了"));
	}

}
