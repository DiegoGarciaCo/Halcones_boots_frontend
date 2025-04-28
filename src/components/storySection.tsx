// src/components/StorySection.tsx
import React from "react";
import Image from "next/image";

interface StorySectionProps {
  title: string;
  content: string;
  imageSrc?: string;
  imageAlt?: string;
  reverse?: boolean; // Reverse layout (image left, text right)
}

export default function StorySection({
  title,
  content,
  imageSrc,
  imageAlt,
  reverse = false,
}: StorySectionProps) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-8 mb-12`}
    >
      {imageSrc && (
        <div className="md:w-1/2">
          <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-md">
            <Image
              src={imageSrc}
              alt={imageAlt || ""}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      <div className={imageSrc ? "md:w-1/2" : "w-full"}>
        <h2 className="text-2xl font-semibold text-dark-leather mb-4">
          {title}
        </h2>
        <p className="text-dusty-taupe">{content}</p>
      </div>
    </div>
  );
}
