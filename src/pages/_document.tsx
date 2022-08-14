import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="LMFAO.tech | Discover memes from all around the internet | Home🌐"
        />
        <link rel="icon" type="image/png" href="/logo-white.png" />
        <meta name="keywords" content="LMFAO, lol, memes, twitter memes" />
        <meta name="language" content="en" />
        <meta name="url" content="https://LMFAO.tech" />

        <meta name="og:title" content="LMFAO.tech" />
        <meta name="og:type" content="social" />
        <meta name="og:url" content="https://lmfao.tech" />
        <meta name="og:image" content="https://lmfao.tech/og-image.png" />
        <meta name="og:site_name" content="LMFAO.tech" />
        <meta
          name="og:description"
          content="LMFAO.tech - One place for all your meme needs. Discover, Create, Share memes with the community - in one place."
        />
        <meta name="og:email" content="hi@lmfao.tech" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="LMFAO.tech" />
        <meta
          property="twitter:title"
          content="LMFAO.tech - One place for all your meme needs. Discover, Create, Share memes with the community - in one place."
        />
        <meta
          property="twitter:description"
          content="LMFAO.tech: where you can find memes from all across the intenret and go LMFAO"
        />
        <meta
          property="twitter:image"
          content="https://lmfao.tech/og-image.png"
        />
        <script
          async
          defer
          data-website-id="ff7c1c8b-8ff2-4e72-828c-e140b07175a8"
          src="https://umami.dhravya.dev/umami.js"
        ></script>
        <meta name="theme-color" content="#242424"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
