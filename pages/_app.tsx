import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import MetaHeadEmbed from "@phntms/react-share/lib/components/MetaHeadEmbed";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHead>
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </NextHead>
      <MetaHeadEmbed
        render={(meta: React.ReactNode) => <NextHead>{meta}</NextHead>}
        siteTitle="ScolioVis"
        pageTitle="Home"
        titleTemplate="[pageTitle] | [siteTitle]"
        description="Default description"
        baseSiteUrl="/"
        pagePath=""
        keywords={[
          "scoliosis",
          "cobb angle",
          "computer vision",
          "segmentation",
        ]}
        imageUrl=""
        imageAlt=""
        twitter={{
          cardSize: "large",
          siteUsername: "@carlo_taleon",
          creatorUsername: "@carlo_taleon",
        }}
      />
      <Component {...pageProps} />
      <Toaster containerClassName="text-sm" />
    </>
  );
}

export default MyApp;
