package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class ReactRoutingController {
	@GetMapping({ "/product/{id}", "/cart", "/checkout" }) // 必要なSPAルートを列挙
	public String forwardReactRoutes() {
		return "forward:/index.html";
	}
}
