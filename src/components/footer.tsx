// src/components/Footer.tsx
import React from "react";
import Link from "next/link";

const footerNavigation = {
  shop: [
    { name: "Men's Boots", href: "/shop/men/boots" },
    { name: "Women's Boots", href: "/shop/women/boots" },
    { name: "Men's Texanas", href: "/shop/men/texanas" },
    { name: "Women's Texanas", href: "/shop/women/texanas" },
    { name: "Sale", href: "/shop/sale" },
  ],
  social: [
    { name: "Facebook", href: "https://facebook.com/halconesboots" },
    { name: "Instagram", href: "https://instagram.com/halconesboots" },
    { name: "TikTok", href: "https://tiktok.com/@halconesboots" },
  ],
};

export default function Footer() {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="bg-dark-leather text-ivory-cream"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:grid md:grid-cols-3 md:gap-8">
          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold text-warm-beige uppercase tracking-wider">
              Shop
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {footerNavigation.shop.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-dusty-taupe hover:text-aged-brass"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-warm-beige uppercase tracking-wider">
              Connect
            </h3>
            <ul role="list" className="mt-4 space-y-4">
              {footerNavigation.social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-dusty-taupe hover:text-aged-brass"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold text-warm-beige uppercase tracking-wider">
              Stay in the Loop
            </h3>
            <p className="mt-4 text-sm text-dusty-taupe">
              Subscribe for exclusive deals and updates on our latest leather
              goods.
            </p>
            <form className="mt-4 flex sm:max-w-md">
              <input
                id="email-address"
                type="email"
                required
                autoComplete="email"
                aria-label="Email address"
                placeholder="Enter your email"
                className="w-full rounded-md border border-tanned-leather bg-ivory-cream px-4 py-2 text-dark-leather placeholder:text-dusty-taupe focus:border-aged-brass focus:outline-none"
              />
              <button
                type="submit"
                className="ml-2 rounded-md bg-tanned-leather px-4 py-2 text-sm font-medium text-ivory-cream hover:bg-aged-brass focus:ring-2 focus:ring-aged-brass focus:ring-offset-2 focus:ring-offset-dark-leather"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-tanned-leather py-6 text-center">
          <p className="text-sm text-dusty-taupe">
            &copy; {new Date().getFullYear()} Halcones Boots. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
