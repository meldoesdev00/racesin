import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import { storefront } from "@/styles/utils";
import { useCart } from "@/components/CartContext";
import Footer from "@/components/ui/Footer";
import ContactDrawer from "@/components/ContactDrawer";

export default function ProductPage({ product }) {
  const [loading, setLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const router = useRouter();

  // 🛒 Cart logic preserved but temporarily inactive
  const { addToCart, openCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 bg-[#121111]">
        Product not found.
      </div>
    );
  }

  const image =
    product.images?.edges?.[0]?.node?.transformedSrc ||
    "https://via.placeholder.com/600x600.png?text=No+Image";

  const price = parseFloat(
    product.priceRange?.minVariantPrice?.amount || 0
  ).toFixed(2);
  const formattedPrice =
    price.endsWith(".00") ? `${parseInt(price)} €` : `${price} €`;

  const variantId = product?.variants?.edges?.[0]?.node?.id || null;

  // 💳 Buy Now → open Contact Drawer
  const handleBuyNow = async () => {
    setBuyLoading(true);
    try {
      setIsContactOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setBuyLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{`${product.title} | Racesin Motorsport`}</title>
      </Head>

      <div className="relative min-h-screen text-white bg-[#121111]">
        {/* 🧭 Navbar */}
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="flex items-center justify-between p-8 lg:px-16"
          >
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

            <div className="flex items-center gap-6 text-gray-100">
              <button
                onClick={() => router.push("/products")}
                className="flex items-center text-sm font-semibold hover:text-[#c5a05f] transition"
              >
                <ArrowLeft className="w-5 h-5 sm:hidden" />
                <span className="hidden sm:inline">Back to other products</span>
              </button>
            </div>
          </nav>
        </header>

        {/* 🏎️ Product Info */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          {/* Image Container - Filled with object-cover */}
          <div className="bg-[#2e2e2e] rounded-2xl flex items-center justify-center aspect-square overflow-hidden shadow-lg border border-gray-800/30">
            <img
              src={image}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              {/* 🏷️ Title + Price */}
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-3xl font-semibold text-[#c5a05f] mb-6">
                {formattedPrice}
              </p>

              <div
                className="text-gray-300 mb-8 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              {/* Specifications only */}
              {product.specifications && (
                <div className="mb-10">
                  <h2 className="text-lg font-semibold mb-3 text-white">
                    Specifications
                  </h2>
                  <div className="text-gray-300 leading-relaxed whitespace-pre-line bg-[#1b1b1b] p-4 rounded-xl border border-gray-800/50">
                    {product.specifications}
                  </div>
                </div>
              )}

              {/* 💳 Buy button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 mb-10">
                <button
                  onClick={handleBuyNow}
                  disabled={buyLoading}
                  className={`flex-1 sm:flex-none bg-[#c5a05f] text-white hover:bg-[#b28d54] font-medium px-8 py-3 rounded-xl transition shadow-lg shadow-[#c5a05f]/10 ${
                    buyLoading && "opacity-60 cursor-not-allowed"
                  }`}
                >
                  {buyLoading ? "Opening..." : "Buy Now"}
                </button>
              </div>

              {/* FAQ */}
              <div className="mt-10 border-t border-gray-800 pt-8">
                <h3 className="text-lg font-semibold mb-6 text-white">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6 text-sm text-gray-400">
                  <div>
                    <p className="font-medium text-white">
                      What’s included with this simulator rig?
                    </p>
                    <p className="mt-1">
                      Each simulator rig comes with the main frame and mounting
                      points for your wheel, pedals, and seat.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      Is this simulator compatible with my setup?
                    </p>
                    <p className="mt-1">
                      Most rigs are compatible with major brands like Logitech,
                      Thrustmaster, and Fanatec.
                    </p>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🆕 Contact Drawer */}
        <ContactDrawer
          isOpen={isContactOpen}
          onClose={() => setIsContactOpen(false)}
          product={product.title}
          price={formattedPrice}
        />

        <Footer />
      </div>
    </>
  );
}

// 🧠 Static Props + Query
export async function getStaticProps({ params }) {
  const variables = { handle: params.handle };
  const { data } = await storefront(productDataQuery, variables);

  const product = data?.productByHandle || null;

  return {
    props: {
      product: {
        ...product,
        specifications: product?.specifications?.value || "",
      },
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

const productDataQuery = `
query ProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    title
    description
    priceRange { minVariantPrice { amount } }
    images(first: 1) { edges { node { transformedSrc altText } } }
    variants(first: 1) { edges { node { id } } }
    specifications: metafield(namespace: "custom", key: "specifications") { value }
  }
}
`;