import ClientNav from "@/components/clientNav"; // Adjust path if needed
import Footer from "@/components/footer";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-ivory-cream text-dark-leather">
      <ClientNav />
      <main className="pt-[104px]">{children}</main>{" "}
      {/* Offset for nav height */}
      <Footer />
    </div>
  );
}
