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
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. Data Controller
              </h2>
              <p className="text-gray-400 leading-relaxed">
                This Privacy Policy explains how RoKe Profiles OÜ (hereinafter the
                “Company”, “we”, or the “Online store”) collects, processes, and protects
                personal data when you use the online store at{" "}
                <span className="text-indigo-400">racesin.com</span>.
              </p>
              <p className="text-gray-400 mt-4">
                The Company processes personal data in accordance with the General
                Data Protection Regulation (EU) 2016/679 (GDPR) and the Estonian
                Personal Data Protection Act.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Personal Data Processed
              </h2>
              <p className="text-gray-400 leading-relaxed">
                The Online store processes only the data necessary for order fulfilment and
                customer communication, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Name</li>
                <li>E-mail address</li>
                <li>Phone number</li>
                <li>Delivery address</li>
                <li>Payment information (for invoicing and contract performance)</li>
              </ul>
              <p className="text-gray-400 mt-4">
                The Company does not collect or process special categories of personal
                data.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Purpose and Legal Basis of Processing
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Personal data is processed solely for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>To process and fulfil orders placed through the Online store</li>
                <li>To issue invoices and comply with accounting and legal obligations</li>
                <li>To communicate with customers regarding orders, deliveries, and returns</li>
              </ul>
              <p className="text-gray-400 mt-4">The legal bases for processing are:</p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Performance of a contract (GDPR Article 6(1)(b))</li>
                <li>Compliance with a legal obligation (GDPR Article 6(1)(c))</li>
                <li>Legitimate interest of the Company (GDPR Article 6(1)(f))</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Data Retention Periods
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Personal data is stored only as long as necessary for the stated purposes:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Order and communication data: up to 3 years after contract completion</li>
                <li>Accounting records: up to 7 years, as required by Estonian accounting laws</li>
              </ul>
              <p className="text-gray-400 mt-4">
                After the retention period expires, personal data is securely deleted or anonymised.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Data Disclosure and Third Parties
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Personal data may be shared only with trusted service providers necessary for order processing, such as:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Payment service providers</li>
                <li>Logistics and courier companies</li>
                <li>Accounting service providers</li>
              </ul>
              <p className="text-gray-400 mt-4">
                All partners are bound by data processing agreements and confidentiality obligations in accordance with GDPR Article 28.  
                Personal data is not shared with third parties for marketing, advertising, or profiling purposes.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Data Security</h2>
              <p className="text-gray-400 leading-relaxed">
                The Company implements appropriate technical and organisational measures to protect personal data from unauthorised access, alteration, disclosure, or destruction, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>SSL encryption</li>
                <li>Restricted access for authorised personnel only</li>
                <li>Secure data storage and backups</li>
              </ul>
              <p className="text-gray-400 mt-4">
                All employees and service providers with access to personal data are bound by confidentiality obligations.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Data Subject Rights</h2>
              <p className="text-gray-400 leading-relaxed">
                Clients (data subjects) have the following rights regarding their personal data:
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Right of access – to know which data is being processed</li>
                <li>Right to rectification – to correct inaccurate or incomplete data</li>
                <li>Right to erasure (“right to be forgotten”)</li>
                <li>Right to restriction of processing</li>
                <li>Right to object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
                <li>
                  Right to lodge a complaint with the Estonian Data Protection Inspectorate (
                  <a
                    href="https://www.aki.ee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    www.aki.ee
                  </a>
                  )
                </li>
              </ul>
              <p className="text-gray-400 mt-4">
                To exercise any of these rights, the Client may submit a written request to{" "}
                <a
                  href="mailto:rokeprofiles@gmail.com"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  rokeprofiles@gmail.com
                </a>
                . The Company will respond within 30 calendar days.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Cookies</h2>
              <p className="text-gray-400 leading-relaxed">
                The Online store uses only essential cookies necessary for the website’s technical operation, shopping cart functionality, and order completion.  
                No analytics, tracking, or advertising cookies are used.
              </p>
              <p className="text-gray-400 mt-4">
                More information about cookies is available in the{" "}
                <a
                  href="/cookies"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Cookie Policy
                </a>{" "}
                at racesin.com/cookies.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                9. International Data Transfers
              </h2>
              <p className="text-gray-400 leading-relaxed">
                All personal data is stored and processed within the European Union (EU).  
                Data will not be transferred outside the European Economic Area (EEA) unless adequate protection measures are in place, in compliance with GDPR Articles 44–49.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                10. Amendments to This Policy
              </h2>
              <p className="text-gray-400 leading-relaxed">
                The Company reserves the right to update this Privacy Policy from time to time.  
                Any changes will be published on{" "}
                <a
                  href="https://racesin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  racesin.com
                </a>{" "}
                and will take effect upon publication.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                11. Contact Information and Inquiries
              </h2>
              <p className="text-gray-400 leading-relaxed">
                RoKe Profiles OÜ <br />
                E-mail:{" "}
                <a
                  href="mailto:rokeprofiles@gmail.com"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  rokeprofiles@gmail.com
                </a>
  
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">Legal Compliance</h2>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>The General Data Protection Regulation (EU) 2016/679 (GDPR)</li>
                <li>The Estonian Personal Data Protection Act (IKS)</li>
                <li>
                  The Consumer Protection Act (Tarbijakaitseseadus) and other applicable
                  legislation of the Republic of Estonia and the European Union
                </li>
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
            © 2025 Racesin Motorsports. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
