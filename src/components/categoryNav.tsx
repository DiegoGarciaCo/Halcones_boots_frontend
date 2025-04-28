// app/components/categoryNav.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GetAllCategoriesResponse } from "@/lib/apiDefinitions";

interface CategoryNavProps {
  categories: Promise<GetAllCategoriesResponse> | GetAllCategoriesResponse;
}

export default async function CategoryNav({ categories }: CategoryNavProps) {
  const resolvedCategories = await categories;
  const categoryList = resolvedCategories.map((category) => ({
    id: category.ID,
    name: category.Name,
    imageUrl: category.ImageUrl.String || "/girlsBoots.jpg",
    imageAlt: "Halcones-Boots " + category.Name,
    slug: category.Slug,
    parentSlug: category.ParentSlug.String,
  }));

  return (
    <div
      aria-labelledby="category-heading"
      className="pb-8 xl:mx-auto xl:max-w-7xl xl:px-8"
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
        <h2
          id="category-heading"
          className="text-2xl font-bold tracking-tight text-dark-leather mb-4"
        >
          Shop by Category
        </h2>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoryList.map((category) => (
            <Link
              key={category.id}
              href={
                category.parentSlug
                  ? `/shop/${category.parentSlug}/${category.slug}`
                  : `/shop/${category.slug}`
              }
              className="group relative flex flex-col overflow-hidden rounded-lg h-80 hover:opacity-75"
            >
              <div className="relative h-full w-full">
                <Image
                  src={category.imageUrl}
                  alt={category.imageAlt}
                  fill
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-dark-leather to-transparent opacity-50"
                />
                <div className="relative flex items-end justify-center h-full p-6">
                  <span className="text-center text-xl font-bold text-ivory-cream">
                    {category.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
