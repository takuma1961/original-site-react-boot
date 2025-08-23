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
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.filter.ForwardedHeaderFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.service.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
@Profile("prod")
public class SecurityConfig {

	private final CustomUserDetailsService userDetailsService;
	private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	
	// フィールドとしてハンドラを持たせる
    private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
    private final CustomAuthenticationFailureHandler customAuthenticationFailureHandler;

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
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				// HTTPS強制（単純に全リクエスト）
				//★.requiresChannel(channel -> channel.anyRequest().requiresSecure())
				//.requestMatchers("/perform_login").requiresSecure()

				// CSRF 無効
				.csrf(csrf -> csrf.disable())

				.cors(cors -> cors.configurationSource(request -> {
		            CorsConfiguration config = new CorsConfiguration();
		            config.setAllowedOriginPatterns(List.of("https://d3iu7cobg7buke.cloudfront.net"));
		            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		            config.setAllowedHeaders(List.of("*"));
		            config.setAllowCredentials(true);
		            return config;
		        }))
				
				// 認証プロバイダ
				.authenticationProvider(authenticationProvider())

				// URLごとの認可
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.requestMatchers("/admin/**").hasRole("ADMIN")
						.requestMatchers("/", "/login", "/register", "/css/**", "/js/**", "/images/**" , "/Admin/**").permitAll()
						.anyRequest().authenticated())

				// 例外処理
				.exceptionHandling(exception -> exception
						.authenticationEntryPoint(customAuthenticationEntryPoint))

				// フォームログイン
				.formLogin(form -> form
						.loginProcessingUrl("/perform_login")
						.usernameParameter("username")
						.passwordParameter("password")
						.successHandler(customAuthenticationSuccessHandler) // ← フィールドを参照
						.failureHandler(customAuthenticationFailureHandler) // ← フィールドを参照
						.permitAll())

				// ログアウト
				.logout(logout -> logout
						.logoutUrl("/logout")
						.logoutSuccessUrl("/login?logout=true")
						.permitAll());

		return http.build();
	}

	// Cookie SameSite=None にしてHTTPS必須
	@Bean
	public TomcatServletWebServerFactory tomcatServletWebServerFactory() {
		TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
		factory.addContextCustomizers(context -> {
			Rfc6265CookieProcessor cookieProcessor = new Rfc6265CookieProcessor();
			cookieProcessor.setSameSiteCookies("None");// クロスオリジンで送信可能
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
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
	    return new WebMvcConfigurer() {
	        @Override
	        public void addCorsMappings(CorsRegistry registry) {
	            registry.addMapping("/**")
	                    .allowedOriginPatterns("https://d3iu7cobg7buke.cloudfront.net")
	                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	                    .allowedHeaders("*")
	                    .allowCredentials(true);
	        }
	    };
	}

//	@Bean
//	@Order(0)
//	public FilterRegistrationBean<CorsFilter> corsFilter() {
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowedOriginPatterns(List.of("https://d3iu7cobg7buke.cloudfront.net"));
//		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//		config.setAllowedHeaders(List.of("*"));
//		config.setAllowCredentials(true);
//		source.registerCorsConfiguration("/**", config);
//
//		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
//		bean.setOrder(0); // SecurityFilterChain より前に実行
//		return bean;
//	}
}
