import Head from "next/head";
import { useRouter } from "next/router";
import { storefront } from "@/styles/utils";
import { ShoppingCart } from "lucide-react";
// 🛒 Temporarily disabled cart context
// import { useCart } from "@/components/CartContext";

export default function ProductsPage({ products }) {
  const router = useRouter();

  // 🛒 Disabled temporarily — uncomment when reactivating cart
  // const { openCart } = useCart();

  return (
    <div className="relative bg-[#121111] min-h-screen flex flex-col">
      {/* 🧠 Browser Tab Title */}
      <Head>
        <title>Products | Racesin Motorsport</title>
      </Head>

      {/* ✅ Navbar */}
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-8 lg:px-16"
          >
            {/* Logo */}
            <div className="flex lg:flex-1">
              <a
                onClick={() => router.push("/")}
                className="-m-1.5 p-1.5 cursor-pointer"
              >
                <img
                  src="/racesin_logo.svg"
                  alt="Racesin Logo"
                  className="h-12 w-auto"
                />
              </a>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-x-8">
              <button
                onClick={() => router.push("/")}
                className="hidden lg:block text-sm font-semibold text-gray-100 hover:text-[#c5a05f] transition"
              >
                Back to Home
              </button>

              {/* 🛒 Cart temporarily hidden — keep this for later use */}
              {/*
              <button
                // onClick={openCart} // 📴 temporarily disabled
                onClick={() =>
                  alert("🛒 Cart feature is currently disabled. Coming soon!")
                }
                className="text-white hover:text-[#c5a05f] transition"
                aria-label="Cart temporarily disabled"
              >
                <ShoppingCart className="h-7 w-7 opacity-80" />
              </button>
              */}
            </div>
          </nav>
        </header>


      {/* 🛍️ Main Content */}
      <main className="flex-grow pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8">
        {/* 🏎️ Header Section */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-10">
          <h2 className="text-white text-4xl sm:text-5xl font-extrabold">
            Discover Our Products
          </h2>
          <p className="mt-3 text-gray-400 text-lg leading-relaxed">
            At Racesin, we craft high-quality sim racing and engineering
            products, blending precision, performance, and passion.
          </p>
        </div>

        {/* 🏎️ Products Grid */}
        <div className="mx-auto max-w-7xl">
          {products.edges.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {products.edges.map((item) => {
                const product = item.node;
                const imagep = product.images.edges[0]?.node;
                const price = parseFloat(
                  product.priceRange.minVariantPrice.amount
                );
                const formattedPrice =
                  price % 1 === 0
                    ? `${price.toFixed(0)} €`
                    : `${price.toFixed(2)} €`;

                return (
                  <div
                    key={product.handle}
                    onClick={() => router.push(`/products/${product.handle}`)}
                    className="cursor-pointer group block bg-[#1b1b1b] rounded-2xl overflow-hidden shadow-lg hover:shadow-[#c5a05f]/20 transition-transform transform hover:-translate-y-1 duration-300"
                  >
                    <div className="aspect-square w-full overflow-hidden">
                      <img
                        alt={imagep?.altText || product.title}
                        src={imagep?.transformedSrc || "/placeholder.jpg"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white truncate group-hover:text-[#c5a05f] transition-colors duration-200">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-base font-medium text-gray-300">
                        {formattedPrice}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-16 text-lg">
              No products available at the moment. Please check back soon!
            </p>
          )}
        </div>
      </main>

      {/* ✅ Footer Section */}
      <footer className="bg-[#121111] text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://www.facebook.com/reisinromet/"
              className="hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2.2h-1.1c-1 0-1.3.6-1.3 1.3V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/racesinmotorsport/"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z" />
              </svg>
            </a>
          </div>

          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Racesin Motorsport. All rights
            reserved. <br /> Website made by m2.
          </p>
        </div>
      </footer>
    </div>
  );
}

// --- Shopify ---
export async function getStaticProps() {
  const result = await storefront(productsQuery);

  return {
    props: {
      products: result?.data?.products || { edges: [] },
    },
  };
}

const productsQuery = `
query Products {
  products(first: 6) {
    edges {
      node {
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 1) {
          edges {
            node {
              transformedSrc
              altText
            }
          }
        }
      }
    }
  }
}
`;
