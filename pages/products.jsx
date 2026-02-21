import Head from "next/head";
import { useRouter } from "next/router";
import { storefront } from "@/styles/utils";

export default function ProductsPage({ products }) {
  const router = useRouter();

  return (
    <div className="relative bg-[#121111] min-h-screen flex flex-col">
      <Head>
        <title>Frames | Racesin Motorsport</title>
      </Head>

      {/* ✅ Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-8 lg:px-16">
          <div className="flex lg:flex-1">
            <a onClick={() => router.push("/")} className="-m-1.5 p-1.5 cursor-pointer">
              <img src="/racesin_logo.svg" alt="Racesin Logo" className="h-12 w-auto" />
            </a>
          </div>
          <div className="flex items-center gap-x-8">
            <button
              onClick={() => router.push("/")}
              className="hidden lg:block text-sm font-semibold text-gray-100 hover:text-[#c5a05f] transition"
            >
              Back to Home
            </button>
          </div>
        </nav>
      </header>

      {/* 🛍️ Main Content */}
      <main className="flex-grow pt-32 sm:pt-40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
          <h2 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight">
            Our Frames
          </h2>
          <p className="mt-3 text-gray-400 text-lg leading-relaxed">
            Precision-engineered racing frames for ultimate performance.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          {products && products.length > 0 ? (
            /* Aligns the 2 products to the center of the page */
            <div className="flex flex-wrap justify-center gap-10">
              {products.map((product) => {
                const imageNode = product.images?.edges?.[0]?.node;
                const imageUrl = imageNode?.url || "/placeholder.jpg";
                
                const priceAmount = parseFloat(product.priceRange?.minVariantPrice?.amount || 0);
                const formattedPrice = priceAmount % 1 === 0 
                  ? `${priceAmount.toFixed(0)} €` 
                  : `${priceAmount.toFixed(2)} €`;

                return (
                  <div
                    key={product.handle}
                    onClick={() => router.push(`/products/${product.handle}`)}
                    className="group bg-[#1b1b1b] rounded-2xl overflow-hidden shadow-lg hover:shadow-[#c5a05f]/10 transition-all duration-300 w-full sm:w-[45%] lg:w-[380px] cursor-pointer border border-transparent hover:border-gray-800"
                  >
                    {/* Rectangle kept exactly the same size, photo fills it */}
                    <div className="aspect-square w-full overflow-hidden bg-[#242424]">
                      <img
                        alt={imageNode?.altText || product.title}
                        src={imageUrl}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Text Section - Cleaned up hierarchy */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#c5a05f] transition-colors line-clamp-1">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xl font-semibold text-[#c5a05f]">
                          {formattedPrice}
                        </p>
                        <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-16 text-lg">
              No products found in the Frames collection.
            </p>
          )}
        </div>
      </main>

      {/* ✅ Footer */}
      <footer className="bg-[#121111] text-gray-400 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-800">
          <div className="flex justify-center space-x-6 mb-6">
            <a href="https://www.facebook.com/reisinromet/" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 2 .1v2.2h-1.1c-1 0-1.3.6-1.3 1.3V12h2.5l-.4 3h-2.1v7A10 10 0 0 0 22 12z" /></svg>
            </a>
            <a href="https://www.instagram.com/racesinmotorsport/" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.6 0 3 1.4 3 3v10c0 1.6-1.4 3-3 3H7c-1.6 0-3-1.4-3-3V7c0-1.6 1.4-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z" /></svg>
            </a>
          </div>
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Racesin Motorsport. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const result = await storefront(productsQuery, { handle: "frames" });
    const products = result?.data?.collection?.products?.edges?.map(edge => edge.node) || [];
    return { props: { products }, revalidate: 60 };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { props: { products: [] }, revalidate: 10 };
  }
}

const productsQuery = `
query getCollectionByHandle($handle: String!) {
  collection(handle: $handle) {
    products(first: 20) {
      edges {
        node {
          title
          handle
          priceRange { minVariantPrice { amount } }
          images(first: 1) { edges { node { url altText } } }
        }
      }
    }
  }
}
`;