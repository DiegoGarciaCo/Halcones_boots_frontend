// app/checkout/page.tsx
// No "use client" - this is a Server Component

import React from "react";
import { Suspense } from "react";
import Skeleton from "@/components/skeleton";
import CheckoutContent from "@/components/CheckoutContent";

export default function CheckoutPage() {
  return (
    <div className="bg-ivory-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static Header */}
        <h1 className="text-3xl font-bold text-dark-leather mb-8">Checkout</h1>

        {/* Dynamic Content with Suspense */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column Skeleton (Shipping + Payment) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Shipping Form Skeleton */}
                <div className="space-y-4">
                  <Skeleton width="200px" height="24px" variant="rect" />
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      width="100%"
                      height="40px"
                      variant="rect"
                      className="rounded-md"
                    />
                  ))}
                </div>
                {/* Payment Form Skeleton */}
                <div className="space-y-4">
                  <Skeleton width="200px" height="24px" variant="rect" />
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      width="100%"
                      height="40px"
                      variant="rect"
                      className="rounded-md"
                    />
                  ))}
                </div>
                {/* Submit Button Skeleton */}
                <Skeleton
                  width="100%"
                  height="48px"
                  variant="rect"
                  className="rounded-md"
                />
              </div>
              {/* Right Column Skeleton (Order Summary) */}
              <div className="lg:col-span-1 space-y-4">
                <Skeleton width="150px" height="24px" variant="rect" />
                <Skeleton width="100%" height="200px" variant="rect" />
                <Skeleton width="100%" height="60px" variant="rect" />
              </div>
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  );
}
