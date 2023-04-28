import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Unbounded, Inconsolata } from "next/font/google";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoDiscord,
  IoMail,
} from "react-icons/io5";
import * as mixpanel from "@/lib/mixpanel/events";

interface HomePageProps {}

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

const HomePage: NextPage<HomePageProps> = () => {
  const t = useTranslations("pages.home");
  const variants: Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 },
    blurred: { filter: "blur(10px)" },
    clear: { filter: "blur(0)" },
  };

  const isMotionReduced = useReducedMotion();

  return (
    <>
      <Head>
        <title>{t("page-title")}</title>
      </Head>
      <main
        className={`max-w-screen-lg mx-auto flex flex-col items-center px-12 py-24 sm:px-24 ${InconsolataFont.className}`}
      >
        <motion.div
          className="text-center"
          variants={variants}
          initial={["blurred", "hidden"]}
          animate={["clear", "visible"]}
          transition={
            isMotionReduced
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.3, ease: "easeOut" }
          }
        >
          <h1 className={`text-6xl font-bold ${UnboundedFont.className}`}>
            {t("salutation")}
          </h1>
          <p className="mt-4 text-lg space-x-2">
            <span className="text-bold">Gabriel Mangiurea</span>
            <span className="text-neutral-500">&#x2022;</span>
            <span className="text-neutral-500">{t("role")}</span>
          </p>
          <p className="mt-2 text-2xl text-center space-x-2">
            <a
              href="https://www.linkedin.com/in/gbrlmngr/"
              className="social-icon"
              onClick={() => {
                mixpanel.track(
                  mixpanel.Events.SocialIconInteraction,
                  "LinkedIn"
                );
              }}
            >
              <IoLogoLinkedin className="inline-block" />
            </a>

            <a
              href="https://github.com/gbrlmngr"
              className="social-icon"
              onClick={() => {
                mixpanel.track(mixpanel.Events.SocialIconInteraction, "Github");
              }}
            >
              <IoLogoGithub className="inline-block" />
            </a>

            <a
              href="https://discord.com/users/667477657323307050"
              className="social-icon"
              onClick={() => {
                mixpanel.track(
                  mixpanel.Events.SocialIconInteraction,
                  "Discord"
                );
              }}
            >
              <IoLogoDiscord className="inline-block" />
            </a>

            <a
              href="mailto:hi@gbrlmngr.dev"
              className="social-icon"
              onClick={() => {
                mixpanel.track(mixpanel.Events.SocialIconInteraction, "Email");
              }}
            >
              <IoMail className="inline-block" />
            </a>
          </p>
        </motion.div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  locale,
}) => {
  return {
    props: {
      i18n: (await import(`../lib/locales/${locale ?? "en"}.json`)).default,
    },
  };
};

export default HomePage;
