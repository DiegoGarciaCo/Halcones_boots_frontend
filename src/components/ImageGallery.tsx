import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

interface Image {
  id: number;
  name: string;
  src: string;
  alt: string;
}

interface ImageGalleryProps {
  images: Image[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handlePrevious = () => {
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => Math.min(images.length - 1, prev + 1));
  };

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      className="flex flex-col-reverse"
    >
      {/* Image selector */}
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <Tab
              key={image.id}
              className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-ivory-cream text-sm font-medium text-dark-leather uppercase hover:bg-dusty-taupe/20 focus:ring-3 focus:ring-tanned-leather/50 focus:ring-offset-4 focus:outline-hidden"
            >
              <span className="sr-only">{image.name}</span>
              <span className="absolute inset-0 overflow-hidden rounded-md">
                <img
                  alt=""
                  src={image.src}
                  className="size-full object-cover"
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-tanned-leather"
              />
            </Tab>
          ))}
        </TabList>
      </div>

      <TabPanels className="relative">
        {images.map((image) => (
          <TabPanel key={image.id} className="relative">
            <img
              alt={image.alt}
              src={image.src}
              className="aspect-square w-full object-cover sm:rounded-lg"
            />
          </TabPanel>
        ))}
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          disabled={selectedIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-tanned-leather text-ivory-cream rounded-full shadow-md hover:bg-aged-brass disabled:bg-dusty-taupe disabled:text-ivory-cream/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tanned-leather focus:ring-offset-2"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={selectedIndex === images.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-tanned-leather text-ivory-cream rounded-full shadow-md hover:bg-aged-brass disabled:bg-dusty-taupe disabled:text-ivory-cream/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-tanned-leather focus:ring-offset-2"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </TabPanels>
    </TabGroup>
  );
}
