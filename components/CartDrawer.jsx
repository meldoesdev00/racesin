import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    cart,
    checkoutUrl,
    decreaseItemQuantity,
    total,
  } = useContext(CartContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-40 cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-[#1b1b1b] text-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-[#c5a05f]">Your Cart</h2>
              <button
                onClick={closeCart}
                className="text-gray-400 hover:text-[#c5a05f] transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm">Your cart is empty.</p>
              ) : (
                cart.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-b border-gray-700 pb-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {item.price.toFixed(2)} {item.currency}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* ❌ Remove one item */}
                    <button
                      onClick={() => decreaseItemQuantity(item.lineId, 1)}
                      className="text-gray-400 hover:text-red-500 transition"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer (Total + Checkout) */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-700">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-lg font-semibold text-[#c5a05f]">
                    {total.toFixed(2)} €
                  </span>
                </div>

                {checkoutUrl && (
                  <button
                    onClick={() => {
                      if (checkoutUrl) window.location.assign(checkoutUrl);
                    }}
                    className="w-full bg-[#c5a05f] hover:bg-[#b28d54] text-white py-3 rounded-xl font-medium text-center block transition"
                  >
                    Go to Checkout
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}



