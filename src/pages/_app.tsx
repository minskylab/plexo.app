import { ColorScheme } from "@mantine/core";
import type { AppProps } from "next/app";
import { getCookie } from "cookies-next";
import { ReactElement, ReactNode } from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";

import Fonts from "theming/fonts";
import { MyMantineProvider } from "theming/mantine";
import Script from "next/script";

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<T> = AppProps & {
  Component: NextPageWithLayout<T>;
};

type LogesAppProps = {
  colorScheme: ColorScheme;
};

const PlexoApp = ({
  Component,
  pageProps,
  colorScheme,
}: AppPropsWithLayout<LogesAppProps> & LogesAppProps) => {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <>
      <Script
        async
        src={process.env.NEXT_PUBLIC_UMAMI_SRC}
        data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      />
      <Head>
        {/* Page Metadata */}
        <title>Plexo</title>
        <meta
          name="description"
          content="Open-Source Project Management System for modern innovators"
        />

        {/* OpenGraph Tags */}
        <meta property="og:title" content="Plexo" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://plexo.app/" />
        <meta property="og:image" content="https://plexo.app/api/og" />
        <meta
          property="og:image:alt"
          content="Plexo App: Open-Source Project Management System for modern innovators"
        ></meta>
        <meta property="og:site_name" content="Plexo" />

        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" type="image/png" sizes="5x5" href="/plexo.png" />
      </Head>

      <MyMantineProvider colorScheme={colorScheme}>
        <Fonts />
        {getLayout(<Component {...pageProps} />)}
      </MyMantineProvider>
    </>
  );
};

PlexoApp.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  // get color scheme from cookie
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
  viewMode: getCookie("viewMode", ctx) || "list",
});

export default PlexoApp;
