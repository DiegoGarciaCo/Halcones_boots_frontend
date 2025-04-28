"use client";
import React from "react";
import ProductCard from "./productCard";
import { Product } from "./CategoryContent";

interface ProductListProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onAddToCart: (
    product: string,
    quantity: number,
    price: string,
    name: string,
    imageUrl: string,
    weight: string
  ) => void;
}

export default function ProductList({
  products,
  totalPages,
  currentPage,
  onPageChange,
  onAddToCart,
}: ProductListProps) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-tanned-leather text-ivory-cream hover:bg-aged-brass disabled:bg-dusty-taupe disabled:text-ivory-cream/50 transition-colors duration-300"
          >
            Previous
          </button>
          <span className="text-dark-leather font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-tanned-leather text-ivory-cream hover:bg-aged-brass disabled:bg-dusty-taupe disabled:text-ivory-cream/50 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
