import Head from "next/head";
import Link from "next/link";

export default function Cookies() {
  return (
    <>
      <Head>
        <title>Cookie Policy | Racesin Motorsport</title>
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
              className="text-sm font-medium text-gray-400 hover:text-[#c5a05f] transition"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            Cookie Policy
          </h1>

          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. General Information
              </h2>
              <p className="text-gray-400 leading-relaxed">
                This Cookie Policy explains how RoKe Profiles OÜ (hereinafter
                the “Company”) uses cookies on its website{" "}
                <span className="text-[#c5a05f]">racesin.com</span>. We respect
                your privacy and only use cookies essential for the website and
                online store to function properly.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. What Are Cookies?
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Cookies are small text files stored on your device when visiting
                a website. They allow the site to remember user preferences,
                such as shopping cart contents or login sessions. Cookies used
                by this site do not contain personal data or enable personal
                identification.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Types of Cookies Used
              </h2>

              <h3 className="text-lg font-medium text-white mt-4 mb-2">
                Essential Cookies
              </h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>Website functionality</li>
                <li>Maintaining shopping cart and session data</li>
                <li>Completing orders and payments</li>
                <li>Ensuring site security</li>
              </ul>
              <p className="text-gray-400 mt-2">
                Without these cookies, the site cannot function properly.
              </p>

              <h3 className="text-lg font-medium text-white mt-6 mb-2">
                Non-essential Cookies
              </h3>
              <p className="text-gray-400">
                The website does not use analytics, advertising or tracking
                cookies, or any third-party cookies (e.g., Google, Meta, TikTok).
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Legal Basis
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Because only strictly necessary cookies are used, separate
                consent is not required, in accordance with GDPR Article
                6(1)(f) and Section 111¹ of the Estonian Electronic
                Communications Act.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Retention Period
              </h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                Essential cookies are stored only for the duration of the user’s
                session or until the order is completed. They are automatically
                deleted once the browser is closed.
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>
                  <span className="font-medium text-white">session_id</span> –
                  keeps the session active
                </li>
                <li>
                  <span className="font-medium text-white">cart_token</span> –
                  temporarily stores shopping cart contents
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Managing and Disabling Cookies
              </h2>
              <p className="text-gray-400 leading-relaxed mb-3">
                Users may delete or disable cookies in their browser settings.
                However, disabling essential cookies may cause the website to
                malfunction or prevent order completion.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Instructions for managing cookies:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 mt-2">
                <li>Google Chrome</li>
                <li>Mozilla Firefox</li>
                <li>Safari</li>
                <li>Microsoft Edge</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Third-Party Access
              </h2>
              <p className="text-gray-400 leading-relaxed">
                The website does not share cookie data with any third parties
                and does not allow external access. All information remains
                under the Company’s control and is stored within the European
                Union.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                8. Amendments
              </h2>
              <p className="text-gray-400 leading-relaxed">
                The Company may update this Cookie Policy when necessary. The
                latest version will always be available on{" "}
                <Link
                  href="https://racesin.com/cookies"
                  className="text-[#c5a05f] hover:text-[#c5a05f]"
                >
                  racesin.com/cookies
                </Link>
                .
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                9. Contact
              </h2>
              <p className="text-gray-400 leading-relaxed">
                RoKe Profiles OÜ <br />
                E-mail:{" "}
                <Link
                  href="mailto:rokeprofiles@gmail.com"
                  className="text-[#c5a05f] hover:text-[#c5a05f]"
                >
                  rokeprofiles@gmail.com
                </Link>
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                10. Compliance
              </h2>
              <ul className="list-disc list-inside text-gray-400 space-y-2">
                <li>EU General Data Protection Regulation (GDPR)</li>
                <li>Estonian Personal Data Protection Act</li>
                <li>Estonian Electronic Communications Act §111¹</li>
              </ul>
            </section>
          </div>

          <p className="text-sm text-gray-500 mt-12">
            Last updated: 15 October 2025
          </p>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-6xl mx-auto px-6 py-10 text-center text-sm text-gray-500">
            © 2025 Racesin Motorsport. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

