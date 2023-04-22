import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlProvider } from "next-intl";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NextIntlProvider messages={pageProps.i18n}>
      <Component {...pageProps} />
      <Analytics />
    </NextIntlProvider>
  );
};

export default App;
