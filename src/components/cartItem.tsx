// src/components/CartItem.tsx
"use client";
import React from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "@/lib/cartContext";
import { toast } from "sonner";

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageSrc: string;
  imageAlt: string;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  imageSrc,
  imageAlt,
}: CartItemProps) {
  const { updateQuantity, removeItem, inventory } = useCart();

  // Find the product's available stock from inventory
  const inventoryItem = inventory.find((item) => item.productId === id);
  const availableStock = inventoryItem
    ? inventoryItem.stock - inventoryItem.reservedStock
    : 0;

  const handleIncreaseQuantity = () => {
    const newQuantity = quantity + 1;
    if (newQuantity > availableStock) {
      toast.error("Not enough stock available.", {
        description: "Cannot increase quantity further.",
      });
      return;
    }
    updateQuantity(id, newQuantity);
    toast.success(`Updated ${name} to ${newQuantity} in cart.`);
  };

  const handleDecreaseQuantity = () => {
    const newQuantity = Math.max(1, quantity - 1);
    updateQuantity(id, newQuantity);
    if (newQuantity < quantity) {
      toast.success(`Updated ${name} to ${newQuantity} in cart.`);
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-tanned-leather/20">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-dark-leather">{name}</h3>
        <p className="text-dusty-taupe">${price.toFixed(2)}</p>
        <div className="mt-2 flex items-center space-x-2">
          <button
            onClick={handleDecreaseQuantity}
            className="p-1 text-tanned-leather hover:text-aged-brass disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="text-dark-leather">{quantity}</span>
          <button
            onClick={handleIncreaseQuantity}
            className="p-1 text-tanned-leather hover:text-aged-brass disabled:text-gray-400 disabled:cursor-not-allowed"
            disabled={availableStock === 0 || quantity >= availableStock}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => removeItem(id)}
        className="ml-4 text-tanned-leather hover:text-aged-brass"
      >
        <XMarkIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
