// src/components/PolicySection.tsx
import React from "react";
import Link from "next/link";

interface PolicySectionProps {
  title: string;
  content: string | string[];
  cta?: { text: string; href: string };
}

export default function PolicySection({
  title,
  content,
  cta,
}: PolicySectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-dark-leather mb-2">{title}</h3>
      {typeof content === "string" ? (
        <p className="text-dusty-taupe">{content}</p>
      ) : (
        <ul className="list-disc pl-5 text-dusty-taupe space-y-1">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      {cta && (
        <Link
          href={cta.href}
          className="mt-4 inline-block text-tanned-leather hover:text-aged-brass font-semibold"
        >
          {cta.text} →
        </Link>
      )}
    </div>
  );
}
