"use client";
// src/components/CartSummaryContent.tsx

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { Suspense } from "react";
import Skeleton from "@/components/skeleton";
import CartSummaryDetails from "./CartSummaryDetails";

export default function CartSummaryContent() {
  const { cartItems } = useCart();

  return (
    <div className="bg-ivory-cream p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-dark-leather mb-4">
        Order Summary
      </h2>
      <Suspense
        fallback={
          <div className="space-y-2">
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
        }
      >
        <CartSummaryDetails cartItems={cartItems} />
      </Suspense>
      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-md bg-tanned-leather px-4 py-2 text-center text-sm font-semibold text-ivory-cream hover:bg-aged-brass transition-colors duration-300"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
