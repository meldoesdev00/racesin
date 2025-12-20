import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <CartDrawer />
      <Analytics />
    </CartProvider>
  );
}
