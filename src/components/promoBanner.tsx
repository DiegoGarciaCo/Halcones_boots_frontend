// src/components/PromoBanner.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  ctaText?: string;
}

export default function PromoBanner({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  href,
  ctaText = "Shop Now",
}: PromoBannerProps) {
  return (
    <div className="relative bg-dark-leather/60 rounded-lg overflow-hidden mb-12">
      <div className="absolute inset-0">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-ivory-cream sm:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-lg text-ivory-cream">{subtitle}</p>
        <Link
          href={href}
          className="mt-6 inline-block rounded-md bg-tanned-leather px-6 py-3 text-base font-semibold text-ivory-cream hover:bg-aged-brass transition-colors duration-300"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
