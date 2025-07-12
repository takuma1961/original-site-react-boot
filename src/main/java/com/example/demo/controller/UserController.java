package com.example.demo.controller;

import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResetPasswordRequest;
import com.example.demo.DTO.UserRegisterRequest;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@Autowired
	public UserRepository userRepository;

	@Autowired
	private JavaMailSender mailSender;

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
		String email = request.get("email");
		Optional<User> optionalUser = userRepository.findByEmail(email);

		if (!optionalUser.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("メールアドレスが見つかりません");
		}

		User user = optionalUser.get();
		String token = UUID.randomUUID().toString();

		user.setResetToken(token);
		user.setTokenExpiry(LocalDateTime.now().plusMinutes(30));// 有効期限30分
		userRepository.save(user);

		// リセットURLを作成
		String resetUrl = "http://localhost:3000/reset-password?token=" + token;

		// メール送信（本番ではtry-catch推奨）
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(user.getEmail());
		message.setSubject("パスワード再設定リンク");
		message.setText("以下のリンクからパスワードを再設定してください:\n" + resetUrl);
		mailSender.send(message);

		return ResponseEntity.ok("リセットリンクを送信しました。");

	}

	//パスワードリセット
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
		//デバック
		System.out.println("✅ リセットリクエスト受信: トークン=" + request.getToken() + ", 新パスワード=" + request.getNewPassword());
		boolean success = userService.resetPassword(request.getToken(), request.getNewPassword());

		if (success) {
			return ResponseEntity.ok().body(Map.of("message", "パスワードが再設定されました"));
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(Map.of("message", "トークンが無効または期限切れです"));
		}
	}

	//	// ユーザー登録
	//	@PostMapping("/register")
	//	public String register(@ModelAttribute User user, HttpServletRequest request, Model model) {
	//		try {
	//			user.setRole(Role.ROLE_USER);
	//			userService.registerUser(user); // メール認証を省略して即登録
	//			return "redirect:/login";//登録成功時はログイン画面にリダイレクト
	//			//			model.addAttribute("message", "登録が完了しました。");
	//		} catch (DataIntegrityViolationException e) {
	//			if (e.getRootCause() instanceof SQLIntegrityConstraintViolationException &&
	//					e.getRootCause().getMessage().contains("Duplicate entry")) {
	//				model.addAttribute("errorMessage", "このメールアドレスは既に登録されています。");
	//			} else {
	//				model.addAttribute("errorMessage", "登録中に予期せぬエラーが発生しました。");
	//			}
	//		}
	//		return "register"; // 成功・失敗に関係なく登録画面に戻す	
	//	}

	// ユーザー登録(React用)
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody UserRegisterRequest request) {
		try {
			User user = new User();
			user.setEmail(request.getEmail());
			user.setPassword(request.getPassword());
			user.setRole(Role.ROLE_USER);
			userService.registerUser(user); // メール認証を省略して即登録
			// 登録成功 → HTTP 200 OK + メッセージ
			return ResponseEntity.ok(Map.of("message", "登録完了"));

		} catch (DataIntegrityViolationException e) {
			if (e.getRootCause() instanceof SQLIntegrityConstraintViolationException &&
					e.getRootCause().getMessage().contains("Duplicate entry")) {
				// 重複エラー → HTTP 409 Conflict
				return ResponseEntity.status(HttpStatus.CONFLICT)
						.body(Map.of("errorMessage", "このメールアドレスは既に登録されています。"));
			} else {
				// その他のエラー → HTTP 500 Internal Server Error
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(Map.of("errorMessage", "登録中に予期せぬエラーが発生しました。"));
			}
		}
	}

	@GetMapping("/verify")
	public String verify(@RequestParam("token") String token) {
		boolean result = userService.verifyUser(token);
		return result ? "認証完了しました！" : "無効なトークンです。";
	}

}
