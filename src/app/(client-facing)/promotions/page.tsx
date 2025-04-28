// src/app/(client-facing)/promotions/page.tsx
import PromoBanner from "@/components/promoBanner";
import PromoCard from "@/components/promoCard";
import React from "react";

const promotions = [
  {
    title: "Western Trio Deal",
    description: "Get a pair of boots, a sombrero, and a belt for just $200!",
    imageSrc: "/westernTrio.jpg", // Replace with your image
    imageAlt: "Western Trio bundle: boots, sombrero, and belt",
    href: "/shop/promotion-western-trio",
  },
  {
    title: "20% Off Men’s Boots",
    description: "Save on all men’s boots this month only.",
    imageSrc: "/mensBootPromo.jpg", // Replace with your image
    imageAlt: "Men’s leather boots",
    href: "/shop/men/boots",
  },
  {
    title: "Free Shipping Over $100",
    description: "Spend $100+ and enjoy free standard shipping.",
    imageSrc: "/freeShipping.jpg", // Replace with your image
    imageAlt: "Shipping box with Halcones Boots logo",
    href: "/shop",
  },
];

export default function PromotionsPage() {
  return (
    <div className="bg-ivory-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-dark-leather mb-8">
          Current Promotions
        </h1>

        {/* Featured Banner */}
        <PromoBanner
          title="Western Trio Deal"
          subtitle="Boots, Sombrero, and Belt for Only $200 – Limited Time Offer!"
          imageSrc="/westernTrioBanner.jpg" // Replace with your banner image
          imageAlt="Western Trio promotional banner"
          href="/shop/promotion-western-trio"
        />

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <PromoCard
              key={promo.title}
              title={promo.title}
              description={promo.description}
              imageSrc={promo.imageSrc}
              imageAlt={promo.imageAlt}
              href={promo.href}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
