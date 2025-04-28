"use client";
// app/components/ProductCards.tsx

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";
import { toast } from "sonner";
import { GetTopSoldProductsResponse } from "@/lib/apiDefinitions";

interface Product {
  id: string;
  name: string;
  price: string;
  weight: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}

interface ProductCardsProps {
  products: GetTopSoldProductsResponse;
}

export default function TrendingProductsCard({ products }: ProductCardsProps) {
  const { inventory, addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const favorites = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.currentPrice,
    weight: product.weight,
    href: `/product/${product.id}`,
    imageSrc: product.imageUrl,
    imageAlt: `${product.name} at Halcones Boots`,
  }));

  const handleQuantityChange = (
    productId: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value) || 1;
    const inventoryItem = inventory.find(
      (item) => item.productId === productId
    );
    const availableStock = inventoryItem
      ? inventoryItem.stock - inventoryItem.reservedStock
      : 0;
    const newQuantity = Math.max(1, Math.min(value, availableStock));
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  const handleAddToCart = (
    productId: string,
    price: string,
    name: string,
    imageSrc: string,
    weight: string
  ) => {
    const quantity = quantities[productId] || 1;
    const inventoryItem = inventory.find(
      (item) => item.productId === productId
    );
    const availableStock = inventoryItem
      ? inventoryItem.stock - inventoryItem.reservedStock
      : 0;

    if (quantity > availableStock) {
      toast.error("Not enough stock available.", {
        description: "Please reduce the quantity.",
      });
      return;
    }

    addToCart(productId, quantity, price, name, imageSrc, weight);
    setQuantities((prev) => ({ ...prev, [productId]: 1 }));
    toast.success(`${quantity} ${name}(s) added to cart!`);
  };

  return (
    <>
      {favorites.map((favorite) => {
        const inventoryItem = inventory.find(
          (item) => item.productId === favorite.id
        );
        const availableStock = inventoryItem
          ? inventoryItem.stock - inventoryItem.reservedStock
          : 0;

        return (
          <div key={favorite.id} className="group relative">
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                alt={favorite.imageAlt}
                src={favorite.imageSrc}
                fill
                className="object-cover group-hover:opacity-75 transition-opacity duration-300"
              />
            </div>
            <h3 className="mt-4 text-base font-semibold text-dark-leather">
              <Link href={favorite.href}>
                <span className="absolute inset-0" />
                {favorite.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-dusty-taupe">{favorite.price}</p>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="number"
                min="1"
                max={availableStock}
                value={quantities[favorite.id] || 1}
                onChange={(e) => handleQuantityChange(favorite.id, e)}
                className="w-12 rounded-full bg-warm-beige border border-tanned-leather/20 px-2 py-1 text-sm text-dark-leather focus:ring-1 focus:ring-tanned-leather focus:outline-none"
                disabled={availableStock === 0}
              />
              <button
                onClick={() =>
                  handleAddToCart(
                    favorite.id,
                    favorite.price,
                    favorite.name,
                    favorite.imageSrc,
                    favorite.weight
                  )
                }
                className="rounded-full bg-tanned-leather px-3 py-1 text-sm font-medium text-ivory-cream hover:bg-aged-brass transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={availableStock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
