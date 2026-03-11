import React from 'react';
import { Search, ShoppingCart, Heart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useStore } from '../hooks/useStore';

export const Navbar = ({ onOpenCart, onOpenAuth, onOpenWishlist, setView }: any) => {
  const { cart, wishlist, user, logout, searchQuery, setSearchQuery } = useStore();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => setView('home')}
          >
            <span className="text-2xl font-black tracking-tighter text-indigo-600">LUXE.</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user?.role === 'admin' && (
              <button
                onClick={() => setView('admin')}
                className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <LayoutDashboard className="h-6 w-6" />
              </button>
            )}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-gray-600 hover:text-red-500 transition-colors relative"
            >
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              onClick={onOpenCart}
              className="p-2 text-gray-600 hover:text-indigo-600 transition-colors relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setView('orders')}
                  className="hidden sm:block text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  {user.full_name}
                </button>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                <User className="h-6 w-6" />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};