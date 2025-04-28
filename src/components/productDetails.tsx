// src/components/ProductDetails.tsx
import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface Detail {
  name: string;
  items: string[];
}

interface ProductDetailsProps {
  details: Detail[];
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails({ details }: ProductDetailsProps) {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <h2 id="details-heading" className="sr-only">
        Additional details
      </h2>
      <div className="divide-y divide-tanned-leather/20 border-t border-tanned-leather/20">
        {details.map((detail) => (
          <Disclosure key={detail.name} as="div">
            <h3>
              <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                <span className="text-sm font-medium text-dark-leather group-data-open:text-tanned-leather">
                  {detail.name}
                </span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="block size-6 text-tanned-leather group-hover:text-aged-brass group-data-open:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="hidden size-6 text-tanned-leather group-hover:text-aged-brass group-data-open:block"
                  />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pb-6">
              <ul
                role="list"
                className="list-disc space-y-1 pl-5 text-sm text-dusty-taupe marker:text-tanned-leather"
              >
                {detail.items.map((item) => (
                  <li key={item} className="pl-2">
                    {item}
                  </li>
                ))}
              </ul>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </section>
  );
}
