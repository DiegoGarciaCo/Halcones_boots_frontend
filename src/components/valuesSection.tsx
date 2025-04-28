// src/components/ValuesSection.tsx
import React from "react";
import { HeartIcon, StarIcon, TruckIcon } from "@heroicons/react/24/outline";

interface Value {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ValuesSectionProps {
  values: Value[];
}

export default function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-dark-leather mb-6 text-center">
        Our Values
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((value) => (
          <div
            key={value.title}
            className="bg-warm-beige p-6 rounded-lg shadow-md text-center"
          >
            <value.icon className="h-12 w-12 text-tanned-leather mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-dark-leather">
              {value.title}
            </h3>
            <p className="mt-2 text-dusty-taupe">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
