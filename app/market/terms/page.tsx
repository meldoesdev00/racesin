import Link from "next/link"

export const metadata = {
  title: "Marketplace Terms & Disclaimer — Racesin",
}

export default function MarketTermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
      <Link href="/market" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-black transition mb-8">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Market
      </Link>

      <h1 className="text-3xl font-semibold mb-2">Marketplace Terms & Disclaimer</h1>
      <p className="text-neutral-400 text-sm mb-10">Last updated: May 2025</p>

      <div className="space-y-8 text-neutral-700 leading-relaxed text-sm">

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">1. Operator & Platform Nature</h2>
          <p>
            The Racesin Marketplace (racesin.com/market) is operated by <strong>Racesin Management OÜ</strong>, registry code 17208696, registered in Estonia ("Racesin", "we", "us"). The Marketplace is a classified advertisement platform that provides technical infrastructure enabling private individuals and businesses ("users") to post and browse listings for sim-racing and motorsport equipment.
          </p>
          <p>
            Racesin Management OÜ acts solely as an <strong>information society service provider and hosting intermediary</strong> within the meaning of the EU Digital Services Act (Regulation (EU) 2022/2065) and the Estonian Information Society Services Act (<em>Infoühiskonna teenuse seadus</em>). Racesin is <strong>not a party to, broker of, or guarantor of</strong> any transaction concluded between users of the Marketplace.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">2. No Liability for Transactions</h2>
          <p>
            To the fullest extent permitted by applicable law, <strong>Racesin Management OÜ, its directors, employees, affiliates, and agents shall not be liable</strong> for any loss or damage of any kind arising out of or in connection with:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>the accuracy, completeness, legality, or fitness for purpose of any listing;</li>
            <li>the quality, safety, authenticity, or condition of any item listed or sold;</li>
            <li>any failure to complete, delay in completing, or dispute arising from a transaction;</li>
            <li>fraud, misrepresentation, theft, or any other misconduct by any user;</li>
            <li>the identity, solvency, creditworthiness, or reliability of any user;</li>
            <li>loss of profit, revenue, data, goodwill, or any indirect or consequential loss.</li>
          </ul>
          <p>
            Where liability cannot be excluded by law, the total aggregate liability of Racesin Management OÜ to any user shall not exceed the listing fee paid by that user in connection with the relevant listing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">3. Private Sales & Consumer Rights</h2>
          <p>
            Listings on the Marketplace are predominantly posted by private individuals acting outside of a trade, business, or profession. Transactions between private individuals are <strong>not subject to the statutory consumer protection rights</strong> applicable to business-to-consumer contracts under the Estonian Law of Obligations Act (<em>Võlaõigusseadus</em> §§ 208–234) or EU Directive 2019/771, including the legal guarantee of conformity and the 14-day right of withdrawal, <strong>unless the seller is acting in a commercial capacity</strong>.
          </p>
          <p>
            Buyers bear full responsibility for assessing the item's condition prior to purchase. Racesin strongly recommends meeting in person where possible, inspecting the item before payment, and conducting payment through a traceable method.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">4. Seller Obligations</h2>
          <p>By submitting a listing, the seller unconditionally represents, warrants, and agrees that:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>they hold lawful title to the item or are otherwise authorised to sell it;</li>
            <li>all descriptions, photographs, and pricing information are accurate, complete, and not misleading;</li>
            <li>the item does not infringe any patent, trademark, copyright, trade secret, or other intellectual property right of any third party;</li>
            <li>the listing and the sale of the item comply with all applicable laws and regulations;</li>
            <li>they are solely responsible for fulfilling the transaction, including delivery, transfer of title, and any post-sale obligations;</li>
            <li>they are solely responsible for any tax obligations (including income tax, VAT, or other levies) arising from the sale.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">5. Listing Fee & Payments</h2>
          <p>
            Publication of a listing requires payment of a <strong>non-refundable listing fee</strong>. The fee is due before the listing becomes publicly visible. A listing that has not been paid for will remain in <em>pending payment</em> status and will not be shown to other users.
          </p>
          <p>
            Payment processing is provided by <strong>Montonio Finance OÜ</strong> ("Montonio"), an authorised payment institution supervised by the Estonian Financial Supervision Authority (<em>Finantsinspektsioon</em>). Payment transactions are governed by Montonio's own terms of service and privacy policy. Racesin Management OÜ does not store card data or bank account credentials and assumes no liability for the payment processing services provided by Montonio.
          </p>
          <p>
            Payment of the listing fee does not constitute any guarantee by Racesin that the item will be sold or that any transaction will be completed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">6. Prohibited Content</h2>
          <p>Users may not post listings for:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>items that are stolen, counterfeit, or otherwise obtained unlawfully;</li>
            <li>items whose sale, transfer, or possession is prohibited or restricted by law;</li>
            <li>items that infringe third-party intellectual property rights;</li>
            <li>dangerous goods, weapons, or items requiring special permits;</li>
            <li>any content that is defamatory, discriminatory, obscene, or otherwise unlawful.</li>
          </ul>
          <p>
            Racesin reserves the right to remove any listing that violates these terms or applicable law, at any time, without prior notice, and <strong>without refund of the listing fee</strong>. Repeated or serious violations may result in permanent account suspension.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">7. Intellectual Property & User Content</h2>
          <p>
            By uploading photographs, text, or other content to the Marketplace, you grant Racesin Management OÜ a non-exclusive, worldwide, royalty-free, sublicensable licence to use, reproduce, display, and distribute that content solely for the purpose of operating and promoting the Marketplace. This licence terminates when the listing is removed. You retain all ownership rights in your content and warrant that you hold the necessary rights to grant this licence.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">8. Digital Services Act Compliance</h2>
          <p>
            In accordance with Regulation (EU) 2022/2065 (Digital Services Act), Racesin operates an <strong>internal complaint-handling mechanism</strong>. Users who believe that a listing or user conduct violates these terms or applicable law may submit a report to <a href="mailto:info@racesin.com" className="underline hover:text-black">info@racesin.com</a>. Racesin will process reports in a timely, non-discriminatory, and diligent manner and notify the reporting party of the outcome.
          </p>
          <p>
            Racesin publishes average monthly active user figures and content moderation actions in its annual transparency report where required by the DSA.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">9. Data Protection</h2>
          <p>
            The processing of personal data in connection with the Marketplace is carried out in accordance with Racesin's Privacy Policy and Regulation (EU) 2016/679 (GDPR). By using the Marketplace, you acknowledge that your personal data will be processed as described in the Privacy Policy, available at <Link href="/policies?section=privacy" className="underline hover:text-black">racesin.com/policies</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">10. Dispute Resolution Between Users</h2>
          <p>
            Racesin Management OÜ does not mediate, arbitrate, or otherwise intervene in disputes between buyers and sellers. Users are encouraged to resolve disputes amicably between themselves.
          </p>
          <p>
            Users who are consumers resident in the European Union may also submit complaints through the <strong>EU Online Dispute Resolution platform</strong> at <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">ec.europa.eu/consumers/odr</a>, or contact the Estonian Consumer Protection and Technical Regulatory Authority (<em>Tarbijakaitse ja Tehnilise Järelevalve Amet</em>).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">11. Force Majeure</h2>
          <p>
            Racesin Management OÜ shall not be liable for any failure or delay in performing its obligations under these terms where such failure or delay results from circumstances beyond its reasonable control, including but not limited to acts of God, natural disasters, war, cyberattacks, failures of third-party infrastructure, or changes in applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">12. Amendments</h2>
          <p>
            Racesin Management OÜ reserves the right to amend these terms at any time. Material changes will be communicated to registered users by email or via a notice on the platform. Continued use of the Marketplace after the effective date of any amendment constitutes acceptance of the revised terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">13. Governing Law & Jurisdiction</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of the <strong>Republic of Estonia</strong>. Any dispute arising out of or in connection with these terms or the Marketplace that cannot be resolved amicably shall be submitted to the exclusive jurisdiction of <strong>Harju County Court</strong> (<em>Harju Maakohus</em>), Estonia, unless mandatory consumer protection law provides otherwise.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-neutral-900">14. Severability</h2>
          <p>
            If any provision of these terms is found to be invalid, unlawful, or unenforceable by a court of competent jurisdiction, that provision shall be deemed modified to the minimum extent necessary to make it enforceable, or severed if modification is not possible. The remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <div className="border-t border-neutral-100 pt-6 text-xs text-neutral-400 space-y-1">
          <p>Racesin Management OÜ · Registry code 17208696 · Estonia</p>
          <p>Enquiries: <a href="mailto:info@racesin.com" className="underline hover:text-neutral-600">info@racesin.com</a></p>
          <p className="pt-2 italic">These terms constitute a legally binding agreement. If you do not agree, you may not use the Marketplace.</p>
        </div>

      </div>
    </main>
  )
}
