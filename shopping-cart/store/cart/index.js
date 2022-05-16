import create from 'zustand';

const initialState = {
  open: false,
  products: [],
};

const addProduct = ({ products }, product) => {
  if (products.includes(product)) {
    return products;
  }
  return [...products, product];
};

const useCartStore = create((set) => ({
  state: {
    ...initialState,
  },
  actions: {
    reset: () => set(() => ({ state: { ...initialState } })),
    toggle: () =>
      set((store) => ({ state: { ...store.state, open: !store.state.open } })),
    add: (product) =>
      set((store) => ({
        state: {
          open: true,
          products: addProduct(store.state, product),
        },
      })),
  },
}));

export { useCartStore };
