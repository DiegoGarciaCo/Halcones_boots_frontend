"use client";

import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserCircleIcon,
  LockClosedIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/lib/authContext";
import { useCart } from "@/lib/cartContext";
import { toast } from "sonner"; // Import sonner for toasts
import Image from "next/image";

const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/shop/women/new-arrivals",
          imageSrc:
            "https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Boots",
          href: "/shop/women/boots",
          imageSrc:
            "https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Accessories",
          href: "/shop/women/accessories",
          imageSrc:
            "https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt:
            "Model wearing minimalist watch with black wristband and white watch face.",
        },
        {
          name: "Sombreros",
          href: "/shop/women/sombreros",
          imageSrc:
            "https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-category-04.jpg",
          imageAlt:
            "Model opening tan leather long wallet with credit card pockets and cash pouch.",
        },
      ],
    },
    {
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "/shop/men/new-arrivals",
          imageSrc:
            "https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-01.jpg",
          imageAlt:
            "Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.",
        },
        {
          name: "Boots",
          href: "/shop/men/boots",
          imageSrc:
            "https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-02.jpg",
          imageAlt: "Model wearing light heather gray t-shirt.",
        },
        {
          name: "Accessories",
          href: "/shop/men/accessories",
          imageSrc:
            "https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-03.jpg",
          imageAlt:
            "Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.",
        },
        {
          name: "Sombreros",
          href: "/shop/men/sombreros",
          imageSrc:
            "https://tailwindui.com/plus-assets/img/ecommerce-images/mega-menu-01-men-category-04.jpg",
          imageAlt:
            "Model putting folded cash into slim card holder olive leather wallet with hand stitching.",
        },
      ],
    },
  ],
  pages: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/shop" },
  ],
};

