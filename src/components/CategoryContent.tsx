"use client";

import React, { useState } from "react";
import ProductList from "@/components/productList";
import { useCart } from "@/lib/cartContext";
import { GetProductsByCategorySlugsResponse } from "@/lib/apiDefinitions";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  weight: string;
}

interface CategoryContentProps {
  initialProducts: GetProductsByCategorySlugsResponse;
}

export default function CategoryContent({
  initialProducts,
}: CategoryContentProps) {
  const [sortOption, setSortOption] = useState<string>("new-to-old");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useCart();

  console.log("Initial Products:", initialProducts);
  const products: Product[] = initialProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: parseFloat(p.currentPrice),
    imageSrc: p.imageUrl.String || "/placeholder.jpg",
    imageAlt: `${p.name} image halcones-boots`,
    weight: p.weight.String || "",
  }));

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "new-to-old": {
        const aDate =
          initialProducts!.find((p) => p.id === a.id)?.updatedAt.Time || "";
        const bDate =
          initialProducts!.find((p) => p.id === b.id)?.updatedAt.Time || "";
        return new Date(bDate).getTime() - new Date(aDate).getTime();
      }
      case "old-to-new": {
        const aDate =
          initialProducts!.find((p) => p.id === a.id)?.updatedAt.Time || "";
        const bDate =
          initialProducts!.find((p) => p.id === b.id)?.updatedAt.Time || "";
        return new Date(aDate).getTime() - new Date(bDate).getTime();
      }
      case "low-to-high":
        return a.price - b.price;
      case "high-to-low":
        return b.price - a.price;
      case "name-a-to-z":
        return a.name.localeCompare(b.name);
      case "name-z-to-a":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(initialProducts![0]?.totalCount || 0);

  return (
    <div>
      <div className="flex justify-end items-center mb-8">
        <div className="relative">
          <select
            id="sort-filter"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none rounded-lg bg-tanned-leather text-dark-leather px-4 py-2 pr-8 text-sm font-medium shadow-md hover:bg-tanned-leather/90 focus:outline-none focus:ring-2 focus:ring-tanned-leather focus:ring-offset-2 transition-all duration-200 cursor-pointer"
          >
            <option
              value="new-to-old"
              className="bg-ivory-cream text-dark-leather"
            >
              Newest to Oldest
            </option>
            <option
              value="old-to-new"
              className="bg-ivory-cream text-dark-leather"
            >
              Oldest to Newest
            </option>
            <option
              value="low-to-high"
              className="bg-ivory-cream text-dark-leather"
            >
              Price: Low to High
            </option>
            <option
              value="high-to-low"
              className="bg-ivory-cream text-dark-leather"
            >
              Price: High to Low
            </option>
            <option
              value="name-a-to-z"
              className="bg-ivory-cream text-dark-leather"
            >
              Name: A to Z
            </option>
            <option
              value="name-z-to-a"
              className="bg-ivory-cream text-dark-leather"
            >
              Name: Z to A
            </option>
          </select>
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-dark-leather"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </div>
      </div>
      <ProductList
        products={sortedProducts}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onAddToCart={addToCart}
      />
    </div>
  );
}
