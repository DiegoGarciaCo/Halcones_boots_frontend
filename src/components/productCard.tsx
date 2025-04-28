// src/components/productcard.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext"; // Adjust path
import { toast } from "sonner"; // Import toast from sonner

interface Product {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  weight: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (
    productId: string,
    quantity: number,
    price: string,
    name: string,
    imageUrl: string,
    weight: string
  ) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const { inventory } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Find the product's available stock from inventory
  const inventoryItem = inventory.find((item) => item.productId === product.id);
  const availableStock = inventoryItem
    ? inventoryItem.stock - inventoryItem.reservedStock
    : 0;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    const newQuantity = Math.max(1, Math.min(value, availableStock));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity > availableStock) {
      toast.error("Not enough stock available.", {
        description: "Please reduce the quantity.",
      });
      return;
    }
    onAddToCart(
      product.id,
      quantity,
      product.price.toString(),
      product.name,
      product.imageSrc,
      product.weight
    );
    setQuantity(1); // Reset quantity after successful add
    toast.success(`${quantity} ${product.name}(s) added to cart!`);
  };

  return (
    <div className="relative">
      <Link
        href={`/product/${product.id}`}
        className="relative h-96 w-full rounded-lg overflow-hidden block"
      >
        <Image
          alt={product.imageAlt}
          src={product.imageSrc}
          height={500}
          width={500}
          className="object-cover hover:opacity-75 transition-opacity duration-300"
        />
      </Link>
      <div className="relative z-10">
        {" "}
        {/* Ensure controls are above the link */}
        <h3 className="mt-4 text-base font-semibold text-dark-leather">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-dusty-taupe">
          ${product.price.toFixed(2)}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min="1"
            max={availableStock}
            value={quantity}
            onChange={handleQuantityChange}
            className="w-12 rounded-full bg-warm-beige border border-tanned-leather/20 px-2 py-1 text-sm text-dark-leather focus:ring-1 focus:ring-tanned-leather focus:outline-none"
            disabled={availableStock === 0}
          />
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-tanned-leather px-3 py-1 text-sm font-medium text-ivory-cream hover:bg-aged-brass transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={availableStock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
