// app/components/TrendingProducts.tsx
// No "use client" - this is a Server Component

import React from "react";
import Link from "next/link";
import { Suspense } from "react";
import Skeleton from "./skeleton"; // Assuming this is still a Client Component
import TrendingProductsCard from "./TrendingProductsClient"; // New Client Component for interactivity
import { GetTopSoldProductsResponse } from "@/lib/apiDefinitions";

// Server-side data fetching
async function getProducts(): Promise<GetTopSoldProductsResponse> {
  const res = await fetch("http://localhost:8080/api/products/top-products", {
    cache: "no-store", // Adjust caching as needed
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Server Component
export default async function TrendingProducts() {
  let products: GetTopSoldProductsResponse;
  try {
    products = await getProducts();
  } catch (error) {
    return (
      <section aria-labelledby="favorites-heading" className="bg-ivory-cream">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2
              id="favorites-heading"
              className="text-2xl font-bold tracking-tight text-dark-leather"
            >
              Trending Products
            </h2>
            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-tanned-leather hover:text-aged-brass sm:block"
            >
              Browse All Products
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
          <div className="mt-6 text-center text-red-600">
            Failed to load trending products. Please try again later.
          </div>
          <div className="mt-6 sm:hidden">
            <Link
              href="/shop"
              className="block text-sm font-semibold text-tanned-leather hover:text-aged-brass"
            >
              Browse All Products
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="favorites-heading" className="bg-ivory-cream">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2
            id="favorites-heading"
            className="text-2xl font-bold tracking-tight text-dark-leather"
          >
            Trending Products
          </h2>
          <Link
            href="/shop"
            className="hidden text-sm font-semibold text-tanned-leather hover:text-aged-brass sm:block"
          >
            Browse All Products
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
          <Suspense
            fallback={Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="group relative">
                <div className="relative h-96 w-full rounded-lg overflow-hidden">
                  <Skeleton
                    width="100%"
                    height="100%"
                    variant="rect"
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-4">
                  <Skeleton width="50%" height="24px" variant="text" />
                </div>
                <div className="mt-1">
                  <Skeleton width="33%" height="16px" variant="text" />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Skeleton
                    width="48px"
                    height="32px"
                    variant="rect"
                    className="rounded-full"
                  />
                  <Skeleton
                    width="100px"
                    height="32px"
                    variant="rect"
                    className="rounded-full"
                  />
                </div>
              </div>
            ))}
          >
            <TrendingProductsCard products={products} />
          </Suspense>
        </div>
        <div className="mt-6 sm:hidden">
          <Link
            href="/shop"
            className="block text-sm font-semibold text-tanned-leather hover:text-aged-brass"
          >
            Browse All Products
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
