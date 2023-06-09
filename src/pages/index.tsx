import { GetStaticProps, NextPage } from "next";
import { Unbounded } from "@/lib/fonts";
import { useTranslations } from "next-intl";
import {
  IoLogoLinkedin,
  IoLogoGithub,
  IoLogoDiscord,
  IoMail,
} from "react-icons/io5";
import * as mixpanel from "@/lib/mixpanel/events";
import { GenericLayout } from "@/components/layouts/generic";

interface IHomePageProps {}

const HomePage: NextPage<IHomePageProps> = () => {
  const t = useTranslations("pages.home");

  return (
    <GenericLayout title={t("page-title")}>
      <h1 className={`text-2xl sm:text-3xl text-bold ${Unbounded.className}`}>
        Gabriel Mangiurea
      </h1>
      <p className="text-xl text-neutral-400">{t("role")}</p>
      <p className="mt-2 text-2xl text-center space-x-2">
        <a
          href="https://www.linkedin.com/in/gbrlmngr/"
          className="social-icon"
          onClick={() => {
            mixpanel.track(mixpanel.Events.SocialIconInteraction, "linkedin");
          }}
        >
          <IoLogoLinkedin className="inline-block" />
        </a>

        <a
          href="https://github.com/gbrlmngr"
          className="social-icon"
          onClick={() => {
            mixpanel.track(mixpanel.Events.SocialIconInteraction, "github");
          }}
        >
          <IoLogoGithub className="inline-block" />
        </a>

        <a
          href="https://discord.com/users/667477657323307050"
          className="social-icon"
          onClick={() => {
            mixpanel.track(mixpanel.Events.SocialIconInteraction, "discord");
          }}
        >
          <IoLogoDiscord className="inline-block" />
        </a>

        <a
          href="mailto:hi@gbrlmngr.dev"
          className="social-icon"
          onClick={() => {
            mixpanel.track(mixpanel.Events.SocialIconInteraction, "email");
          }}
        >
          <IoMail className="inline-block" />
        </a>
      </p>
    </GenericLayout>
  );
};

export const getStaticProps: GetStaticProps<IHomePageProps> = async ({
  locale,
}) => {
  return {
    props: {
      i18n: (await import(`../lib/locales/${locale ?? "en"}.json`)).default,
    },
  };
};

export default HomePage;
