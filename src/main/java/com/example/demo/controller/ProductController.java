package com.example.demo.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;

@Controller
public class ProductController {
	public final ProductService productService;

	//productServiceの機能を本クラスで使用可能にするコンストラクタ
	public ProductController(ProductService productService) {
		this.productService = productService;

	}

	//商品情報を全件取得するメソッド
	@GetMapping("/products")
	public String showProductList(Model model) {
		List<Product> productList = productService.findAllproduct();
		model.addAttribute("products", productList);
		return "shop_page";//shop_page.htmlへ
	}
	
	@GetMapping("/products/{id}")
	public String showProductDetail(@PathVariable Long id, Model model) {
	    Product product = productService.getProductById(id);
	    if (product == null) {
	        return "error/404"; // 商品が存在しない場合は404エラーページへ
	    }
	    // 閲覧数をインクリメント
	    productService.incrementViewCount(id);
	    
	    model.addAttribute("product", product);
	    return "/product/product_detail"; // → templates/product_detail.html へ
	}
	

}
