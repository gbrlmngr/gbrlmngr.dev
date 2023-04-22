import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { Unbounded, Inconsolata } from "next/font/google";
import { motion } from "framer-motion";

interface HomeProps {}

const UnboundedFont = Unbounded({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});
const InconsolataFont = Inconsolata({
  weight: ["400", "600"],
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
        className={`flex flex-col items-center px-12 py-24 sm:px-24 ${InconsolataFont.className}`}
      >
        <motion.div
          className="text-center"
          initial={{ filter: "blur(10px)", opacity: 0, y: -20 }}
          animate={{ filter: "blur(0)", opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <h1 className={`text-6xl font-bold ${UnboundedFont.className}`}>
            {t("salutation")}
          </h1>
          <p className="mt-4 text-lg space-x-2">
            <span className="text-bold">Gabriel Mangiurea</span>
            <span className="text-neutral-500">&#x2022;</span>
            <span className="text-neutral-500">{t("role")}</span>
          </p>
        </motion.div>
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
