import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Racesin Motorsports</title>
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
            Terms & Conditions
          </h1>

          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                1. General Information
              </h2>
              <p className="text-gray-400 leading-relaxed">
                These Terms & Conditions govern the legal relationship between
                the online store Racesin Motorsports (hereinafter referred to as
                the “Online store”) and the customer (hereinafter the “Client”) when
                ordering, purchasing, and using goods offered in the Online store.
              </p>
              <div className="mt-4 text-gray-400 space-y-1">
                <p>Online store operator: RoKe Profiles OÜ</p>
                <p>Registration code: 17208696</p>
                <p>Address: J. Sütiste tee 58-56, 13420 Tallinn, Harju County, Estonia</p>
                <p>
                  E-mail:{" "}
                  <a
                    href="mailto:rokeprofiles@gmail.com"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    rokeprofiles@gmail.com
                  </a>
                </p>
              </div>
              <p className="text-gray-400 mt-4">
                These Terms apply to all sales contracts concluded through the
                Online store. By placing an order, the Client confirms that they have
                read, understood, and accepted these Terms & Conditions.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                2. Sales Contract and Order Placement
              </h2>
              <ul className="list-decimal list-inside text-gray-400 space-y-2">
                <li>
                  To place an order, the Client must select the desired products,
                  add them to the cart, and follow the checkout steps.
                </li>
                <li>
                  The Client must provide accurate and truthful information when
                  completing the order.
                </li>
                <li>
                  The sales contract is deemed concluded once the payment has
                  been received in the bank account of RoKe Profiles OÜ.
                </li>
                <li>
                  The Online store reserves the right to cancel an order if payment has
                  not been received within three (3) working days.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                3. Prices and Payment
              </h2>
              <ul className="list-decimal list-inside text-gray-400 space-y-2">
                <li>
                  All prices are expressed in euros (€) and include applicable
                  taxes.
                </li>
                <li>
                  The Online store reserves the right to modify prices and conditions
                  at any time. Changes take effect once published on{" "}
                  <span className="text-indigo-400">racesin.com</span>.
                </li>
                <li>
                  Payments are made using secure methods. All payments are
                  received into the bank account of RoKe Profiles OÜ.
                </li>
                <li>
                  By making a payment, the Client confirms their intention to
                  purchase the selected goods under these Terms & Conditions.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                4. Delivery Conditions
              </h2>
              <ul className="list-decimal list-inside text-gray-400 space-y-2">
                <li>
                  Goods are delivered using the method selected at checkout.
                </li>
                <li>Standard delivery time: 14–30 days from payment.</li>
                <li>
                  If delivery exceeds 30 days, the Client will be notified and
                  may cancel the order.
                </li>
                <li>
                  Deliveries available to the EU and the UK. Excluded regions:
                  Russia, Belarus, Iran, North Korea, Syria, Afghanistan,
                  Eritrea, Sudan, and sanctioned territories.
                </li>
                <li>
                  Delays due to customs or force majeure will be communicated
                  promptly.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                5. Receipt and Inspection of Goods
              </h2>
              <ul className="list-decimal list-inside text-gray-400 space-y-2">
                <li>
                  Upon receipt, the Client must inspect goods for accuracy and
                  damage.
                </li>
                <li>
                  Any defects must be reported within 3 working days to{" "}
                  <a
                    href="mailto:rokeprofiles@gmail.com"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    rokeprofiles@gmail.com
                  </a>
                  .
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                6. Right of Withdrawal and Returns
              </h2>
              <ul className="list-decimal list-inside text-gray-400 space-y-2">
                <li>
                  Consumers may withdraw from a purchase within 14 days by
                  emailing{" "}
                  <a
                    href="mailto:rokeprofiles@gmail.com"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    rokeprofiles@gmail.com
                  </a>
                  .
                </li>
                <li>
                  Goods must be unused, undamaged, and in original packaging.
                </li>
                <li>
                  Refunds are issued within 14 days to the original payment
                  method.
                </li>
                <li>
                  The right of withdrawal does not apply to custom, used, or
                  unhygienic items.
                </li>
                <li>The Client covers return shipping unless the item is faulty.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                7. Claims and Warranty Terms
              </h2>
              <ul className="list-decimal list-inside text-gray-400 space-y-2">
                <li>Claims may be submitted within two (2) years of receipt.</li>
                <li>
                  If defective, the product will be repaired, replaced, or
                  refunded.
                </li>
                <li>
                  To submit a claim, email{" "}
                  <a
                    href="mailto:rokeprofiles@gmail.com"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    rokeprofiles@gmail.com
                  </a>{" "}
                  with order details and photos.
                </li>
                <li>
                  The Online store is not liable for damage due to misuse or wear.
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                8. Liability and Force Majeure
              </h2>
              <p className="text-gray-400 leading-relaxed">
                The Online store is not liable for indirect or consequential damages,
                nor for delays caused by events beyond its control, including
                natural disasters, war, strikes, or logistics disruptions.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                9. Processing of Personal Data
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Personal data is processed according to the{" "}
                <a
                  href="/privacy"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Racesin Motorsports Privacy Policy
                </a>
                , in compliance with GDPR and Estonian law.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                10. Intellectual Property
              </h2>
              <p className="text-gray-400 leading-relaxed">
                All content on this website is the property of RoKe Profiles OÜ
                or its partners. Copying or commercial use is prohibited without
                written consent.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                11. Dispute Resolution
              </h2>
              <ul className="list-decimal list-inside text-gray-400 space-y-2">
                <li>Disputes are resolved primarily through negotiation.</li>
                <li>
                  If unresolved, the Client may contact the Consumer Disputes
                  Committee (
                  <a
                    href="https://www.tarbijakaitseamet.ee"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    www.tarbijakaitseamet.ee
                  </a>
                  ) or Estonian courts.
                </li>
                <li>These Terms are governed by Estonian law.</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">
                12. Contact Information
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
                <br />

              </p>
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
