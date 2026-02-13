import { useCartStore } from "@/lib/store";

describe("Cart Logic Test", () => {
  // Reset cart sebelum tes
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it("should add product to cart", () => {
    const product = { id: 1, title: "Test Item", price: 100 };
    useCartStore.getState().addToCart(product as any);
    
    expect(useCartStore.getState().cart.length).toBe(1);
    expect(useCartStore.getState().totalItems()).toBe(1);
  });

  it("should clear the cart", () => {
    useCartStore.getState().addToCart({ id: 1 } as any);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().cart.length).toBe(0);
  });
});