import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { Unbounded, Inconsolata } from "next/font/google";
import Link from "next/link";

interface HomeProps {}

const UnboundedFont = Unbounded({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});
const InconsolataFont = Inconsolata({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const Home: NextPage = () => {
  const t = useTranslations("pages.home");

  return (
    <>
      <Head>
        <title>{t("page-title")}</title>
      </Head>
      <main
        className={`flex flex-col items-center p-24 ${InconsolataFont.className}`}
      >
        <h1 className={`text-6xl font-bold ${UnboundedFont.className}`}>
          {t("salutation")}
        </h1>
        <Link href="mailto:bogus@email.com">Email test</Link>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
  return {
    props: {
      i18n: (await import(`../lib/locales/${locale ?? "en"}.json`)).default,
    },
  };
};

export default Home;
