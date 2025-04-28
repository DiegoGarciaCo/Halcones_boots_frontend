// src/components/ProductInfo.tsx
import React, { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { HeartIcon, StarIcon } from "@heroicons/react/20/solid";

interface Color {
  name: string;
  bgColor: string;
  selectedColor: string;
}

interface ProductInfoProps {
  name: string;
  price: string;
  rating: number;
  description: string;
  colors: Color[];
  onAddToCart: (color: Color) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductInfo({
  name,
  price,
  rating,
  description,
  colors,
  onAddToCart,
}: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-dark-leather">
        {name}
      </h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-dark-leather">{price}</p>
      </div>

      {/* Reviews */}
      <div className="mt-3">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((star) => (
              <StarIcon
                key={star}
                aria-hidden="true"
                className={classNames(
                  rating > star ? "text-tanned-leather" : "text-dusty-taupe",
                  "size-5 shrink-0"
                )}
              />
            ))}
          </div>
          <p className="sr-only">{rating} out of 5 stars</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="space-y-6 text-base text-dusty-taupe"
        />
      </div>

      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          onAddToCart(selectedColor);
        }}
      >
        {/* Colors */}
        <div>
          <h3 className="text-sm font-medium text-dark-leather">Color</h3>
          <fieldset aria-label="Choose a color" className="mt-2">
            <RadioGroup
              value={selectedColor}
              onChange={setSelectedColor}
              className="flex items-center gap-x-3"
            >
              {colors.map((color) => (
                <Radio
                  key={color.name}
                  value={color}
                  aria-label={color.name}
                  className={classNames(
                    color.selectedColor,
                    "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      color.bgColor,
                      "size-8 rounded-full border border-dark-leather/10"
                    )}
                  />
                </Radio>
              ))}
            </RadioGroup>
          </fieldset>
        </div>

        <div className="mt-10 flex">
          <button
            type="submit"
            className="flex max-w-xs flex-1 items-center justify-center rounded-md bg-tanned-leather px-8 py-3 text-base font-medium text-ivory-cream hover:bg-aged-brass focus:ring-2 focus:ring-tanned-leather focus:ring-offset-2 focus:outline-hidden sm:w-full transition-colors duration-300"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-tanned-leather hover:bg-dusty-taupe/20 hover:text-aged-brass"
          >
            <HeartIcon aria-hidden="true" className="size-6 shrink-0" />
            <span className="sr-only">Add to favorites</span>
          </button>
        </div>
      </form>
    </div>
  );
}
