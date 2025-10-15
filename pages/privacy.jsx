import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Racesin Motorsports</title>
      </Head>

      <div className="min-h-screen bg-[#121111] text-gray-300">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/racesin_logo.svg"
                alt="Racesin Logo"
                className="h-10 w-auto"
              />
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-gray-400 hover:text-indigo-400 transition"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            Privacy Policy
          </h1>

          <div className="space-y-10">
            {/* ...other sections unchanged... */}

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                The Online store uses only essential cookies necessary for the website’s technical operation, shopping cart functionality, and order completion.  
                No analytics, tracking, or advertising cookies are used.
              </p>
              <p className="text-gray-400 mt-4">
                More information about cookies is available in the{" "}
                <Link
                  href="/cookies"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Cookie Policy
                </Link>{" "}
                at racesin.com/cookies.
              </p>
            </section>

            {/* ...rest of file unchanged... */}
          </div>

          <p className="text-sm text-gray-500 mt-12">
            Last updated: 15 October 2025
          </p>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
            © 2025 Racesin Motorsports. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
