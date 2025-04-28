// src/components/OrderSummary.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/lib/cartContext";

interface ShippingTaxResponse {
  shipping: number;
  tax: number;
}

interface OrderSummaryProps {
  shippingData?: { [key: string]: string };
  onTotalsChange: (totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  }) => void;
}

export default function OrderSummary({
  shippingData,
  onTotalsChange,
}: OrderSummaryProps) {
  const { cartItems } = useCart();

  const [shipping, setShipping] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  useEffect(() => {
    const calculateShippingAndTax = async () => {
      const currentSubtotal = cartItems.reduce(
        (sum, item) => sum + parseFloat(item.price) * item.quantity,
        0
      );

      if (!shippingData || !Object.values(shippingData).some(Boolean)) {
        setShipping(0);
        setTax(0);
        onTotalsChange({
          subtotal: currentSubtotal,
          shipping: 0,
          tax: 0,
          total: currentSubtotal,
        });
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/api/calculate-order",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ items: cartItems, shipping: shippingData }),
          }
        );

        if (!response.ok)
          throw new Error("Failed to calculate shipping and tax");

        const data: ShippingTaxResponse = await response.json();
        setShipping(data.shipping || 0);
        setTax(data.tax || 0);

        onTotalsChange({
          subtotal: currentSubtotal,
          shipping: data.shipping || 0,
          tax: data.tax || 0,
          total: currentSubtotal + (data.shipping || 0) + (data.tax || 0),
        });
      } catch (error) {
        console.error("Error fetching shipping and tax:", error);
        setShipping(5.0);
        setTax(currentSubtotal * 0.08);
        onTotalsChange({
          subtotal: currentSubtotal,
          shipping: 5.0,
          tax: currentSubtotal * 0.08,
          total: currentSubtotal + 5.0 + currentSubtotal * 0.08,
        });
      }
    };

    if (cartItems.length > 0) {
      calculateShippingAndTax();
    }
  }, []);

  const total = subtotal + shipping + tax;

  return (
    <div className="bg-ivory-cream p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-dark-leather mb-4">
        Order Summary
      </h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex justify-between text-dusty-taupe"
          >
            <span>
              {item.name} (x{item.quantity})
            </span>
            <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-tanned-leather/20 pt-2 space-y-2 text-dusty-taupe">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {shipping === 0 && cartItems.length > 0
                ? "Calculated at next step"
                : `$${shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>
              {tax === 0 && cartItems.length > 0
                ? "Calculated at next step"
                : `$${tax.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-dark-leather pt-2 border-t border-tanned-leather/20">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
