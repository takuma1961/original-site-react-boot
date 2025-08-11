package com.example.demo.config;

import java.util.List;

import org.apache.tomcat.util.http.Rfc6265CookieProcessor;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.ForwardedHeaderFilter;

import com.example.demo.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@Profile("local")
public class SecurityConfig_local {

	private final CustomUserDetailsService userDetailsService;
	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	//	@Bean
	//	public PasswordEncoder passwordEncoder() {
	//		return new BCryptPasswordEncoder();
	//	}

	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		authProvider.setUserDetailsService(userDetailsService);
		authProvider.setPasswordEncoder(passwordEncoder());
		return authProvider;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler() {
		return new CustomAuthenticationSuccessHandler();
	}

	@Bean
	public CustomAuthenticationFailureHandler customAuthenticationFailureHandler() {
		return new CustomAuthenticationFailureHandler();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.cors(Customizer.withDefaults())
				.csrf(csrf -> csrf.disable())
				.authenticationProvider(authenticationProvider())
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // ← 追加
						.requestMatchers("/admin/**").hasRole("ADMIN")
						.requestMatchers("/", "/register", "/login", "/css/**", "/js/**", "/images/**",
								"/admin_register", "/login_admin", "/Admin/AddAdminregister",
								"/api/**", "/products", "/order/**", "/cart/**")
						.permitAll()
						.anyRequest().authenticated())
				.exceptionHandling(exception -> exception
						.authenticationEntryPoint(customAuthenticationEntryPoint))
				.formLogin(form -> form
						.loginProcessingUrl("/perform_login")
						//.loginPage("/login") 開発環境ではコメントを外す、ec2ではコメントアウト
						.usernameParameter("username")
						.passwordParameter("password")
						.successHandler(customAuthenticationSuccessHandler())
						.failureHandler(customAuthenticationFailureHandler())
						.permitAll())
				.logout(logout -> logout
						.logoutUrl("/logout")
						.logoutSuccessUrl("/login?logout=true")
						.permitAll());

		return http.build();
	}

	/**
	 * CORS設定：React(ポート3000)を許可し、Cookie送信も許可
	 */
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {

		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of("https://localhost:3000"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
		//		configuration.setAllowCredentials(true); // ← これが最重要
		//		configuration.addAllowedOrigin("http://localhost:3000"); // フロントのURL
		//		configuration.addAllowedHeader("*");
		//		configuration.addAllowedMethod("*");
		//
		//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		//		source.registerCorsConfiguration("/**", configuration);
		//		return source;
	}

	//最近のブラウザでは、SameSite 属性がない Cookie はブロックされることがあるため以下でSameSite 属性を設定
	/**
	 * TomcatのCookieのSameSite属性を"Lax"に設定
	 * ローカル開発でhttpsを使わない場合はこちら推奨
	 */
	@Bean
	public TomcatServletWebServerFactory tomcatServletWebServerFactory() {
		TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
		factory.addContextCustomizers(context -> {
			Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor();
			cookieProcessor.setSameSiteCookies("None"); // "None" にすると https が必要
			context.setCookieProcessor(cookieProcessor);
		});
		return factory;
	}
	
	@Bean
	public FilterRegistrationBean<ForwardedHeaderFilter> forwardedHeaderFilter() {
	    FilterRegistrationBean<ForwardedHeaderFilter> filterRegBean = new FilterRegistrationBean<>();
	    filterRegBean.setFilter(new ForwardedHeaderFilter());
	    filterRegBean.setOrder(0);
	    return filterRegBean;
	}

}
