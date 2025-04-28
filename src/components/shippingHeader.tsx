// src/components/SectionHeader.tsx
import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-dark-leather">{title}</h2>
      {subtitle && <p className="mt-2 text-dusty-taupe">{subtitle}</p>}
    </div>
  );
}
