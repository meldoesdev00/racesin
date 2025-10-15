import Head from "next/head";
import { useRouter } from "next/router";
import { storefront } from "@/styles/utils";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartContext";

export default function ProductsPage({ products }) {
  const router = useRouter();
  const { openCart } = useCart();

  return (
    <div className="relative bg-[#121111] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* 🧠 Browser Tab Title */}
      <Head>
        <title>Products | Racesin Motorsports</title>
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

            {/* 🛒 Global Cart Icon */}
            <button
              onClick={openCart}
              className="text-white hover:text-[#c5a05f] transition"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-7 w-7" />
            </button>
          </div>
        </nav>
      </header>

      {/* 🛍️ Header Section */}
      <div className="pt-20 max-w-4xl mx-auto text-center space-y-4 mb-10">
        <h2 className="text-white text-4xl sm:text-5xl font-extrabold">
          Discover Our Products
        </h2>
        <p className="mt-3 text-gray-400 text-lg leading-relaxed">
          At RaceSin, we craft high-quality sim racing and engineering products,
          blending precision, performance, and passion.
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
