import React from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Skeleton from "@/components/skeleton";
import { GetProductsByCategorySlugsResponse } from "@/lib/apiDefinitions";
import CategoryContent from "@/components/CategoryContent";

// Server-side data fetching function
async function fetchProductsByCategorySlugs(
  childSlug: string,
  parentSlug: string | undefined,
  page: number,
  size: number = 9
): Promise<GetProductsByCategorySlugsResponse> {
  const slugPath = parentSlug ? `${parentSlug}/${childSlug}` : childSlug;
  const url = `http://localhost:8080/api/products/category/${slugPath}?page=${page}&size=${size}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
  const data = await res.json();
  // Ensure we always return an array
  return Array.isArray(data) ? data : data.products || [];
}

// Server Component
export default async function ShopCategoryPage({
  params,
}: {
  params: { slugs: Promise<string[]> };
}) {
  const slugs = await params.slugs;
  console.log("Slugs:", slugs);
  const [parentSlug, childSlug] =
    slugs.length === 1
      ? ["", slugs[0]]
      : slugs.length === 2
      ? [slugs[0], slugs[1]]
      : ["", ""];

  const itemsPerPage = 9;

  let productsData: GetProductsByCategorySlugsResponse;
  try {
    productsData = await fetchProductsByCategorySlugs(
      childSlug,
      parentSlug || undefined,
      1, // Initial page
      itemsPerPage
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-ivory-cream flex items-center justify-center">
        <p className="text-dark-leather">
          Error: {(error as Error).message} (Slugs: {slugs.join(", ")})
        </p>
      </div>
    );
  }

  if (!productsData) {
    notFound(); // Trigger 404 if no products are found or data is empty
  }

  return (
    <div className="bg-ivory-cream min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-dark-leather">
            {productsData[0]?.parentCategoryName.String
              ? `${productsData[0].parentCategoryName} ${productsData[0].categoryName}`
              : productsData[0]?.categoryName || "Shop"}
          </h1>
        </div>

        <Suspense
          fallback={
            <div>
              <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton
                      width="100%"
                      height="300px"
                      variant="rect"
                      className="rounded-md"
                    />
                    <Skeleton width="80%" height="20px" variant="text" />
                    <Skeleton width="40%" height="16px" variant="text" />
                    <Skeleton
                      width="60%"
                      height="32px"
                      variant="rect"
                      className="rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center items-center gap-4">
                <Skeleton
                  width="80px"
                  height="40px"
                  variant="rect"
                  className="rounded-md"
                />
                <Skeleton width="120px" height="20px" variant="text" />
                <Skeleton
                  width="80px"
                  height="40px"
                  variant="rect"
                  className="rounded-md"
                />
              </div>
            </div>
          }
        >
          <CategoryContent initialProducts={productsData} />
        </Suspense>
      </div>
    </div>
  );
}
