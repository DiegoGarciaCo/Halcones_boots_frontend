// src/app/(client-facing)/about/page.tsx
import React from "react";
import { HeartIcon, StarIcon, TruckIcon } from "@heroicons/react/24/outline";
import AboutHero from "@/components/aboutHero";
import StorySection from "@/components/storySection";
import ValuesSection from "@/components/valuesSection";

export default function AboutPage() {
  return (
    <div className="bg-ivory-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <AboutHero
          title="Crafting Western Legacy"
          subtitle="A Hispanic-owned family business rooted in Mexican craftsmanship."
          imageSrc="/artisanCrafting.jpg" // Replace with your image
          imageAlt="Artisan crafting leather boots at Halcones Boots"
          cta={{ text: "Shop Our Collection", href: "/shop" }}
        />

        {/* Story */}
        <StorySection
          title="Our Roots"
          content="Halcones Boots began as a dream in a small Mexican workshop, where skilled artisans poured their heritage into every stitch. Founded by a Hispanic family passionate about quality leather goods, we’ve grown into a trusted name in Western wear, blending tradition with durability for the modern adventurer."
          imageSrc="/familyWorkshop.jpg" // Replace with your image
          imageAlt="Family working in a leather workshop"
        />
        <StorySection
          title="Our Craft"
          content="Every boot, sombrero, and belt is handcrafted with authentic Mexican leather, sourced responsibly and finished with care. Our artisans uphold techniques passed down through generations, ensuring each piece is a testament to our commitment to excellence."
          imageSrc="/leatherCraft.jpg" // Replace with your image
          imageAlt="Close-up of leather crafting process"
          reverse
        />

        {/* Values */}
        <ValuesSection
          values={[
            {
              title: "Heritage",
              description:
                "Rooted in Mexican traditions, every product tells a story.",
              icon: HeartIcon,
            },
            {
              title: "Quality",
              description:
                "Crafted to last with the finest materials and skill.",
              icon: StarIcon,
            },
            {
              title: "Service",
              description:
                "Fast shipping and dedicated support for our customers.",
              icon: TruckIcon,
            },
          ]}
        />
      </div>
    </div>
  );
}
