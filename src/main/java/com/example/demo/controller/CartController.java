package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.CartItem;
import com.example.demo.service.CartService;
import com.example.demo.service.CustomUserDetails;
import com.example.demo.service.UserService;

import jakarta.transaction.Transactional;

@RestController
//@CrossOrigin(origins = "http://localhost:3000" , allowCredentials = "true")
public class CartController {
	private final CartService cartService;
	private final UserService userService;

	//ReactからCart追加機能を使用する際に使用する変数
	public static Long productId;
	public static int quantity;

	public CartController(CartService cartService, UserService userService) {
		this.cartService = cartService;
		this.userService = userService;
	}

	//Reactカート表示用コントローラー
	@GetMapping("/cart")
	@ResponseBody
	public ResponseEntity<CartResponse> getCartContents() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
		Long userId = userDetails.getUserId();

		List<CartItem> cartItems = cartService.getCartItemsByUserId(userId);
		int totalPrice = cartService.calculateTotal(cartItems);

		CartResponse response = new CartResponse(cartItems, totalPrice);
		return ResponseEntity.ok(response);
	}

	//バックエンド用
	//	@PostMapping("/cart/add")
	//	@Transactional
	//	@ResponseBody
	//	public ResponseEntity<String> addToCartAjax(@RequestParam Long productId, @RequestParam int quantity) {
	//		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	//		CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
	//		Long userId = userDetails.getUserId();
	//
	//		cartService.addToCart(userId, productId, quantity);
	//		return ResponseEntity.ok("カートに追加しました");
	//	}

	//react用のカート追加機能
	@PostMapping("/cart/add")
	@Transactional
	@ResponseBody
	public ResponseEntity<String> addToCartAjax(@RequestBody AddToCartRequest request) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
		Long userId = userDetails.getUserId();

		cartService.addToCart(userId, request.productId, request.quantity);
		return ResponseEntity.ok("カートに追加しました");
	}

	//カートから商品削除
	@PostMapping("/cart/delete")
	public String deleteCartItem(@RequestParam Long cartItemId, Authentication authentication) {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		Long userId = userDetails.getUserId();

		cartService.deleteCartItem(cartItemId, userId);
		return "redirect:/cart";
	}

	//カートの商品個数変更
	@PostMapping("/cart/update")
	public String updateCart(@RequestParam("cartItemIds") List<Long> cartItemIds,
			@RequestParam("quantities") List<Integer> quantities) {
		for (int i = 0; i < cartItemIds.size(); i++) {
			cartService.updateQuantity(cartItemIds.get(i), quantities.get(i));
		}
		return "redirect:/cart";
	}

	public static class AddToCartRequest {
		public Long productId;
		public int quantity;
	}

	//カートの内容を表示する際に使用
	public static class CartResponse {
		public List<CartItem> cartItems;
		public int totalPrice;

		public CartResponse(List<CartItem> cartItems, int totalPrice) {
			this.cartItems = cartItems;
			this.totalPrice = totalPrice;
		}
	}

}