export default function ClientNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const { isLoggedIn, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { cartItems, updateQuantity, inventory } = useCart(); // Include inventory

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navHeight = navRef.current?.offsetHeight || 104;

      if (currentScrollY > navHeight) {
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleIncreaseQuantity = (
    productId: string,
    currentQuantity: number,
    name: string
  ) => {
    const newQuantity = currentQuantity + 1;
    const inventoryItem = inventory.find(
      (item) => item.productId === productId
    );
    const availableStock = inventoryItem
      ? inventoryItem.stock - inventoryItem.reservedStock
      : 0;

    if (newQuantity > availableStock) {
      toast.error("Not enough stock available.", {
        description: "Cannot increase quantity further.",
      });
      return;
    }

    updateQuantity(productId, newQuantity);
    toast.success(`Updated ${name} to ${newQuantity} in cart.`);
  };

  const handleDecreaseQuantity = (
    productId: string,
    currentQuantity: number,
    name: string
  ) => {
    const newQuantity = Math.max(1, currentQuantity - 1);
    updateQuantity(productId, newQuantity);
    if (newQuantity < currentQuantity) {
      toast.success(`Updated ${name} to ${newQuantity} in cart.`);
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-10 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-dark-leather/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-ivory-cream pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-dark-leather"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Mobile Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-tanned-leather">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-dark-leather data-selected:border-tanned-leather data-selected:text-tanned-leather"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel
                    key={category.name}
                    className="space-y-12 px-4 py-6"
                  >
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-md bg-warm-beige object-cover group-hover:opacity-75"
                          />
                          <a
                            href={item.href}
                            className="mt-6 block text-sm font-medium text-dark-leather"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 z-10"
                            />
                            {item.name}
                          </a>
                          <p
                            aria-hidden="true"
                            className="mt-1 text-sm text-dusty-taupe"
                          >
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-tanned-leather px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a
                    href={page.href}
                    className="-m-2 block p-2 font-medium text-dark-leather hover:text-aged-brass"
                  >
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-tanned-leather px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-dark-leather hover:text-aged-brass"
                >
                  Create an account
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-dark-leather hover:text-aged-brass"
                >
                  Sign in
                </a>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      <nav aria-label="Top">
        {/* Top navigation */}
        <div className="bg-tanned-leather">
          <div className="mx-auto flex h-10 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <div className="ml-auto relative">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center p-2 text-warm-beige"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <UserCircleIcon className="h-8 w-8 text-warm-beige" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-xl rounded-lg ring-1 ring-black ring-opacity-5 z-50 transition-all duration-200 ease-out transform scale-95 hover:scale-100">
                      <div className="py-2">
                        <a
                          href="/profile"
                          className="flex items-center px-4 py-3 text-sm font-medium text-dark-leather hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
                        >
                          <UserCircleIcon className="w-5 h-5 mr-3 text-aged-brass" />
                          Profile
                        </a>
                        <button
                          onClick={logout}
                          className="flex items-center w-full text-left px-4 py-3 text-sm font-medium text-dark-leather hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
                        >
                          <LockClosedIcon className="w-5 h-5 mr-3 text-red-500" />
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-6">
                  <a
                    href="/login"
                    className="text-sm font-medium text-warm-beige hover:text-aged-brass"
                  >
                    Sign in
                  </a>
                  <a
                    href="/sign-up"
                    className="text-sm font-medium text-warm-beige hover:text-aged-brass"
                  >
                    Create an account
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary navigation */}
        <div className="bg-dark-leather bg-opacity-90 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <div className="flex h-16 items-center justify-between">
                {/* Logo (lg+) */}
                <div className="hidden lg:flex lg:flex-1 lg:items-center">
                  <a href="/">
                    <span className="sr-only">Halcones Boots</span>
                    <img
                      alt="Halcones Boots"
                      src="/logo.png" // Replace with your logo
                      className="h-8 w-auto"
                    />
                  </a>
                </div>

                <div className="hidden h-full lg:flex">
                  {/* Flyout menus */}
                  <PopoverGroup className="inset-x-0 bottom-0 px-4">
                    <div className="flex h-full justify-center space-x-8">
                      {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-warm-beige hover:text-aged-brass"
                        >
                          {page.name}
                        </a>
                      ))}

                      {navigation.categories.map((category) => (
                        <Popover key={category.name} className="flex">
                          <div className="relative flex">
                            <PopoverButton className="group relative z-10 flex items-center justify-center text-sm font-medium text-warm-beige transition-colors duration-200 ease-out hover:text-aged-brass">
                              {category.name}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-px h-0.5 transition duration-200 ease-out group-data-open:bg-tanned-leather"
                              />
                            </PopoverButton>
                          </div>

                          <PopoverPanel
                            transition
                            className="absolute inset-x-0 top-full text-sm text-dark-leather transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                          >
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 top-1/2 bg-ivory-cream shadow-sm"
                            />
                            <div className="relative bg-ivory-cream">
                              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                  {category.featured.map((item) => (
                                    <div
                                      key={item.name}
                                      className="group relative"
                                    >
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-md bg-warm-beige object-cover group-hover:opacity-75"
                                      />
                                      <a
                                        href={item.href}
                                        className="mt-4 block font-medium text-dark-leather"
                                      >
                                        <span
                                          aria-hidden="true"
                                          className="absolute inset-0 z-10"
                                        />
                                        {item.name}
                                      </a>
                                      <p
                                        aria-hidden="true"
                                        className="mt-1 text-dusty-taupe"
                                      >
                                        Shop now
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      ))}
                    </div>
                  </PopoverGroup>
                </div>

                {/* Mobile menu and search (lg-) */}
                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(true)}
                    className="-ml-2 p-2 text-warm-beige"
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                  </button>

                  <a href="#" className="ml-2 p-2 text-warm-beige">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="size-6"
                    />
                  </a>
                </div>

                {/* Logo (lg-) */}
                <a href="/" className="lg:hidden">
                  <span className="sr-only">Halcones Boots</span>
                  <img
                    alt="Halcones Boots"
                    src="/logo.png" // Replace with your logo
                    className="h-8 w-auto"
                  />
                </a>

                <div className="flex flex-1 items-center justify-end">
                  <a
                    href="#"
                    className="hidden text-sm font-medium text-warm-beige lg:block"
                  >
                    Search
                  </a>

                  <div className="flex items-center lg:ml-8">
                    <a href="#" className="p-2 text-warm-beige lg:hidden">
                      <span className="sr-only">Help</span>
                      <QuestionMarkCircleIcon
                        aria-hidden="true"
                        className="size-6"
                      />
                    </a>
                    <a
                      href="#"
                      className="hidden text-sm font-medium text-warm-beige lg:block"
                    >
                      Help
                    </a>

                    {/* Cart Popover */}
                    <div className="ml-4 flow-root lg:ml-8">
                      <Popover className="group relative">
                        <PopoverButton className="-m-2 flex items-center p-2">
                          <ShoppingBagIcon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-warm-beige group-hover:text-aged-brass"
                          />
                          <span className="ml-2 text-sm font-medium text-warm-beige group-hover:text-aged-brass">
                            {cartItems.length}
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </PopoverButton>

                        <PopoverPanel className="absolute right-0 mt-2 w-80 bg-ivory-cream shadow-lg rounded-lg ring-1 ring-black ring-opacity-5 z-50">
                          <div className="p-4">
                            {cartItems.length === 0 ? (
                              <p className="text-sm text-dark-leather text-center">
                                Your cart is empty
                              </p>
                            ) : (
                              <div className="max-h-96 overflow-y-auto">
                                {cartItems.map((item) => {
                                  const inventoryItem = inventory.find(
                                    (i) => i.productId === item.productId
                                  );
                                  const availableStock = inventoryItem
                                    ? inventoryItem.stock -
                                      inventoryItem.reservedStock
                                    : 0;

                                  return (
                                    <div
                                      key={item.productId}
                                      className="flex items-center py-2 border-b border-tanned-leather/20"
                                    >
                                      <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={48}
                                        height={48}
                                        className="rounded-md object-cover"
                                      />
                                      <div className="ml-3 flex-1">
                                        <p className="text-sm font-medium text-dark-leather">
                                          {item.name}
                                        </p>
                                        <p className="text-sm text-dusty-taupe">
                                          ${item.price}
                                        </p>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() =>
                                            handleDecreaseQuantity(
                                              item.productId,
                                              item.quantity,
                                              item.name
                                            )
                                          }
                                          className="p-1 text-dark-leather hover:text-aged-brass disabled:text-gray-400 disabled:cursor-not-allowed"
                                          disabled={item.quantity <= 1}
                                        >
                                          <MinusIcon className="size-4" />
                                        </button>
                                        <span className="text-sm text-dark-leather">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() =>
                                            handleIncreaseQuantity(
                                              item.productId,
                                              item.quantity,
                                              item.name
                                            )
                                          }
                                          className="p-1 text-dark-leather hover:text-aged-brass disabled:text-gray-400 disabled:cursor-not-allowed"
                                          disabled={
                                            availableStock === 0 ||
                                            item.quantity >= availableStock
                                          }
                                        >
                                          <PlusIcon className="size-4" />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {cartItems.length > 0 && (
                              <div className="mt-4 flex justify-between">
                                {isLoggedIn ? (
                                  <a
                                    href="/cart"
                                    className="rounded-full bg-tanned-leather px-4 py-2 text-sm font-medium text-ivory-cream hover:bg-aged-brass transition-colors duration-300"
                                  >
                                    Checkout
                                  </a>
                                ) : (
                                  <>
                                    <a
                                      href="/login"
                                      className="rounded-full bg-tanned-leather px-4 py-2 text-sm font-medium text-ivory-cream hover:bg-aged-brass transition-colors duration-300"
                                    >
                                      Log in
                                    </a>
                                    <a
                                      href="/cart"
                                      className="rounded-full border border-tanned-leather px-4 py-2 text-sm font-medium text-tanned-leather hover:bg-tanned-leather hover:text-ivory-cream transition-colors duration-300"
                                    >
                                      Continue as Guest
                                    </a>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
