import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms & Conditions | Racesin Motorsport</title>
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
        <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 uppercase">
            Terms & Conditions
          </h1>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              1. General Information
            </h2>
            <p>
              These Terms & Conditions govern the legal relationship between the
              online store <strong>Racesin Motorsport</strong> (hereinafter
              referred to as the Online store) and the customer (hereinafter the
              Client) when ordering, purchasing, and using goods offered in the
              Online store.
            </p>
            <br />
            <p>
              <strong>Online store operator:</strong>
              <br />
              RoKe Profiles OÜ
              <br />
              Registration code: 17208696
              <br />
              Address: J. Sütiste tee 58-56, 13420 Tallinn, Harju County,
              Estonia
              <br />
              E-mail:{" "}
              <Link
                href="mailto:rokeprofiles@gmail.com"
                className="text-[#c5a05f] hover:underline"
              >
                rokeprofiles@gmail.com
              </Link>
            </p>
            <p>
              <br />
              These Terms apply to all sales contracts concluded through the
              Online store. By placing an order, the Client confirms that they
              have read, understood, and accepted these Terms & Conditions.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              2. Sales Contract and Order Placement
            </h2>
            <p>
              2.1. To place an order, the Client must select the desired
              products, add them to the shopping cart, and follow the steps
              indicated in the checkout process.
            </p>
            <p>
              2.2. The Client must provide accurate and truthful information
              (name, e-mail, phone number, delivery address) when completing the
              order.
            </p>
            <p>
              2.3. The sales contract is deemed concluded once the payment has
              been received in the bank account of RoKe Profiles OÜ.
            </p>
            <p>
              2.4. The Online store reserves the right to cancel an order if the
              information provided is incorrect or if payment has not been
              received within three (3) working days of order submission.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Prices and Payment
            </h2>
            <p>
              3.1. All prices are expressed in euros (€) and include all
              applicable taxes in the Republic of Estonia.
            </p>
            <p>
              3.2. The Online store reserves the right to modify prices and
              conditions at any time. Changes take effect from the moment they
              are published on{" "}
              <Link
                href="https://racesin.com"
                className="text-[#c5a05f] hover:underline"
              >
                racesin.com
              </Link>
              .
            </p>
            <p>
              3.3. Payments are made using secure payment methods provided in
              the Online store. All payments are received into the bank account
              of RoKe Profiles OÜ.
            </p>
            <p>
              3.4. By making a payment, the Client confirms their intention to
              purchase the selected goods under the Online store’s Terms &
              Conditions.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Delivery Conditions
            </h2>
            <p>
              4.1. Goods are delivered to the Client using the delivery method
              selected at checkout (e.g., parcel machine, courier, or other
              logistics service).
            </p>
            <p>
              4.2. The standard delivery time is 14–30 calendar days from
              receipt of payment.
            </p>
            <p>
              4.3. If delivery is expected to exceed 30 days, the Online store
              will inform the Client in advance and provide the option to
              confirm or cancel the order.
            </p>
            <p>
              4.4. The Online store delivers orders to countries within the
              European Union and the United Kingdom.
            </p>
            <p>
              4.5. Deliveries are not available to the following countries or
              regions: Russia, Belarus, Iran, North Korea, Syria, Afghanistan,
              Eritrea, Sudan, and any other territories subject to international
              sanctions.
            </p>
            <p>
              4.6. If delivery is delayed due to circumstances beyond the
              control of the Online store (such as customs procedures, logistics
              delays, or force majeure), the Client will be notified at the
              earliest opportunity.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Receipt and Inspection of Goods
            </h2>
            <p>
              5.1. Upon receiving the goods, the Client is obliged to inspect
              the order for accuracy and for any visible damage.
            </p>
            <p>
              5.2. If defects or discrepancies are detected, the Client must
              notify the Online store immediately, but no later than 3 working
              days after receiving the goods, by e-mailing{" "}
              <Link
                href="mailto:rokeprofiles@gmail.com"
                className="text-[#c5a05f] hover:underline"
              >
                rokeprofiles@gmail.com
              </Link>
              .
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Right of Withdrawal and Returns
            </h2>
            <p>
              6.1. Consumers have the right to withdraw from a purchase made in
              the Online store within 14 days of receiving the goods, by
              submitting a written withdrawal notice to{" "}
              <Link
                href="mailto:rokeprofiles@gmail.com"
                className="text-[#c5a05f] hover:underline"
              >
                rokeprofiles@gmail.com
              </Link>
              .
            </p>
            <p>
              6.2. Returned goods must be unused, undamaged, and in their
              original packaging.
            </p>
            <p>
              6.3. Refunds are issued within 14 days from the date the returned
              goods are received, to the same account from which the original
              payment was made.
            </p>
            <p>
              6.4. The right of withdrawal does not apply to:
              <br />
              – custom-made or personalised products;
              <br />
              – used, soiled, or damaged goods;
              <br />
              – goods from which original tags or packaging have been removed;
              <br />
              – goods that are unsuitable for return for hygiene reasons.
            </p>
            <p>
              6.5. The Client bears the cost of return shipping, unless the
              reason for return is a defective or incorrect item.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Claims and Warranty Terms
            </h2>
            <p>
              7.1. The Client may submit complaints about the goods within two
              (2) years from receipt, pursuant to Sections 218–227 of the Law of
              Obligations Act (VÕS).
            </p>
            <p>
              7.2. If a product is defective, it will be repaired, replaced, or
              refunded.
            </p>
            <p>
              7.3. To submit a claim, the Client must e-mail{" "}
              <Link
                href="mailto:rokeprofiles@gmail.com"
                className="text-[#c5a05f] hover:underline"
              >
                rokeprofiles@gmail.com
              </Link>{" "}
              including the order number, a description of the issue, and
              photographs if applicable.
            </p>
            <p>
              7.4. The Online store is not liable for damage arising from:
              improper or non-intended use of the product, normal wear and tear,
              or actions or negligence attributable to the Client.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Liability and Force Majeure
            </h2>
            <p>
              8.1. The Online store shall not be liable for damages resulting
              from improper product use or for delivery delays caused by
              circumstances beyond its reasonable control (e.g., natural
              disasters, war, strikes, pandemics, customs or transport
              disruptions).
            </p>
            <p>
              8.2. The Online store shall not compensate for indirect damages
              (such as loss of profit), unless otherwise required by law.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Processing of Personal Data
            </h2>
            <p>
              9.1. Personal data processing is carried out in accordance with
              the{" "}
              <Link href="/privacy" className="text-[#c5a05f] hover:underline">
                Racesin Motorsport Privacy Policy
              </Link>
              , available at racesin.com/privacy.
            </p>
            <p>
              9.2. The Online store ensures that all personal data is processed
              in compliance with the EU General Data Protection Regulation
              (GDPR) and applicable Estonian law.
            </p>
            <p>
              9.3. Personal data is used solely for fulfilling orders,
              maintaining customer communication, and invoicing.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              10. Intellectual Property
            </h2>
            <p>
              All content on the Online store (including text, images, logos,
              trademarks, product descriptions, and design) is the property of
              RoKe Profiles OÜ or its partners. Copying, modifying, distributing,
              or using the content for commercial purposes without written
              permission is strictly prohibited.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              11. Dispute Resolution
            </h2>
            <p>
              11.1. All disputes will primarily be resolved through negotiation
              and mutual agreement.
            </p>
            <p>
              11.2. If an agreement cannot be reached, the consumer has the
              right to contact: the Consumer Disputes Committee
              (www.tarbijakaitseamet.ee); or the courts of the Republic of
              Estonia, in accordance with Estonian law.
            </p>
            <p>
              11.3. These Terms & Conditions are governed by the laws of the
              Republic of Estonia.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              12. Contact Information
            </h2>
            <p>
              All questions, requests, and complaints should be addressed to:
              <br />
              RoKe Profiles OÜ
              <br />
              E-mail:{" "}
              <Link
                href="mailto:rokeprofiles@gmail.com"
                className="text-[#c5a05f] hover:underline"
              >
                rokeprofiles@gmail.com
              </Link>
            </p>
          </section>

          {/* Legal Notice */}
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">
              Legal Notice
            </h2>
            <p>
              These Terms & Conditions are drafted in compliance with:
              <br />
              – the Law of Obligations Act (VÕS);
              <br />
              – the Consumer Protection Act;
              <br />
              – the General Data Protection Regulation (GDPR); and
              <br />
              – Directive (EU) 2019/771 of the European Parliament and of the
              Council on the sale of goods.
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-12">
            Last updated: 15 October 2025
          </p>
        </main>
      </div>
    </>
  );
}
