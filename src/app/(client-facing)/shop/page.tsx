// app/shop/page.tsx
// No "use client" - this is a Server Component

import React from "react";
import { Suspense } from "react";
import Skeleton from "@/components/skeleton"; // Assuming this is a Client Component
import CategoryNav from "@/components/categoryNav";
import {
  GetAllCategoriesResponse,
  GetProductsResponse,
} from "@/lib/apiDefinitions";
import ShopContent from "@/components/ShopContent";

// Server-side data fetching functions
async function getProducts(
  page: number,
  size: number = 9
): Promise<GetProductsResponse> {
  const url = `http://localhost:8080/api/products?page=${page}&size=${size}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

async function getCategories(): Promise<GetAllCategoriesResponse> {
  const res = await fetch("http://localhost:8080/api/categories", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// Server Component
export default async function ShopPage() {
  const itemsPerPage = 9;

  return (
    <div className="bg-ivory-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CategoryNav with Suspense */}
        <Suspense
          fallback={
            <div className="pb-8">
              <Skeleton
                width="200px"
                height="28px"
                className="mb-4"
                variant="rect"
              />
              <div className="flex space-x-8 overflow-x-auto">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    width="224px"
                    height="320px"
                    variant="rect"
                    className="rounded-lg"
                  />
                ))}
              </div>
            </div>
          }
        >
          <CategoryNav categories={await getCategories()} />
        </Suspense>

        {/* Static Header */}
        <h1 className="text-3xl font-bold text-dark-leather mt-12 mb-8">
          Shop All Products
        </h1>

        {/* Product List with Suspense */}
        <Suspense
          fallback={
            <div>
              <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton
                      width="100%"
                      height="300px"
                      variant="rect"
                      className="rounded-md"
                    />
                    <Skeleton width="80%" height="20px" variant="text" />
                    <Skeleton width="40%" height="16px" variant="text" />
                    <Skeleton
                      width="60%"
                      height="32px"
                      variant="rect"
                      className="rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center items-center gap-4">
                <Skeleton
                  width="80px"
                  height="40px"
                  variant="rect"
                  className="rounded-md"
                />
                <Skeleton width="120px" height="20px" variant="text" />
                <Skeleton
                  width="80px"
                  height="40px"
                  variant="rect"
                  className="rounded-md"
                />
              </div>
            </div>
          }
        >
          <ShopContent
            initialProducts={await getProducts(1, itemsPerPage)}
            itemsPerPage={itemsPerPage}
          />
        </Suspense>
      </div>
    </div>
  );
}
