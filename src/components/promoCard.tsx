// src/components/PromoCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface PromoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  ctaText?: string;
}

export default function PromoCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  ctaText = "Shop Now",
}: PromoCardProps) {
  return (
    <div className="bg-warm-beige rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 w-full">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-dark-leather">{title}</h3>
        <p className="mt-2 text-dusty-taupe">{description}</p>
        <Link
          href={href}
          className="mt-4 inline-block rounded-md bg-tanned-leather px-4 py-2 text-sm font-semibold text-ivory-cream hover:bg-aged-brass transition-colors duration-300"
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
