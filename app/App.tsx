import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { useStore } from './hooks/useStore';
import { Filter, Package, History, Settings, Plus, Heart } from 'lucide-react';

export default function App() {
  const { products, searchQuery, selectedCategory, setSelectedCategory, user, orders, wishlist } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [view, setView] = useState<'home' | 'admin' | 'orders' | 'wishlist'>('home');

  const categories = ['All', 'Electronics', 'Fashion', 'Home'];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const wishlistedProducts = useMemo(() => {
    return products.filter(p => wishlist.includes(p.product_id));
  }, [products, wishlist]);

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-3xl overflow-hidden bg-indigo-600 mb-12">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="relative px-8 py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Elevate Your Lifestyle
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl max-w-2xl mb-8">
            Discover our curated collection of premium products designed for the modern individual.
          </p>
          <button className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-colors shadow-xl">
            Shop New Arrivals
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 font-medium">
          Showing {filteredProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.product_id}
            product={product}
            onOpenDetail={setSelectedProduct}
          />
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-black text-gray-900 mb-8">My Wishlist</h2>
      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <Heart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">Your wishlist is empty.</p>
          <button onClick={() => setView('home')} className="mt-4 text-indigo-600 font-bold">Go Shopping</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistedProducts.map(product => (
            <ProductCard
              key={product.product_id}
              product={product}
              onOpenDetail={setSelectedProduct}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderAdmin = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black text-gray-900">Inventory Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.product_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={p.image_urls[0]} className="w-10 h-10 rounded-lg object-cover mr-3" />
                    <span className="font-medium text-gray-900">{p.product_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{p.category}</td>
                <td className="px-6 py-4 font-bold">${p.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock_count < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {p.stock_count} units
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-900 font-bold text-sm">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-black text-gray-900 mb-8">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
          <History className="h-16 w-16 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">No orders found yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.order_id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.order_id}</p>
                  <p className="text-sm font-medium">{order.date}</p>
                </div>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold">
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                {order.items.map(item => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.product_name} x {item.quantity}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-xl font-black text-indigo-600">${order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter']">
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWishlist={() => setView('wishlist')}
        setView={setView}
      />
      <main className="pb-20">
        {view === 'home' && renderHome()}
        {view === 'admin' && renderAdmin()}
        {view === 'orders' && renderOrders()}
        {view === 'wishlist' && renderWishlist()}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setView('home')} className={`p-2 ${view === 'home' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Package className="h-6 w-6" />
        </button>
        <button onClick={() => setView('wishlist')} className={`p-2 ${view === 'wishlist' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <Heart className="h-6 w-6" />
        </button>
        <button onClick={() => setIsCartOpen(true)} className="p-2 text-gray-400">
          <ShoppingCart className="h-6 w-6" />
        </button>
        <button onClick={() => setView('orders')} className={`p-2 ${view === 'orders' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <History className="h-6 w-6" />
        </button>
        {user?.role === 'admin' && (
          <button onClick={() => setView('admin')} className={`p-2 ${view === 'admin' ? 'text-indigo-600' : 'text-gray-400'}`}>
            <Settings className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}