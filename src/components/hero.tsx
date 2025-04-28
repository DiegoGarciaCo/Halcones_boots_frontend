// src/components/Hero.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

type HeroVariant = "shop" | "about" | "store";

interface HeroProps {
  variant?: HeroVariant;
}

export default function Hero({ variant = "shop" }: HeroProps) {
  const variants = {
    shop: {
      imageSrc: "/girlOnHorse.jpg", // Replace with your shop hero image
      imageAlt: "Cowgirl on horseback wearing Halcones Boots",
      title: "New Arrivals Are Here",
      description:
        "Discover the latest authentic leather goods from our summer collection, crafted in Mexico. Shop now while they’re still in stock!",
      ctaText: "Shop New Arrivals",
      ctaHref: "/shop",
    },
    about: {
      imageSrc: "/leatherCraft.jpg", // Replace with an about image (e.g., artisans at work)
      imageAlt: "Artisans crafting leather boots in Mexico",
      title: "Our Heritage",
      description:
        "Rooted in Mexican craftsmanship, Halcones Boots brings you high-quality Western wear with a story of tradition and pride.",
      ctaText: "Learn More",
      ctaHref: "/about",
    },
    store: {
      imageSrc: "/storeFront.jpg", // Replace with store exterior image
      imageAlt: "Halcones Boots physical store in [Location]",
      title: "Visit Us",
      description:
        "Experience Halcones Boots in person at our store. Find your perfect pair and feel the quality of authentic leather.",
      ctaText: "Get Directions",
      ctaHref: "/store",
    },
  };

  const { imageSrc, imageAlt, title, description, ctaText, ctaHref } =
    variants[variant];

  return (
    <div>
      {/* Hero section */}
      <div className="relative bg-dark-leather">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill // Replaces size-full
            className="object-cover"
            priority={variant === "shop"} // Priority for shop (homepage)
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-dark-leather opacity-50"
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center sm:py-64 lg:px-0">
          <h1 className="text-4xl font-bold tracking-tight text-warm-beige lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-xl text-ivory-cream">{description}</p>
          <Link
            href={ctaHref}
            className="mt-8 inline-block rounded-md border border-transparent bg-tanned-leather px-8 py-3 text-base font-medium text-ivory-cream hover:bg-aged-brass"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}
