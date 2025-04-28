import React from "react";
import Hero from "./hero";
import Categories from "./categories";
import FeaturedProducts from "./featured";
import CTABanner from "./cta";
import TrendingProducts from "./trending";

export default function HomePage() {
  return (
    <div>
      {/* Hero section */}
      <Hero />

      <main>
        {/* Category section */}
        <section>
          <Categories />
        </section>
        {/* Featured section */}
        <section>
          <FeaturedProducts />
        </section>
        <TrendingProducts />
        <CTABanner />
      </main>
    </div>
  );
}
