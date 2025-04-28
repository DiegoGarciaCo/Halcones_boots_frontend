// src/app/(client-facing)/shipping-returns/page.tsx
import PolicySection from "@/components/policy";
import SectionHeader from "@/components/shippingHeader";
import React from "react";

export default function ShippingReturnsPage() {
  return (
    <div className="bg-ivory-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-dark-leather mb-8">
          Shipping & Returns
        </h1>

        {/* Shipping Section */}
        <SectionHeader
          title="Shipping Information"
          subtitle="Everything you need to know about getting your order delivered."
        />
        <PolicySection
          title="Shipping Rates"
          content={[
            "Standard Shipping (3-7 business days): $10",
            "Expedited Shipping (1-3 business days): $20",
            "Free Shipping on orders over $200",
          ]}
        />
        <PolicySection
          title="Delivery Times"
          content="Orders are processed within 1-2 business days. Delivery times vary by location and shipping method selected at checkout."
        />
        <PolicySection
          title="International Shipping"
          content="We ship to select international destinations. Rates and times vary—please check at checkout or contact us for details."
          cta={{ text: "Contact Us", href: "/contact" }}
        />

        {/* Returns Section */}
        <SectionHeader
          title="Returns & Exchanges"
          subtitle="Our policy to ensure you're satisfied with your purchase."
        />
        <PolicySection
          title="Return Conditions"
          content={[
            "Items must be unused and in original packaging.",
            "Returns accepted within 30 days of delivery.",
            "Original shipping costs are non-refundable.",
          ]}
        />
        <PolicySection
          title="Return Process"
          content="To initiate a return, contact us with your order number. We’ll provide a return label and instructions. Refunds are processed within 5-10 business days of receiving the return."
          cta={{ text: "Start a Return", href: "/contact" }}
        />
        <PolicySection
          title="Exchanges"
          content="For exchanges, follow the return process and place a new order for the desired item. We’ll expedite processing where possible."
        />
      </div>
    </div>
  );
}
