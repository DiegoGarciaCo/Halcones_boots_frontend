// src/components/ShippingForm.tsx
import React from "react";

interface ShippingFormProps {
  formData: {
    fullName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    email?: string; // Optional email field
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoggedIn: boolean; // New prop to determine if email is needed
}

export default function ShippingForm({
  formData,
  onChange,
  isLoggedIn,
}: ShippingFormProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-dark-leather">
        Shipping Address
      </h2>
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-dark-leather"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={onChange}
          required
          className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
        />
      </div>
      {!isLoggedIn && (
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-dark-leather"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            required={!isLoggedIn} // Required only for guests
            className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
            placeholder="example@email.com"
          />
        </div>
      )}
      <div>
        <label
          htmlFor="address1"
          className="block text-sm font-medium text-dark-leather"
        >
          Address Line 1 <span className="text-red-500">*</span>
        </label>
        <input
          id="address1"
          name="address1"
          type="text"
          value={formData.address1}
          onChange={onChange}
          required
          className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
        />
      </div>
      <div>
        <label
          htmlFor="address2"
          className="block text-sm font-medium text-dark-leather"
        >
          Address Line 2 (Optional)
        </label>
        <input
          id="address2"
          name="address2"
          type="text"
          value={formData.address2}
          onChange={onChange}
          className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-dark-leather"
          >
            City <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={onChange}
            required
            className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
          />
        </div>
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-dark-leather"
          >
            State <span className="text-red-500">*</span>
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={onChange}
            required
            className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
          />
        </div>
        <div>
          <label
            htmlFor="zip"
            className="block text-sm font-medium text-dark-leather"
          >
            ZIP Code <span className="text-red-500">*</span>
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            value={formData.zip}
            onChange={onChange}
            required
            className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="country"
          className="block text-sm font-medium text-dark-leather"
        >
          Country <span className="text-red-500">*</span>
        </label>
        <input
          id="country"
          name="country"
          type="text"
          value={formData.country}
          onChange={onChange}
          required
          className="mt-2 block w-full rounded-md bg-tanned-leather/10 px-3 py-1.5 text-dark-leather outline-1 -outline-offset-1 outline-tanned-leather/20 placeholder:text-dusty-taupe focus:outline-2 focus:-outline-offset-2 focus:outline-tanned-leather"
        />
      </div>
    </div>
  );
}
