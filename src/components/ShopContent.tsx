"use client";
// app/shop/ShopContent.tsx

import React, { useState } from "react";
import ProductList from "@/components/productList";
import { useCart } from "@/lib/cartContext";
import { GetProductsResponse } from "@/lib/apiDefinitions";

interface ShopContentProps {
  initialProducts: GetProductsResponse;
  itemsPerPage: number;
}

export default function ShopContent({
  initialProducts,
  itemsPerPage,
}: ShopContentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  // For simplicity, we'll use the initial data and rely on client-side pagination
  // In a real app, you might fetch new pages client-side or use a server action
  const allProducts = initialProducts.map((product) => ({
    id: product.ID,
    name: product.Name,
    price: parseFloat(product.CurrentPrice),
    weight: product.Weight.String,
    imageSrc: product.ImageUrl.String,
    imageAlt: "Halcones-Boots " + product.Name,
  }));

  const totalPages = Math.ceil(initialProducts[0].TotalCount / itemsPerPage);

  return (
    <ProductList
      products={allProducts}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onAddToCart={addToCart}
    />
  );
}
