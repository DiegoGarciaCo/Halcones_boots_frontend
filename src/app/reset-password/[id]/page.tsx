// src/app/(client-facing)/checkout/page.tsx
"use client";
import React, { useState } from "react";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import ShippingForm from "@/components/shippingForm";
import PaymentForm from "@/components/paymentForm";
import OrderSummary from "@/components/orderSummary";
import { toast } from "sonner";
import { z } from "zod";

const shippingSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    address1: z.string().min(1, "Address line 1 is required"),
    address2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
    email: z.string().email("Invalid email address").optional(),
  })
  .refine((data) => data.email || data.email === undefined, {
    message: "Email is required for guest checkout",
    path: ["email"],
  });

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(
      /^\d{4} \d{4} \d{4} \d{4}$/,
      "Invalid card number (must be 16 digits)"
    ),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV (3-4 digits)"),
  cardName: z.string().min(1, "Name on card is required"),
});

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const { isLoggedIn } = useAuth();

  const [shippingData, setShippingData] = useState({
    fullName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const [orderTotals, setOrderTotals] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
      setPaymentData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setPaymentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTotalsChange = (totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  }) => {
    setOrderTotals(totals);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const shippingValidation = shippingSchema.safeParse({
      ...shippingData,
      email: isLoggedIn ? undefined : shippingData.email,
    });
    if (!shippingValidation.success) {
      toast.error("Invalid shipping details", {
        description: shippingValidation.error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", "),
      });
      return;
    }

    const paymentValidation = paymentSchema.safeParse(paymentData);
    if (!paymentValidation.success) {
      toast.error("Invalid payment details", {
        description: paymentValidation.error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", "),
      });
      return;
    }

    const endpoint = isLoggedIn
      ? "http://localhost:8080/api/orders"
      : "http://localhost:8080/api/orders/guest";

    const orderData = {
      shipping: shippingValidation.data,
      payment: {
        card_number: paymentData.cardNumber.replace(/\s/g, ""),
        expiry: paymentData.expiry,
        cvv: paymentData.cvv,
        card_name: paymentData.cardName,
      },
      items: cartItems.map((item) => ({
        product_id: item.productId,
        name: item.name,
        price: parseFloat(item.price),
        quantity: item.quantity,
        image_url: item.imageUrl,
      })),
      totals: {
        subtotal: orderTotals.subtotal,
        shipping: orderTotals.shipping,
        tax: orderTotals.tax,
        total: orderTotals.total,
      },
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to process order");

      toast.success("Order placed successfully", {
        description: "Redirecting to confirmation page...",
      });
      window.location.href = "/order-confirmation";
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Order processing failed", {
        description:
          "There was an error processing your order. Please try again.",
      });
    }
  };

  return (
    <div className="bg-ivory-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-dark-leather mb-8">Checkout</h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-dusty-taupe">Your cart is empty.</p>
            <a
              href="/shop"
              className="text-tanned-leather hover:text-aged-brass font-semibold"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              <ShippingForm
                formData={shippingData}
                onChange={handleShippingChange}
                isLoggedIn={isLoggedIn}
              />
              <PaymentForm
                formData={paymentData}
                onChange={handlePaymentChange}
              />
              <button
                type="submit"
                className="w-full rounded-md bg-tanned-leather px-4 py-2 text-sm font-semibold text-ivory-cream hover:bg-aged-brass transition-colors duration-300 focus:outline-2 focus:outline-offset-2 focus:outline-aged-brass"
              >
                Place Order
              </button>
            </div>
            <div className="lg:col-span-1">
              <OrderSummary
                shippingData={shippingData}
                onTotalsChange={handleTotalsChange}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
