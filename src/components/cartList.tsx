// src/components/CartList.tsx
"use client"; // Add this since we're using hooks
import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import CartItem from "./cartItem";

export default function CartList() {
  const { cartItems } = useCart(); // Get cartItems from context

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-dark-leather">
          Your Cart is Empty
        </h2>
        <p className="mt-2 text-dusty-taupe">Add some items to get started!</p>
        <Link
          href="/shop"
          className="mt-4 inline-block text-tanned-leather hover:text-aged-brass font-semibold"
        >
          Shop Now →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <CartItem
          key={item.productId}
          id={item.productId}
          name={item.name}
          price={parseFloat(item.price)} // Assuming price is a string in CartContext
          quantity={item.quantity}
          imageSrc={item.imageUrl}
          imageAlt={`${item.name} at Halcones Boots`}
        />
      ))}
    </div>
  );
}
