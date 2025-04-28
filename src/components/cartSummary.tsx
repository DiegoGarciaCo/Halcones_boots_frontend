// src/components/CartSummary.tsx
"use client"; // Add this since we're using hooks
import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";

export default function CartSummary() {
  const { cartItems } = useCart(); // Get cartItems from context

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shipping = 0; // Placeholder, calculate later if needed
  const tax = 0; // Placeholder
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-ivory-cream p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-dark-leather mb-4">
        Order Summary
      </h2>
      <div className="space-y-2 text-dusty-taupe">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-dark-leather pt-2 border-t border-tanned-leather/20">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-md bg-tanned-leather px-4 py-2 text-center text-sm font-semibold text-ivory-cream hover:bg-aged-brass transition-colors duration-300"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
