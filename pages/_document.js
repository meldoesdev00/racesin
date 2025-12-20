import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="scroll-smooth" lang="en">
      <Head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0HJ6NTFFF7"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-0HJ6NTFFF7');
            `,
          }}
        />
      </Head>
      <body className="md:overflow-visible">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
