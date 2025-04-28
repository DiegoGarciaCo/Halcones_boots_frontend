// app/checkout/CheckoutContent.tsx
"use client";
import React, { useCallback, useState } from "react";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import ShippingForm from "@/components/shippingForm";
import OrderSummary from "@/components/orderSummary";
import { toast } from "sonner";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CreateOrderResponse } from "@/lib/apiDefinitions";

// Load Stripe with your Publishable Key from environment variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

// Inner component that uses Stripe hooks
function CheckoutForm() {
  const { cartItems, clearGuestCart } = useCart();
  const { isLoggedIn } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

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

  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTotalsChange = useCallback(
    (newTotals: {
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
    }) => {
      setTotals(newTotals);
      console.log("Updated totals:", newTotals);
    },
    [] // Empty dependency array ensures this function reference remains stable
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe not loaded", {
        description: "Please wait or refresh the page.",
      });
      return;
    }

    if (
      !shippingData.fullName ||
      !shippingData.address1 ||
      !shippingData.city ||
      !shippingData.state ||
      !shippingData.zip ||
      !shippingData.country ||
      (!isLoggedIn && !shippingData.email)
    ) {
      toast.error("Missing required fields", {
        description: "Please fill in all required shipping fields.",
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Payment form error", {
        description: "Card input not initialized.",
      });
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: shippingData.fullName,
        email: shippingData.email || undefined,
        address: {
          line1: shippingData.address1,
          line2: shippingData.address2 || undefined,
          city: shippingData.city,
          state: shippingData.state,
          postal_code: shippingData.zip,
          country: shippingData.country,
        },
      },
    });

    if (error) {
      toast.error("Payment error", {
        description: error.message,
      });
      return;
    }

    const endpoint = isLoggedIn
      ? "http://localhost:8080/api/orders"
      : "http://localhost:8080/api/orders/guest";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          shipping: shippingData,
          payment: { payment_method_id: paymentMethod.id },
          items: cartItems,
          totals,
        }),
      });

      if (!response.ok) throw new Error("Failed to process order");

      const order: CreateOrderResponse = await response.json();

      toast.success("Order placed successfully", {
        description: "Redirecting to confirmation page...",
      });
      if (!isLoggedIn) {
        clearGuestCart();
      }
      window.location.href = `/order-confirmation/${order.orderID}`;
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Order processing failed", {
        description:
          "There was an error processing your order. Please try again.",
      });
    }
  };

  return cartItems.length === 0 ? (
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
        <div className="p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || !elements}
          className="w-full rounded-md bg-tanned-leather px-4 py-2 text-sm font-semibold text-ivory-cream hover:bg-aged-brass transition-colors duration-300 focus:outline-2 focus:outline-offset-2 focus:outline-aged-brass disabled:opacity-50"
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
  );
}

// Outer component that wraps CheckoutForm with Elements
export default function CheckoutContent() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
