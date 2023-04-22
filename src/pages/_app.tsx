import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextIntlProvider } from "next-intl";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <NextIntlProvider messages={pageProps.i18n}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
};

export default App;
