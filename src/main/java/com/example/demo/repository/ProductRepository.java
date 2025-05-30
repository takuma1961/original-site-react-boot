package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Product;

import jakarta.transaction.Transactional;

public interface ProductRepository extends JpaRepository<Product, Long> {
	//JpaRepositoryの標準機能を使用

	@Modifying
	@Transactional
	@Query("UPDATE Product p SET p.viewCount = p.viewCount + 1 WHERE p.id = :id")
	void incrementViewCount(@Param("id") Long id);

}
