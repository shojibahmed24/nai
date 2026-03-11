import React from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { motion } from 'framer-motion';

export const ProductCard = ({ product, onOpenDetail }: any) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(product.product_id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        <img
          src={product.image_urls[0]}
          alt={product.product_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
          <button
            onClick={() => onOpenDetail(product)}
            className="p-3 bg-white rounded-full text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors shadow-lg"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => addToCart(product)}
            className="p-3 bg-white rounded-full text-gray-900 hover:bg-indigo-600 hover:text-white transition-colors shadow-lg"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
        <button
          onClick={() => toggleWishlist(product.product_id)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{product.category}</p>
          <p className="text-xs text-gray-400">{product.stock_count} in stock</p>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.product_name}</h3>
        <p className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};