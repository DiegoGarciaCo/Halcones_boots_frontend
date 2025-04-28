// src/components/CartSummaryDetails.tsx
// No "use client" - this is a Server Component

import { CartItem } from "@/lib/cartContext";
import React from "react";

async function fetchShippingAndTax(cartItems: any[]): Promise<{
  shipping: number;
  tax: number;
}> {
  const response = await fetch("http://localhost:8080/api/cart/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: cartItems }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Failed to fetch shipping and tax");
  const data = await response.json();
  return { shipping: data.shipping || 0, tax: data.tax || 0 };
}

interface CartSummaryDetailsProps {
  cartItems: CartItem[];
}

export default async function CartSummaryDetails({
  cartItems,
}: CartSummaryDetailsProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  let shipping = 0;
  let tax = 0;
  try {
    const { shipping: fetchedShipping, tax: fetchedTax } =
      await fetchShippingAndTax(cartItems);
    shipping = fetchedShipping;
    tax = fetchedTax;
  } catch (error) {
    console.error("Error fetching shipping and tax:", error);
    // Fallback to defaults or display an error message
  }

  const total = subtotal + shipping + tax;

  return (
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
  );
}
