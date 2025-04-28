// src/components/Testimonials.tsx
import React from "react";

const testimonials = [
  {
    name: "Maria G.",
    quote:
      "These boots are incredible—beautifully crafted and so comfortable. The quality shines through!",
    role: "Customer",
  },
  {
    name: "John R.",
    quote:
      "Best leather goods I’ve owned. Halcones Boots delivers true Western style with every piece.",
    role: "Rancher",
  },
  {
    name: "Sofia L.",
    quote:
      "I love my Texanas! The attention to detail is unmatched, and they’re perfect for any occasion.",
    role: "Customer",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ivory-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-dark-leather mb-8 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-warm-beige p-6 rounded-lg shadow-md"
            >
              <p className="text-dusty-taupe italic text-lg leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="mt-4">
                <p className="text-tanned-leather font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-sm text-dusty-taupe">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
