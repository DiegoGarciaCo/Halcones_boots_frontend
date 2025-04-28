// app/categories/page.tsx (or wherever this lives)

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Skeleton from "./skeleton";
import { GetAllCategoriesResponse } from "@/lib/apiDefinitions";

// Server-side data fetching function
async function getCategories(): Promise<GetAllCategoriesResponse> {
  const res = await fetch("http://localhost:8080/api/categories", {
    // Optional: Cache control for Next.js
    cache: "no-store", // or "force-cache" depending on your needs
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  if (data) {
    return data;
  } else {
    return [];
  }
}

// Component to render the dynamic category cards
async function CategoryCards() {
  const data = await getCategories();
  const categoriesSlice = data.slice(2, 7);

  const categories = categoriesSlice.map((category) => ({
    name: category.Name,
    href: category.ParentSlug.Valid
      ? `/shop/${category.ParentSlug.String}/${category.Slug}`
      : `/shop/${category.Slug}`,
    imageSrc: category.ImageUrl.String || "/placeholder.jpg",
    imageAlt: `${category.Name} category at Halcones Boots`,
  }));

  return (
    <>
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
        >
          <span aria-hidden="true" className="absolute inset-0">
            <Image
              src={category.imageSrc}
              alt={category.imageAlt}
              fill
              className="object-cover"
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark-leather to-transparent opacity-50"
          />
          <span className="relative mt-auto text-center text-xl font-bold text-ivory-cream">
            {category.name}
          </span>
        </Link>
      ))}
    </>
  );
}

// Main Categories component
export default function Categories() {
  return (
    <div
      aria-labelledby="category-heading"
      className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
    >
      {/* Static Header Section */}
      <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
        <h2
          id="category-heading"
          className="text-2xl font-bold tracking-tight text-dark-leather"
        >
          Shop by Category
        </h2>
        <Link
          href="/shop"
          className="hidden text-sm font-semibold text-tanned-leather hover:text-aged-brass sm:block"
        >
          Browse all categories
          <span aria-hidden="true"> →</span>
        </Link>
      </div>

      {/* Dynamic Content Section with Suspense */}
      <div className="mt-4 flow-root">
        <div className="-my-2">
          <div className="relative box-content h-80 overflow-x-auto py-2 xl:overflow-visible">
            <div className="absolute flex space-x-8 px-4 sm:px-6 lg:px-8 xl:relative xl:grid xl:grid-cols-5 xl:gap-x-8 xl:space-x-0 xl:px-0">
              <Suspense
                fallback={Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative h-80 w-56 flex-col overflow-hidden rounded-lg xl:w-auto"
                  >
                    <Skeleton
                      width="100%"
                      height="100%"
                      variant="rect"
                      className="rounded-lg"
                    />
                    <Skeleton
                      width="80%"
                      height="24px"
                      variant="text"
                      className="absolute bottom-6 left-1/2 -translate-x-1/2"
                    />
                  </div>
                ))}
              >
                <CategoryCards />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Static Mobile Link */}
      <div className="mt-6 px-4 sm:hidden">
        <Link
          href="/shop"
          className="block text-sm font-semibold text-tanned-leather hover:text-aged-brass"
        >
          Browse all categories
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </div>
  );
}
