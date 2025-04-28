// app/product/[id]/page.tsx
// No "use client" - this is a Server Component

import React from "react";
import { Suspense } from "react";
import Skeleton from "@/components/skeleton"; // Assuming this is a Client Component
import ProductContent from "@/components/ProductContent";

// TypeScript interfaces from the API response
interface ProductImage {
  id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface NullString {
  String: string;
  Valid: boolean;
}

interface NullTime {
  Time: string;
  Valid: boolean;
}

interface NullInt32 {
  Int32: number;
  Valid: boolean;
}

interface Product {
  ID: string;
  CategoryID: string;
  Name: string;
  Description: NullString;
  BasePrice: string;
  CurrentPrice: string;
  ImageUrl: NullString;
  CreatedAt: NullTime;
  UpdatedAt: NullTime;
  Stock: NullInt32;
  Images: ProductImage[];
}

// Fetch product data server-side
async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:8080/api/products/${id}`, {});
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// Server Component
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  let product: Product;
  try {
    product = await fetchProduct(id);
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Error: {(error as Error).message || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="bg-ivory-cream">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <Suspense
          fallback={
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              {/* ImageGallery Skeleton */}
              <div className="flex flex-col-reverse">
                {/* Thumbnails */}
                <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                  <div className="grid grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        width="96px"
                        height="96px"
                        variant="rect"
                        className="rounded-md"
                      />
                    ))}
                  </div>
                </div>
                {/* Main Image */}
                <div className="relative">
                  <Skeleton
                    width="100%"
                    height="500px"
                    variant="rect"
                    className="sm:rounded-lg"
                  />
                  <Skeleton
                    width="40px"
                    height="40px"
                    variant="circle"
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  />
                  <Skeleton
                    width="40px"
                    height="40px"
                    variant="circle"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>

              {/* ProductInfo and ProductDetails Skeleton */}
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-12">
                <div className="space-y-6">
                  <Skeleton width="300px" height="36px" variant="rect" />
                  <Skeleton width="120px" height="36px" variant="rect" />
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        width="20px"
                        height="20px"
                        variant="rect"
                      />
                    ))}
                  </div>
                  <Skeleton width="100%" height="60px" variant="rect" />
                  <div className="space-y-2">
                    <Skeleton width="60px" height="20px" variant="text" />
                    <div className="flex gap-x-3">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          width="32px"
                          height="32px"
                          variant="circle"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Skeleton
                      width="200px"
                      height="48px"
                      variant="rect"
                      className="rounded-md"
                    />
                    <Skeleton
                      width="48px"
                      height="48px"
                      variant="rect"
                      className="rounded-md"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton width="100px" height="20px" variant="text" />
                      <Skeleton width="80%" height="40px" variant="rect" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        >
          <ProductContent product={product} />
        </Suspense>
      </div>
    </div>
  );
}
