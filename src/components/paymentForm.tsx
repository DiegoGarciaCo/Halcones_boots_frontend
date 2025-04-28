// src/components/PaymentForm.tsx
import React from "react";

interface PaymentFormProps {
  formData: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    cardName: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PaymentForm({ formData, onChange }: PaymentFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-dark-leather">
        Payment Details
      </h2>
      <div>
        <label
          htmlFor="cardNumber"
          className="block text-sm font-medium text-dark-leather"
        >
          Card Number <span className="text-red-500">*</span>
        </label>
        <input
          id="cardNumber"
          name="cardNumber"
          type="text"
          value={formData.cardNumber}
          onChange={onChange}
          required
          maxLength={19} // 16 digits + 3 spaces
          placeholder="1234 5678 9012 3456"
          className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="expiry"
            className="block text-sm font-medium text-dark-leather"
          >
            Expiration Date <span className="text-red-500">*</span>
          </label>
          <input
            id="expiry"
            name="expiry"
            type="text"
            value={formData.expiry}
            onChange={onChange}
            placeholder="MM/YY"
            required
            maxLength={5} // MM/YY
            className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
          />
        </div>
        <div>
          <label
            htmlFor="cvv"
            className="block text-sm font-medium text-dark-leather"
          >
            CVV <span className="text-red-500">*</span>
          </label>
          <input
            id="cvv"
            name="cvv"
            type="text"
            value={formData.cvv}
            onChange={onChange}
            required
            maxLength={4} // Supports 3 or 4 digits
            className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="cardName"
          className="block text-sm font-medium text-dark-leather"
        >
          Name on Card <span className="text-red-500">*</span>
        </label>
        <input
          id="cardName"
          name="cardName"
          type="text"
          value={formData.cardName}
          onChange={onChange}
          required
          className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
        />
      </div>
      <p className="text-sm text-dusty-taupe">
        Note: Payment processing will be handled securely via [Stripe].
      </p>
    </div>
  );
}
