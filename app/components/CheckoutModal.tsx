import React, { useState } from 'react';
import { X, CreditCard, MapPin, CheckCircle2 } from 'lucide-react';
import { useStore } from '../hooks/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const CheckoutModal = ({ isOpen, onClose }: any) => {
  const { cart, placeOrder } = useStore();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleComplete = () => {
    placeOrder(address);
    setStep(3);
  };

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
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-900">
                  {step === 1 ? 'Shipping Details' : step === 2 ? 'Payment' : 'Order Confirmed'}
                </h2>
                {step < 3 && (
                  <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="h-6 w-6" />
                  </button>
                )}
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea 
                      placeholder="Full Shipping Address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    disabled={!address}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Order Total</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input 
                        type="text" placeholder="Card Number" 
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                      <input type="text" placeholder="CVC" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  <button 
                    onClick={handleComplete}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
                  >
                    Pay Now
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your order!</h3>
                  <p className="text-gray-500 mb-8">Your order has been placed and is being processed.</p>
                  <button 
                    onClick={onClose}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black"
                  >
                    Back to Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};