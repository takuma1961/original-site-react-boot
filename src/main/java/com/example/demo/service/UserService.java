package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

	//UserRepositoryの機能を使用するためにインスタンスを保持する
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;

	//UserServiceインスタンの作成時に自動でUserRepositoryのインスタンスを探して上記userRepositoryに代入する
	@Autowired
	public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	// ユーザー登録（即有効化）
	public void registerUser(User user) {
		// パスワードをハッシュ化
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		user.setEnabled(true); // すぐに有効化
		// トークンは不要（SMTPなし）
		user.setVerificationToken(null);
		// 保存
		userRepository.save(user);
	}

	//重複メールアドレスチェック
	public boolean existsByEmail(String email) {
		return userRepository.findByEmail(email).isPresent();
	}

	// トークンを元にユーザー有効化（不要になった）
	public boolean verifyUser(String token) {
		// トークン認証の処理は不要
		return true; // 仮に成功扱いにする
	}

	public boolean resetPassword(String token, String newPassword) {
		Optional<User> tokenOpt = userRepository.findByResetToken(token);

		if (tokenOpt.isEmpty()) {
			return false;
		}

		User user = tokenOpt.get();

		//トークンの有効期限チェック
		if (user.getTokenExpiry() == null || user.getTokenExpiry().isBefore(LocalDateTime.now())) {
		    return false;
		}


		// パスワード更新
		user.setPassword(passwordEncoder.encode(newPassword));

		// トークンの無効化
		user.setResetToken(null);
		user.setTokenExpiry(null);

		userRepository.save(user);

		return true;
	}

}
