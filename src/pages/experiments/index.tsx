import { GetStaticProps, NextPage } from "next";
import { GenericLayout } from "@/components/layouts/generic";
import { Unbounded } from "@/lib/fonts";
import { useTranslations } from "next-intl";

interface IExperimentsPageProps {}

const capitalize = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

const ExperimentsPage: NextPage<IExperimentsPageProps> = () => {
  const t = useTranslations("pages.experiments");

  return (
    <GenericLayout
      title={t("page-title")}
      breadcrumbs={[
        { label: "gbrlmngr.dev", url: "/" },
        { label: t("experiments"), url: "/experiments" },
      ]}
    >
      <h1
        className={`mb-2 sm:mb-4 text-2xl sm:text-3xl text-bold ${Unbounded.className}`}
      >
        {capitalize(t("experiments"))}
      </h1>
      <p>{t("nothing-to-see")}</p>
    </GenericLayout>
  );
};

export const getStaticProps: GetStaticProps<IExperimentsPageProps> = async ({
  locale,
}) => {
  return {
    props: {
      i18n: (await import(`../../lib/locales/${locale ?? "en"}.json`)).default,
    },
  };
};

export default ExperimentsPage;
