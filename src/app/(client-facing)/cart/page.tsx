// src/app/(client-facing)/cart/page.tsx
// No "use client" - this is a Server Component

import React from "react";
import { Suspense } from "react";
import Skeleton from "@/components/skeleton";
import CartList from "@/components/cartList";
import CartSummary from "@/components/cartSummary";

export default function CartPage() {
  return (
    <div className="bg-ivory-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static Header */}
        <h1 className="text-3xl font-bold text-dark-leather mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart List with Suspense */}
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Skeleton
                        width="96px"
                        height="96px"
                        variant="rect"
                        className="rounded-md"
                      />
                      <div className="flex-1 space-y-2">
                        <Skeleton width="60%" height="20px" variant="text" />
                        <Skeleton width="40%" height="16px" variant="text" />
                        <div className="flex space-x-4">
                          <Skeleton
                            width="80px"
                            height="32px"
                            variant="rect"
                            className="rounded-md"
                          />
                          <Skeleton
                            width="80px"
                            height="32px"
                            variant="rect"
                            className="rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              }
            >
              <CartList />
            </Suspense>
          </div>

          {/* Cart Summary with Suspense */}
          <div className="lg:col-span-1">
            <Suspense
              fallback={
                <div className="bg-ivory-cream p-6 rounded-lg shadow-md">
                  <Skeleton width="150px" height="24px" variant="rect" />
                  <div className="space-y-2 mt-4">
                    <Skeleton width="100%" height="20px" variant="text" />
                    <Skeleton width="100%" height="20px" variant="text" />
                    <Skeleton width="100%" height="20px" variant="text" />
                    <Skeleton
                      width="100%"
                      height="20px"
                      variant="text"
                      className="pt-2 border-t border-tanned-leather/20"
                    />
                  </div>
                  <Skeleton
                    width="100%"
                    height="40px"
                    variant="rect"
                    className="mt-6 rounded-md"
                  />
                </div>
              }
            >
              <CartSummary />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
