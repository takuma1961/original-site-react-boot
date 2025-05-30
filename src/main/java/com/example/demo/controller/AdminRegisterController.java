package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Controller
@RequestMapping("/Admin")
public class AdminRegisterController {

	@Autowired
	private UserService userService;

	@GetMapping("/register")
	public String showAdminRegisterForm(Model model) {
		model.addAttribute("user", new User());
		return "admin_register";
	}

//	@PostMapping("/AddAdminRegister")
//	public String registerAdmin(@ModelAttribute("user") User user) {
//		user.setRole(Role.ADMIN);//管理者として設定
//		user.setEnabled(true);//メール認証をスキップ
//		userService.registerUser(user);//登録処理
//		return "redirect:/login_admin"; //ログインページにリダイレクト
//	}
	@PostMapping("/AddAdminRegister")
	public String registerAdmin(@ModelAttribute("user") User user, Model model) {
	    if (userService.existsByEmail(user.getEmail())) {
	        model.addAttribute("error", "既に登録済みのメールアドレスです");
	        return "admin_register"; // 管理者登録画面のテンプレート名に合わせてください
	    }

	    user.setRole(Role.ADMIN);   // 管理者として設定
	    user.setEnabled(true);      // メール認証をスキップ
	    userService.registerUser(user); // 登録処理
	    return "redirect:/login_admin"; // ログインページにリダイレクト
	}

}
