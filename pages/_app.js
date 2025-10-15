import { CartProvider } from "@/components/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <CartDrawer />
    </CartProvider>
  );
}
