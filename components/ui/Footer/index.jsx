import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#121111] text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Links */}
        <div className="flex flex-col items-center space-y-6 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-10 mb-8">
          <Link
            href="/terms"
            className="hover:text-white transition-colors"
          >
            Terms & Conditions
          </Link>

          <Link
            href="/privacy"
            className="hover:text-white transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            href="/cookies"
            className="hover:text-white transition-colors"
          >
            Cookies Policy
          </Link>

        </div>

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

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500">
          ©  2025 Racesin Motorsports. All rights reserved. <br /> Website made by m2.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
