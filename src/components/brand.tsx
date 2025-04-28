// src/components/BrandStory.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BrandStory() {
  return (
    <section className="bg-warm-beige py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Content */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-dark-leather mb-4">
              Our Story
            </h2>
            <p className="text-lg text-dusty-taupe leading-relaxed mb-6">
              Halcones Boots is a proud, Hispanic-owned family business rooted
              in the heart of Mexico. Our artisans handcraft each piece with
              authentic leather, blending traditional techniques with a passion
              for quality. From rugged boots to timeless accessories, every item
              tells a story of heritage, durability, and Western spirit.
            </p>
            <Link
              href="/about"
              className="inline-block text-tanned-leather font-semibold hover:text-aged-brass transition-colors duration-300"
            >
              Learn More About Us →
            </Link>
          </div>
          {/* Image */}
          <div className="md:w-1/2">
            <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-md">
              <Image
                src="/artisanCrafting.jpg" // Replace with your image in /public/
                alt="Artisan crafting leather boots at Halcones Boots"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
