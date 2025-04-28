"use client";
// app/product/[id]/ProductContent.tsx

import React from "react";
import ProductInfo from "@/components/productInfo";
import ProductDetails from "@/components/productDetails";
import ImageGallery from "@/components/ImageGallery";
import { useCart } from "@/lib/cartContext";

interface ProductImage {
  id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface NullString {
  String: string;
  Valid: boolean;
}

interface NullTime {
  Time: string;
  Valid: boolean;
}

interface NullInt32 {
  Int32: number;
  Valid: boolean;
}

interface Product {
  ID: string;
  CategoryID: string;
  Name: string;
  Description: NullString;
  BasePrice: string;
  CurrentPrice: string;
  ImageUrl: NullString;
  CreatedAt: NullTime;
  UpdatedAt: NullTime;
  Stock: NullInt32;
  Images: ProductImage[];
}

interface ProductContentProps {
  product: Product;
}

export default function ProductContent({ product }: ProductContentProps) {
  const { addToCart, inventory } = useCart();

  const productInfoProps = {
    name: product.Name,
    price: `$${product.CurrentPrice}`,
    rating: 4, // Hardcoded since no rating in DB
    description: product.Description.Valid
      ? product.Description.String
      : "No description available",
    colors: [], // No color data in DB
    onAddToCart: () => {
      addToCart(
        product.ID, // productId
        1, // quantity (defaulting to 1; could be made dynamic)
        product.CurrentPrice, // price
        product.Name, // name
        product.ImageUrl.Valid ? product.ImageUrl.String : "/girlsBoots.jpg", // imageUrl
        product.Stock.Valid ? String(product.Stock.Int32) : "N/A" // weight (using Stock as a placeholder since no weight field exists)
      );
    },
  };

  const productDetailsProps = {
    details: [
      {
        name: "Stock",
        items: [
          `Available: ${
            inventory.find((item) => item.productId === product.ID)?.stock
              ? String(
                  inventory.find((item) => item.productId === product.ID)?.stock
                )
              : "N/A"
          }`,
        ],
      },
      {
        name: "Created",
        items: [
          product.CreatedAt.Valid
            ? new Date(product.CreatedAt.Time).toLocaleDateString()
            : "N/A",
        ],
      },
    ],
  };

  const imageGalleryProps = {
    images: [
      {
        id: 0,
        name: `${product.Name} - Main`,
        src: product.ImageUrl.Valid
          ? product.ImageUrl.String
          : "/girlsBoots.jpg",
        alt: `${product.Name} main image`,
      },
      ...product.Images.map((img, index) => ({
        id: index + 1,
        name: `${product.Name} - Image ${index + 1}`,
        src: img.image_url,
        alt: `${product.Name} additional image ${index + 1}`,
      })),
    ],
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
      <ImageGallery {...imageGalleryProps} />
      <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
        <ProductInfo {...productInfoProps} />
        <ProductDetails {...productDetailsProps} />
      </div>
    </div>
  );
}
