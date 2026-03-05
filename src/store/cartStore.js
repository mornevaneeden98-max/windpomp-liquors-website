import { create } from 'zustand';

const useCartStore = create((set) => ({
    cart: [],
    addToCart: (product, size, qtyToAdd = 1) => set((state) => {
        // Find if product with same id and size already exists
        const existingItem = state.cart.find(item => item.id === product.id && item.size === size);

        if (existingItem) {
            return {
                cart: state.cart.map(item =>
                    (item.id === product.id && item.size === size)
                        ? { ...item, quantity: item.quantity + qtyToAdd }
                        : item
                )
            };
        }

        return { cart: [...state.cart, { ...product, size, quantity: qtyToAdd }] };
    }),
    removeFromCart: (productId, size) => set((state) => ({
        cart: state.cart.filter(item => !(item.id === productId && item.size === size))
    })),
    clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
