// src/components/CTABanner.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CTABanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="absolute inset-0">
          <Image
            src="/girlOnHorse.jpg" // Your specified image
            alt="Cowgirl on horseback wearing Halcones Boots"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative bg-dark-leather/50 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              id="cta-heading"
              className="text-3xl font-bold tracking-tight text-ivory-cream sm:text-4xl"
            >
              <span className="block sm:inline">The Western Trio</span>
              <span className="block sm:inline">—Yours for $200</span>
            </h2>
            <p className="mt-3 text-xl text-ivory-cream">
              Saddle up with a pair of handcrafted boots, a classic sombrero,
              and a rugged leather belt—all for just $200. Don’t miss this
              unbeatable deal on authentic Mexican craftsmanship!
            </p>
            <Link
              href="/shop/promotion-western-trio" // Adjust to your promo page
              className="mt-8 block w-full rounded-md border border-transparent bg-tanned-leather px-8 py-3 text-base font-medium text-ivory-cream hover:bg-aged-brass sm:w-auto transition-colors duration-300"
            >
              Claim the Deal Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
