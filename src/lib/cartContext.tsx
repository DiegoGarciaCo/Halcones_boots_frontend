"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useOptimistic,
  startTransition,
} from "react";
import { useAuth } from "./authContext";
import { toast } from "sonner";

export interface CartItem {
  productId: string;
  quantity: number;
  price: string;
  name: string;
  imageUrl: string;
}

interface InventoryItem {
  productId: string;
  stock: number;
  reservedStock: number;
  action?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  inventory: InventoryItem[];
  addToCart: (
    productId: string,
    quantity: number,
    price: string,
    name: string,
    imageUrl: string,
    weight: string
  ) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string, quantity: number) => Promise<void>;
  clearGuestCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getGuestCart = (): CartItem[] => {
  const cart = localStorage.getItem("guestCart");
  return cart ? JSON.parse(cart) : [];
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [realCartItems, setRealCartItems] = useState<CartItem[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [optimisticCartItems, setOptimisticCartItems] = useOptimistic(
    realCartItems,
    (currentCart, action: { type: string; payload: any }) => {
      switch (action.type) {
        case "ADD":
          const { productId, quantity, price, name, imageUrl } = action.payload;
          const existing = currentCart.find(
            (item) => item.productId === productId
          );
          if (existing) {
            return currentCart.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }
          return [
            ...currentCart,
            { productId, quantity, price, name, imageUrl },
          ];
        case "UPDATE":
          return currentCart.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          );
        case "REMOVE":
          return currentCart.filter(
            (item) => item.productId !== action.payload.productId
          );
        case "CLEAR":
          return [];
        default:
          return currentCart;
      }
    }
  );

  // Load guest cart on mount
  useEffect(() => {
    setRealCartItems(getGuestCart());
  }, []);

  // WebSocket for inventory updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws/inventory");

    ws.onopen = () => console.log("WebSocket connected");

    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const updates: InventoryItem[] = JSON.parse(event.data);
      console.log("Parsed updates:", updates);
      setInventory((prev) => {
        if (!updates || !Array.isArray(updates)) {
          console.warn("Invalid WebSocket data received:", updates);
          return prev;
        }

        // Full inventory replacement (initial load or bulk update)
        if (updates.length > 1) {
          return updates.map((update) => ({
            productId: update.productId,
            stock: update.stock,
            reservedStock: update.reservedStock,
          }));
        }

        if (updates.length === 0) {
          console.warn("Empty update array received");
          return prev;
        }

        // Single-item update
        const update = updates[0];
        const index = prev.findIndex(
          (item) => item.productId === update.productId
        );

        if (index !== -1) {
          // Update existing item
          const newInventory = [...prev];
          newInventory[index] = {
            ...newInventory[index],
            stock: update.stock,
            reservedStock: update.reservedStock,
          };
          return newInventory;
        } else {
          // Add new item if not found
          return [
            ...prev,
            {
              productId: update.productId,
              stock: update.stock,
              reservedStock: update.reservedStock,
            },
          ];
        }
      });
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket closed");

    return () => ws.close();
  }, []);

  // Sync cart on login status change
  useEffect(() => {
    const syncCart = async () => {
      if (isLoggedIn) {
        const guestCart = getGuestCart();
        if (guestCart.length > 0) {
          try {
            const syncResponse = await fetch(
              "http://localhost:8080/api/carts/sync",
              {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderItems: guestCart.map((item) => ({
                    productID: item.productId,
                    product_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image_url: item.imageUrl,
                  })),
                }),
              }
            );
            if (!syncResponse.ok) throw new Error("Failed to sync guest cart");
            const serverCart: any[] = await syncResponse.json();
            const mappedCart: CartItem[] = serverCart.map((item) => ({
              productId: item.productID,
              quantity: Number(item.quantity),
              price: item.price,
              name: item.productName,
              imageUrl: item.imageUrl?.String || "",
            }));
            localStorage.removeItem("guestCart");
            setRealCartItems(mappedCart);
          } catch (error) {
            console.error("Error syncing guest cart:", error);
            setRealCartItems(guestCart);
          }
        } else {
          try {
            const serverCartResponse = await fetch(
              `http://localhost:8080/api/cart-items/${await getCartId()}`,
              {
                method: "GET",
                credentials: "include",
              }
            );
            if (!serverCartResponse.ok) throw new Error("Failed to fetch cart");
            const serverCart: any[] = await serverCartResponse.json();
            const mappedCart: CartItem[] = serverCart.map((item) => ({
              productId: item.productID,
              quantity: Number(item.quantity),
              price: item.price,
              name: item.productName,
              imageUrl: item.imageUrl?.String || "",
            }));
            setRealCartItems(mappedCart);
          } catch (error) {
            console.error("Error fetching server cart:", error);
            setRealCartItems([]);
          }
        }
      } else {
        setRealCartItems(getGuestCart());
      }
    };
    syncCart();
  }, [isLoggedIn]);

  const getCartId = async (): Promise<string> => {
    const response = await fetch("http://localhost:8080/api/carts/current", {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to get cart ID");
    const { cartId } = await response.json();
    return cartId;
  };

  const addToCart = async (
    productId: string,
    quantity: number,
    price: string,
    name: string,
    imageUrl: string,
    weight: string
  ) => {
    const inventoryItem = inventory.find(
      (item) => item.productId === productId
    );
    const availableStock = inventoryItem
      ? inventoryItem.stock - inventoryItem.reservedStock
      : 0;

    if (quantity > availableStock) {
      toast.error("Not enough stock available.");
      return;
    }

    startTransition(() => {
      setOptimisticCartItems({
        type: "ADD",
        payload: { productId, quantity, price, name, imageUrl },
      });
    });

    if (isLoggedIn) {
      try {
        const existingItem = realCartItems.find(
          (item) => item.productId === productId
        );
        const newQuantity = existingItem
          ? existingItem.quantity + quantity
          : quantity;
        const response = await fetch(
          `http://localhost:8080/api/cart-items/${productId}`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productID: productId,
              product_name: name,
              quantity: newQuantity,
              price,
              image_url: imageUrl,
              weight,
            }),
          }
        );
        if (!response.ok) throw new Error("Failed to add item to cart");
        setRealCartItems((prev) => [
          ...prev.filter((item) => item.productId !== productId),
          { productId, quantity: newQuantity, price, name, imageUrl },
        ]);
      } catch (error) {
        console.error("Error adding item to cart:", error);
        setRealCartItems(realCartItems);
      }
    } else {
      try {
        const existingItem = realCartItems.find(
          (item) => item.productId === productId
        );
        const newQuantity = existingItem
          ? existingItem.quantity + quantity
          : quantity;
        const response = await fetch(
          `http://localhost:8080/api/inventory/reserve/${productId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reservedStock: newQuantity }),
          }
        );
        if (!response.ok) throw new Error("Failed to reserve stock for guest");
        const updatedCart = [
          ...realCartItems.filter((item) => item.productId !== productId),
          { productId, quantity: newQuantity, price, name, imageUrl },
        ];
        setRealCartItems(updatedCart);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Error reserving stock for guest:", error);
        setRealCartItems(realCartItems);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;

    const inventoryItem = inventory.find(
      (item) => item.productId === productId
    );
    const availableStock = inventoryItem
      ? inventoryItem.stock - inventoryItem.reservedStock
      : 0;

    if (quantity > availableStock) {
      console.error("Not enough stock available");
      return;
    }

    startTransition(() => {
      setOptimisticCartItems({
        type: "UPDATE",
        payload: { productId, quantity },
      });
    });

    if (isLoggedIn) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cart-items/${productId}`,
          {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ product_id: productId, quantity }),
          }
        );
        if (!response.ok) throw new Error("Failed to update cart item");
        setRealCartItems((prev) =>
          prev.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          )
        );
      } catch (error) {
        console.error("Error updating cart item:", error);
        setRealCartItems(realCartItems);
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:8080/api/inventory/reserve/${productId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reservedStock: quantity }),
          }
        );
        if (!response.ok) throw new Error("Failed to update stock reservation");
        const updatedCart = realCartItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
        setRealCartItems(updatedCart);
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      } catch (error) {
        console.error("Error updating stock reservation for guest:", error);
        setRealCartItems(realCartItems);
      }
    }
  };

  const removeItem = async (productId: string, quantity: number) => {
    startTransition(() => {
      setOptimisticCartItems({ type: "REMOVE", payload: { productId } });
    });

    if (isLoggedIn) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/cart-items/${productId}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity: quantity }),
          }
        );
        if (!response.ok) throw new Error("Failed to remove item");
        setRealCartItems((prev) =>
          prev.filter((item) => item.productId !== productId)
        );
      } catch (error) {
        console.error("Error removing item:", error);
        setRealCartItems(realCartItems);
      }
    } else {
      const existingItem = realCartItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/inventory/release/${productId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ quantity: quantity }),
            }
          );
          if (!response.ok)
            throw new Error("Failed to release stock for guest");
        } catch (error) {
          console.error("Error releasing stock for guest:", error);
          setRealCartItems(realCartItems);
        }
      }
      const updatedCart = realCartItems.filter(
        (item) => item.productId !== productId
      );
      setRealCartItems(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  const clearGuestCart = () => {
    startTransition(() => {
      setOptimisticCartItems({
        type: "CLEAR",
        payload: null,
      });
    });

    localStorage.removeItem("guestCart");
    setRealCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: optimisticCartItems,
        inventory,
        addToCart,
        updateQuantity,
        removeItem,
        clearGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
