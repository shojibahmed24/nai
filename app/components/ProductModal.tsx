import React from 'react';
import { X, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductModal = ({ product, isOpen, onClose }: any) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  if (!product) return null;

  const isWishlisted = wishlist.includes(product.product_id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white shadow-sm"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-gray-100">
              <img src={product.image_urls[0]} alt={product.product_name} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <div className="flex-1">
                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2">{product.category}</p>
                <h2 className="text-3xl font-black text-gray-900 mb-4">{product.product_name}</h2>
                <p className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
                <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                <div className="grid grid-cols-1 gap-4 mb-8">
                  <div className="flex items-center text-sm text-gray-500">
                    <Truck className="h-5 w-5 mr-3 text-indigo-500" />
                    <span>Free express shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <RotateCcw className="h-5 w-5 mr-3 text-indigo-500" />
                    <span>30-day easy return policy</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ShieldCheck className="h-5 w-5 mr-3 text-indigo-500" />
                    <span>2-year manufacturer warranty</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(product.product_id)}
                  className={`p-4 rounded-xl border transition-all ${
                    isWishlisted ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};