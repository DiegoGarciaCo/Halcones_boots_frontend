// src/components/FeaturedProducts.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <div
      aria-labelledby="featured-heading"
      className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 sm:pt-32 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <Image
            src="/girlOnHorse.jpg" // Updated to your specified image
            alt="Cowgirl on horseback wearing Halcones Boots"
            fill
            className="object-cover"
            priority // Prominent on homepage
          />
        </div>
        <div className="relative bg-ivory-cream/30 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              id="featured-heading"
              className="text-3xl font-bold tracking-tight text-dark-leather sm:text-4xl"
            >
              <span className="block sm:inline">Step Into</span>
              <span className="block sm:inline">Authentic Craftsmanship</span>
            </h2>
            <p className="mt-3 text-xl text-dark-leather">
              Experience the rugged elegance of our handcrafted leather boots,
              made with authentic Mexican traditions. Elevate your Western style
              with quality that lasts.
            </p>
            <Link
              href="/shop"
              className="mt-8 block w-full rounded-md border border-transparent bg-tanned-leather px-8 py-3 text-base font-medium text-ivory-cream hover:bg-aged-brass sm:w-auto transition-colors duration-300"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
