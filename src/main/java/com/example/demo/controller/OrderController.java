package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.entity.Order;
import com.example.demo.service.CustomUserDetails;
import com.example.demo.service.OrderService;

@Controller
@RequestMapping("/order")
public class OrderController {
	@Autowired
	private OrderService orderService;

	//HTML形式で返すためReactでは不要
	//	@PostMapping("/checkout")
	//	public String checkout(@AuthenticationPrincipal UserDetails userDetails, Model model) {
	//
	//		try {
	//			// CustomUserDetails にキャストして userId を取得
	//			CustomUserDetails customUser = (CustomUserDetails) userDetails;
	//			String email = customUser.getUsername(); // = email
	//			Long userId = customUser.getUserId();
	//
	//			orderService.placeOrder(email, userId);
	//
	//			model.addAttribute("message", "注文が正常に完了しました。");
	//			return "order/complete"; // 成功時のビュー名
	//
	//		} catch (Exception e) {
	//			model.addAttribute("error", "注文処理中にエラーが発生しました: " + e.getMessage());
	//			return "order/error"; // エラー時のビュー名
	//		}
	//	}

	//react用Checkoutコントローラ
	@PostMapping("/checkout")
	@ResponseBody
	public ResponseEntity<Map<String, String>> checkout(@AuthenticationPrincipal UserDetails userDetails) {
		Map<String, String> response = new HashMap<>();

		try {
			CustomUserDetails customUser = (CustomUserDetails) userDetails;
			String email = customUser.getUsername();
			Long userId = customUser.getUserId();

			orderService.placeOrder(email, userId);

			response.put("message", "注文が正常に完了しました。");
			return ResponseEntity.ok(response); // ✅ HTTP 200
		} catch (Exception e) {
			response.put("error", "注文処理中にエラーが発生しました: " + e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response); // ✅ HTTP 500
		}
	}

//	HTMLを表示する注文履歴表示機能
//	@GetMapping("/history")
//	public String viewOrderHistory(@AuthenticationPrincipal UserDetails userDetails, Model model) {
//		CustomUserDetails customUser = (CustomUserDetails) userDetails;
//		Long userId = customUser.getUserId();
//
//		List<Order> orderHistory = orderService.getOrderHistory(userId);
//		model.addAttribute("orderHistory", orderHistory);
//		return "order/history"; // templates/order/history.html を表示
//	}
	
	
	//React移行後注文履歴コントローラ
	@GetMapping("/history")
	@ResponseBody
	public ResponseEntity<List<Order>> getOrderHistory(@AuthenticationPrincipal UserDetails userDetails) {
	    CustomUserDetails customUser = (CustomUserDetails) userDetails;
	    Long userId = customUser.getUserId();

	    List<Order> orderHistory = orderService.getOrderHistory(userId);
	    return ResponseEntity.ok(orderHistory);
	}


}
