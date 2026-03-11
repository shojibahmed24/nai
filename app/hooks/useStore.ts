import { create } from 'zustand';
import { INITIAL_PRODUCTS } from '../services/mockData';

interface Product {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  category: string;
  stock_count: number;
  image_urls: string[];
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  user_id: number;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
}

interface Order {
  order_id: number;
  items: CartItem[];
  total: number;
  status: string;
  date: string;
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  wishlist: number[];
  user: User | null;
  orders: Order[];
  searchQuery: string;
  selectedCategory: string;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, delta: number) => void;
  toggleWishlist: (productId: number) => void;
  login: (email: string) => void;
  logout: () => void;
  placeOrder: (address: string) => void;
  updateProductStock: (productId: number, newStock: number) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>((set) => ({
  products: INITIAL_PRODUCTS,
  cart: [],
  wishlist: [],
  user: null,
  orders: [],
  searchQuery: '',
  selectedCategory: 'All',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  addToCart: (product) => set((state) => {
    const existing = state.cart.find(item => item.product_id === product.product_id);
    if (existing) {
      return { cart: state.cart.map(item => 
        item.product_id === product.product_id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )};
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product_id !== productId)
  })),

  updateCartQuantity: (productId, delta) => set((state) => ({
    cart: state.cart.map(item => 
      item.product_id === productId 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
        : item
    )
  })),

  toggleWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.includes(productId)
      ? state.wishlist.filter(id => id !== productId)
      : [...state.wishlist, productId]
  })),

  login: (email) => set({
    user: {
      user_id: 1,
      email,
      full_name: email.split('@')[0],
      role: email.includes('admin') ? 'admin' : 'user'
    }
  }),

  logout: () => set({ user: null, cart: [], wishlist: [] }),

  placeOrder: (address) => set((state) => {
    const newOrder: Order = {
      order_id: Date.now(),
      items: [...state.cart],
      total: state.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      status: 'Processing',
      date: new Date().toLocaleDateString()
    };
    return {
      orders: [newOrder, ...state.orders],
      cart: []
    };
  }),

  updateProductStock: (productId, newStock) => set((state) => ({
    products: state.products.map(p => 
      p.product_id === productId ? { ...p, stock_count: newStock } : p
    )
  })),

  clearCart: () => set({ cart: [] })
}));